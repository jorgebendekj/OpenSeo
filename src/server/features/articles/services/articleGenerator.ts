import { generateText } from "ai";
import { getChatAgentModel } from "@/server/lib/openrouter";
import { articlesRepository } from "@/server/features/articles/repositories/ArticlesRepository";
import type { GenerateArticleInput, ArticleRecord } from "@/types/schemas/articles";
import { AppError } from "@/server/lib/errors";

function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function generateArticle(
  input: GenerateArticleInput,
  context?: { domain?: string | null; projectName?: string | null },
): Promise<ArticleRecord> {
  const model = await getChatAgentModel();

  const serpInfo =
    input.serpContext && input.serpContext.length > 0
      ? `\nTop Competitor Ranking Pages for Reference & Synthesis:\n${input.serpContext
          .slice(0, 6)
          .map((s) => `- Rank #${s.rank}: "${s.title ?? "Untitled"}" (${s.url})`)
          .join("\n")}`
      : "";

  const secondaryKeywordsInfo =
    input.secondaryKeywords && input.secondaryKeywords.length > 0
      ? `Secondary / Semantic Keywords to naturally include:\n${input.secondaryKeywords.map((k) => `- "${k}"`).join("\n")}`
      : "";

  const projectInfo = context?.domain
    ? `Target Website / Brand: ${context.domain}`
    : "";

  const formatStylePrompt = (() => {
    switch (input.format) {
      case "how_to":
        return "FORMAT: Step-by-Step Tactical Tutorial. Include prerequisites checklist, numbered chronological steps with exact instructions, visual placeholder callouts, and a troubleshooting / common pitfalls section.";
      case "listicle":
        return "FORMAT: Ranked List & Top Solutions Guide. Provide numbered entries (e.g., '1. Tool/Method Name - Best For [Use Case]'), structured pros/cons bullet points, pricing/cost metrics, a comprehensive comparison table, and a clear final verdict.";
      case "comparison":
        return "FORMAT: Head-to-Head Comparison & Decision Matrix. Include a side-by-side feature comparison table, category-by-category breakdown, who should choose what, pros & cons, and a definitive buyer recommendation.";
      case "in_depth":
        return "FORMAT: Deep-Dive Strategic Analysis & Masterclass. Provide advanced frameworks, data-backed breakdowns, expert insights, detailed workflows, and strategic roadmaps.";
      case "ultimate_guide":
      default:
        return "FORMAT: Ultimate Pillar Guide. Comprehensive end-to-end breakdown covering fundamentals, advanced strategies, comparison tables, practical workflows, step-by-step implementation, and common mistakes to avoid.";
    }
  })();

  const systemPrompt = `You are a world-renowned Senior SEO & GEO (Generative Engine Optimization) Content Director and Expert Technical Copywriter.
Your mission is to produce an extraordinary, beautifully formatted, comprehensive article (1,800 to 2,800 words) that immediately ranks on Google Page 1 and gets cited as the definitive source by AI search engines (ChatGPT, Perplexity, Claude, Google AI Overviews).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 EDITORIAL & FORMATTING ARCHITECTURE (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every article MUST follow this polished, scannable, visual layout:

1. # Compelling H1 Title (Max 60 chars, includes target keyword naturally, power words, high CTR).
2. Engaging Hook (2 short, punchy paragraphs explaining why this matters right now).
3. Executive Summary Callout Box:
   > 💡 **Quick Summary & Key Takeaways**
   > - **Core Concept**: [1-sentence direct answer/definition]
   > - **Top Recommendation**: [Best practice, tool, or action]
   > - **Expected Result/ROI**: [Concrete value or timeline metric]
4. Table of Contents:
   Clean markdown bulleted list linking to all H2 sections.
5. In-Depth Body Sections (H2s & H3s):
   - **Direct Answer for GEO**: Under every main H2, provide a 40–50 word definitive, high-density paragraph directly answering the topic (perfect for Google Featured Snippets & Perplexity citations).
   - **Short, Breathable Paragraphs**: Max 2–3 sentences per paragraph. Never write walls of text.
   - **Visual Callout Boxes**: Include at least 2–3 tactical callout blocks throughout the article:
     > 🎯 **Pro Tip:** [Actionable insider tip]
     > ⚠️ **Common Pitfall to Avoid:** [Critical mistake and how to prevent it]
     > 📊 **Real-World Example:** [Concrete scenario or metric]
   - **Structured Markdown Comparison / Data Table**: Include at least 1–2 well-structured markdown tables (e.g. comparing methods, tools, criteria, pros/cons, or metrics).
   - **Actionable Bullet Lists**: Bold the first 2–4 words of each bullet point for rapid scanning.
   - **Contextual Internal Linking Placeholders**: Include 3–5 contextual anchor text placeholders in format \`[Contextual Anchor: Relevant Topic]\`.
6. Dedicated FAQ Section (H2):
   - Include 4 to 6 real search queries formatted as H3s.
   - Each answer must be concise, definitive, and 40–60 words long.
7. Actionable Conclusion & Implementation Checklist (H2):
   - Summary of key milestones.
   - A numbered 5-step checklist for immediate execution.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 ANTI-SLOP / NATURAL HUMAN VOICE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Strictly FORBIDDEN robotic cliches: "In today's fast-paced digital world", "Delve into the realm of", "In this comprehensive guide, we will explore", "A testament to", "It is important to remember", "In conclusion / All in all".
- Write with active voice, authority, concrete numbers, specific examples, and practical nuances.
- Language Code: ${input.languageCode}. (Write natively and fluently in the requested language).
- Tone: ${input.tone}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 OUTPUT FORMAT (EXACT XML STRUCTURE REQUIRED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Return your response ONLY in this EXACT structured XML format:

<ARTICLE_DATA>
<TITLE>Clean, High-CTR SEO Title (Max 60 chars)</TITLE>
<META_DESCRIPTION>Click-worthy meta description (140-155 chars) containing the primary keyword</META_DESCRIPTION>
<SLUG>clean-url-friendly-slug</SLUG>
<CONTENT>
# Title

[Full Markdown article following the exact layout above with Callout Boxes, Table of Contents, H2s, H3s, Tables, Bullet Points, Pro Tips, FAQs, and Conclusion Checklist]
</CONTENT>
<FAQ_SCHEMA>
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Definitive concise answer to question 1."
      }
    }
  ]
}
</FAQ_SCHEMA>
</ARTICLE_DATA>`;

  const userPrompt = `Target Keyword: "${input.keyword}"
Search Intent: ${input.searchIntent ?? "Informational / Commercial"}
Target Audience: ${input.targetAudience ?? "Decision makers, practitioners, and buyers"}
${formatStylePrompt}
${projectInfo}
${secondaryKeywordsInfo}
${serpInfo}

Please write the complete, comprehensive, beautifully formatted article now with all tables, callouts, FAQs, and schema.`;

  try {
    const { text } = await generateText({
      model,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.68,
    });

    const titleMatch = text.match(/<TITLE>([\s\S]*?)<\/TITLE>/i);
    const metaDescMatch = text.match(/<META_DESCRIPTION>([\s\S]*?)<\/META_DESCRIPTION>/i);
    const slugMatch = text.match(/<SLUG>([\s\S]*?)<\/SLUG>/i);
    const contentMatch = text.match(/<CONTENT>([\s\S]*?)<\/CONTENT>/i);
    const faqSchemaMatch = text.match(/<FAQ_SCHEMA>([\s\S]*?)<\/FAQ_SCHEMA>/i);

    const title = titleMatch
      ? titleMatch[1].trim()
      : `${input.keyword.charAt(0).toUpperCase() + input.keyword.slice(1)}: The Complete Guide`;
    const metaDescription = metaDescMatch
      ? metaDescMatch[1].trim()
      : `Complete guide to ${input.keyword}. Actionable strategies, key comparisons, and step-by-step best practices to achieve top results.`;
    const slug = slugMatch
      ? generateSlug(slugMatch[1].trim())
      : generateSlug(input.keyword);
    const contentMarkdown = contentMatch ? contentMatch[1].trim() : text.trim();

    let faqSchema: string | null = null;
    if (faqSchemaMatch) {
      try {
        const cleaned = faqSchemaMatch[1].trim();
        JSON.parse(cleaned); // validate JSON
        faqSchema = cleaned;
      } catch {
        faqSchema = faqSchemaMatch[1].trim();
      }
    }

    const wordCount = countWords(contentMarkdown);
    const articleId = crypto.randomUUID();

    const created = await articlesRepository.create({
      id: articleId,
      projectId: input.projectId,
      keyword: input.keyword,
      title,
      slug,
      metaDescription,
      contentMarkdown,
      faqSchema,
      targetAudience: input.targetAudience ?? null,
      searchIntent: input.searchIntent ?? null,
      wordCount,
      model: "openrouter",
      status: "ready",
    });

    return created;
  } catch (error) {
    console.error("articleGenerator error:", error);
    throw new AppError(
      "INTERNAL_ERROR",
      `Failed to generate article for keyword "${input.keyword}": ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
