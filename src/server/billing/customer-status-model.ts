import { AUTUMN_PAID_PLAN_ID, SUBSCRIPTION_PLANS } from "@/shared/billing";

// The subset of the Autumn SDK's `Customer` we read. The SDK already validates
// and returns camelCase, so we type against it structurally instead of
// re-parsing; everything else is preserved verbatim in `customerJson`.
type AutumnSubscriptionInput = {
  planId?: string | null;
  status?: string | null;
};

type AutumnCustomerInput = {
  id?: string | null;
  subscriptions?: AutumnSubscriptionInput[];
  [key: string]: unknown;
};

export type BillingCustomerStatusSnapshot = {
  organizationId: string;
  isPaying: boolean;
  paidPlanId: string | null;
  paidPlanStatus: string | null;
  customerJson: string;
  syncedAt: string;
};

export function deriveBillingCustomerStatusSnapshot(
  customer: AutumnCustomerInput,
): BillingCustomerStatusSnapshot {
  const organizationId = customer.id;
  if (!organizationId) {
    throw new Error("Autumn customer is missing an id");
  }

  const subscription = selectPaidSubscription(customer.subscriptions ?? []);

  return {
    organizationId,
    isPaying: subscription?.status === "active",
    paidPlanId: subscription?.planId ?? null,
    paidPlanStatus: subscription?.status ?? null,
    // Full payload kept verbatim — query rarely-used fields via json_extract.
    customerJson: JSON.stringify(customer),
    syncedAt: new Date().toISOString(),
  };
}

const PAID_PLAN_IDS = new Set<string>([
  AUTUMN_PAID_PLAN_ID,
  ...SUBSCRIPTION_PLANS.map((p) => p.id),
]);

// A customer is "paying" when they hold any valid paid plan (Starter, Growth, Scale).
// Prefer an active row, but fall back to any paid row so a not-yet-active plan still records its id.
function selectPaidSubscription(subscriptions: AutumnSubscriptionInput[]) {
  const paid = subscriptions.filter(
    (s) => s.planId && PAID_PLAN_IDS.has(s.planId),
  );
  return paid.find((s) => s.status === "active") ?? paid[0] ?? null;
}
