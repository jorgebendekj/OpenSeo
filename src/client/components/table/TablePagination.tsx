import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguagePreference } from "@/client/lib/language";

type Props = {
  page: number;
  pageSize: number;
  pageSizes: readonly number[];
  totalCount: number | null;
  hasNextPage: boolean;
  isLoading: boolean;
  onPageChange: (nextPage: number) => void;
  onPageSizeChange: (nextPageSize: number) => void;
};

export function TablePagination({
  page,
  pageSize,
  pageSizes,
  totalCount,
  hasNextPage,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const { t } = useLanguagePreference();
  const totalPages =
    totalCount != null ? Math.max(1, Math.ceil(totalCount / pageSize)) : null;
  const canGoPrev = page > 1;
  const canGoNext = totalPages != null ? page < totalPages : hasNextPage;

  const start = (page - 1) * pageSize + 1;
  let rangeStr = "";
  if (totalCount == null) {
    rangeStr = `${start.toLocaleString()}–${(start + pageSize - 1).toLocaleString()}`;
  } else if (totalCount === 0) {
    rangeStr = "0";
  } else {
    const end = Math.min(totalCount, start + pageSize - 1);
    rangeStr = t("common.showingOf", {
      start: start.toLocaleString(),
      end: end.toLocaleString(),
      total: totalCount.toLocaleString(),
    });
  }

  const pageStr =
    totalPages != null
      ? t("common.pageOf", {
          page: page.toLocaleString(),
          total: totalPages.toLocaleString(),
        })
      : `Page ${page.toLocaleString()}`;

  return (
    <div className="flex flex-col gap-3 border-t border-base-300 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm text-base-content/70 tabular-nums">
        <span>{rangeStr}</span>
        {isLoading ? (
          <span className="loading loading-spinner loading-xs" />
        ) : null}
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-base-content/70">
          <span className="whitespace-nowrap">{t("common.rowsPerPage")}</span>
          <select
            className="select select-bordered select-sm w-20"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm tabular-nums text-base-content/70">
            {pageStr}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous page"
              className="btn btn-ghost btn-sm btn-square"
              disabled={!canGoPrev || isLoading}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next page"
              className="btn btn-ghost btn-sm btn-square"
              disabled={!canGoNext || isLoading}
              onClick={() => onPageChange(page + 1)}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
