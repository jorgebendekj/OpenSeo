import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Sparkles,
  FileText,
  Search,
  BookOpen,
  Calendar,
  ExternalLink,
  Plus,
  Loader2,
  Trash2,
} from "lucide-react";
import { getArticlesServerFn, deleteArticleServerFn } from "@/serverFunctions/articles";
import { useLanguagePreference } from "@/client/lib/language";
import { GenerateArticleModal } from "./GenerateArticleModal";
import { ArticleDetailModal } from "./ArticleDetailModal";
import type { ArticleRecord } from "@/types/schemas/articles";

export function ArticlesPage({ projectId }: { projectId: string }) {
  const { t } = useLanguagePreference();
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleRecord | null>(null);

  const articlesQuery = useQuery({
    queryKey: ["articles", projectId],
    queryFn: async () => {
      return getArticlesServerFn({
        data: { projectId },
      });
    },
  });

  const articles = articlesQuery.data ?? [];
  const filteredArticles = articles.filter((a) => {
    const q = searchTerm.toLowerCase();
    return (
      a.keyword.toLowerCase().includes(q) ||
      a.title.toLowerCase().includes(q) ||
      (a.slug && a.slug.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-base-300 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-base-content">
              {t("articles.title")}
            </h1>
            <span className="badge badge-primary badge-sm font-semibold">
              {t("articles.autopilotBadge")}
            </span>
          </div>
          <p className="text-xs text-base-content/60 mt-1">
            {t("articles.subtitle")}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsGenerateModalOpen(true)}
          className="btn btn-primary btn-sm gap-1.5 shadow-sm self-start sm:self-auto"
        >
          <Sparkles className="size-3.5" />
          {t("articles.writeNew")}
        </button>
      </div>

      {/* Filter / Search Bar */}
      {articles.length > 0 ? (
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("articles.searchPlaceholder")}
              className="input input-bordered input-sm w-full pl-9 text-xs"
            />
          </div>
          <div className="text-xs text-base-content/50">
            {t("articles.showingCount", {
              filtered: filteredArticles.length,
              total: articles.length,
            })}
          </div>
        </div>
      ) : null}

      {/* Content / Table */}
      {articlesQuery.isLoading ? (
        <div className="flex flex-col items-center justify-center p-16 space-y-3">
          <Loader2 className="size-6 animate-spin text-primary" />
          <p className="text-xs text-base-content/60">{t("articles.loading")}</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="rounded-2xl border border-base-300 bg-base-100/50 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Sparkles className="size-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-base-content">{t("articles.emptyTitle")}</h3>
            <p className="text-xs text-base-content/60 mt-1 leading-relaxed">
              {t("articles.emptySubtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsGenerateModalOpen(true)}
            className="btn btn-primary btn-sm gap-1.5"
          >
            <Sparkles className="size-3.5" />
            {t("articles.generateFirst")}
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow-xs">
          <table className="table table-sm w-full">
            <thead>
              <tr className="bg-base-200/50 text-xs text-base-content/70">
                <th>{t("articles.colTitle")}</th>
                <th className="text-center w-28">{t("articles.colLength")}</th>
                <th className="text-center w-28">{t("articles.colStatus")}</th>
                <th className="text-center w-36">{t("articles.colCreated")}</th>
                <th className="text-right w-24">{t("articles.colActions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="hover:bg-base-200/40 cursor-pointer transition-colors"
                >
                  <td className="min-w-0 max-w-md py-3">
                    <div className="space-y-1">
                      <div className="font-semibold text-sm text-base-content hover:text-primary transition-colors flex items-center gap-1.5">
                        <FileText className="size-3.5 shrink-0 text-primary" />
                        <span className="truncate">{article.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge badge-soft badge-primary badge-xs">
                          {article.keyword}
                        </span>
                        <span className="text-[11px] text-base-content/40 font-mono truncate">
                          /{article.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="text-center text-xs text-base-content/70 tabular-nums">
                    {t("articles.wordsCount", { count: article.wordCount.toLocaleString() })}
                  </td>

                  <td className="text-center">
                    <span className="badge badge-success badge-xs font-medium">
                      {t("articles.statusReady")}
                    </span>
                  </td>

                  <td className="text-center text-xs text-base-content/50 tabular-nums">
                    {article.createdAt?.slice(0, 10)}
                  </td>

                  <td className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => setSelectedArticle(article)}
                        className="btn btn-ghost btn-xs text-primary"
                        title={t("articles.viewArticle")}
                      >
                        <BookOpen className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm(`${t("articles.deleteArticle")} "${article.title}"?`)) {
                            await deleteArticleServerFn({
                              data: { projectId, articleId: article.id },
                            });
                            void articlesQuery.refetch();
                          }
                        }}
                        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                        title={t("articles.deleteArticle")}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <GenerateArticleModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        projectId={projectId}
        onArticleGenerated={(article) => {
          void articlesQuery.refetch();
          setSelectedArticle(article);
        }}
      />

      <ArticleDetailModal
        article={selectedArticle}
        isOpen={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
        onDeleted={() => {
          void articlesQuery.refetch();
        }}
      />
    </div>
  );
}
