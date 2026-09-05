import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { organization } from "./better-auth-schema";

export const billingCustomerStatus = sqliteTable("billing_customer_status", {
  organizationId: text("organization_id")
    .primaryKey()
    .references(() => organization.id, { onDelete: "cascade" }),
  isPaying: integer("is_paying", { mode: "boolean" }).notNull().default(false),
  paidPlanId: text("paid_plan_id"),
  paidPlanStatus: text("paid_plan_status"),
  customerJson: text("customer_json").notNull(),
  syncedAt: text("synced_at").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const creditLedger = sqliteTable(
  "credit_ledger",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    userId: text("user_id"),
    projectId: text("project_id"),
    amountCredits: integer("amount_credits").notNull(),
    balanceAfter: integer("balance_after").notNull(),
    type: text("type").notNull(), // 'purchase' | 'grant' | 'spend' | 'refund' | 'bonus' | 'auto_topup' | 'trial' | 'monthly_free'
    feature: text("feature"),
    description: text("description").notNull(),
    metadataJson: text("metadata_json"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (table) => [
    index("credit_ledger_org_idx").on(table.organizationId),
    index("credit_ledger_org_created_idx").on(table.organizationId, table.createdAt),
  ],
);
