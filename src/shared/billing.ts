export const BILLING_ROUTE = "/billing";
export const SUBSCRIBE_ROUTE = "/subscribe";

export const AUTUMN_PAID_PLAN_ID = "base-plan";
export const AUTUMN_SEO_DATA_TOP_UP_PLAN_ID = "credit-top-up";
export const AUTUMN_PAID_PLAN_FEATURE_ID = "paid_plan";
export const AUTUMN_MANAGED_ACCESS_FEATURE_ID = "managed_service_access";

export const AUTUMN_SEO_DATA_BALANCE_FEATURE_ID = "usage_credits";
export const AUTUMN_SEO_DATA_TOPUP_BALANCE_FEATURE_ID = "topup_credits";
export const AUTUMN_SEO_DATA_CREDITS_PER_USD = 1000;
export const SEO_DATA_COST_MARKUP = 1.28;
export const LOW_CREDITS_THRESHOLD_USD = 0.25;

// Trial & Monthly Allocations
export const SIGNUP_TRIAL_CREDITS = 500;
export const ACTIVE_MONTHLY_FREE_CREDITS = 100;
export const GRACE_PERIOD_DAYS = 14;
export const RUNWAY_WARNING_DAYS = 7;

export interface SubscriptionPlan {
  id: string;
  name: string;
  usd: number;
  description: string;
  websitesLimit: number;
  monthlyCredits: number;
  aiArticlesLimit: number;
  popular?: boolean;
  features: string[];
}

export const SUBSCRIPTION_PLANS: readonly SubscriptionPlan[] = [
  {
    id: "base-plan",
    name: "Starter",
    usd: 39,
    description: "For freelancers and growing niche sites.",
    websitesLimit: 3,
    monthlyCredits: 10_000,
    aiArticlesLimit: 10,
    features: [
      "3 Websites / Projects connected",
      "10,000 Monthly Usage Credits (Keywords, Backlinks, Audits)",
      "10 1-Click AI Articles per month (1,500+ words, SEO & GEO optimized)",
      "Full MCP Server & Agent skills (Claude, Cursor, ChatGPT)",
      "Google Search Console & GA4 Integration",
    ],
  },
  {
    id: "growth-plan",
    name: "Growth (Autopilot)",
    usd: 69,
    description: "The complete SEO & AI Search traffic engine on autopilot.",
    websitesLimit: 6,
    monthlyCredits: 35_000,
    aiArticlesLimit: 30,
    popular: true,
    features: [
      "6 Websites / Projects connected",
      "35,000 Monthly Usage Credits",
      "30 1-Click AI Articles per month (1 article daily / scheduled)",
      "Brand & AI Search monitoring (ChatGPT, Perplexity, Gemini)",
      "Weekly automated technical site audit",
      "Full MCP Server & Agent skills",
      "Export to CMS / Webhooks",
    ],
  },
  {
    id: "scale-plan",
    name: "Scale / Agency",
    usd: 99,
    description: "For agencies and high-volume multi-brand operators.",
    websitesLimit: 10,
    monthlyCredits: 100_000,
    aiArticlesLimit: 90,
    features: [
      "10 Websites / Projects connected",
      "100,000 Monthly Usage Credits",
      "90 1-Click AI Articles per month",
      "Multi-domain brand & competitor monitoring",
      "Team access & shared workspace",
      "White-label client PDF reports",
      "Priority API rate limits & dedicated support",
    ],
  },
];

// Volume Purchase Tiers & Bonuses
export interface CreditPackage {
  id: string;
  usd: number;
  baseCredits: number;
  bonusPercent: number;
  totalCredits: number;
  popular?: boolean;
}

export const CREDIT_PACKAGES: readonly CreditPackage[] = [
  {
    id: "pack_25",
    usd: 25,
    baseCredits: 25_000,
    bonusPercent: 0,
    totalCredits: 25_000,
  },
  {
    id: "pack_50",
    usd: 50,
    baseCredits: 50_000,
    bonusPercent: 10,
    totalCredits: 55_000,
    popular: true,
  },
  {
    id: "pack_100",
    usd: 100,
    baseCredits: 100_000,
    bonusPercent: 15,
    totalCredits: 115_000,
  },
  {
    id: "pack_250",
    usd: 250,
    baseCredits: 250_000,
    bonusPercent: 25,
    totalCredits: 312_500,
  },
  {
    id: "pack_500",
    usd: 500,
    baseCredits: 500_000,
    bonusPercent: 35,
    totalCredits: 675_000,
  },
];

export function roundUsdForBilling(value: number) {
  return Math.round(value * 100000) / 100000;
}

export function autumnSeoDataCreditsToUsd(credits: number) {
  return credits / AUTUMN_SEO_DATA_CREDITS_PER_USD;
}

export function usdToCredits(usd: number): number {
  return Math.round(usd * AUTUMN_SEO_DATA_CREDITS_PER_USD);
}

export function applyBillingMarkupUsd(rawUsd: number): number {
  return roundUsdForBilling(rawUsd * SEO_DATA_COST_MARKUP);
}

export function calculatePackageCredits(usd: number): number {
  const pkg = CREDIT_PACKAGES.find((p) => p.usd === usd);
  if (pkg) return pkg.totalCredits;
  if (usd >= 500) return Math.round(usd * 1000 * 1.35);
  if (usd >= 250) return Math.round(usd * 1000 * 1.25);
  if (usd >= 100) return Math.round(usd * 1000 * 1.15);
  if (usd >= 50) return Math.round(usd * 1000 * 1.10);
  return Math.round(usd * 1000);
}
