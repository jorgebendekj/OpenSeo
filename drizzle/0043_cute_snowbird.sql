CREATE TABLE `articles` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`keyword` text NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`meta_description` text,
	`content_markdown` text NOT NULL,
	`faq_schema` text,
	`target_audience` text,
	`search_intent` text,
	`word_count` integer DEFAULT 0 NOT NULL,
	`model` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `articles_project_created_idx` ON `articles` (`project_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `articles_project_keyword_idx` ON `articles` (`project_id`,`keyword`);--> statement-breakpoint
CREATE TABLE `credit_ledger` (
	`id` text PRIMARY KEY NOT NULL,
	`organization_id` text NOT NULL,
	`user_id` text,
	`project_id` text,
	`amount_credits` integer NOT NULL,
	`balance_after` integer NOT NULL,
	`type` text NOT NULL,
	`feature` text,
	`description` text NOT NULL,
	`metadata_json` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `credit_ledger_org_idx` ON `credit_ledger` (`organization_id`);--> statement-breakpoint
CREATE INDEX `credit_ledger_org_created_idx` ON `credit_ledger` (`organization_id`,`created_at`);