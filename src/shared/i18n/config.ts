export const SUPPORTED_LOCALES = [
  "en",
  "es",
  "de",
  "fr",
  "it",
  "pt-BR",
  "nl",
  "pl",
  "ja",
  "zh-Hans",
] as const;

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
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    dir: "ltr",
    defaultCurrency: "EUR",
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    dir: "ltr",
    defaultCurrency: "EUR",
  },
  it: {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    dir: "ltr",
    defaultCurrency: "EUR",
  },
  "pt-BR": {
    code: "pt-BR",
    name: "Portuguese (Brazil)",
    nativeName: "Português (Brasil)",
    dir: "ltr",
    defaultCurrency: "BRL",
  },
  nl: {
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
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
  ja: {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    dir: "ltr",
    defaultCurrency: "JPY",
  },
  "zh-Hans": {
    code: "zh-Hans",
    name: "Simplified Chinese",
    nativeName: "简体中文",
    dir: "ltr",
    defaultCurrency: "CNY",
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

  // Prefix matching e.g. "es-MX" -> "es", "pt" -> "pt-BR", "zh" -> "zh-Hans"
  const prefix = clean.split(/[-_]/)[0];
  if (prefix === "pt") return "pt-BR";
  if (prefix === "zh") return "zh-Hans";

  for (const loc of SUPPORTED_LOCALES) {
    if (loc.toLowerCase().startsWith(prefix)) return loc;
  }

  return DEFAULT_LOCALE;
}
