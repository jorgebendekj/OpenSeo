import { useState } from "react";
import { Sparkles, Loader2, X, CheckCircle2, BookOpen, Layers, Target, Globe } from "lucide-react";
import { generateArticleServerFn } from "@/serverFunctions/articles";
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
  const [keyword, setKeyword] = useState(initialKeyword);
  const [format, setFormat] = useState<NonNullable<GenerateArticleInput["format"]>>("ultimate_guide");
  const [targetAudience, setTargetAudience] = useState("Buyers, decision makers & practitioners looking for the best solutions");
  const [secondaryKeywordsText, setSecondaryKeywordsText] = useState("");
  const [tone, setTone] = useState<"authoritative" | "conversational" | "educational" | "persuasive">("authoritative");
  const [languageCode, setLanguageCode] = useState("en");
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
          locationCode: 2840,
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
            <h2 className="text-lg font-bold">1-Click AI Article Generator</h2>
            <p className="text-xs text-base-content/60">
              Generates high-ranking 1,800–2,800 word articles formatted with Key Takeaways, Tables, GEO Direct Answers & FAQ Schema.
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
              Primary Target Keyword <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              disabled={isGenerating}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. best ai seo tools 2026"
              className="input input-bordered w-full text-sm font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-base-content/80 block mb-1">
              Article Structure & Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                {
                  id: "ultimate_guide" as const,
                  title: "📘 Ultimate Pillar Guide",
                  desc: "Comprehensive breakdown, tables & implementation",
                },
                {
                  id: "how_to" as const,
                  title: "🛠️ Step-by-Step Tutorial",
                  desc: "Chronological guide with prerequisites & pitfalls",
                },
                {
                  id: "listicle" as const,
                  title: "🏆 Ranked List / Top Solutions",
                  desc: "Ranked options, pros/cons, metrics & verdict",
                },
                {
                  id: "comparison" as const,
                  title: "⚖️ Head-to-Head Comparison",
                  desc: "Side-by-side feature matrix & decision guide",
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
                Tone of Voice
              </label>
              <select
                disabled={isGenerating}
                value={tone}
                onChange={(e) => setTone(e.target.value as typeof tone)}
                className="select select-bordered w-full text-xs"
              >
                <option value="authoritative">Authoritative (Expert)</option>
                <option value="conversational">Conversational (Engaging)</option>
                <option value="educational">Educational (Step-by-step)</option>
                <option value="persuasive">Persuasive (Conversion)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-base-content/80 block mb-1">
                Language
              </label>
              <select
                disabled={isGenerating}
                value={languageCode}
                onChange={(e) => setLanguageCode(e.target.value)}
                className="select select-bordered w-full text-xs"
              >
                <option value="en">English (US)</option>
                <option value="es">Spanish (Español)</option>
                <option value="de">German (Deutsch)</option>
                <option value="fr">French (Français)</option>
                <option value="pt">Portuguese (Português)</option>
                <option value="it">Italian (Italiano)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-base-content/80 block mb-1">
              Secondary / Semantic Keywords <span className="text-base-content/50 font-normal">(Optional, comma separated)</span>
            </label>
            <input
              type="text"
              disabled={isGenerating}
              value={secondaryKeywordsText}
              onChange={(e) => setSecondaryKeywordsText(e.target.value)}
              placeholder="e.g. pricing, features, best alternatives, ROI"
              className="input input-bordered w-full text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-base-content/80 block mb-1">
              Target Audience Profile
            </label>
            <input
              type="text"
              disabled={isGenerating}
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. founders, developers, marketing teams, enterprise buyers"
              className="input input-bordered w-full text-xs"
            />
          </div>

          {/* Inclusions summary pill */}
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-3 text-xs space-y-1">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">
              ✨ Included in generated article:
            </span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-base-content/70">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                <span>Executive Summary Callout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                <span>GEO Direct Answers (AI Search)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                <span>Markdown Comparison Tables</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                <span>Valid FAQ JSON-LD Schema</span>
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
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating || !keyword.trim()}
              className="btn btn-primary btn-sm px-5"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="size-3.5 animate-spin mr-1.5" />
                  Generating Article (~30s)...
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5 mr-1.5" />
                  Generate Ranking Article
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
