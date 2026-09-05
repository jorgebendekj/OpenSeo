import { describe, expect, it } from "vitest";
import { t, formatCurrency, formatNumber, generateHreflangs, SUPPORTED_LOCALES, normalizeLocale } from "@/shared/i18n";

describe("i18n Multilingual System Tests", () => {
  it("has all 10 supported locales", () => {
    expect(SUPPORTED_LOCALES).toHaveLength(10);
    expect(SUPPORTED_LOCALES).toContain("en");
    expect(SUPPORTED_LOCALES).toContain("es");
    expect(SUPPORTED_LOCALES).toContain("de");
    expect(SUPPORTED_LOCALES).toContain("fr");
    expect(SUPPORTED_LOCALES).toContain("it");
    expect(SUPPORTED_LOCALES).toContain("pt-BR");
    expect(SUPPORTED_LOCALES).toContain("nl");
    expect(SUPPORTED_LOCALES).toContain("pl");
    expect(SUPPORTED_LOCALES).toContain("ja");
    expect(SUPPORTED_LOCALES).toContain("zh-Hans");
  });

  it("translates keys across different locales", () => {
    expect(t("en", "nav.login")).toBe("Log in");
    expect(t("es", "nav.login")).toBe("Iniciar sesión");
    expect(t("de", "nav.login")).toBe("Anmelden");
    expect(t("fr", "nav.login")).toBe("Connexion");
    expect(t("ja", "nav.login")).toBe("ログイン");
    expect(t("zh-Hans", "nav.login")).toBe("登录");
  });

  it("interpolates parameters correctly", () => {
    expect(t("en", "pricing.bonus", { bonus: 15 })).toBe("15% bonus credits");
    expect(t("es", "pricing.bonus", { bonus: 15 })).toBe("15% créditos de bonificación");
  });

  it("normalizes locale inputs and fallbacks", () => {
    expect(normalizeLocale("es-MR")).toBe("es");
    expect(normalizeLocale("pt")).toBe("pt-BR");
    expect(normalizeLocale("zh-CN")).toBe("zh-Hans");
    expect(normalizeLocale("unknown-locale")).toBe("en");
  });

  it("generates complete hreflang links with x-default", () => {
    const links = generateHreflangs("features");
    expect(links).toHaveLength(11); // 10 locales + x-default
    const xDefault = links.find((l) => l.hrefLang === "x-default");
    expect(xDefault?.href).toBe("https://findable.io/features");
    const esLink = links.find((l) => l.hrefLang === "es");
    expect(esLink?.href).toBe("https://findable.io/es/features");
  });
});
