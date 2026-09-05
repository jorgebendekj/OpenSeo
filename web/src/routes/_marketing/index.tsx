import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";
import { buildPageSeo } from "@/lib/seo";

const homeTitle = "Findable - AI-Powered SEO Engine & 1-Click Article Generator";
const homeDescription =
  "Findable is the AI-powered SEO and search intelligence platform. Generate ranking articles in 1-click, track Google keyword rankings, monitor AI visibility across ChatGPT & Perplexity, run automated site audits, and sync Google Search Console & GA4.";

const schemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://findableweb.io/#software",
      "name": "Findable",
      "applicationCategory": "BusinessApplication, SEOApplication",
      "operatingSystem": "Web, Cloud",
      "url": "https://findableweb.io",
      "description": homeDescription,
      "featureList": [
        "1-Click AI Article Generator with FAQ Schema JSON-LD and SERP synthesis",
        "AI Search Visibility (GEO) monitoring in ChatGPT, Perplexity, Claude, and Gemini",
        "Real-Time Google Rank Tracking in 190+ countries and local cities",
        "Automated Technical Site Audits and 404 crawler",
        "Google Search Console & Google Analytics 4 native synchronization",
        "Model Context Protocol (MCP) Server for Claude Code, Cursor, Codex, and OpenCode"
      ],
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "0",
        "highPrice": "99",
        "offerCount": "4",
        "offers": [
          {
            "@type": "Offer",
            "name": "Free Plan",
            "price": "0",
            "priceCurrency": "USD",
            "description": "1 website, 100 monthly free credits, Google Search Console & GA4 sync, MCP server access."
          },
          {
            "@type": "Offer",
            "name": "Starter Plan",
            "price": "39",
            "priceCurrency": "USD",
            "billingDuration": "P1M",
            "description": "3 websites, 10,000 monthly usage credits, 10 1-Click AI articles/month, rank tracking, technical audits."
          },
          {
            "@type": "Offer",
            "name": "Growth Plan (Autopilot)",
            "price": "69",
            "priceCurrency": "USD",
            "billingDuration": "P1M",
            "description": "6 websites, 35,000 monthly usage credits, 30 1-Click AI articles/month (1 daily), ChatGPT & Perplexity AI monitoring, weekly audits."
          },
          {
            "@type": "Offer",
            "name": "Scale / Agency Plan",
            "price": "99",
            "priceCurrency": "USD",
            "billingDuration": "P1M",
            "description": "10 websites, 100,000 monthly usage credits, 90 1-Click AI articles/month, multi-domain brand monitoring, white-label client PDF reports."
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://findableweb.io/#website",
      "name": "Findable",
      "url": "https://findableweb.io",
      "inLanguage": ["es", "en"],
      "publisher": {
        "@type": "Organization",
        "name": "Findable",
        "url": "https://findableweb.io",
        "logo": "https://findableweb.io/logo.svg"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://findableweb.io/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Findable's 1-Click AI Article Generator work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Findable analyzes target keywords, search volume, intent, and top ranking competitor SERPs to generate complete 1,500–2,500 word articles structured with H2/H3 headings, JSON-LD FAQ Schema, and internal linking suggestions ready to rank."
          }
        },
        {
          "@type": "Question",
          "name": "What is AI Search Visibility and Generative Engine Optimization (GEO)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GEO measures and optimizes how often and in what context your brand is cited and recommended in AI answer engines like ChatGPT, Perplexity, Claude, and Gemini compared to competitors."
          }
        },
        {
          "@type": "Question",
          "name": "Can I connect Google Search Console and GA4 for free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Google Search Console and Google Analytics 4 integration is available on all tiers including the Free Plan, surfacing striking-distance queries (positions 4–20), clicks, impressions, and CTR."
          }
        },
        {
          "@type": "Question",
          "name": "How does the Findable MCP Server work with AI coding agents?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Findable provides a built-in Model Context Protocol (MCP) server that connects directly to Claude Code, Cursor, Codex, and OpenCode, allowing you to run keyword research, rank checks, and site audits in natural language."
          }
        }
      ]
    }
  ]
});

export const Route = createFileRoute("/_marketing/")({
  head: () => {
    const seo = buildPageSeo({
      title: homeTitle,
      description: homeDescription,
      path: "/",
      imageAlt: "Findable AI-powered SEO and search visibility dashboard",
    });

    return {
      ...seo,
      meta: [
        ...(seo.meta ?? []),
        {
          name: "keywords",
          content:
            "1-click ai article generator, seo automation, generative engine optimization, geo search, google rank tracker, technical seo audit, google search console mcp, ai search visibility, chatgpt brand monitoring, perplexity seo, posicionamiento seo, herramientas seo ia, rank tracking, backlinks",
        },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        {
          name: "author",
          content: "Findable",
        },
      ],
      links: [
        ...(seo.links ?? []),
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: schemaJson,
        },
      ],
    };
  },
  component: LandingPage,
});
