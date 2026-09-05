import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCustomer } from "autumn-js/react";
import { useEffect, useState } from "react";
import { ArrowRight, Settings, User } from "lucide-react";
import { ThemePreferenceMenuItems } from "@/client/components/ThemePreferenceMenuItems";
import { captureClientEvent } from "@/client/lib/posthog";
import { signOutAndRedirect, useSession } from "@/lib/auth-client";
import { isHostedClientAuthMode } from "@/lib/auth-mode";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { getSubscribeRouteState } from "@/client/features/billing/route-state";
import { getCustomerPlanStatus } from "@/client/features/billing/plan-detection";
import { normalizeAuthRedirect } from "@/lib/auth-redirect";
import {
  AUTUMN_MANAGED_ACCESS_FEATURE_ID,
  AUTUMN_PAID_PLAN_ID,
  SUBSCRIPTION_PLANS,
} from "@/shared/billing";

const SUPPORT_EMAIL = "jbendek@ribentek.com";

const PLAN_FEATURES = [
  "Keyword research, backlinks, rank tracking, and site audits",
  "MCP server and agent skills for Claude, Cursor, and ChatGPT",
  "Google Search Console Integration",
  "Includes $10.00 of Usage Credits each month",
];

// How long the post-checkout "finalizing" screen polls Autumn before giving
// up and letting the user through anyway.
const FINALIZING_TIMEOUT_MS = 30_000;

export const Route = createFileRoute("/_authenticated/subscribe")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { upgrade?: true; redirect?: string; checkout?: "success" } => ({
    upgrade:
      search.upgrade === true || search.upgrade === "true" ? true : undefined,
    redirect:
      typeof search.redirect === "string"
        ? normalizeAuthRedirect(search.redirect)
        : undefined,
    checkout: search.checkout === "success" ? "success" : undefined,
  }),
  component: SubscribePage,
});

function SubscribePage() {
  const navigate = useNavigate();
  const { upgrade: isUpgradeFlow, redirect, checkout } = Route.useSearch();
  const { data: session } = useSession();
  const [isAttaching, setIsAttaching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finalizingTimedOut, setFinalizingTimedOut] = useState(false);
  const checkoutCompleted = checkout === "success";

  const hasSession = Boolean(session?.user?.id);
  const customerQuery = useCustomer({
    queryOptions: {
      enabled: hasSession,
    },
  });

  // Read managed access from the already-loaded Autumn customer (local, no API
  // call) instead of a separate server round-trip. Self-hosted has no Autumn
  // customer, so mirror the server's "always granted" behavior there.
  const hasManagedAccess = isHostedClientAuthMode()
    ? customerQuery.check({ featureId: AUTUMN_MANAGED_ACCESS_FEATURE_ID })
        .allowed
    : true;

  const planStatus = getCustomerPlanStatus(customerQuery.data);
  const subscribeRouteState = getSubscribeRouteState({
    hasSession,
    isCustomerLoading: customerQuery.isLoading,
    isCustomerError: customerQuery.isError,
    hasManagedAccess,
    planStatus,
    isUpgradeFlow: isUpgradeFlow === true,
    checkoutCompleted,
    finalizingTimedOut,
  });

  // Autumn can lag Stripe by a few seconds after checkout; poll until the
  // subscription shows up so the just-paid user isn't shown the paywall again.
  const isFinalizing = subscribeRouteState === "finalizing";
  const { refetch: refetchCustomer } = customerQuery;
  useEffect(() => {
    if (!isFinalizing) return;
    const interval = setInterval(() => {
      void refetchCustomer();
    }, 2000);
    return () => clearInterval(interval);
  }, [refetchCustomer, isFinalizing]);

  // Armed once on landing with checkout=success (not on the finalizing state,
  // which a transient poll error can leave and re-enter) so the deadline is a
  // hard bound from arrival.
  useEffect(() => {
    if (!checkoutCompleted || finalizingTimedOut) return;
    const timeout = setTimeout(
      () => setFinalizingTimedOut(true),
      FINALIZING_TIMEOUT_MS,
    );
    return () => clearTimeout(timeout);
  }, [checkoutCompleted, finalizingTimedOut]);

  useEffect(() => {
    if (subscribeRouteState === "redirectToApp") {
      if (checkoutCompleted) {
        captureClientEvent("billing:checkout_success");
      }
      void navigate({ href: redirect ?? "/", replace: true });
    }
  }, [checkoutCompleted, navigate, redirect, subscribeRouteState]);

  useEffect(() => {
    if (subscribeRouteState === "showPaywall" && !isUpgradeFlow) {
      captureClientEvent("billing:paywall_viewed");
    }
  }, [isUpgradeFlow, subscribeRouteState]);

  if (
    subscribeRouteState === "loading" ||
    subscribeRouteState === "redirectToApp"
  ) {
    return null;
  }

  if (subscribeRouteState === "finalizing") {
    return (
      <div className="w-full max-w-xs space-y-4 text-center">
        <img
          src="/transparent-logo.png"
          alt="OpenSEO"
          className="mx-auto size-10 rounded-lg"
        />
        <h1 className="text-xl font-semibold">
          Finalizing your subscription&hellip;
        </h1>
        <span className="loading loading-spinner loading-md" />
        <p className="text-sm text-base-content/60">
          This usually takes a few seconds.
        </p>
        <p className="text-xs text-base-content/50">
          Taking longer?{" "}
          <a className="link" href={`mailto:${SUPPORT_EMAIL}`}>
            Email {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  if (subscribeRouteState === "error") {
    return (
      <div className="w-full max-w-xs space-y-4">
        <div className="text-center space-y-3">
          <img
            src="/transparent-logo.png"
            alt="OpenSEO"
            className="mx-auto size-10 rounded-lg"
          />
          <h1 className="text-xl font-semibold">Billing unavailable</h1>
        </div>

        <p className="text-sm text-center text-base-content/70">
          {getStandardErrorMessage(
            customerQuery.error,
            "We couldn't verify your billing status right now. Please try again.",
          )}
        </p>

        <button
          type="button"
          className="btn btn-soft w-full"
          onClick={() => {
            void customerQuery.refetch();
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  const [selectedPlanId, setSelectedPlanId] = useState<string>("growth-plan");

  async function handleSubscribe(planId: string) {
    setError(null);
    setIsAttaching(true);

    try {
      captureClientEvent("billing:checkout_start", { planId });
      const successUrl = new URL(window.location.href);
      successUrl.searchParams.set("checkout", "success");
      await customerQuery.attach({
        planId,
        redirectMode: "always",
        successUrl: successUrl.toString(),
      });
    } catch (err) {
      setError(
        getStandardErrorMessage(
          err,
          "We couldn't start the checkout. Please try again.",
        ),
      );
      setIsAttaching(false);
    }
  }

  const firstName = session?.user?.name?.split(" ")[0] || "";

  return (
    <div className="w-full max-w-4xl space-y-6 px-4 py-8">
      <SubscribePageAccountMenu email={session?.user?.email} />

      <div className="text-center space-y-3">
        <img
          src="/transparent-logo.png"
          alt="Findable"
          className="mx-auto size-12 rounded-xl"
        />
        <h1 className="text-2xl font-bold tracking-tight">
          {isUpgradeFlow
            ? "Choose your plan"
            : firstName
              ? `Welcome to Findable, ${firstName}!`
              : "Welcome to Findable!"}
        </h1>
        <p className="text-sm text-base-content/70 max-w-lg mx-auto">
          Dominate Google, ChatGPT, and Perplexity on autopilot. Choose the plan that fits your growth goals.
        </p>
      </div>

      {error ? (
        <div className="p-3 bg-error/10 border border-error/30 text-error rounded-lg text-sm text-center max-w-md mx-auto">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all cursor-pointer ${
                plan.popular
                  ? "border-primary bg-base-100 shadow-xl shadow-primary/5 ring-2 ring-primary/20 md:-translate-y-2"
                  : isSelected
                    ? "border-primary/60 bg-base-100 shadow-md"
                    : "border-base-300 bg-base-100/60 hover:border-base-content/30"
              }`}
            >
              {plan.popular ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-content tracking-wide uppercase">
                  Most Popular
                </span>
              ) : null}

              <div className="mb-4">
                <h3 className="text-lg font-bold text-base-content">{plan.name}</h3>
                <p className="text-xs text-base-content/60 min-h-8 mt-1">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1 my-2">
                <span className="text-3xl font-extrabold tracking-tight">${plan.usd}</span>
                <span className="text-xs text-base-content/50 font-medium">/ month</span>
              </div>

              <ul className="space-y-2.5 my-6 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-xs text-base-content/80 leading-relaxed"
                  >
                    <span className="text-primary mt-0.5 shrink-0 font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn w-full ${
                  plan.popular ? "btn-primary shadow-sm" : "btn-soft"
                }`}
                disabled={isAttaching}
                onClick={(e) => {
                  e.stopPropagation();
                  void handleSubscribe(plan.id);
                }}
              >
                {isAttaching && selectedPlanId === plan.id
                  ? "Redirecting..."
                  : `Get ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-center space-y-2 pt-4">
        <p className="text-xs text-base-content/50">
          <span
            className="tooltip before:max-w-60 before:whitespace-normal"
            data-tip={`Not for you yet? Email ${SUPPORT_EMAIL} within 30 days of your charge and we'll refund your subscription.`}
          >
            <span className="cursor-help underline decoration-dotted">
              30-day money-back guarantee
            </span>
          </span>
          . Cancel anytime. Powered by Stripe.
        </p>
        <p className="text-xs text-base-content/60">
          Questions? Email {SUPPORT_EMAIL}.
        </p>
        {isUpgradeFlow ? (
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-base-content/70 hover:text-base-content transition-colors mt-2"
            onClick={() => void navigate({ to: "/", replace: true })}
          >
            <ArrowRight className="size-3.5 rotate-180" />
            Back to app
          </button>
        ) : null}
      </div>
    </div>
  );
}

function SubscribePageAccountMenu({ email }: { email: string | undefined }) {
  if (!email) return null;

  const handleSignOut = () => signOutAndRedirect();

  return (
    <div className="fixed top-4 right-4">
      <div className="dropdown dropdown-end">
        <button
          type="button"
          tabIndex={0}
          className="btn btn-ghost btn-circle"
          aria-label="Open account menu"
        >
          <User className="h-5 w-5" />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-20 menu mt-3 min-w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
        >
          <li className="menu-title max-w-full">
            <span className="truncate text-base-content" data-ph-mask>
              {email}
            </span>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </li>
          <ThemePreferenceMenuItems />
          <li>
            <button
              type="button"
              className="text-error"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
