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
import { GenerateArticleModal } from "./GenerateArticleModal";
import { ArticleDetailModal } from "./ArticleDetailModal";
import type { ArticleRecord } from "@/types/schemas/articles";

export function ArticlesPage({ projectId }: { projectId: string }) {
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
              AI Articles & Content
            </h1>
            <span className="badge badge-primary badge-sm font-semibold">
              ⚡ 1-Click Autopilot
            </span>
          </div>
          <p className="text-xs text-base-content/60 mt-1">
            Generate 1,500–2,500 word ranking articles optimized for Google, ChatGPT & Perplexity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsGenerateModalOpen(true)}
          className="btn btn-primary btn-sm gap-1.5 shadow-sm self-start sm:self-auto"
        >
          <Sparkles className="size-3.5" />
          Write New Article
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
              placeholder="Search articles by keyword or title..."
              className="input input-bordered input-sm w-full pl-9 text-xs"
            />
          </div>
          <div className="text-xs text-base-content/50">
            Showing {filteredArticles.length} of {articles.length} articles
          </div>
        </div>
      ) : null}

      {/* Content / Table */}
      {articlesQuery.isLoading ? (
        <div className="flex flex-col items-center justify-center p-16 space-y-3">
          <Loader2 className="size-6 animate-spin text-primary" />
          <p className="text-xs text-base-content/60">Loading your articles...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="rounded-2xl border border-base-300 bg-base-100/50 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Sparkles className="size-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-base-content">No articles generated yet</h3>
            <p className="text-xs text-base-content/60 mt-1 leading-relaxed">
              Create your first SEO & AI-search optimized article from any keyword in seconds.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsGenerateModalOpen(true)}
            className="btn btn-primary btn-sm gap-1.5"
          >
            <Sparkles className="size-3.5" />
            Generate Your First Article
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow-xs">
          <table className="table table-sm w-full">
            <thead>
              <tr className="bg-base-200/50 text-xs text-base-content/70">
                <th>Article Title & Keyword</th>
                <th className="text-center w-28">Length</th>
                <th className="text-center w-28">Status</th>
                <th className="text-center w-36">Created</th>
                <th className="text-right w-24">Actions</th>
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
                    {article.wordCount.toLocaleString()} words
                  </td>

                  <td className="text-center">
                    <span className="badge badge-success badge-xs font-medium">
                      Ready
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
                        title="View Article"
                      >
                        <BookOpen className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm(`Delete article "${article.title}"?`)) {
                            await deleteArticleServerFn({
                              data: { projectId, articleId: article.id },
                            });
                            void articlesQuery.refetch();
                          }
                        }}
                        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                        title="Delete Article"
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
