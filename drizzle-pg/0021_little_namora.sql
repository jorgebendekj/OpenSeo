CREATE TABLE "articles" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"keyword" text NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"meta_description" text,
	"content_markdown" text NOT NULL,
	"faq_schema" text,
	"target_audience" text,
	"search_intent" text,
	"word_count" integer DEFAULT 0 NOT NULL,
	"model" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" text DEFAULT to_char(now() AT TIME ZONE 'utc', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') NOT NULL,
	"updated_at" text DEFAULT to_char(now() AT TIME ZONE 'utc', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') NOT NULL
);
--> statement-breakpoint
CREATE TABLE "credit_ledger" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"user_id" text,
	"project_id" text,
	"amount_credits" integer NOT NULL,
	"balance_after" integer NOT NULL,
	"type" text NOT NULL,
	"feature" text,
	"description" text NOT NULL,
	"metadata_json" text,
	"created_at" text DEFAULT to_char(now() AT TIME ZONE 'utc', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_ledger" ADD CONSTRAINT "credit_ledger_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "articles_project_created_idx" ON "articles" USING btree ("project_id","created_at");--> statement-breakpoint
CREATE INDEX "articles_project_keyword_idx" ON "articles" USING btree ("project_id","keyword");--> statement-breakpoint
CREATE INDEX "credit_ledger_org_idx" ON "credit_ledger" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "credit_ledger_org_created_idx" ON "credit_ledger" USING btree ("organization_id","created_at");