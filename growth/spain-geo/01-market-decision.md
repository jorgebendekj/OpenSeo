# Market decision: Spain first

Date: 2026-10-02. Sources are linked; figures from different studies use different methods, so read them as orders of magnitude.

## Candidates

The site already ships English, Spanish and Polish UI strings and 20 Polish articles, so the realistic shortlist is Spain, Poland and the US/UK English market.

| | Spain (es-ES) | Poland (pl-PL) | US/UK (en) |
|---|---|---|---|
| AI-search adoption | One of Europe's highest. [SE Ranking](https://seranking.com/es/blog/trafico-ia-espana/) reports ChatGPT at about 70% of AI traffic; [IT Reseller](https://www.itreseller.es/al-dia/2026/02/el-61-de-los-ciudadanos-espanoles-utiliza-ia-generativa) puts generative-AI use above 60% of citizens | Rising but behind: [Gemius](https://gemius.com/blog/how-do-polish-internet-users-use-chatgpt-the-results-of-the-report-are-now-available/) counted 9.3M ChatGPT users in June 2025 (about a third of internet users) | Highest, saturated |
| Local AI-visibility competition | Mixed: HubSpot AEO Grader (free), Otterly, Semrush, SE Ranking, GEO Metrics (Spanish), LLMPulse. No pay-per-use tool that bundles SEO + GEO + MCP | Heavy and local: Senuto (native Polish, AI module), AiVisible, several agency tools ([overview](https://harbingers.io/blog/narzedzia-do-mierzenia-widocznosci-w-llm-ktore-wybrac-w-2026-roku)) | Extreme: Profound, Otterly, Semrush, Ahrefs, dozens of startups |
| Language reach | ~48M in Spain, 480M+ Spanish speakers worldwide for later expansion | ~38M, no spillover | Global, no moat |
| Existing Findable content | UI in Spanish, 0 Spanish articles before this branch | 20 articles, Polish UI | 5 English articles |
| Product fit today | Spanish keyword research, rank tracking and Search Console work with Spain data. Brand Lookup is US/English only | Same | Full fit |

## Evidence from Findable keyword data (2026-10-02)

Monthly Google searches, pulled with Findable's own keyword tools.

| Term | Spain | Poland | Mexico | Colombia | Argentina |
|---|---|---|---|---|---|
| geo seo | 590 | 390 | 140 | 70 | 90 |
| generative engine optimization | 260 | 260 | 140 | 50 | 70 |
| ai overviews | 1,000 | 1,600 | n/a | n/a | 210 |
| herramientas seo / narzędzia seo | 880 | 590 | 260 | 110 | 90 |
| seo local / seo lokalne | 880 | 210 | 170 | 90 | 90 |
| auditoría seo / audyt seo | 720 | 1,600 | 140 | 70 | 40 |
| posicionamiento web / pozycjonowanie stron | 1,600 | 5,400 | 260 | 210 | 170 |
| agencia seo / agencja seo | 4,400 | 2,400 | 880 | 590 | 320 |

What it says:

- **Spain beats every single Latin American country by 2-5x**, so there is no case for targeting LatAm separately yet. Spanish content still reaches them for free.
- **Spain leads Poland on GEO terms** (geo seo 590 vs 390) and on tooling terms (herramientas seo, seo local). **Poland leads on classic SEO services** (pozycjonowanie stron 5,400, CPC about 24 USD vs 8-10 USD in Spain), meaning Polish buyers pay more for SEO. The margin for Spain is real but not large.
- **The whole Spanish GEO cluster is small**: about 2,000 searches a month across geo seo, geo que es, posicionamiento geo, geo ia, geo vs seo, seo vs geo and variants. Difficulty scores are 0-1, but see the SERP finding below. "geo seo" itself peaked at 880 in March-April 2026 and was 390 in August, so treat it as an early, noisy market.

### Correction to the first draft of this analysis

The first draft said Spanish content on "how do I check if ChatGPT recommends me" was thin. The live SERPs say otherwise: "geo seo" and "cómo aparecer en chatgpt" each return 15+ Spanish pages from agencies, consultancies and tool vendors, all dated 2025-2026. Generic explainer posts will not win on their own. What can win:

1. **Tool- and price-led pages**: "semrush precios" (210), "semrush gratis" (210), "herramientas seo gratis" (480), "herramientas seo" (880). Semrush lists SEO plans around 139 USD a month, and a Spanish low-cost rival (AnySEO, about 19 EUR) already exists, so the angle is pay-per-use rather than simply cheap.
2. **Long tail and sector pages** where agencies have not written (GEO for gestorías, ecommerce, clínicas).
3. **Original data** that others cite, which only a product with its own data can produce.
4. **The agent/MCP angle**, where no Spanish competitor appeared.

## Why Spain

1. **Demand is growing faster than the tooling around it.** Spanish users switch to AI answers faster than most of Europe. Existing Spanish content is mostly agencies selling services (a 5,000 EUR managed offer appears in one roundup), not self-serve, pay-per-use tools. (Generic explainer content is already crowded; see the correction above.)
2. **Findable's angle is unusual there.** Pay-for-what-you-use, no seat fees, free Search Console and an MCP server for agents. Spanish SMEs and freelancers priced out of 100+ USD suites are the fit.
3. **Winnable in 6-9 months.** A new domain will not outrank Semrush in English, but a focused Spanish cluster on GEO questions can earn citations because few pages answer them well.
4. **Compounding reach.** Spanish content and the `es` locale also serve Latin America once location support is added.

## Why not Poland first

Poland is a fine second market and the existing 20 articles are an asset. It loses on competition (a native player with an AI module and several local tools) and on reach.

## Why not English first

No differentiation against well-funded incumbents. Keep English pages accurate and use them as the x-default.

## What is not verified

- **Willingness to pay in Spain.** Keyword volumes are verified; demand for a paid product is not.
- **Team context.** The account's other projects are Bolivian (ribentek.com, sicoesmonitor.com) and Polish (Findable's own default market is Poland, 2616). If the team's relationships and sales are in Poland or Bolivia, that shifts the call; confirm.
- **Competitor prices.** Taken from third-party roundups and SERP snippets. Re-check before quoting them publicly.
- **Willingness to pay.** Test with 10 customer conversations before spending on offsite work.

## Risks

- Brand Lookup cannot yet measure Spain. Mitigation: be explicit on every page (done) and ship the selector.
- A Spanish AI-visibility term could be taken by a funded entrant. Mitigation: publish fast, earn third-party mentions early.
- Mixed-language blog may dilute topical focus. Mitigation: language-grouped index, hreflang pair on the home, consider `/es/blog` later.
