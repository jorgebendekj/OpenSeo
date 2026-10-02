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

## Why Spain

1. **Demand is ahead of supply.** Spanish users switch to AI answers faster than most of Europe, while the Spanish-language "how do I check if ChatGPT recommends me" content is thin and mostly published by agencies selling services (e.g. a 5,000 EUR managed offer in one roundup).
2. **Findable's angle is unusual there.** Pay-for-what-you-use, no seat fees, free Search Console and an MCP server for agents. Spanish SMEs and freelancers priced out of 100+ USD suites are the fit.
3. **Winnable in 6-9 months.** A new domain will not outrank Semrush in English, but a focused Spanish cluster on GEO questions can earn citations because few pages answer them well.
4. **Compounding reach.** Spanish content and the `es` locale also serve Latin America once location support is added.

## Why not Poland first

Poland is a fine second market and the existing 20 articles are an asset. It loses on competition (a native player with an AI module and several local tools) and on reach.

## Why not English first

No differentiation against well-funded incumbents. Keep English pages accurate and use them as the x-default.

## What is not verified

- **Search volumes.** No keyword data was pulled for this analysis. First action: run Findable keyword research on the seeds in 03 with location Spain (2724) and language `es`; drop anything under ~50 monthly searches unless it is a conversion term.
- **Competitor prices.** Taken from third-party roundups. Re-check before quoting them publicly.
- **Willingness to pay.** Test with 10 customer conversations before spending on offsite work.

## Risks

- Brand Lookup cannot yet measure Spain. Mitigation: be explicit on every page (done) and ship the selector.
- A Spanish AI-visibility term could be taken by a funded entrant. Mitigation: publish fast, earn third-party mentions early.
- Mixed-language blog may dilute topical focus. Mitigation: language-grouped index, hreflang pair on the home, consider `/es/blog` later.
