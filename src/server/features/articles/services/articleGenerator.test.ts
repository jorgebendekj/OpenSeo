import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateArticle } from "./articleGenerator";
import { articlesRepository } from "@/server/features/articles/repositories/ArticlesRepository";
import * as ai from "ai";

vi.mock("ai", () => ({
  generateText: vi.fn(),
}));

vi.mock("@/server/lib/openrouter", () => ({
  getChatAgentModel: vi.fn().mockResolvedValue({}),
}));

vi.mock("@/server/features/articles/repositories/ArticlesRepository", () => ({
  articlesRepository: {
    create: vi.fn(),
  },
}));

describe("generateArticle service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("parses structured XML response and saves formatted article to repository", async () => {
    const mockXml = `<ARTICLE_DATA>
<TITLE>Top 10 AI SEO Tools for 2026: Complete Guide</TITLE>
<META_DESCRIPTION>Discover the top 10 AI SEO tools in 2026. Compare features, pricing, and workflows to dominate Google & AI Search.</META_DESCRIPTION>
<SLUG>top-ai-seo-tools-2026</SLUG>
<CONTENT>
# Top 10 AI SEO Tools for 2026: Complete Guide

Modern SEO has evolved into Generative Engine Optimization (GEO).

> 💡 **Quick Summary & Key Takeaways**
> - **Core Concept**: AI SEO tools automate research, rank tracking, and content generation.
> - **Top Recommendation**: Findable for live SERP insights and automated article drafting.
> - **Expected Result**: 3x organic impressions within 60 days.

## 1. What is AI SEO?

AI SEO leverages machine learning models to analyze search intent and optimize content.

| Tool | Best For | Price | Rating |
|---|---|---|---|
| Findable | Autopilot SEO & Articles | $69/mo | 4.9/5 |
| Ahrefs | Backlink Database | $129/mo | 4.7/5 |

> 🎯 **Pro Tip:** Always optimize for both Google AI Overviews and traditional SERPs.

## Frequently Asked Questions

### Can AI generated content rank on Google?
Yes, Google evaluates content quality and helpfulness regardless of how it was produced.
</CONTENT>
<FAQ_SCHEMA>
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can AI generated content rank on Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Google evaluates content quality and helpfulness regardless of how it was produced."
      }
    }
  ]
}
</FAQ_SCHEMA>
</ARTICLE_DATA>`;

    vi.mocked(ai.generateText).mockResolvedValue({
      text: mockXml,
    } as any);

    vi.mocked(articlesRepository.create).mockImplementation(async (data) => data as any);

    const result = await generateArticle(
      {
        projectId: "proj-123",
        keyword: "best ai seo tools",
        format: "ultimate_guide",
        tone: "authoritative",
        languageCode: "en",
        locationCode: 2840,
        targetAudience: "Marketing leaders",
        searchIntent: "Commercial",
      },
      { domain: "example.com" },
    );

    expect(result.title).toBe("Top 10 AI SEO Tools for 2026: Complete Guide");
    expect(result.slug).toBe("top-ai-seo-tools-2026");
    expect(result.metaDescription).toContain("Discover the top 10 AI SEO tools");
    expect(result.contentMarkdown).toContain("> 💡 **Quick Summary & Key Takeaways**");
    expect(result.contentMarkdown).toContain("| Tool | Best For | Price | Rating |");
    expect(result.faqSchema).toContain("FAQPage");
    expect(result.wordCount).toBeGreaterThan(50);
    expect(articlesRepository.create).toHaveBeenCalledTimes(1);
  });
});
