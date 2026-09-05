import { useState, useRef } from "react";
import {
  X,
  Copy,
  Check,
  Download,
  Code,
  FileText,
  Trash2,
  BookOpen,
  Sparkles,
  Share2,
  Clock,
  Eye,
  CheckCircle2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ArticleRecord } from "@/types/schemas/articles";
import { deleteArticleServerFn } from "@/serverFunctions/articles";

type Props = {
  article: ArticleRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleted?: (articleId: string) => void;
};

export function ArticleDetailModal({
  article,
  isOpen,
  onClose,
  onDeleted,
}: Props) {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"article" | "seo" | "schema">("article");
  const [isDeleting, setIsDeleting] = useState(false);
  const articleContentRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !article) return null;

  const readingTimeMinutes = Math.max(1, Math.round(article.wordCount / 225));

  async function copyToClipboard(text: string, type: string) {
    await navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  }

  async function copyRichText() {
    if (!article) return;
    if (!articleContentRef.current) {
      await copyToClipboard(article.contentMarkdown, "markdown");
      return;
    }

    try {
      const html = articleContentRef.current.innerHTML;
      const text = articleContentRef.current.innerText;
      const blobHtml = new Blob([html], { type: "text/html" });
      const blobText = new Blob([text], { type: "text/plain" });
      const item = new ClipboardItem({
        "text/html": blobHtml,
        "text/plain": blobText,
      });
      await navigator.clipboard.write([item]);
      setCopiedType("rich");
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      await copyToClipboard(article.contentMarkdown, "markdown");
    }
  }

  function downloadMarkdown() {
    if (!article) return;
    const element = document.createElement("a");
    const file = new Blob([article.contentMarkdown], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${article.slug || "article"}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function downloadHtml() {
    if (!article) return;
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${article.title}</title>
  <meta name="description" content="${article.metaDescription ?? ""}">
  ${article.faqSchema ? `<script type="application/ld+json">${article.faqSchema}</script>` : ""}
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1f2937; }
    h1, h2, h3 { color: #111827; }
    blockquote { border-left: 4px solid #0C5C55; background: #f0fdf4; padding: 12px 16px; margin: 20px 0; border-radius: 0 8px 8px 0; }
    table { width: 100%; border-collapse: collapse; margin: 24px 0; }
    th, td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; }
    th { background: #f9fafb; font-weight: 600; }
  </style>
</head>
<body>
${articleContentRef.current?.innerHTML ?? article.contentMarkdown}
</body>
</html>`;
    const element = document.createElement("a");
    const file = new Blob([fullHtml], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = `${article.slug || "article"}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  async function handleDelete() {
    if (!article) return;
    if (!confirm("Are you sure you want to delete this article?")) return;

    setIsDeleting(true);
    try {
      await deleteArticleServerFn({
        data: {
          projectId: article.projectId,
          articleId: article.id,
        },
      });
      if (onDeleted) {
        onDeleted(article.id);
      }
      onClose();
    } catch (err) {
      console.error("Failed to delete article:", err);
      alert("Failed to delete article");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-base-100 border border-base-300 rounded-2xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-base-300 flex items-center justify-between shrink-0 bg-base-100">
          <div className="min-w-0 pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="badge badge-primary badge-sm font-semibold">
                🎯 {article.keyword}
              </span>
              <span className="badge badge-ghost badge-sm text-base-content/70">
                📊 {article.wordCount.toLocaleString()} words
              </span>
              <span className="badge badge-ghost badge-sm text-base-content/70 flex items-center gap-1">
                <Clock className="size-3" /> ~{readingTimeMinutes} min read
              </span>
              <span className="badge badge-soft badge-sm text-success border border-success/30 font-medium">
                ✨ Ready to Publish
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold truncate text-base-content" title={article.title}>
              {article.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Copy options dropdown */}
            <div className="dropdown dropdown-end">
              <button
                type="button"
                tabIndex={0}
                className="btn btn-primary btn-sm gap-1.5 font-semibold"
              >
                {copiedType === "rich" ? (
                  <>
                    <Check className="size-3.5" /> Copied Rich Text!
                  </>
                ) : copiedType === "markdown" ? (
                  <>
                    <Check className="size-3.5" /> Copied Markdown!
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" /> Copy / Export
                  </>
                )}
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-56 border border-base-300 z-50 text-xs mt-1"
              >
                <li>
                  <button type="button" onClick={copyRichText} className="font-semibold">
                    📋 Copy formatted (WordPress/Docs)
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => copyToClipboard(article.contentMarkdown, "markdown")}>
                    📝 Copy raw Markdown
                  </button>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button type="button" onClick={downloadMarkdown}>
                    <Download className="size-3.5" /> Download .md file
                  </button>
                </li>
                <li>
                  <button type="button" onClick={downloadHtml}>
                    <Code className="size-3.5" /> Download .html page
                  </button>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="btn btn-ghost btn-sm text-error hover:bg-error/10"
              title="Delete Article"
            >
              <Trash2 className="size-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle text-base-content/60"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="px-5 border-b border-base-300 flex gap-4 text-xs font-semibold shrink-0 bg-base-200/40">
          <button
            type="button"
            onClick={() => setActiveTab("article")}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === "article"
                ? "border-primary text-primary"
                : "border-transparent text-base-content/60 hover:text-base-content"
            }`}
          >
            <BookOpen className="size-3.5" />
            Formatted Article
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === "seo"
                ? "border-primary text-primary"
                : "border-transparent text-base-content/60 hover:text-base-content"
            }`}
          >
            <FileText className="size-3.5" />
            SEO & SERP Preview
          </button>
          {article.faqSchema ? (
            <button
              type="button"
              onClick={() => setActiveTab("schema")}
              className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === "schema"
                  ? "border-primary text-primary"
                  : "border-transparent text-base-content/60 hover:text-base-content"
              }`}
            >
              <Code className="size-3.5" />
              FAQ Schema (JSON-LD)
            </button>
          ) : null}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-base-100">
          {activeTab === "article" ? (
            <div
              ref={articleContentRef}
              className="max-w-3xl mx-auto font-sans leading-relaxed text-base-content"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content mt-2 mb-4 pb-3 border-b border-base-300"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-xl sm:text-2xl font-bold tracking-tight text-base-content mt-8 mb-3 pb-1 border-b border-base-200"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-lg font-bold text-base-content mt-6 mb-2"
                      {...props}
                    />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4
                      className="text-base font-semibold text-base-content mt-4 mb-1"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="text-base-content/85 text-sm sm:text-base leading-relaxed my-3"
                      {...props}
                    />
                  ),
                  blockquote: ({ node, children, ...props }) => {
                    return (
                      <div className="my-5 rounded-xl border-l-4 border-[#0C5C55] bg-emerald-50/70 dark:bg-emerald-950/20 p-4 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 shadow-2xs">
                        {children}
                      </div>
                    );
                  },
                  table: ({ node, ...props }) => (
                    <div className="my-6 overflow-x-auto rounded-xl border border-base-300 shadow-2xs">
                      <table
                        className="table table-zebra table-sm w-full text-xs font-sans"
                        {...props}
                      />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="bg-base-200/90 font-bold text-base-content py-2.5 px-3 border-b border-base-300 text-left"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="py-2.5 px-3 border-b border-base-200 text-left"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="list-disc list-outside space-y-1.5 my-3 pl-5 text-sm sm:text-base text-base-content/85"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      className="list-decimal list-outside space-y-1.5 my-3 pl-5 text-sm sm:text-base text-base-content/85"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="leading-relaxed" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong
                      className="font-bold text-base-content"
                      {...props}
                    />
                  ),
                  code: ({ node, className, ...props }) => (
                    <code
                      className="px-1.5 py-0.5 rounded-md bg-base-200 font-mono text-xs text-primary font-medium"
                      {...props}
                    />
                  ),
                }}
              >
                {article.contentMarkdown}
              </ReactMarkdown>
            </div>
          ) : activeTab === "seo" ? (
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="rounded-xl border border-base-300 p-5 bg-base-200/30 space-y-2.5">
                <span className="text-xs font-bold text-base-content/60 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="size-3.5 text-primary" /> Google SERP Preview
                </span>
                <div className="space-y-1 bg-white dark:bg-base-100 p-4 rounded-xl border border-base-300">
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 truncate font-mono">
                    https://example.com/{article.slug}
                  </div>
                  <h3 className="text-base font-semibold text-primary hover:underline cursor-pointer leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-base-content/80 leading-relaxed">
                    {article.metaDescription}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-base-content/80">
                      SEO Title ({article.title.length} characters)
                    </label>
                    <span className={article.title.length <= 60 ? "text-success" : "text-warning"}>
                      {article.title.length <= 60 ? "✓ Optimal length" : "⚠️ May truncate in SERPs"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      readOnly
                      value={article.title}
                      className="input input-bordered input-sm w-full font-mono text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => copyToClipboard(article.title, "title")}
                      className="btn btn-sm btn-soft"
                    >
                      {copiedType === "title" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-base-content/80 block mb-1">
                    URL Slug
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      readOnly
                      value={article.slug}
                      className="input input-bordered input-sm w-full font-mono text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => copyToClipboard(article.slug, "slug")}
                      className="btn btn-sm btn-soft"
                    >
                      {copiedType === "slug" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-base-content/80">
                      Meta Description ({article.metaDescription?.length ?? 0} characters)
                    </label>
                    <span className="text-success">
                      ✓ Optimized for CTR
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <textarea
                      readOnly
                      rows={3}
                      value={article.metaDescription ?? ""}
                      className="textarea textarea-bordered w-full font-mono text-xs leading-relaxed"
                    />
                    <button
                      type="button"
                      onClick={() => copyToClipboard(article.metaDescription ?? "", "desc")}
                      className="btn btn-sm btn-soft self-start"
                    >
                      {copiedType === "desc" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-base-content/70 font-semibold">
                  Paste this JSON-LD schema into your page's &lt;head&gt; or schema block:
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(article.faqSchema ?? "", "schema")}
                  className="btn btn-primary btn-sm gap-1.5"
                >
                  {copiedType === "schema" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  Copy JSON-LD
                </button>
              </div>
              <pre className="bg-base-300/60 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-base-300 max-h-[60vh]">
                <code>{article.faqSchema}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
