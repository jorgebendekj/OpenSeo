import { useMemo, useState } from "react";
import {
  createColumnHelper,
  type ColumnDef,
  type RowSelectionState,
} from "@tanstack/react-table";
import { Sparkles } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import {
  AppDataTable,
  makeSelectionColumn,
  useAppTable,
  useSelectionAnchor,
} from "@/client/components/table/AppDataTable";
import {
  IntentBadge,
  SortHeader,
  type SortDir,
  type SortField,
} from "@/client/features/keywords/components";
import { DifficultyBadge } from "@/client/features/domain/components/DifficultyBadge";
import { formatNumber } from "@/client/features/keywords/utils";
import { GenerateArticleModal } from "@/client/features/articles/GenerateArticleModal";
import { useLanguagePreference } from "@/client/lib/language";
import type { KeywordResearchRow } from "@/types/keywords";
import { EmptyFilterResults } from "./keywordResearchFilters";

type Props = {
  activeFilterCount: number;
  filteredRows: KeywordResearchRow[];
  handleRowClick: (row: KeywordResearchRow) => void;
  overviewKeyword: KeywordResearchRow | null;
  resetFilters: () => void;
  selectedRows: Set<string>;
  setSelectedRows: (rows: Set<string>) => void;
  sortDir: SortDir;
  sortField: SortField;
  toggleSort: (field: SortField) => void;
};

const columnHelper = createColumnHelper<KeywordResearchRow>();

export function KeywordResearchDesktopTable({
  activeFilterCount,
  filteredRows,
  handleRowClick,
  overviewKeyword,
  resetFilters,
  selectedRows,
  setSelectedRows,
  sortDir,
  sortField,
  toggleSort,
}: Props) {
  const { t } = useLanguagePreference();
  const selectAnchorRef = useSelectionAnchor();
  const params = useParams({ strict: false }) as { projectId?: string };
  const projectId = params.projectId;
  const [modalKeyword, setModalKeyword] = useState<string | null>(null);
  const [modalIntent, setModalIntent] = useState<string | null>(null);

  const rowSelection = useMemo<RowSelectionState>(() => {
    const state: RowSelectionState = {};
    for (const keyword of selectedRows) {
      state[keyword] = true;
    }
    return state;
  }, [selectedRows]);

  const columns = useMemo<ColumnDef<KeywordResearchRow>[]>(
    () => [
      makeSelectionColumn<KeywordResearchRow>(selectAnchorRef),
      columnHelper.accessor("keyword", {
        header: () => (
          <SortHeader
            label={t("keywords.colKeyword")}
            field="keyword"
            current={sortField}
            dir={sortDir}
            onToggle={toggleSort}
          />
        ),
        cell: (info) => (
          <span className="font-medium text-base-content">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("searchVolume", {
        header: () => (
          <SortHeader
            label={t("keywords.colVolume")}
            field="searchVolume"
            current={sortField}
            dir={sortDir}
            onToggle={toggleSort}
            className="justify-end"
          />
        ),
        cell: (info) => (
          <span className="text-right block font-mono text-xs">
            {formatNumber(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("cpc", {
        header: () => (
          <SortHeader
            label={t("keywords.colCpc")}
            field="cpc"
            current={sortField}
            dir={sortDir}
            onToggle={toggleSort}
            className="justify-end"
          />
        ),
        cell: (info) => {
          const val = info.getValue();
          return (
            <span className="text-right block font-mono text-xs text-base-content/70">
              {val != null ? `$${val.toFixed(2)}` : "—"}
            </span>
          );
        },
      }),
      columnHelper.accessor("competition", {
        header: () => (
          <SortHeader
            label={t("keywords.colComp")}
            field="competition"
            current={sortField}
            dir={sortDir}
            onToggle={toggleSort}
            className="justify-end"
          />
        ),
        cell: (info) => {
          const val = info.getValue();
          return (
            <span className="text-right block font-mono text-xs text-base-content/70">
              {val != null ? val.toFixed(2) : "—"}
            </span>
          );
        },
      }),
      columnHelper.accessor("keywordDifficulty", {
        header: () => (
          <SortHeader
            label={t("keywords.colScore")}
            field="keywordDifficulty"
            current={sortField}
            dir={sortDir}
            onToggle={toggleSort}
            className="justify-center"
          />
        ),
        cell: (info) => (
          <div className="flex justify-center">
            <DifficultyBadge value={info.getValue()} />
          </div>
        ),
      }),
      columnHelper.accessor("intent", {
        header: () => (
          <span className="text-xs font-semibold text-base-content/70">
            {t("keywords.colIntent")}
          </span>
        ),
        cell: (info) => <IntentBadge intent={info.getValue()} />,
      }),
      columnHelper.display({
        id: "actions",
        header: () => (
          <span className="text-xs font-semibold text-base-content/70">
            {t("keywords.colActions")}
          </span>
        ),
        cell: (info) => {
          if (!projectId) return null;
          const row = info.row.original;
          return (
            <button
              type="button"
              className="btn btn-ghost btn-xs gap-1 text-primary hover:bg-primary/10"
              onClick={(e) => {
                e.stopPropagation();
                setModalKeyword(row.keyword);
                setModalIntent(row.intent ?? null);
              }}
              title="Generate AI Article"
            >
              <Sparkles className="size-3" />
              {t("keywords.writeBtn")}
            </button>
          );
        },
      }),
    ],
    [
      selectAnchorRef,
      sortField,
      sortDir,
      toggleSort,
      projectId,
      t,
    ],
  );

  const table = useAppTable({
    data: filteredRows,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setSelectedRows(
        new Set(
          Object.entries(next)
            .filter(([, selected]) => selected)
            .map(([keyword]) => keyword),
        ),
      );
    },
    getRowId: (row) => row.keyword,
    enableRowSelection: true,
  });

  return (
    <div className="flex-1 min-h-0">
      {filteredRows.length === 0 ? (
        <EmptyFilterResults
          activeFilterCount={activeFilterCount}
          resetFilters={resetFilters}
        />
      ) : (
        <AppDataTable
          table={table}
          className="table table-xs min-w-max md:w-full"
          wrapperClassName="h-full overflow-auto"
          getRowProps={(row) => ({
            className: `cursor-pointer border-b border-base-200 hover:bg-base-200/50 ${
              overviewKeyword?.keyword === row.original.keyword
                ? "bg-primary/5 border-l-2 border-l-primary"
                : ""
            }`,
            onClick: () => handleRowClick(row.original),
          })}
        />
      )}

      {projectId && modalKeyword ? (
        <GenerateArticleModal
          isOpen={Boolean(modalKeyword)}
          onClose={() => setModalKeyword(null)}
          projectId={projectId}
          initialKeyword={modalKeyword}
          searchIntent={modalIntent ?? undefined}
        />
      ) : null}
    </div>
  );
}
