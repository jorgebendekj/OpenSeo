import {
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowUp, Check, Globe, Loader2, Sparkles } from "lucide-react";
import { FREE_ONBOARDING_QUESTION_LIMIT } from "@/shared/onboardingChat";
import { BRAND } from "@/shared/brand";

export function SuggestedQuestions({
  questions,
  primaryQuestions = [],
  onSelect,
}: {
  questions: string[];
  primaryQuestions?: string[];
  onSelect: (question: string) => void;
}) {
  return (
    <div className="ml-10 flex flex-wrap gap-2">
      {questions.map((question) =>
        primaryQuestions.includes(question) ? (
          <button
            key={question}
            type="button"
            className="btn btn-primary btn-sm font-normal text-xs"
            onClick={() => onSelect(question)}
          >
            {question}
          </button>
        ) : (
          <button
            key={question}
            type="button"
            className="btn btn-ghost btn-sm border border-base-300 font-normal text-xs"
            onClick={() => onSelect(question)}
          >
            {question}
          </button>
        ),
      )}
    </div>
  );
}

export function WelcomeMessage({
  domain,
  isStartingCheckout,
  checkoutError,
  onUpgrade,
}: {
  domain: string;
  isStartingCheckout: boolean;
  checkoutError?: string | null;
  onUpgrade: () => void;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Sparkles className="size-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-3 pt-0.5 text-sm">
        <div className="space-y-3 text-base-content/80">
          <p>Hey, I’m {BRAND.agentName} — welcome to {BRAND.name}.</p>
          <p>
            Find out whether AI and search engines recommend your business.
            I’m here to help you analyze your domain and explore your SEO opportunities.
          </p>
          <p>
            You can also email{" "}
            <a href={`mailto:${BRAND.supportEmail}`} className="link link-primary">
              {BRAND.supportEmail}
            </a>{" "}
            if you have any questions.
          </p>
          <p>
            Want me to analyze{" "}
            <span className="font-medium text-base-content">{domain}</span> and
            draft a strategy, or do you have questions first? Pick one below to
            get started.
          </p>
        </div>

        <div className="rounded-box border border-base-300 bg-base-200/50 p-3 text-xs lg:hidden">
          <p className="font-medium">Want {BRAND.agentName} to keep going?</p>
          <p className="mt-0.5 text-base-content/70">
            Get full access to keyword research, AI citation tracking, rank tracking, and site audits on{" "}
            {domain}.
          </p>
          <button
            type="button"
            className="btn btn-primary btn-xs mt-2"
            disabled={isStartingCheckout}
            onClick={onUpgrade}
          >
            {isStartingCheckout ? "Redirecting..." : "Get Started"}
          </button>
          {checkoutError ? (
            <p className="mt-2 text-error">{checkoutError}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function UpgradeSidebar({
  domain,
  questionsUsed,
  isStartingCheckout,
  onUpgrade,
}: {
  domain: string;
  questionsUsed: number;
  isStartingCheckout: boolean;
  onUpgrade: () => void;
}) {
  const features = [
    "Keyword research, backlinks, rank tracking & site audits",
    "AI visibility & citation tracking across leading LLMs",
    "Google Search Console — read-only, free, zero setup hassle",
    "Connect Claude, Cursor, Codex & other MCP clients",
    "Pay-as-you-go credits roll over and never expire",
  ];
  const used = Math.min(questionsUsed, FREE_ONBOARDING_QUESTION_LIMIT);
  const progress = (used / FREE_ONBOARDING_QUESTION_LIMIT) * 100;

  return (
    <aside className="hidden w-96 flex-shrink-0 flex-col border-r border-base-300 bg-base-200/20 lg:flex">
      <div className="flex items-center gap-2.5 border-b border-base-300 px-6 py-4 text-xs text-base-content/55">
        <span className="inline-flex size-8 items-center justify-center rounded-full border border-base-300 bg-base-100 text-primary">
          <Globe className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="font-medium text-base-content/80">Previewing {BRAND.name}</p>
          <p className="truncate" title={domain}>
            {domain}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-semibold tracking-tight">Pay As You Go</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-base-content/55">
            500 complimentary credits on signup. Pay only for what you use, never for seats.
          </p>
        </div>

        <ul className="space-y-3 border-t border-base-300 pt-5">
          {features.map((label) => (
            <li
              key={label}
              className="flex gap-2.5 text-sm leading-snug text-base-content/75"
            >
              <Check className="mt-0.5 size-4 flex-shrink-0 text-primary" />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-3 pt-2">
          <button
            type="button"
            className="btn btn-primary w-full"
            disabled={isStartingCheckout}
            onClick={onUpgrade}
          >
            {isStartingCheckout ? "Redirecting..." : "Get Started"}
          </button>
        </div>
      </div>

      <div className="space-y-1.5 border-t border-base-300 px-6 py-4">
        <div className="h-1 w-full overflow-hidden rounded-full bg-base-300">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-base-content/55">
          {used} of {FREE_ONBOARDING_QUESTION_LIMIT} free questions used
        </p>
      </div>
    </aside>
  );
}

export function ChatGate({
  isStartingCheckout,
  onUpgrade,
}: {
  isStartingCheckout: boolean;
  onUpgrade: () => void;
}) {
  return (
    <div className="flex-shrink-0 border-t border-base-300 px-5 py-4">
      <div className="mx-auto w-full max-w-2xl rounded-box border border-primary/30 bg-primary/5 p-4 text-center">
        <p className="text-sm font-medium">
          That’s all {FREE_ONBOARDING_QUESTION_LIMIT} free preview questions
        </p>
        <p className="mx-auto mt-1 max-w-md text-xs text-base-content/70">
          Get started to keep working with {BRAND.agentName} and unlock the full {BRAND.name} platform.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-sm mt-3"
          disabled={isStartingCheckout}
          onClick={onUpgrade}
        >
          {isStartingCheckout ? "Redirecting..." : "Continue"}
        </button>
      </div>
    </div>
  );
}

export function ChatComposer({
  busy,
  onSend,
  placeholder,
}: {
  busy: boolean;
  onSend: (text: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const effectivePlaceholder = placeholder ?? `Ask ${BRAND.agentName} about your strategy or ${BRAND.name}…`;

  useLayoutEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [value]);

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    const text = value.trim();
    if (!text || busy) return;
    onSend(text);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={effectivePlaceholder}
          disabled={busy}
          className="w-full resize-none rounded-xl border border-base-300 bg-base-100 px-3.5 py-2.5 pr-11 text-sm leading-relaxed text-base-content placeholder:text-base-content/40 focus:border-primary focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={busy || !value.trim()}
          className="btn btn-primary btn-sm btn-circle absolute bottom-2 right-2 size-7 disabled:opacity-30"
          aria-label="Send"
        >
          {busy ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <ArrowUp className="size-3.5" />
          )}
        </button>
      </div>
    </form>
  );
}
