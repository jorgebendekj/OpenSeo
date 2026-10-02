# Spain GEO growth project

Goal: make Findable the answer when people in Spain ask ChatGPT, Google AI Overviews and Google itself how to see whether AI search recommends their business.

Decision: **Spain, in Spanish (es-ES), first.** Poland stays as the second market. Keyword data (01) shows Spain beating each Latin American country by 2-5x, so Latin America gets no separate effort yet.

| File | What it holds |
|---|---|
| [01-market-decision.md](01-market-decision.md) | Why Spain, what was compared, what is still unverified |
| [02-audit.md](02-audit.md) | SEO and AI-search audit of findableweb.io, ranked by impact |
| [03-keywords-and-content.md](03-keywords-and-content.md) | Seed keywords to validate, content map, publishing order |
| [04-geo-playbook.md](04-geo-playbook.md) | Off-site citation work, measurement routine, 90-day plan |

## Shipped in this branch

- `/es`: Spanish homepage with its own title, description, hreflang pair with `/`, `og:locale`, Spanish `FAQPage` markup that matches the visible FAQ.
- URL-driven language (`/` English, `/es` Spanish), `<html lang>` follows the URL, prerendered.
- Eight Spanish guides under `/blogs` (`lang: "es"` frontmatter), blog index grouped by language, `Article` JSON-LD on every post.
- Homepage claims corrected to what the product does (see audit, finding 1).
- `robots.txt` and `llms.txt` point at the real domain; `llms.txt` has a Spain section; `/es` is in the sitemap.

- Brand Lookup country selector (`loc` URL param, searchable country list). Spain works for Google AI Overviews; ChatGPT stays US/English and is excluded from totals for non-US lookups.
- Findable project **Findable España (GEO)** created in the app: 19 saved keywords with metrics, project context and competitors, and a manual rank tracker with 11 keywords (no credits spent). https://app.findableweb.io/p/f63e7ab8-ee90-47c9-bb2b-ea95618bad2d

## Decisions that need the owner

1. **Confirm Spain over Poland.** If the team is Polish-based and sells to Polish agencies today, Poland may convert faster even though the AI-visibility niche there is more crowded. The numbers behind the call are in 01.
2. **Confirm team context.** Other projects in the account are Bolivian and Polish; see 01 for why that matters.
3. **Approve the offsite budget** in 04 (directories, one PR/data study, 2 partner placements).
