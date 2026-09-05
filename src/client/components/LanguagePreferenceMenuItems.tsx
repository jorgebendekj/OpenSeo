import { useLanguagePreference } from "@/client/lib/language";
import type { SupportedLocale } from "@/shared/i18n";

const LANGUAGE_OPTIONS: {
  value: SupportedLocale;
  label: string;
  shortLabel: string;
}[] = [
  { value: "en", label: "English", shortLabel: "EN" },
  { value: "pl", label: "Polski", shortLabel: "PL" },
  { value: "es", label: "Español", shortLabel: "ES" },
  { value: "de", label: "Deutsch", shortLabel: "DE" },
  { value: "fr", label: "Français", shortLabel: "FR" },
];

export function LanguagePreferenceMenuItems() {
  const { language, setLanguage, t } = useLanguagePreference();

  return (
    <>
      <li className="menu-title pt-2">
        <span>{t("settings.language") || "Language"}</span>
      </li>

      <li>
        <div
          role="radiogroup"
          aria-label="Language preference"
          className="flex gap-0.5 rounded-lg bg-base-200 p-0.5"
        >
          {LANGUAGE_OPTIONS.map((option) => {
            const isActive = option.value === language;

            return (
              <div
                key={option.value}
                className="tooltip tooltip-bottom flex flex-1 before:whitespace-nowrap"
                data-tip={option.label}
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  aria-label={option.label}
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-md px-1.5 py-1 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-base-100 text-base-content shadow-sm font-bold"
                      : "text-base-content/50 hover:text-base-content/80"
                  }`}
                  onClick={() => setLanguage(option.value)}
                >
                  {option.shortLabel}
                </button>
              </div>
            );
          })}
        </div>
      </li>
    </>
  );
}
