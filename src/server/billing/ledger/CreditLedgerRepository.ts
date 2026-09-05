import { and, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "@/db";
import { creditLedger } from "@/db/schema";

export interface CreateLedgerEntryInput {
  organizationId: string;
  userId?: string | null;
  projectId?: string | null;
  amountCredits: number; // positive = add, negative = spend
  type: "purchase" | "grant" | "spend" | "refund" | "bonus" | "auto_topup" | "trial" | "monthly_free";
  feature?: string | null;
  description: string;
  metadata?: Record<string, unknown>;
}

export class CreditLedgerRepository {
  static async getLatestBalance(organizationId: string): Promise<number> {
    const [latest] = await db
      .select({ balanceAfter: creditLedger.balanceAfter })
      .from(creditLedger)
      .where(eq(creditLedger.organizationId, organizationId))
      .orderBy(desc(creditLedger.createdAt))
      .limit(1);

    return latest?.balanceAfter ?? 0;
  }

  static async appendEntry(input: CreateLedgerEntryInput) {
    const currentBalance = await this.getLatestBalance(input.organizationId);
    const balanceAfter = Math.max(0, currentBalance + input.amountCredits);
    const id = `cleg_${crypto.randomUUID().replace(/-/g, "").slice(0, 20)}`;

    const [row] = await db
      .insert(creditLedger)
      .values({
        id,
        organizationId: input.organizationId,
        userId: input.userId ?? null,
        projectId: input.projectId ?? null,
        amountCredits: input.amountCredits,
        balanceAfter,
        type: input.type,
        feature: input.feature ?? null,
        description: input.description,
        metadataJson: input.metadata ? JSON.stringify(input.metadata) : null,
      })
      .returning();

    return row;
  }

  static async listEntries(organizationId: string, limit = 50, offset = 0) {
    return db
      .select()
      .from(creditLedger)
      .where(eq(creditLedger.organizationId, organizationId))
      .orderBy(desc(creditLedger.createdAt))
      .limit(limit)
      .offset(offset);
  }

  static async getUsageHistory(organizationId: string, days = 30) {
    const cutoff = new Date(Date.now() - days * 86400 * 1000).toISOString();
    return db
      .select()
      .from(creditLedger)
      .where(
        and(
          eq(creditLedger.organizationId, organizationId),
          gte(creditLedger.createdAt, cutoff),
        ),
      )
      .orderBy(desc(creditLedger.createdAt));
  }
}
