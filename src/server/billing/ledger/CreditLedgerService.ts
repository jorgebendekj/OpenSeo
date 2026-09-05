import {
  CreditLedgerRepository,
  type CreateLedgerEntryInput,
} from "@/server/billing/ledger/CreditLedgerRepository";
import {
  SIGNUP_TRIAL_CREDITS,
  ACTIVE_MONTHLY_FREE_CREDITS,
  GRACE_PERIOD_DAYS,
  RUNWAY_WARNING_DAYS,
  calculatePackageCredits,
} from "@/shared/billing";
import { AppError } from "@/server/lib/errors";

export class CreditLedgerService {
  static async getBalance(organizationId: string): Promise<number> {
    return CreditLedgerRepository.getLatestBalance(organizationId);
  }

  static async grantSignupTrial(organizationId: string, userId?: string) {
    const existing = await CreditLedgerRepository.listEntries(organizationId, 1);
    if (existing.length > 0) return; // already granted trial or existing balance

    return CreditLedgerRepository.appendEntry({
      organizationId,
      userId,
      amountCredits: SIGNUP_TRIAL_CREDITS,
      type: "trial",
      description: "Complimentary signup trial credits",
    });
  }

  static async grantMonthlyFree(organizationId: string) {
    return CreditLedgerRepository.appendEntry({
      organizationId,
      amountCredits: ACTIVE_MONTHLY_FREE_CREDITS,
      type: "monthly_free",
      description: "Monthly complimentary active credit allocation",
    });
  }

  static async recordPurchase(
    organizationId: string,
    usd: number,
    userId?: string,
    txId?: string,
  ) {
    const totalCredits = calculatePackageCredits(usd);
    const baseCredits = Math.round(usd * 1000);
    const bonusCredits = totalCredits - baseCredits;

    // Record base purchase
    await CreditLedgerRepository.appendEntry({
      organizationId,
      userId,
      amountCredits: baseCredits,
      type: "purchase",
      description: `Purchased $${usd} credits package`,
      metadata: { usd, txId },
    });

    // Record volume bonus if applicable
    if (bonusCredits > 0) {
      await CreditLedgerRepository.appendEntry({
        organizationId,
        userId,
        amountCredits: bonusCredits,
        type: "bonus",
        description: `Volume tier bonus (+${bonusCredits} credits)`,
        metadata: { usd, txId },
      });
    }

    return CreditLedgerRepository.getLatestBalance(organizationId);
  }

  static async deductSpend(input: {
    organizationId: string;
    userId?: string;
    projectId?: string;
    credits: number;
    feature: string;
    description: string;
    metadata?: Record<string, unknown>;
  }) {
    if (input.credits <= 0) return; // Free actions cost 0 and do not hit ledger

    const currentBalance = await CreditLedgerRepository.getLatestBalance(input.organizationId);
    if (currentBalance < input.credits) {
      throw new AppError(
        "INSUFFICIENT_CREDITS",
        "Your credit balance is insufficient for this action. Please top up your account.",
      );
    }

    return CreditLedgerRepository.appendEntry({
      organizationId: input.organizationId,
      userId: input.userId,
      projectId: input.projectId,
      amountCredits: -input.credits,
      type: "spend",
      feature: input.feature,
      description: input.description,
      metadata: input.metadata,
    });
  }

  static async refundSpend(input: {
    organizationId: string;
    userId?: string;
    projectId?: string;
    credits: number;
    feature: string;
    reason: string;
    metadata?: Record<string, unknown>;
  }) {
    if (input.credits <= 0) return;

    return CreditLedgerRepository.appendEntry({
      organizationId: input.organizationId,
      userId: input.userId,
      projectId: input.projectId,
      amountCredits: input.credits,
      type: "refund",
      feature: input.feature,
      description: `Refund: ${input.reason}`,
      metadata: input.metadata,
    });
  }

  static async calculateRunway(organizationId: string): Promise<{
    currentBalance: number;
    dailyBurnRate: number;
    runwayDays: number | null;
    isRunwayLow: boolean;
    isInGracePeriod: boolean;
  }> {
    const currentBalance = await CreditLedgerRepository.getLatestBalance(organizationId);
    const history = await CreditLedgerRepository.getUsageHistory(organizationId, 30);

    const totalSpend = history
      .filter((e) => e.type === "spend")
      .reduce((sum, e) => sum + Math.abs(e.amountCredits), 0);

    const dailyBurnRate = totalSpend > 0 ? totalSpend / 30 : 0;
    const runwayDays = dailyBurnRate > 0 ? Math.floor(currentBalance / dailyBurnRate) : null;
    const isRunwayLow = runwayDays !== null && runwayDays < RUNWAY_WARNING_DAYS;
    const isInGracePeriod = currentBalance <= 0;

    return {
      currentBalance,
      dailyBurnRate: Math.round(dailyBurnRate),
      runwayDays,
      isRunwayLow,
      isInGracePeriod,
    };
  }

  static async exportCsv(organizationId: string): Promise<string> {
    const entries = await CreditLedgerRepository.listEntries(organizationId, 1000);
    const headers = ["ID", "Date", "Type", "Feature", "Amount Credits", "Balance After", "Description"];
    const rows = entries.map((e) => [
      e.id,
      e.createdAt,
      e.type,
      e.feature ?? "",
      e.amountCredits.toString(),
      e.balanceAfter.toString(),
      `"${(e.description || "").replace(/"/g, '""')}"`,
    ]);

    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  }
}
