import { createFileRoute } from "@tanstack/react-router";
import { Globe, Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ApiKeySettings } from "@/client/features/settings/ApiKeySettings";
import { type ThemePreference, useThemePreference } from "@/client/lib/theme";
import { useLanguagePreference } from "@/client/lib/language";
import type { SupportedLocale } from "@/shared/i18n";
import { authClient, useSession } from "@/lib/auth-client";
import { isHostedClientAuthMode } from "@/lib/auth-mode";
import { BRAND } from "@/shared/brand";
import { version } from "../../../package.json";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

const THEME_OPTIONS: {
  value: ThemePreference;
  label: string;
  icon: typeof Sun;
}[] = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

const LANGUAGE_OPTIONS: {
  value: SupportedLocale;
  label: string;
  nativeName: string;
}[] = [
  { value: "en", label: "English", nativeName: "English" },
  { value: "es", label: "Spanish", nativeName: "Español" },
  { value: "pl", label: "Polish", nativeName: "Polski" },
];

function SettingsPage() {
  const isHosted = isHostedClientAuthMode();
  const { themePreference, setThemePreference } = useThemePreference();
  const { language, setLanguage, t } = useLanguagePreference();
  const { data: session, isPending: isSessionPending } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  const analyticsEnabled = session?.user?.analyticsOptedOut !== true;

  async function updateAnalyticsPreference(enabled: boolean) {
    setIsSaving(true);
    try {
      const result = await authClient.updateUser({
        analyticsOptedOut: !enabled,
      });
      if (result.error) {
        toast.error("We couldn't update your analytics setting.");
      } else {
        toast.success(enabled ? "Analytics enabled" : "Analytics disabled");
      }
    } catch {
      toast.error("We couldn't update your analytics setting.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="h-full overflow-auto bg-base-100 px-4 py-8 pb-24 md:px-6 md:py-12 md:pb-8">
      <div className="mx-auto max-w-3xl space-y-10">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("settings.title") || "Settings"}
        </h1>

        <section className="space-y-4">
          <h2 className="text-sm font-medium text-base-content/50">
            {t("settings.appearance") || "Appearance & Language"}
          </h2>

          <div className="flex items-center justify-between gap-6 border-b border-base-200 pb-4">
            <div>
              <span className="text-sm font-medium">{t("settings.theme") || "Theme"}</span>
              <p className="text-xs text-base-content/60 mt-0.5">
                Customize how Findable looks on your device
              </p>
            </div>
            <div
              role="radiogroup"
              aria-label="Theme preference"
              className="flex gap-0.5 rounded-lg bg-base-200 p-0.5"
            >
              {THEME_OPTIONS.map((option) => {
                const isActive = option.value === themePreference;
                const Icon = option.icon;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    aria-label={option.label}
                    className={`flex cursor-pointer items-center justify-center rounded-md px-3 py-1.5 transition-colors ${
                      isActive
                        ? "bg-base-100 text-base-content shadow-sm"
                        : "text-base-content/50 hover:text-base-content/80"
                    }`}
                    onClick={() => setThemePreference(option.value)}
                  >
                    <Icon className="size-4" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5">
                <Globe className="size-4 text-primary" />
                <span className="text-sm font-medium">
                  {t("settings.language") || "Interface Language"}
                </span>
              </div>
              <p className="text-xs text-base-content/60 mt-0.5">
                {t("settings.languageDesc") || "Choose the language used for the application interface."}
              </p>
            </div>
            <select
              value={language}
              onChange={(e) => {
                const nextLang = e.target.value as SupportedLocale;
                setLanguage(nextLang);
                toast.success(`Language set to ${LANGUAGE_OPTIONS.find(o => o.value === nextLang)?.nativeName || nextLang}`);
              }}
              className="select select-bordered select-sm w-full sm:w-48 font-medium"
              aria-label="Interface Language"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.nativeName} ({opt.label})
                </option>
              ))}
            </select>
          </div>
        </section>

        {isHosted ? (
          <>
            <ApiKeySettings />

            <section className="space-y-3">
              <h2 className="text-sm font-medium text-base-content/50">
                {t("settings.analytics") || "Analytics"}
              </h2>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm">{t("settings.helpImprove") || `Help improve ${BRAND.name}`}</p>
                  <p className="mt-1 text-sm text-base-content/60">
                    {t("settings.shareAnalytics") || "Share analytics and usage data."}
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={analyticsEnabled}
                  disabled={isSessionPending || isSaving || !session?.user}
                  onChange={(event) => {
                    void updateAnalyticsPreference(event.currentTarget.checked);
                  }}
                  aria-label="Enable product analytics"
                />
              </div>
            </section>
          </>
        ) : (
          <section className="space-y-3">
            <h2 className="text-sm font-medium text-base-content/50">
              {t("settings.about") || "About"}
            </h2>
            <div className="flex items-center justify-between gap-6">
              <span className="text-sm">{t("settings.version") || "Version"}</span>
              <span className="font-mono text-sm text-base-content/60">
                v{version}
              </span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

