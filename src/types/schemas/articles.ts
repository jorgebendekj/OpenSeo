import { z } from "zod";

export const generateArticleInputSchema = z.object({
  projectId: z.string().min(1),
  keyword: z.string().min(1),
  languageCode: z.string().default("en"),
  locationCode: z.number().default(2840),
  targetAudience: z.string().optional(),
  searchIntent: z.string().optional(),
  format: z
    .enum(["ultimate_guide", "how_to", "listicle", "comparison", "in_depth"])
    .default("ultimate_guide")
    .optional(),
  secondaryKeywords: z.array(z.string()).optional(),
  tone: z
    .enum(["authoritative", "conversational", "educational", "persuasive"])
    .default("authoritative"),
  serpContext: z
    .array(
      z.object({
        rank: z.number(),
        title: z.string().nullable().optional(),
        url: z.string(),
        domain: z.string(),
      }),
    )
    .optional(),
});

export type GenerateArticleInput = z.infer<typeof generateArticleInputSchema>;

export const articleRecordSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  keyword: z.string(),
  title: z.string(),
  slug: z.string(),
  metaDescription: z.string().nullable(),
  contentMarkdown: z.string(),
  faqSchema: z.string().nullable(),
  targetAudience: z.string().nullable(),
  searchIntent: z.string().nullable(),
  wordCount: z.number(),
  model: z.string().nullable(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ArticleRecord = z.infer<typeof articleRecordSchema>;
