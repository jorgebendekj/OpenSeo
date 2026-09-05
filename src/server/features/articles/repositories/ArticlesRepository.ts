import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { articles } from "@/db/schema";
import type { ArticleRecord } from "@/types/schemas/articles";

export class ArticlesRepository {
  async create(data: {
    id: string;
    projectId: string;
    keyword: string;
    title: string;
    slug: string;
    metaDescription?: string | null;
    contentMarkdown: string;
    faqSchema?: string | null;
    targetAudience?: string | null;
    searchIntent?: string | null;
    wordCount: number;
    model?: string | null;
    status?: string;
  }): Promise<ArticleRecord> {
    const [inserted] = await db
      .insert(articles)
      .values({
        id: data.id,
        projectId: data.projectId,
        keyword: data.keyword,
        title: data.title,
        slug: data.slug,
        metaDescription: data.metaDescription ?? null,
        contentMarkdown: data.contentMarkdown,
        faqSchema: data.faqSchema ?? null,
        targetAudience: data.targetAudience ?? null,
        searchIntent: data.searchIntent ?? null,
        wordCount: data.wordCount,
        model: data.model ?? null,
        status: data.status ?? "draft",
      })
      .returning();

    return inserted;
  }

  async getById(id: string, projectId: string): Promise<ArticleRecord | null> {
    const [found] = await db
      .select()
      .from(articles)
      .where(and(eq(articles.id, id), eq(articles.projectId, projectId)))
      .limit(1);

    return found ?? null;
  }

  async listByProject(
    projectId: string,
    opts: { limit?: number; offset?: number } = {},
  ): Promise<ArticleRecord[]> {
    const query = db
      .select()
      .from(articles)
      .where(eq(articles.projectId, projectId))
      .orderBy(desc(articles.createdAt))
      .limit(opts.limit ?? 50)
      .offset(opts.offset ?? 0);

    return query;
  }

  async delete(id: string, projectId: string): Promise<boolean> {
    const result = await db
      .delete(articles)
      .where(and(eq(articles.id, id), eq(articles.projectId, projectId)));

    return true;
  }
}

export const articlesRepository = new ArticlesRepository();
