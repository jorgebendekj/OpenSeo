import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { MutableRefObject } from "react";
import { makeSelectionColumn } from "@/client/components/table/AppDataTable";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import type { SelectionAnchor } from "@/client/components/table/tableSelection";
import type {
  getSearchPerformanceReport,
  getSearchPerformanceTable,
} from "@/serverFunctions/searchPerformance";

export type Report = Extract<
  Awaited<ReturnType<typeof getSearchPerformanceReport>>,
  { connected: true }
>;
export type SearchPerformanceTableRow = Extract<
  Awaited<ReturnType<typeof getSearchPerformanceTable>>,
  { connected: true }
>["rows"][number];
type DimensionRow = SearchPerformanceTableRow;
type StrikingRow = Report["strikingDistance"][number];

const numberFormat = new Intl.NumberFormat("en-US");

export function formatCount(value: number): string {
  return numberFormat.format(Math.round(value));
}

export function formatCtr(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatPosition(value: number): string {
  return value.toFixed(1);
}

const rightAligned = {
  headerClassName: "text-right",
  cellClassName: "text-right tabular-nums",
} as const;

const dimensionHelper = createColumnHelper<DimensionRow>();

import { Sparkles } from "lucide-react";

export function buildDimensionColumns(
  keyLabel: string,
  onGenerateArticle?: (query: string) => void,
  t?: (key: string) => string,
): ColumnDef<DimensionRow>[] {
  const isQuery = keyLabel.toLowerCase().includes("query") || keyLabel.toLowerCase().includes("consulta") || keyLabel.toLowerCase().includes("zapytanie");
  const tr = (k: string, fb: string) => (t ? t(k) || fb : fb);
  const cols: ColumnDef<DimensionRow>[] = [
    dimensionHelper.accessor("key", {
      enableSorting: false,
      header: () => keyLabel,
      cell: ({ getValue }) => (
        <span className="block max-w-xl truncate font-medium" title={getValue()}>
          {getValue()}
        </span>
      ),
    }),
    dimensionHelper.accessor("clicks", {
      header: ({ column }) => (
        <SortableHeader column={column} label={tr("searchPerformance.clicks", "Clicks")} align="right" />
      ),
      cell: ({ getValue }) => formatCount(getValue()),
      meta: rightAligned,
    }),
    dimensionHelper.accessor("impressions", {
      header: ({ column }) => (
        <SortableHeader column={column} label={tr("searchPerformance.impressions", "Impressions")} align="right" />
      ),
      cell: ({ getValue }) => formatCount(getValue()),
      meta: rightAligned,
    }),
    dimensionHelper.accessor("ctr", {
      header: ({ column }) => (
        <SortableHeader column={column} label={tr("searchPerformance.ctr", "CTR")} align="right" />
      ),
      cell: ({ getValue }) => formatCtr(getValue()),
      meta: rightAligned,
    }),
    dimensionHelper.accessor("position", {
      header: ({ column }) => (
        <SortableHeader column={column} label={tr("searchPerformance.position", "Position")} align="right" />
      ),
      cell: ({ getValue }) => formatPosition(getValue()),
      meta: rightAligned,
    }),
  ];

  if (isQuery && onGenerateArticle) {
    cols.push(
      dimensionHelper.display({
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => onGenerateArticle(row.original.key)}
              className="btn btn-ghost btn-xs text-primary gap-1 hover:bg-primary/10"
              title="Generate AI Article"
            >
              <Sparkles className="size-3" />
              <span className="hidden lg:inline">{tr("searchPerformance.writeArticle", "Write")}</span>
            </button>
          </div>
        ),
        meta: {
          headerClassName: "text-right w-16",
          cellClassName: "text-right w-16",
        },
      }),
    );
  }

  return cols;
}

const strikingHelper = createColumnHelper<StrikingRow>();

export function buildStrikingColumns(
  anchorRef: MutableRefObject<SelectionAnchor | null>,
  onGenerateArticle?: (query: string) => void,
  t?: (key: string) => string,
): ColumnDef<StrikingRow>[] {
  const tr = (k: string, fb: string) => (t ? t(k) || fb : fb);
  const cols: ColumnDef<StrikingRow>[] = [
    makeSelectionColumn<StrikingRow>(anchorRef),
    strikingHelper.accessor("query", {
      enableSorting: false,
      header: () => tr("searchPerformance.query", "Query"),
      cell: ({ getValue }) => (
        <span className="block max-w-xs truncate font-medium" title={getValue()}>
          {getValue()}
        </span>
      ),
    }),
    strikingHelper.accessor("page", {
      enableSorting: false,
      header: () => tr("searchPerformance.page", "Page"),
      // GSC page keys are canonical http(s) URLs of the verified property;
      // the scheme check is defense-in-depth before rendering an href.
      cell: ({ getValue }) =>
        /^https?:\/\//.test(getValue()) ? (
          <a
            href={getValue()}
            target="_blank"
            rel="noreferrer"
            className="link link-hover block max-w-sm truncate"
            title={getValue()}
          >
            {getValue()}
          </a>
        ) : (
          <span className="block max-w-sm truncate" title={getValue()}>
            {getValue()}
          </span>
        ),
    }),
    strikingHelper.accessor("impressions", {
      header: ({ column }) => (
        <SortableHeader column={column} label={tr("searchPerformance.impressions", "Impressions")} align="right" />
      ),
      cell: ({ getValue }) => formatCount(getValue()),
      meta: rightAligned,
    }),
    strikingHelper.accessor("clicks", {
      header: ({ column }) => (
        <SortableHeader column={column} label={tr("searchPerformance.clicks", "Clicks")} align="right" />
      ),
      cell: ({ getValue }) => formatCount(getValue()),
      meta: rightAligned,
    }),
    strikingHelper.accessor("position", {
      header: ({ column }) => (
        <SortableHeader column={column} label={tr("searchPerformance.position", "Position")} align="right" />
      ),
      cell: ({ getValue }) => formatPosition(getValue()),
      meta: rightAligned,
    }),
  ];

  if (onGenerateArticle) {
    cols.push(
      strikingHelper.display({
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => onGenerateArticle(row.original.query)}
              className="btn btn-ghost btn-xs text-primary gap-1 hover:bg-primary/10"
              title="Generate AI Article"
            >
              <Sparkles className="size-3" />
              <span className="hidden lg:inline">{tr("searchPerformance.writeArticle", "Write")}</span>
            </button>
          </div>
        ),
        meta: {
          headerClassName: "text-right w-16",
          cellClassName: "text-right w-16",
        },
      }),
    );
  }

  return cols;
}
