import { sql } from "drizzle-orm";
import { index, integer, pgTable, text } from "drizzle-orm/pg-core";
import { projects } from "./app.schema";

const isoNow = sql`to_char(now() AT TIME ZONE 'utc', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')`;
const timestampColumn = (name: string) => text(name);

export const articles = pgTable(
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
    createdAt: timestampColumn("created_at").notNull().default(isoNow),
    updatedAt: timestampColumn("updated_at").notNull().default(isoNow),
  },
  (table) => [
    index("articles_project_created_idx").on(table.projectId, table.createdAt),
    index("articles_project_keyword_idx").on(table.projectId, table.keyword),
  ],
);
