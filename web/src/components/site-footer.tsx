import { Link } from "@tanstack/react-router";
import { FindableMark } from "@/components/findable-mark";
import { useI18n } from "@/lib/i18n";

export function SiteFooter({ className }: { className?: string }) {
  const { t } = useI18n();

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-6 border-t border-[#D8E2F5]">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#142340] hover:opacity-80 transition-opacity"
        >
          <FindableMark size={20} className="text-[#2B66FE]" />
          <span>Findable</span>
        </Link>

        <div className="flex items-center gap-6 text-sm text-neutral-600">
          <Link
            to="/privacy"
            className="hover:text-neutral-900 transition-colors"
          >
            {t.footer.privacy}
          </Link>
          <Link
            to="/terms-and-conditions"
            className="hover:text-neutral-900 transition-colors"
          >
            {t.footer.terms}
          </Link>
        </div>
      </div>
    </div>
  );
}

