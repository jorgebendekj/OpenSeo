import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { SiteFooter } from "@/components/site-footer";
import { FindableMark } from "@/components/findable-mark";
import { featureGroups } from "@/lib/feature-pages";
import { SIGNIN_URL, SIGNUP_URL } from "@/lib/app-urls";
import { LanguageSelector, useI18n } from "@/lib/i18n";

const GITHUB_REPO = "every-app/open-seo";
// Used if GitHub is unreachable at build time so the header never renders empty.
const FALLBACK_STAR_COUNT = "2.1k";

// Round to the nearest hundred and render in thousands, e.g. 3140 -> "3.1k".
function formatStarCount(count: number): string {
  if (count < 1000) return String(count);
  return `${(Math.round(count / 100) / 10).toString()}k`;
}

async function fetchGithubStarCount(): Promise<string> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: {
        Accept: "application/vnd.github+json",
        // GitHub rejects requests without a User-Agent.
        "User-Agent": "findable-landing",
      },
    });
    if (!res.ok) return FALLBACK_STAR_COUNT;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number"
      ? formatStarCount(data.stargazers_count)
      : FALLBACK_STAR_COUNT;
  } catch {
    return FALLBACK_STAR_COUNT;
  }
}

// Memoized for the duration of a build so prerendering every marketing page
// only hits GitHub once instead of once per page.
let starCountPromise: Promise<string> | null = null;
function loadGithubStarCount(): Promise<string> {
  starCountPromise ??= fetchGithubStarCount();
  return starCountPromise;
}

function getMobileNavItems() {
  return [
    {
      label: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      label: "Resources",
      links: [
        { label: "MCP Setup", href: "/docs/mcp" },
        { label: "Skills", href: "/docs/skills" },
        { label: "Strategy Library", href: "/library" },
        { label: "Blog", href: "/blogs" },
        { label: "Docs", href: "/docs" },
      ],
    },
  ];
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function MenuIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export const Route = createFileRoute("/_marketing")({
  // Runs at prerender/SSR time, so the count is baked into the static HTML that
  // Cloudflare serves from the edge — no per-viewer request for it.
  loader: async () => ({ githubStarCount: await loadGithubStarCount() }),
  // The value is fixed per build; never refetch it on client navigation.
  staleTime: Infinity,
  component: MarketingLayout,
});

function MarketingLayout() {
  const { t } = useI18n();
  const { githubStarCount } = Route.useLoaderData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const mobileNavItems = getMobileNavItems();
  // The home route owns the full viewport width (and its own footer/CTA band);
  // every other marketing page gets the shared marketing canvas and footer.
  const isHome = pathname === "/";

  // On the landing route, paint html/body cream so the area behind the
  // floating nav and any overscroll matches the landing canvas.
  useEffect(() => {
    if (!isHome) return;
    const root = document.documentElement;
    const prevRoot = root.style.backgroundColor;
    const prevBody = document.body.style.backgroundColor;
    root.style.backgroundColor = "#f5f1ec";
    document.body.style.backgroundColor = "#f5f1ec";
    return () => {
      root.style.backgroundColor = prevRoot;
      document.body.style.backgroundColor = prevBody;
    };
  }, [isHome]);

  return (
    <main className="fd-light min-h-screen bg-[var(--color-surface)] text-[var(--color-brand)]">
      <div className="relative z-50 mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 md:pt-8">
        <div className="relative mx-auto max-w-5xl">
          <nav className="flex min-h-14 items-center justify-between gap-3 rounded-full border border-[var(--color-border-subtle)] bg-white/90 px-4 py-2.5 shadow-sm shadow-neutral-900/5 backdrop-blur md:px-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
            >
              <FindableMark size={22} className="text-[#0C5C55]" />
              <span className="text-base font-bold tracking-tight text-neutral-900">Findable</span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/blogs"
                className="hidden sm:inline-flex items-center text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors px-2 py-1"
              >
                {t.nav.blogs}
              </a>
              <LanguageSelector />
              <a
                href={SIGNIN_URL}
                className="h-9 inline-flex items-center rounded-full border border-[var(--color-border-subtle)] px-3 sm:px-4 text-xs sm:text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900"
              >
                {t.nav.signIn}
              </a>
              <a
                href={SIGNUP_URL}
                className="h-9 inline-flex items-center rounded-full bg-[#0C5C55] px-3 sm:px-4 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-[#094843]"
              >
                {t.nav.getStarted}
              </a>
            </div>
          </nav>

        </div>
      </div>

      {isHome ? (
        <Outlet />
      ) : (
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <Outlet />
          <MarketingFooter />
        </div>
      )}
    </main>
  );
}

function ResourcesDropdown() {
  const resources = [
    {
      label: "MCP",
      href: "/docs/mcp",
      description: "Connect Findable to AI clients.",
    },
    {
      label: "Skills",
      href: "/docs/skills",
      description: "Focused Findable workflows.",
    },
    {
      label: "Strategy Library",
      href: "/library",
      description: "Practical SEO strategies grouped by topic.",
    },
    {
      label: "Blog",
      href: "/blogs",
      description: "SEO articles and guides.",
    },
    {
      label: "Docs",
      href: "/docs",
      description: "Setup, MCP, skills, and self-hosting guides.",
    },
  ];

  return (
    <div className="group relative">
      <a
        href="/blogs"
        className="text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-900 md:hidden"
      >
        Resources
      </a>
      <button
        type="button"
        className="hidden h-10 items-center text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-900 md:inline-flex"
      >
        Resources
      </button>
      <div className="pointer-events-none absolute left-1/2 top-[calc(100%-2px)] z-20 hidden w-[280px] -translate-x-1/2 pt-2 opacity-0 transition md:block group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <div className="rounded-lg border border-[var(--color-border-subtle)] bg-white p-3 shadow-xl shadow-neutral-900/10">
          {resources.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              className="block rounded-md px-3 py-2.5 transition-colors hover:bg-[#f5f1ec]"
            >
              <span className="block text-sm font-semibold text-neutral-900">
                {resource.label}
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-neutral-600">
                {resource.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureDropdown() {
  return (
    <div className="group relative">
      <Link
        to="/features"
        className="text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-900 md:hidden"
      >
        Features
      </Link>
      <button
        type="button"
        className="hidden h-10 items-center text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-900 md:inline-flex"
      >
        Features
      </button>
      <div className="pointer-events-none absolute left-1/2 top-[calc(100%-2px)] z-20 hidden w-[560px] -translate-x-1/2 pt-2 opacity-0 transition md:block group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <div className="rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 shadow-xl shadow-neutral-900/10">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {featureGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  {group.label}
                </p>
                <div className="mt-3 space-y-1">
                  {group.pages.map((page) => (
                    <a
                      key={page.slug}
                      href={`/features/${page.slug}`}
                      className="block rounded-md px-2 py-1.5 transition-colors hover:bg-[#f5f1ec]"
                    >
                      <span className="block text-sm font-semibold text-neutral-900">
                        {page.eyebrow}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-neutral-600">
                        {page.navDescription}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                AI agents
              </p>
              <div className="mt-3 space-y-2">
                <a
                  href="/features/mcp"
                  className="block rounded-md p-2 transition-colors hover:bg-[#f5f1ec]"
                >
                  <span className="text-sm font-semibold text-neutral-900">
                    Findable MCP
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-neutral-600">
                    Connect Claude, Codex, and agents.
                  </span>
                </a>
                <a
                  href="/google-search-console-mcp"
                  className="block rounded-md p-2 transition-colors hover:bg-[#f5f1ec]"
                >
                  <span className="text-sm font-semibold text-neutral-900">
                    Search Console MCP
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-neutral-600">
                    Search Console data for agents.
                  </span>
                </a>
                <a
                  href="/features"
                  className="block rounded-md border border-[var(--color-border-subtle)] bg-[#f5f1ec] px-2 py-1.5 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900"
                >
                  View all features <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketingFooter() {
  return (
    <>
      {/* Newsletter */}
      <div className="mt-16 border-t border-[var(--color-border-subtle)] pt-8">
        <p className="text-sm font-semibold text-neutral-900">
          Stay in the loop
        </p>
        <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
          Product updates, new features, and the occasional behind-the-scenes.
        </p>
        <div className="mt-3">
          <NewsletterSignup />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8">
        <SiteFooter className="text-xs text-neutral-600 [&_a]:transition-colors [&_a]:hover:text-neutral-900" />
      </div>
    </>
  );
}
