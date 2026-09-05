import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { SIGNIN_URL } from "@/lib/app-urls";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <span className="font-semibold">Findable</span>,
    },
    searchToggle: {
      enabled: false,
    },
    links: [
      {
        text: "Resources",
        url: "/blogs",
        items: [
          {
            text: "Blog",
            description: "SEO articles and guides.",
            url: "/blogs",
          },
          {
            text: "MCP",
            description: "Connect Findable to AI clients.",
            url: "/docs/mcp",
          },
          {
            text: "Skills",
            description: "Focused Findable workflows.",
            url: "/docs/skills",
          },
        ],
      },
      {
        text: "Pricing",
        url: "/pricing",
      },
      {
        text: "Sign In",
        url: SIGNIN_URL,
        external: true,
      },
    ],
  };
}
