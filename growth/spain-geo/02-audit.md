# SEO and AI-search audit of findableweb.io

Scope: the `web/` marketing site as of branch start. Status column shows what this branch already fixed.

## Findings, ranked

| # | Finding | Impact | Status |
|---|---|---|---|
| 1 | **Marketing claimed monitoring of ChatGPT, Perplexity, Claude and Gemini.** The product's Brand Lookup queries ChatGPT and Google AI Overviews only (`brandLookup.ts`, `PLATFORMS`). AI engines that read the site will repeat the overclaim, and visitors will find the gap | High (trust, and a likely source of wrong AI answers about Findable) | Fixed in homepage strings, schema, `llms.txt`. Still to sweep: README, fact sheet, blog posts, in-app copy |
| 2 | **No Spanish URL.** Language lived in `localStorage`; every crawler saw one language per URL with English metadata over Spanish text | High | Fixed: `/es` + hreflang |
| 3 | **Brand Lookup is hardcoded to US/English** and requires a paid plan, yet pages implied country coverage and free access | High for the Spain thesis | Copy corrected. Product change needed (see README) |
| 4 | **Domain mismatch.** `robots.txt`, `llms.txt` and the fact sheet use `findable.io`; canonical, sitemap and OG use `findableweb.io` | Medium (sitemap pointed at a host the site does not serve) | `robots.txt`, `llms.txt` fixed. `findable-fact-sheet.md` and in-app support copy still say `findable.io` |
| 5 | **Pricing inconsistency.** Pricing page and `billing.ts`: Starter 39 USD. Older Polish blog posts say "Free Forever" and "from 39 USD" in the same table; the `openseo-review-web-content` skill says 10 USD/month | Medium (AI answers quote whichever they find) | Home strings fixed ("100 credits per month" instead of "free forever"). Update the skill and old posts |
| 6 | **Blog index description was in Polish** for an English page; no `Article` markup anywhere | Medium | Fixed |
| 7 | **No Spanish content** despite a Spanish UI | High | 5 guides shipped |
| 8 | `lastmod` in the sitemap comes from file mtime (resets on every checkout) | Low | Open: use frontmatter `date` |
| 9 | Feature, pricing and library pages are English-only; no `/es/...` equivalents | Medium | Open: translate pricing and AI-visibility first |
| 10 | Thin social proof: no customer logos, case studies or reviews in structured data. AI engines weight third-party validation | Medium | Open: needs real customers; do not fabricate |
| 11 | Robots rules already allow GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended | Good | Keep |
| 12 | Hero ES copy had no market signal (Spain, pricing in credits) | Low | Fixed |

## AI-search readiness checklist for the site

- [x] AI crawlers allowed
- [x] `llms.txt` present and accurate
- [x] `FAQPage`, `SoftwareApplication`, `Organization` on `/es`; `Article` on posts
- [x] Answer-first openings in the new guides
- [ ] Case studies with named customers
- [ ] Wikipedia/Wikidata-grade entity: Crunchbase, G2, Capterra, Product Hunt listing consistent with site copy
- [ ] Spanish pricing and AI-visibility feature pages
- [ ] Author bylines with real people (currently "Findable Team")

## Suggested follow-ups

1. Sweep remaining overclaims (README, fact sheet, Polish posts, in-app i18n).
2. Replace sitemap `lastmod` with frontmatter dates.
3. Add `/es/precios` and `/es/funciones/visibilidad-en-ia`.
4. Brand Lookup location/language selector (Spain 2724 / `es`).
