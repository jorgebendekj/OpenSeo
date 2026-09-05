import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getLatestBalance: vi.fn(),
  appendEntry: vi.fn(),
  listEntries: vi.fn(),
  getUsageHistory: vi.fn(),
}));

vi.mock("@/server/billing/ledger/CreditLedgerRepository", () => ({
  CreditLedgerRepository: mocks,
}));

import { CreditLedgerService } from "@/server/billing/ledger/CreditLedgerService";
import { calculatePackageCredits } from "@/shared/billing";

describe("Credit Ledger Engine & Billing Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calculates volume purchase bonuses accurately", () => {
    expect(calculatePackageCredits(25)).toBe(25000); // 0% bonus
    expect(calculatePackageCredits(50)).toBe(55000); // +10% bonus
    expect(calculatePackageCredits(100)).toBe(115000); // +15% bonus
    expect(calculatePackageCredits(250)).toBe(312500); // +25% bonus
    expect(calculatePackageCredits(500)).toBe(675000); // +35% bonus
  });

  it("records purchase and volume bonus in the ledger", async () => {
    mocks.appendEntry.mockResolvedValue({} as any);
    mocks.getLatestBalance.mockResolvedValue(55000);

    await CreditLedgerService.recordPurchase("org_test_1", 50, "user_1", "tx_123");

    expect(mocks.appendEntry).toHaveBeenCalledTimes(2);
    // First call: base credits
    expect(mocks.appendEntry).toHaveBeenNthCalledWith(1, {
      organizationId: "org_test_1",
      userId: "user_1",
      amountCredits: 50000,
      type: "purchase",
      description: "Purchased $50 credits package",
      metadata: { usd: 50, txId: "tx_123" },
    });
    // Second call: bonus credits
    expect(mocks.appendEntry).toHaveBeenNthCalledWith(2, {
      organizationId: "org_test_1",
      userId: "user_1",
      amountCredits: 5000,
      type: "bonus",
      description: "Volume tier bonus (+5000 credits)",
      metadata: { usd: 50, txId: "tx_123" },
    });
  });

  it("does not deduct credits for free actions (<= 0 credits)", async () => {
    await CreditLedgerService.deductSpend({
      organizationId: "org_test_1",
      credits: 0,
      feature: "search_console",
      description: "GSC query",
    });
    expect(mocks.appendEntry).not.toHaveBeenCalled();
  });

  it("throws INSUFFICIENT_CREDITS when balance is lower than required", async () => {
    mocks.getLatestBalance.mockResolvedValue(10);
    await expect(
      CreditLedgerService.deductSpend({
        organizationId: "org_test_1",
        credits: 50,
        feature: "serp",
        description: "SERP check",
      }),
    ).rejects.toThrow("Your credit balance is insufficient");
  });

  it("issues instant refund on failure", async () => {
    mocks.appendEntry.mockResolvedValue({} as any);
    await CreditLedgerService.refundSpend({
      organizationId: "org_test_1",
      credits: 50,
      feature: "serp",
      reason: "Upstream DataForSEO timeout",
    });

    expect(mocks.appendEntry).toHaveBeenCalledWith(
      expect.objectContaining({
        amountCredits: 50,
        type: "refund",
        description: "Refund: Upstream DataForSEO timeout",
      }),
    );
  });
});
