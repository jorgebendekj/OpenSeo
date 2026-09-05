import * as React from "react";
import {
  type SupportedLocale,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_META,
  normalizeLocale,
  t as translateHelper,
} from "@/shared/i18n";

const LANGUAGE_STORAGE_KEY = "findable_lang";
const LANGUAGE_CHANGE_EVENT = "findable_lang_change";

export function readLanguagePreference(): SupportedLocale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored) {
      return normalizeLocale(stored);
    }
    // Check browser language
    const browserLang = window.navigator.language;
    if (browserLang) {
      return normalizeLocale(browserLang);
    }
  } catch {
    // Ignore localStorage access errors
  }

  return DEFAULT_LOCALE;
}

export function writeLanguagePreference(lang: SupportedLocale) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  } catch {
    // Ignore localStorage errors
  }
}

function subscribeToLanguagePreference(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleLanguageChange = () => {
    onStoreChange();
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key && event.key !== LANGUAGE_STORAGE_KEY) {
      return;
    }
    onStoreChange();
  };

  window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useLanguagePreference() {
  const language = React.useSyncExternalStore<SupportedLocale>(
    subscribeToLanguagePreference,
    readLanguagePreference,
    () => DEFAULT_LOCALE,
  );

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = React.useCallback((nextLocale: SupportedLocale) => {
    writeLanguagePreference(nextLocale);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  }, []);

  const t = React.useCallback(
    (key: string, params?: Record<string, string | number>) => {
      return translateHelper(language, key, params);
    },
    [language],
  );

  return { language, setLanguage, t, supportedLocales: SUPPORTED_LOCALES, localeMeta: LOCALE_META };
}
