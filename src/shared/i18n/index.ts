import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale, LOCALE_META, normalizeLocale } from "./config";
import en from "./locales/en";
import es from "./locales/es";
import de from "./locales/de";
import fr from "./locales/fr";
import it from "./locales/it";
import ptBR from "./locales/pt-BR";
import nl from "./locales/nl";
import pl from "./locales/pl";
import ja from "./locales/ja";
import zhHans from "./locales/zh-Hans";

export * from "./config";

export type Translations = typeof en;

const catalogs: Record<SupportedLocale, any> = {
  en,
  es,
  de,
  fr,
  it,
  "pt-BR": ptBR,
  nl,
  pl,
  ja,
  "zh-Hans": zhHans,
};

function getNestedValue(obj: any, path: string): string | undefined {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export function t(
  locale: SupportedLocale | string,
  key: string,
  params?: Record<string, string | number>,
): string {
  const norm = normalizeLocale(locale);
  const catalog = catalogs[norm] || catalogs[DEFAULT_LOCALE];
  let text = getNestedValue(catalog, key) || getNestedValue(catalogs[DEFAULT_LOCALE], key) || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.split("{" + k + "}").join(String(v));
    }
  }
  return text;
}

export function formatCurrency(
  amountUsd: number,
  locale: SupportedLocale | string = DEFAULT_LOCALE,
  currency?: string,
): string {
  const norm = normalizeLocale(locale);
  const targetCurrency = currency || "USD";
  try {
    return new Intl.NumberFormat(norm, {
      style: "currency",
      currency: targetCurrency,
      maximumFractionDigits: 2,
    }).format(amountUsd);
  } catch {
    return "$" + amountUsd.toFixed(2);
  }
}

export function formatNumber(
  value: number,
  locale: SupportedLocale | string = DEFAULT_LOCALE,
): string {
  const norm = normalizeLocale(locale);
  try {
    return new Intl.NumberFormat(norm).format(value);
  } catch {
    return String(value);
  }
}

export function formatDate(
  date: Date | string | number,
  locale: SupportedLocale | string = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions,
): string {
  const norm = normalizeLocale(locale);
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  try {
    return new Intl.DateTimeFormat(
      norm,
      options || { year: "numeric", month: "short", day: "numeric" },
    ).format(d);
  } catch {
    return d.toISOString().split("T")[0];
  }
}

export interface HreflangLink {
  rel: "alternate";
  hrefLang: string;
  href: string;
}

export function generateHreflangs(
  path: string,
  baseUrl = "https://findable.io",
): HreflangLink[] {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const links: HreflangLink[] = SUPPORTED_LOCALES.map((locale) => ({
    rel: "alternate",
    hrefLang: locale,
    href: locale === "en" ? `${baseUrl}/${cleanPath}` : `${baseUrl}/${locale}/${cleanPath}`,
  }));
  links.push({
    rel: "alternate",
    hrefLang: "x-default",
    href: `${baseUrl}/${cleanPath}`,
  });
  return links;
}
