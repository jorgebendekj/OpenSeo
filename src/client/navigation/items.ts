import {
  Bookmark,
  Bot,
  ClipboardCheck,
  FileText,
  Globe,
  LayoutDashboard,
  Link2,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { linkOptions } from "@tanstack/react-router";
import { GoogleGlyphMuted } from "@/client/features/gsc/GoogleGlyph";

const projectNavItems = [
  {
    to: "/p/$projectId" as const,
    label: "Dashboard",
    icon: LayoutDashboard,
    // Without exact matching, the index path is a prefix of every project
    // route and the Dashboard item would render active everywhere.
    activeOptions: { exact: true, includeSearch: false },
  },
  {
    to: "/p/$projectId/articles" as const,
    label: "AI Articles",
    icon: FileText,
  },
  {
    to: "/p/$projectId/keywords" as const,
    label: "Keyword Research",
    icon: Search,
  },
  {
    to: "/p/$projectId/saved" as const,
    label: "Saved Keywords",
    icon: Bookmark,
  },
  {
    to: "/p/$projectId/rank-tracking" as const,
    label: "Rank Tracking",
    icon: TrendingUp,
  },
  {
    to: "/p/$projectId/search-performance" as const,
    label: "GSC Insights",
    icon: GoogleGlyphMuted,
  },
  {
    to: "/p/$projectId/domain" as const,
    label: "Domain Overview",
    icon: Globe,
  },
  {
    to: "/p/$projectId/backlinks" as const,
    label: "Backlinks",
    icon: Link2,
  },
  {
    to: "/p/$projectId/audit" as const,
    label: "Site Audit",
    icon: ClipboardCheck,
  },
  {
    to: "/p/$projectId/brand-lookup" as const,
    label: "Brand Lookup",
    icon: Sparkles,
  },
  {
    to: "/p/$projectId/prompt-explorer" as const,
    label: "Prompt Explorer",
    icon: MessageSquare,
  },
] as const;

export const NAV_KEYS = {
  "/p/$projectId": "nav.dashboard",
  "/p/$projectId/articles": "nav.aiArticles",
  "/p/$projectId/keywords": "nav.keywordResearch",
  "/p/$projectId/saved": "nav.savedKeywords",
  "/p/$projectId/rank-tracking": "nav.rankTracking",
  "/p/$projectId/search-performance": "nav.gscInsights",
  "/p/$projectId/domain": "nav.domainOverview",
  "/p/$projectId/backlinks": "nav.backlinks",
  "/p/$projectId/audit": "nav.siteAudit",
  "/p/$projectId/brand-lookup": "nav.brandLookup",
  "/p/$projectId/prompt-explorer": "nav.promptExplorer",
  "/ai": "nav.aiAndMcp",
} as const;

export const aiNavItem = linkOptions({
  to: "/ai" as const,
  label: "AI & MCP",
  icon: Bot,
});

// Always-visible sidebar group (not project-scoped, unlike the groups below).
export const connectNavGroup = {
  label: "Connect",
  items: [aiNavItem],
};

export function getConnectNavGroup(t?: (key: string) => string) {
  const translate = (key: string, fallback: string) => (t ? t(key) || fallback : fallback);
  return {
    label: translate("nav.connect", "Connect"),
    items: [
      {
        ...aiNavItem,
        label: translate("nav.aiAndMcp", "AI & MCP"),
      },
    ],
  };
}

function getProjectNavItems(projectId: string) {
  return linkOptions(
    projectNavItems.map((item) => ({
      ...item,
      params: { projectId },
      search: {},
    })),
  );
}

// Grouped by scope: "My Site" is the project's own domain (tracked data),
// "Research" is point-at-anything lookup tools.
export function getProjectNavGroups(projectId: string, t?: (key: string) => string) {
  const all = getProjectNavItems(projectId);
  const translate = (key: string, fallback: string) => (t ? t(key) || fallback : fallback);
  const byPath = (path: (typeof projectNavItems)[number]["to"]) => {
    const item = all.find((i) => i.to === path)!;
    const key = NAV_KEYS[path as keyof typeof NAV_KEYS];
    return {
      ...item,
      label: key ? translate(key, item.label) : item.label,
    };
  };

  return [
    {
      label: translate("nav.overview", "Overview"),
      items: [byPath("/p/$projectId")],
    },
    {
      label: translate("nav.contentAndGrowth", "Content & Growth"),
      items: [
        byPath("/p/$projectId/articles"),
        byPath("/p/$projectId/search-performance"),
        byPath("/p/$projectId/rank-tracking"),
      ],
    },
    {
      label: translate("nav.research", "Research"),
      items: [
        byPath("/p/$projectId/keywords"),
        byPath("/p/$projectId/domain"),
        byPath("/p/$projectId/backlinks"),
        byPath("/p/$projectId/brand-lookup"),
        byPath("/p/$projectId/prompt-explorer"),
      ],
    },
    {
      label: translate("nav.siteAssets", "Site Assets"),
      items: [
        byPath("/p/$projectId/saved"),
        byPath("/p/$projectId/audit"),
      ],
    },
  ];
}

export const dataforseoHelpLinkOptions = linkOptions({
  to: "/help/dataforseo-api-key",
});
