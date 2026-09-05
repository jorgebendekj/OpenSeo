import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { projects } from "./app.schema";

export const articles = sqliteTable(
  "articles",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    keyword: text("keyword").notNull(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    metaDescription: text("meta_description"),
    contentMarkdown: text("content_markdown").notNull(),
    faqSchema: text("faq_schema"),
    targetAudience: text("target_audience"),
    searchIntent: text("search_intent"),
    wordCount: integer("word_count").notNull().default(0),
    model: text("model"),
    status: text("status").notNull().default("draft"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (table) => [
    index("articles_project_created_idx").on(table.projectId, table.createdAt),
    index("articles_project_keyword_idx").on(table.projectId, table.keyword),
  ],
);
