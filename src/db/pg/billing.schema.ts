import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, text, index } from "drizzle-orm/pg-core";
import { organization } from "./better-auth-schema";

const isoNow = sql`to_char(now() AT TIME ZONE 'utc', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')`;

export const billingCustomerStatus = pgTable("billing_customer_status", {
  organizationId: text("organization_id")
    .primaryKey()
    .references(() => organization.id, { onDelete: "cascade" }),
  isPaying: boolean("is_paying").notNull().default(false),
  paidPlanId: text("paid_plan_id"),
  paidPlanStatus: text("paid_plan_status"),
  customerJson: text("customer_json").notNull(),
  syncedAt: text("synced_at").notNull(),
  createdAt: text("created_at").notNull().default(isoNow),
  updatedAt: text("updated_at").notNull().default(isoNow),
});

export const creditLedger = pgTable(
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
    type: text("type").notNull(),
    feature: text("feature"),
    description: text("description").notNull(),
    metadataJson: text("metadata_json"),
    createdAt: text("created_at").notNull().default(isoNow),
  },
  (table) => [
    index("credit_ledger_org_idx").on(table.organizationId),
    index("credit_ledger_org_created_idx").on(table.organizationId, table.createdAt),
  ],
);
