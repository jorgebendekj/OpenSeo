import { useState } from "react";
import { Sparkles, Loader2, X, CheckCircle2 } from "lucide-react";
import { generateArticleServerFn } from "@/serverFunctions/articles";
import { useLanguagePreference } from "@/client/lib/language";
import type { ArticleRecord, GenerateArticleInput } from "@/types/schemas/articles";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  initialKeyword?: string;
  searchIntent?: string;
  serpContext?: Array<{ rank: number; title?: string | null; url: string; domain: string }>;
  onArticleGenerated?: (article: ArticleRecord) => void;
};

export function GenerateArticleModal({
  isOpen,
  onClose,
  projectId,
  initialKeyword = "",
  searchIntent = "Informational / Commercial",
  serpContext,
  onArticleGenerated,
}: Props) {
  const { t, language } = useLanguagePreference();
  const [keyword, setKeyword] = useState(initialKeyword);
  const [format, setFormat] = useState<NonNullable<GenerateArticleInput["format"]>>("ultimate_guide");
  const [targetAudience, setTargetAudience] = useState("Buyers, decision makers & practitioners looking for the best solutions");
  const [secondaryKeywordsText, setSecondaryKeywordsText] = useState("");
  const [tone, setTone] = useState<"authoritative" | "conversational" | "educational" | "persuasive">("authoritative");
  const [languageCode, setLanguageCode] = useState(language === "pl" ? "pl" : language === "es" ? "es" : "en");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!keyword.trim()) return;

    setError(null);
    setIsGenerating(true);

    const secondaryKeywords = secondaryKeywordsText
      .split(/[,;\n]/)
      .map((k) => k.trim())
      .filter(Boolean);

    try {
      const generated = await generateArticleServerFn({
        data: {
          projectId,
          keyword: keyword.trim(),
          format,
          secondaryKeywords: secondaryKeywords.length > 0 ? secondaryKeywords : undefined,
          languageCode,
          locationCode: languageCode === "pl" ? 2616 : languageCode === "es" ? 2724 : 2840,
          targetAudience,
          searchIntent,
          tone,
          serpContext,
        },
      });

      setIsGenerating(false);
      if (onArticleGenerated) {
        onArticleGenerated(generated);
      }
      onClose();
    } catch (err) {
      console.error("Failed to generate article:", err);
      setError(err instanceof Error ? err.message : "Failed to generate article. Please try again.");
      setIsGenerating(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-base-100 border border-base-300 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 relative max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          disabled={isGenerating}
          className="btn btn-ghost btn-sm btn-circle absolute top-4 right-4 text-base-content/60 hover:text-base-content"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{t("articles.modalTitle")}</h2>
            <p className="text-xs text-base-content/60">
              {t("articles.modalSubtitle")}
            </p>
          </div>
        </div>

        {error ? (
          <div className="p-3 bg-error/10 border border-error/20 text-error rounded-xl text-xs">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-base-content/80 block mb-1">
              {t("articles.primaryKeyword")} <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              disabled={isGenerating}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={t("articles.primaryKeywordPlaceholder")}
              className="input input-bordered w-full text-sm font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-base-content/80 block mb-1">
              {t("articles.formatLabel")}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                {
                  id: "ultimate_guide" as const,
                  title: t("articles.formatUltimateGuide"),
                  desc: t("articles.formatUltimateGuideDesc"),
                },
                {
                  id: "how_to" as const,
                  title: t("articles.formatHowTo"),
                  desc: t("articles.formatHowToDesc"),
                },
                {
                  id: "listicle" as const,
                  title: t("articles.formatListicle"),
                  desc: t("articles.formatListicleDesc"),
                },
                {
                  id: "comparison" as const,
                  title: t("articles.formatComparison"),
                  desc: t("articles.formatComparisonDesc"),
                },
              ].map((fmt) => (
                <label
                  key={fmt.id}
                  className={`flex flex-col p-2.5 rounded-xl border cursor-pointer transition-all ${
                    format === fmt.id
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-base-300 hover:border-base-content/30 bg-base-100 text-base-content"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{fmt.title}</span>
                    <input
                      type="radio"
                      name="article_format"
                      value={fmt.id}
                      checked={format === fmt.id}
                      onChange={() => setFormat(fmt.id)}
                      className="radio radio-primary radio-xs"
                    />
                  </div>
                  <span className="text-[11px] text-base-content/60 mt-0.5 leading-tight">
                    {fmt.desc}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-base-content/80 block mb-1">
                {t("articles.toneLabel")}
              </label>
              <select
                disabled={isGenerating}
                value={tone}
                onChange={(e) => setTone(e.target.value as typeof tone)}
                className="select select-bordered w-full text-xs"
              >
                <option value="authoritative">{t("articles.toneAuthoritative")}</option>
                <option value="conversational">{t("articles.toneConversational")}</option>
                <option value="educational">{t("articles.toneEducational")}</option>
                <option value="persuasive">{t("articles.tonePersuasive")}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-base-content/80 block mb-1">
                {t("articles.langLabel")}
              </label>
              <select
                disabled={isGenerating}
                value={languageCode}
                onChange={(e) => setLanguageCode(e.target.value)}
                className="select select-bordered w-full text-xs"
              >
                <option value="en">English (US)</option>
                <option value="pl">Polski (Polska)</option>
                <option value="es">Español (España/LatAm)</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
                <option value="it">Italiano</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-base-content/80 block mb-1">
              {t("articles.secondaryKeywords")}{" "}
              <span className="text-base-content/50 font-normal">{t("articles.secondaryKeywordsOptional")}</span>
            </label>
            <input
              type="text"
              disabled={isGenerating}
              value={secondaryKeywordsText}
              onChange={(e) => setSecondaryKeywordsText(e.target.value)}
              placeholder={t("articles.secondaryKeywordsPlaceholder")}
              className="input input-bordered w-full text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-base-content/80 block mb-1">
              {t("articles.targetAudience")}
            </label>
            <input
              type="text"
              disabled={isGenerating}
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder={t("articles.targetAudiencePlaceholder")}
              className="input input-bordered w-full text-xs"
            />
          </div>

          {/* Inclusions summary pill */}
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-3 text-xs space-y-1">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">
              {t("articles.includedTitle")}
            </span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-base-content/70">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                <span>{t("articles.includedSummary")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                <span>{t("articles.includedGeo")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                <span>{t("articles.includedTables")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                <span>{t("articles.includedSchema")}</span>
              </div>
            </div>
          </div>

          {serpContext && serpContext.length > 0 ? (
            <div className="bg-base-200/50 rounded-xl p-3 border border-base-300 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-primary">
                <CheckCircle2 className="size-3.5" />
                <span>Synthesizing top {serpContext.length} competitor SERP pages</span>
              </div>
              <p className="text-[11px] text-base-content/60">
                Outranking live competitors by filling topical gaps and answering search intent comprehensively.
              </p>
            </div>
          ) : null}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              disabled={isGenerating}
              onClick={onClose}
              className="btn btn-ghost btn-sm"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={isGenerating || !keyword.trim()}
              className="btn btn-primary btn-sm px-5"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="size-3.5 animate-spin mr-1.5" />
                  {t("articles.generating")}
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5 mr-1.5" />
                  {t("articles.generateBtn")}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
