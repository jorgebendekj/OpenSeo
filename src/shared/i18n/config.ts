export const SUPPORTED_LOCALES = ["en", "es", "pl"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const LOCALE_COOKIE_NAME = "findable_locale";

export interface LocaleMeta {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  defaultCurrency: string;
}

export const LOCALE_META: Record<SupportedLocale, LocaleMeta> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
    defaultCurrency: "USD",
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    dir: "ltr",
    defaultCurrency: "EUR",
  },
  pl: {
    code: "pl",
    name: "Polish",
    nativeName: "Polski",
    dir: "ltr",
    defaultCurrency: "PLN",
  },
};

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

export function normalizeLocale(localeString?: string | null): SupportedLocale {
  if (!localeString) return DEFAULT_LOCALE;
  const clean = localeString.trim().toLowerCase();

  for (const loc of SUPPORTED_LOCALES) {
    if (loc.toLowerCase() === clean) return loc;
  }

  const prefix = clean.split(/[-_]/)[0];
  if (prefix === "es") return "es";
  if (prefix === "pl") return "pl";

  return DEFAULT_LOCALE;
}
