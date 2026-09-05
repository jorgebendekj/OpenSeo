/**
 * Findable marketing landing page with full i18n & integrated Pricing section.
 */

import { useState, type ReactNode, type SVGProps } from "react";
import { SiteFooter } from "@/components/site-footer";
import { FindableMark } from "@/components/findable-mark";
import { useI18n } from "@/lib/i18n";
import "./landing-page.css";
import { SIGNUP_URL } from "@/lib/app-urls";

// ─── Icons (inline SVG only, per project convention) ─────────────────

type IconProps = { size?: number; className?: string };

function strokeProps(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
}

function IconArrowRight({ size = 16, className }: IconProps) {
  return (
    <svg {...strokeProps(size, className)}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconSearch({ size = 18, className }: IconProps) {
  return (
    <svg {...strokeProps(size, className)}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function IconChart({ size = 18, className }: IconProps) {
  return (
    <svg {...strokeProps(size, className)}>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function IconShield({ size = 18, className }: IconProps) {
  return (
    <svg {...strokeProps(size, className)}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function IconSparkles({ size = 18, className }: IconProps) {
  return (
    <svg {...strokeProps(size, className)}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
    </svg>
  );
}

function IconCheck({ size = 16, className }: IconProps) {
  return (
    <svg {...strokeProps(size, className)}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconChevronDown({ size = 18, className }: IconProps) {
  return (
    <svg {...strokeProps(size, className)}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── Shared bits ─────────────────────────────────────────────────────

function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`itc-container ${className}`}>{children}</div>;
}

function ArrowCta({
  href = SIGNUP_URL,
  className = "itc-btn itc-btn-primary",
  children,
  size = "md",
}: {
  href?: string;
  className?: string;
  children?: ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <a
      href={href}
      className={`${className}${size === "lg" ? " itc-btn-lg" : ""}`}
      style={{ backgroundColor: "#0C5C55", borderColor: "#0C5C55", color: "#fff" }}
    >
      {children}
      <IconArrowRight size={size === "lg" ? 18 : 16} className="itc-arrow" />
    </a>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────

function Hero() {
  const { t } = useI18n();

  return (
    <section className="itc-hero">
      <Container>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#0C5C55]/20 bg-emerald-50/60 px-4 py-1.5 text-xs font-semibold text-[#0C5C55] mb-6 shadow-sm">
          <FindableMark size={15} className="text-[#0C5C55]" />
          <span>{t.hero.badge}</span>
        </div>
        <h1
          className="itc-display-xl itc-hero-title"
          style={{ maxWidth: 1180, margin: "0 auto", lineHeight: 1.15 }}
        >
          {t.hero.title}
        </h1>
        <p
          className="itc-subhead itc-muted itc-hero-subtitle"
          style={{ maxWidth: 740, margin: "24px auto 0", fontSize: "1.125rem", lineHeight: 1.6 }}
        >
          {t.hero.subtitle}
        </p>
        <div className="itc-hero-ctas">
          <div className="itc-hero-cta-group">
            <ArrowCta size="lg">{t.hero.cta}</ArrowCta>
            <p className="itc-hero-cta-note">{t.hero.note}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Dashboard Preview Mockup ────────────────────────────────────────

function DashboardPreview() {
  const { t } = useI18n();

  return (
    <section className="itc-section" style={{ paddingTop: 0, paddingBottom: 64 }}>
      <Container>
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-7 shadow-xl shadow-neutral-900/5">
          {/* Top application bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#f87171]" />
                <span className="h-3 w-3 rounded-full bg-[#fbbf24]" />
                <span className="h-3 w-3 rounded-full bg-[#34d399]" />
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-neutral-100/90 px-3 py-1 text-xs font-medium text-neutral-600">
                <span>{t.dashboard.url}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[#0C5C55]">
                <span className="h-2 w-2 rounded-full bg-[#0C5C55]" />
                {t.dashboard.gscConnected}
              </span>
            </div>
          </div>

          {/* KPI Metrics */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
              <p className="text-xs font-medium text-neutral-500">{t.dashboard.clicks}</p>
              <p className="mt-1.5 text-2xl font-bold text-neutral-900">48,290</p>
              <p className="mt-1 text-xs font-semibold text-emerald-700">{t.dashboard.clicksDelta}</p>
            </div>
            <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
              <p className="text-xs font-medium text-neutral-500">{t.dashboard.impressions}</p>
              <p className="mt-1.5 text-2xl font-bold text-neutral-900">1.24M</p>
              <p className="mt-1 text-xs font-semibold text-emerald-700">{t.dashboard.impressionsDelta}</p>
            </div>
            <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
              <p className="text-xs font-medium text-neutral-500">{t.dashboard.top10}</p>
              <p className="mt-1.5 text-2xl font-bold text-neutral-900">342</p>
              <p className="mt-1 text-xs font-semibold text-emerald-700">{t.dashboard.top10Delta}</p>
            </div>
            <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
              <p className="text-xs font-medium text-neutral-500">{t.dashboard.health}</p>
              <p className="mt-1.5 text-2xl font-bold text-[#0C5C55]">96 / 100</p>
              <p className="mt-1 text-xs font-medium text-neutral-500">{t.dashboard.healthDelta}</p>
            </div>
          </div>

          {/* Core Modules Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-neutral-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">{t.dashboard.module1Title}</p>
              <p className="mt-2 text-sm font-semibold text-neutral-900">{t.dashboard.module1Sub}</p>
              <p className="mt-1 text-xs text-neutral-500">{t.dashboard.module1Desc}</p>
            </div>
            <div className="rounded-xl border border-neutral-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">{t.dashboard.module2Title}</p>
              <p className="mt-2 text-sm font-semibold text-neutral-900">{t.dashboard.module2Sub}</p>
              <p className="mt-1 text-xs text-neutral-500">{t.dashboard.module2Desc}</p>
            </div>
            <div className="rounded-xl border border-neutral-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">{t.dashboard.module3Title}</p>
              <p className="mt-2 text-sm font-semibold text-neutral-900">{t.dashboard.module3Sub}</p>
              <p className="mt-1 text-xs text-neutral-500">{t.dashboard.module3Desc}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Features Grid (SEO Capabilities) ────────────────────────────────

function IconZap({ size = 18, className }: IconProps) {
  return (
    <svg {...strokeProps(size, className)}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconTrendingUp({ size = 18, className }: IconProps) {
  return (
    <svg {...strokeProps(size, className)}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function IconCpu({ size = 18, className }: IconProps) {
  return (
    <svg {...strokeProps(size, className)}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

// ─── Features Grid (SEO Capabilities) ────────────────────────────────

function FeaturesGrid() {
  const { t } = useI18n();

  const features = [
    {
      Icon: IconZap,
      title: t.features.card1Title,
      description: t.features.card1Desc,
    },
    {
      Icon: IconSparkles,
      title: t.features.card2Title,
      description: t.features.card2Desc,
    },
    {
      Icon: IconChart,
      title: t.features.card3Title,
      description: t.features.card3Desc,
    },
    {
      Icon: IconShield,
      title: t.features.card4Title,
      description: t.features.card4Desc,
    },
    {
      Icon: IconTrendingUp,
      title: t.features.card5Title,
      description: t.features.card5Desc,
    },
    {
      Icon: IconCpu,
      title: t.features.card6Title,
      description: t.features.card6Desc,
    },
  ];

  return (
    <section id="features" className="itc-section" style={{ backgroundColor: "#faf8f5", padding: "72px 0" }}>
      <Container>
        <div style={{ textAlign: "center", maxWidth: 840, margin: "0 auto 48px" }}>
          <p className="itc-eyebrow" style={{ color: "#0C5C55", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {t.features.eyebrow}
          </p>
          <h2 className="itc-display-lg" style={{ marginTop: 8 }}>
            {t.features.title}
          </h2>
          <p className="itc-body-lg itc-muted" style={{ marginTop: 16 }}>
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white mb-4 shadow-sm"
                  style={{ backgroundColor: "#0C5C55" }}
                >
                  <feat.Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">{feat.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Pricing Section ─────────────────────────────────────────────────

function PricingSection() {
  const { t } = useI18n();

  return (
    <section id="pricing" className="itc-section" style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
      <Container>
        <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 52px" }}>
          <p className="itc-eyebrow" style={{ color: "#0C5C55", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {t.pricing.eyebrow}
          </p>
          <h2 className="itc-display-lg" style={{ marginTop: 8 }}>
            {t.pricing.title}
          </h2>
          <p className="itc-body-lg itc-muted" style={{ marginTop: 16 }}>
            {t.pricing.subtitle}
          </p>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {/* 1. Free Tier */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-neutral-900">{t.pricing.freeTier.name}</h3>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-neutral-900">{t.pricing.freeTier.price}</span>
                <span className="text-xs font-medium text-neutral-500">/ {t.pricing.freeTier.period}</span>
              </div>
              <p className="mt-3 text-xs text-neutral-600 leading-relaxed min-h-[36px]">{t.pricing.freeTier.description}</p>

              <div className="mt-6 border-t border-neutral-100 pt-5">
                <ul className="space-y-2.5">
                  {t.pricing.freeTier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-neutral-700">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                        <IconCheck size={11} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={SIGNUP_URL}
                className="w-full inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
              >
                {t.pricing.freeTier.cta}
              </a>
            </div>
          </div>

          {/* 2. Starter Tier ($39) */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-neutral-900">{t.pricing.starterTier.name}</h3>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-neutral-900">{t.pricing.starterTier.price}</span>
                <span className="text-xs font-medium text-neutral-500">/ {t.pricing.starterTier.period}</span>
              </div>
              <p className="mt-3 text-xs text-neutral-600 leading-relaxed min-h-[36px]">{t.pricing.starterTier.description}</p>

              <div className="mt-6 border-t border-neutral-100 pt-5">
                <ul className="space-y-2.5">
                  {t.pricing.starterTier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-neutral-700">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100/70 text-[#0C5C55]">
                        <IconCheck size={11} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={SIGNUP_URL}
                className="w-full inline-flex items-center justify-center rounded-xl border border-[#0C5C55]/30 bg-white px-4 py-2.5 text-xs font-semibold text-[#0C5C55] transition-colors hover:bg-emerald-50"
              >
                {t.pricing.starterTier.cta}
              </a>
            </div>
          </div>

          {/* 3. Growth Plan ($69) - POPULAR */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-[#0C5C55] bg-[#0C5C55]/[0.02] p-6 shadow-xl shadow-[#0C5C55]/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0C5C55] px-3.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm whitespace-nowrap">
              {t.pricing.popularBadge}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-neutral-900">{t.pricing.growthTier.name}</h3>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-[#0C5C55]">{t.pricing.growthTier.price}</span>
                <span className="text-xs font-medium text-neutral-500">/ {t.pricing.growthTier.period}</span>
              </div>
              <p className="mt-3 text-xs text-neutral-600 leading-relaxed min-h-[36px]">{t.pricing.growthTier.description}</p>

              <div className="mt-6 border-t border-neutral-200/60 pt-5">
                <ul className="space-y-2.5">
                  {t.pricing.growthTier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-neutral-800 font-medium">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0C5C55] text-white">
                        <IconCheck size={11} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={SIGNUP_URL}
                className="w-full inline-flex items-center justify-center rounded-xl bg-[#0C5C55] px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-colors hover:bg-[#094843]"
              >
                {t.pricing.growthTier.cta}
              </a>
            </div>
          </div>

          {/* 4. Scale / Agency ($99) */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-neutral-900">{t.pricing.scaleTier.name}</h3>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-neutral-900">{t.pricing.scaleTier.price}</span>
                <span className="text-xs font-medium text-neutral-500">/ {t.pricing.scaleTier.period}</span>
              </div>
              <p className="mt-3 text-xs text-neutral-600 leading-relaxed min-h-[36px]">{t.pricing.scaleTier.description}</p>

              <div className="mt-6 border-t border-neutral-100 pt-5">
                <ul className="space-y-2.5">
                  {t.pricing.scaleTier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-neutral-700">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                        <IconCheck size={11} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={SIGNUP_URL}
                className="w-full inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
              >
                {t.pricing.scaleTier.cta}
              </a>
            </div>
          </div>
        </div>

        {/* Top-Up note */}
        <p className="mt-6 text-center text-xs text-neutral-500">
          💡 {t.pricing.topUpNote}
        </p>

        {/* Comparison Callout */}
        <div className="mt-10 rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 sm:p-5 text-center max-w-4xl mx-auto">
          <p className="text-sm text-[#0C5C55] font-medium">
            <strong className="font-semibold">{t.pricing.comparisonTitle}</strong> {t.pricing.comparisonText}
          </p>
        </div>

        {/* FAQs Accordion */}
        <FaqAccordion faqs={t.pricing.faqs} title={t.pricing.faqTitle} />
      </Container>
    </section>
  );
}

function FaqAccordion({
  faqs,
  title,
}: {
  faqs: Array<{ q: string; a: string }>;
  title: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-16 max-w-3xl mx-auto">
      <h3 className="text-xl font-bold text-center text-neutral-900 mb-8">{title}</h3>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.q}
              className="rounded-2xl border border-neutral-200 bg-white transition-all overflow-hidden shadow-xs hover:border-[#0C5C55]/40"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-neutral-900 transition-colors hover:text-[#0C5C55] focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-base font-semibold text-neutral-900">{faq.q}</span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-[#0C5C55]/10 text-[#0C5C55]" : ""
                  }`}
                >
                  <IconChevronDown size={16} />
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-0 border-t border-neutral-100 text-sm text-neutral-600 leading-relaxed">
                  <p className="pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Blog Section ───────────────────────────────────────────────────

function BlogSection() {
  const { t } = useI18n();

  return (
    <section className="itc-section" style={{ backgroundColor: "#ffffff" }}>
      <Container>
        <div className="itc-section-header">
          <p className="itc-eyebrow" style={{ color: "#0C5C55" }}>
            {t.blog.eyebrow}
          </p>
          <h2 className="itc-display-lg">{t.blog.title}</h2>
          <p className="itc-subhead itc-muted" style={{ maxWidth: 640, margin: "16px auto 0" }}>
            {t.blog.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.blog.featured.map((post) => (
            <a
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 transition-all hover:bg-white hover:border-[#0C5C55]/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center rounded-md bg-[#0C5C55]/10 px-2 py-0.5 text-xs font-semibold text-[#0C5C55]">
                    {post.category}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#0C5C55] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed line-clamp-3">
                  {post.desc}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#0C5C55] group-hover:gap-2 transition-all">
                <span>{t.blog.readMore}</span>
                <IconArrowRight size={14} />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-50 hover:border-[#0C5C55]/50 shadow-xs"
          >
            <span>{t.blog.viewAll}</span>
            <IconArrowRight size={14} />
          </a>
        </div>
      </Container>
    </section>
  );
}

// ─── MCP Section ─────────────────────────────────────────────────────

type McpClient = {
  name: string;
  Icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
};

const MCP_CLIENTS: McpClient[] = [
  { name: "Claude", Icon: ClaudeIcon },
  { name: "Codex", Icon: CodexIcon },
  { name: "Gemini", Icon: GeminiIcon },
  { name: "OpenCode", Icon: OpenCodeIcon },
];

function McpSection() {
  const { t, lang } = useI18n();

  return (
    <section className="itc-mcp-section" style={{ backgroundColor: "#faf8f5" }}>
      <Container>
        <div className="itc-mcp-grid">
          <div>
            <p className="itc-eyebrow" style={{ color: "#0C5C55" }}>
              {t.mcp.eyebrow}
            </p>
            <h2 className="itc-display-lg">{t.mcp.title}</h2>
            <p className="itc-body-lg itc-muted" style={{ margin: "20px 0 0" }}>
              {t.mcp.desc}
            </p>
            <div className="itc-agent-icons" style={{ marginTop: 24 }}>
              {MCP_CLIENTS.map(({ name, Icon }) => (
                <span key={name} className="itc-agent-icon" title={name} style={{ borderColor: "#0C5C5530" }}>
                  <Icon aria-hidden="true" />
                  <span
                    style={{
                      clip: "rect(0 0 0 0)",
                      clipPath: "inset(50%)",
                      height: 1,
                      overflow: "hidden",
                      position: "absolute",
                      whiteSpace: "nowrap",
                      width: 1,
                    }}
                  >
                    {name}
                  </span>
                </span>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <a
                href={SIGNUP_URL}
                className="itc-btn"
                style={{ backgroundColor: "#0C5C55", color: "#fff", borderColor: "#0C5C55" }}
              >
                {t.mcp.cta}
                <IconArrowRight size={16} className="itc-arrow" />
              </a>
            </div>
          </div>

          <div className="itc-terminal" style={{ backgroundColor: "#0E1A18", borderColor: "#0C5C5540" }}>
            <div className="itc-terminal-bar" style={{ borderBottomColor: "#1e3330" }}>
              <span style={{ display: "flex", gap: 6 }} aria-hidden="true">
                <span className="itc-terminal-dot" style={{ backgroundColor: "#0C5C55" }} />
                <span className="itc-terminal-dot" style={{ backgroundColor: "#0D9488" }} />
                <span className="itc-terminal-dot" style={{ backgroundColor: "#14B8A6" }} />
              </span>
              <span className="itc-terminal-label" style={{ color: "#87A9A4" }}>claude · findable mcp</span>
            </div>
            <pre>
              <code>
                <span style={{ color: "#14B8A6" }}>›</span> {t.mcp.terminalCmd}{" "}
                <span style={{ color: "#ffffff" }}>findableweb.io</span>
                {"\n\n"}
                <span style={{ color: "#87A9A4" }}>
                  ⏺ findable.keyword_research(seed: &quot;{lang === "es" ? "posicionamiento seo" : "seo visibility"}&quot;)
                </span>
                {"\n"}
                {"  "}{t.mcp.terminalKeywordLabel}{"                 "}{t.mcp.terminalVolLabel}{"    "}{t.mcp.terminalKdLabel}{"\n"}
                {"  "}{lang === "es" ? "posicionamiento seo web      " : "seo visibility platform      "}
                <span style={{ color: "#ffffff" }}>1,300</span>
                {"      "}
                <span style={{ color: "#87A9A4" }}>12</span>
                {"\n"}
                {"  "}{lang === "es" ? "google search console mcp    " : "google search console mcp    "}
                <span style={{ color: "#ffffff" }}>720</span>
                {"        "}
                <span style={{ color: "#87A9A4" }}>9</span>
                {"\n"}
                {"  "}{lang === "es" ? "plataforma seo inteligencia ia" : "ai search intelligence       "}
                <span style={{ color: "#ffffff" }}>450</span>
                {"        "}
                <span style={{ color: "#87A9A4" }}>5</span>
                {"\n\n"}
                <span style={{ color: "#14B8A6" }}>✓</span>
                <span style={{ color: "#87A9A4" }}>
                  {" "}
                  {t.mcp.terminalSaved}
                </span>
                {"\n"}
                <span style={{ color: "#14B8A6" }}>↳</span>
                <span style={{ color: "#87A9A4" }}> {t.mcp.terminalView} </span>
                <span style={{ color: "#ffffff" }}>app.findableweb.io</span>
              </code>
            </pre>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ClaudeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 257" {...props}>
      <path
        fill="#D97757"
        d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"
      />
    </svg>
  );
}

function CodexIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="#111" fillRule="evenodd" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        clipRule="evenodd"
        d="M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z"
      />
    </svg>
  );
}

function OpenCodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="512" height="512" fill="#FDFCFC" />
      <path d="M320 224V352H192V224H320Z" fill="#E6E5E6" />
      <path
        fill="#17181C"
        fillRule="evenodd"
        d="M384 416H128V96H384V416ZM320 160H192V352H320V160Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function GeminiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 296 298" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <mask id="gemini-a" width="296" height="298" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
        <path
          fill="#3186FF"
          d="M141.201 4.886c2.282-6.17 11.042-6.071 13.184.148l5.985 17.37a184.004 184.004 0 0 0 111.257 113.049l19.304 6.997c6.143 2.227 6.156 10.91.02 13.155l-19.35 7.082a184.001 184.001 0 0 0-109.495 109.385l-7.573 20.629c-2.241 6.105-10.869 6.121-13.133.025l-7.908-21.296a184 184 0 0 0-109.02-108.658l-19.698-7.239c-6.102-2.243-6.118-10.867-.025-13.132l20.083-7.467A183.998 183.998 0 0 0 133.291 26.28l7.91-21.394Z"
        />
      </mask>
      <g mask="url(#gemini-a)">
        <ellipse cx="163" cy="149" fill="#0C5C55" rx="196" ry="159" />
        <ellipse cx="33.5" cy="142.5" fill="#0D9488" rx="68.5" ry="72.5" />
      </g>
    </svg>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────

function Footer() {
  const { t } = useI18n();

  return (
    <footer className="itc-footer">
      <Container>
        <div className="itc-sitefooter" style={{ paddingTop: 32 }}>
          <SiteFooter />
        </div>

        <p
          className="itc-caption itc-subtle"
          style={{ margin: 0, padding: "24px 0 32px", textAlign: "center" }}
        >
          {t.footer.copyright}
        </p>
      </Container>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────

export function LandingPage() {
  return (
    <div className="itc">
      <Hero />
      <DashboardPreview />
      <FeaturesGrid />
      <PricingSection />
      <BlogSection />
      <McpSection />
      <Footer />
    </div>
  );
}
