import { Copy, FileDown, Sheet, Tags, Trash2 } from "lucide-react";
import {
  TableBulkActionBar,
  TableBulkActionButton,
  TableBulkExportMenu,
} from "@/client/components/table/TableBulkActionBar";
import { useLanguagePreference } from "@/client/lib/language";

export function SavedKeywordsBulkActionBar({
  selectedCount,
  onCopy,
  onOpenTags,
  onExportCsv,
  onExportSheets,
  onDelete,
  onClear,
  exportingSelection,
}: {
  selectedCount: number;
  onCopy: () => void;
  onOpenTags: () => void;
  onExportCsv: () => void;
  onExportSheets: () => void;
  onDelete: () => void;
  onClear: () => void;
  exportingSelection: "csv" | "sheets" | null;
}) {
  const { t } = useLanguagePreference();
  if (selectedCount === 0) return null;
  const exportBusy = exportingSelection != null;

  return (
    <TableBulkActionBar
      selectedCount={selectedCount}
      onClear={onClear}
      actions={
        <>
          <div className="flex items-center gap-0.5 px-1.5">
            <TableBulkActionButton
              icon={<Tags className="size-3.5" />}
              onClick={onOpenTags}
            >
              {t("saved.bulkTags")}
            </TableBulkActionButton>

            <TableBulkExportMenu
              busy={exportBusy}
              actions={[
                {
                  label: t("saved.bulkCopy"),
                  icon: <Copy className="size-4" />,
                  onClick: onCopy,
                },
                {
                  label: t("saved.exportSheets"),
                  icon: <Sheet className="size-4" />,
                  onClick: onExportSheets,
                },
                {
                  label: t("saved.exportCsv"),
                  icon: <FileDown className="size-4" />,
                  onClick: onExportCsv,
                },
              ]}
            />
          </div>

          <div className="flex items-center border-l border-base-content/10 px-1.5">
            <TableBulkActionButton
              icon={<Trash2 className="size-3.5" />}
              onClick={onDelete}
              variant="danger"
            >
              {t("saved.bulkDelete")}
            </TableBulkActionButton>
          </div>
        </>
      }
    />
  );
}
