import { useState, useEffect } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { useCustomer } from "autumn-js/react";
import { useSession } from "@/lib/auth-client";
import { getCustomerPlanStatus } from "@/client/features/billing/plan-detection";
import {
  AUTUMN_SEO_DATA_BALANCE_FEATURE_ID,
  AUTUMN_SEO_DATA_TOPUP_BALANCE_FEATURE_ID,
  BILLING_ROUTE,
  LOW_CREDITS_THRESHOLD_USD,
  SUBSCRIBE_ROUTE,
  autumnSeoDataCreditsToUsd,
} from "@/shared/billing";
import { BRAND } from "@/shared/brand";

const DISMISSED_GUIDE_KEY = "findable_dismissed_free_tour";

export function FreePlanBanner() {
  const { data: session } = useSession();
  const params = useParams({ strict: false }) as { projectId?: string };
  const projectId = params?.projectId;

  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(DISMISSED_GUIDE_KEY) === "true";
  });

  const customerQuery = useCustomer({
    queryOptions: {
      enabled: Boolean(session?.user?.id),
    },
  });

  if (customerQuery.isLoading) {
    return null;
  }

  const planStatus = customerQuery.data
    ? getCustomerPlanStatus(customerQuery.data)
    : "free";
  const isFreePlan = planStatus === "free";

  const monthlyRemaining = autumnSeoDataCreditsToUsd(
    customerQuery.data?.balances?.[AUTUMN_SEO_DATA_BALANCE_FEATURE_ID]
      ?.remaining ?? 0,
  );
  const topUpRemaining = autumnSeoDataCreditsToUsd(
    customerQuery.data?.balances?.[AUTUMN_SEO_DATA_TOPUP_BALANCE_FEATURE_ID]
      ?.remaining ?? 0,
  );
  const totalRemaining = monthlyRemaining + topUpRemaining;

  // Paid plan depleting warnings:
  if (!isFreePlan) {
    const isOutOfCredits = totalRemaining <= 0;
    const isLowCredits =
      !isOutOfCredits && totalRemaining < LOW_CREDITS_THRESHOLD_USD;

    if (isOutOfCredits) {
      return (
        <BannerShell variant="error">
          You&rsquo;ve used all your credits.{" "}
          <Link to={BILLING_ROUTE} className="link link-primary font-medium">
            Buy more credits
          </Link>{" "}
          or{" "}
          <Link
            to={SUBSCRIBE_ROUTE}
            search={{ upgrade: true }}
            className="link link-primary font-medium"
          >
            Upgrade your plan
          </Link>{" "}
          to continue using {BRAND.name}.
        </BannerShell>
      );
    }

    if (isLowCredits) {
      return (
        <BannerShell variant="warning">
          You&rsquo;re running low on credits.{" "}
          <Link to={BILLING_ROUTE} className="link link-primary font-medium">
            Buy more credits
          </Link>{" "}
          to keep using {BRAND.name}.
        </BannerShell>
      );
    }

    return null;
  }

  // ─── Free Plan: Welcoming Drive-Through Experience ───────────────────────

  const toggleMinimize = (minimized: boolean) => {
    setIsMinimized(minimized);
    if (typeof window !== "undefined") {
      localStorage.setItem(DISMISSED_GUIDE_KEY, String(minimized));
    }
  };

  // 1. Minimized Slim Bar
  if (isMinimized) {
    return (
      <div className="shrink-0 px-4 py-2 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200/80 bg-emerald-50/60 px-4 py-2 text-xs text-emerald-950 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-[#0C5C55]">Free Plan Active</span>
              <span className="hidden sm:inline text-neutral-500">·</span>
              <span className="hidden sm:inline text-neutral-600">
                100 Free Monthly Credits + GSC/GA4 Sync + MCP Server Access
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={SUBSCRIBE_ROUTE}
                search={{ upgrade: true }}
                className="font-bold text-[#0C5C55] hover:underline"
              >
                ⚡ Upgrade to Autopilot ($69/mo)
              </Link>
              <button
                type="button"
                onClick={() => toggleMinimize(false)}
                className="font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Show Tour ▾
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Full Drive-Through Tutorial Card
  const keywordsUrl = projectId ? `/p/${projectId}/keywords` : "/";
  const articlesUrl = projectId ? `/p/${projectId}/articles` : "/";
  const gscUrl = projectId ? `/p/${projectId}/gsc` : "/";
  const mcpUrl = projectId ? `/p/${projectId}/mcp` : "/";

  return (
    <div className="shrink-0 px-4 pt-3 pb-2 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/50 p-5 md:p-6 shadow-sm">
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#0C5C55]/10 px-2.5 py-0.5 text-xs font-bold text-[#0C5C55]">
                  <span>✨</span> Free Plan Active
                </span>
                <span className="text-xs text-neutral-500">Free forever with 100 monthly credits</span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-neutral-900">
                Welcome to Findable! 🚀 Test our AI SEO Engine for Free
              </h2>
              <p className="mt-1 text-xs md:text-sm text-neutral-600 max-w-3xl">
                Explore search volume, generate 1-click articles from live SERP data, sync Google Search Console, and connect AI coding agents. Follow this quick drive-through:
              </p>
            </div>

            <button
              type="button"
              onClick={() => toggleMinimize(true)}
              className="rounded-lg p-1.5 text-xs font-semibold text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
              title="Minimize guide"
            >
              ✕ Minimize
            </button>
          </div>

          {/* Drive-Through 4-Step Cards */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <Link
              to={keywordsUrl}
              className="group flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs transition-all hover:border-[#0C5C55] hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#0C5C55] mb-1.5">
                  <span>1. Keyword Research</span>
                  <span className="text-base group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Search high-intent keyword ideas with real search volume and competitor SERP analysis.
                </p>
              </div>
              <span className="mt-3 inline-block text-[11px] font-semibold text-[#0C5C55] group-hover:underline">
                Try a search »
              </span>
            </Link>

            {/* Step 2 */}
            <Link
              to={articlesUrl}
              className="group flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs transition-all hover:border-[#0C5C55] hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#0C5C55] mb-1.5">
                  <span>2. 1-Click AI Articles</span>
                  <span className="text-base group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Generate full 1,500+ word rank-ready articles with FAQ Schema & structured headings.
                </p>
              </div>
              <span className="mt-3 inline-block text-[11px] font-semibold text-[#0C5C55] group-hover:underline">
                Generate article »
              </span>
            </Link>

            {/* Step 3 */}
            <Link
              to={gscUrl}
              className="group flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs transition-all hover:border-[#0C5C55] hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#0C5C55] mb-1.5">
                  <span>3. GSC & GA4 Sync</span>
                  <span className="text-base group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Connect Google Search Console for free to find striking-distance rankings (positions 4–20).
                </p>
              </div>
              <span className="mt-3 inline-block text-[11px] font-semibold text-[#0C5C55] group-hover:underline">
                Connect GSC »
              </span>
            </Link>

            {/* Step 4 */}
            <Link
              to={mcpUrl}
              className="group flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs transition-all hover:border-[#0C5C55] hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#0C5C55] mb-1.5">
                  <span>4. AI Agents & MCP</span>
                  <span className="text-base group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Connect Claude Code, Cursor, or ChatGPT to query your SEO rankings directly from the terminal.
                </p>
              </div>
              <span className="mt-3 inline-block text-[11px] font-semibold text-[#0C5C55] group-hover:underline">
                Setup MCP »
              </span>
            </Link>
          </div>

          {/* Action Row */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-100/80 pt-3.5">
            <div className="text-xs text-neutral-500">
              Need more websites or 30+ automated AI articles monthly?
            </div>
            <div className="flex items-center gap-2.5">
              <Link
                to="/support"
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900 transition-colors"
              >
                Need Help?
              </Link>
              <Link
                to={SUBSCRIBE_ROUTE}
                search={{ upgrade: true }}
                className="rounded-lg bg-[#0C5C55] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#094843] transition-colors"
              >
                ⚡ Upgrade Plan ($39 / $69 / $99)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BannerShell({
  variant,
  children,
}: {
  variant: "info" | "warning" | "error";
  children: React.ReactNode;
}) {
  const alertClass =
    variant === "error"
      ? "alert-error"
      : variant === "warning"
        ? "alert-warning"
        : "alert-info";

  return (
    <div className="shrink-0 px-4 py-2.5 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className={`alert text-sm ${alertClass}`}>
          <span>{children}</span>
        </div>
      </div>
    </div>
  );
}
