import { useAgent } from "agents/react";
import { useAgentChat } from "@cloudflare/think/react";
import { useEffect, useRef } from "react";
import { ChatComposer } from "@/client/features/onboarding/OnboardingChatParts";
import { invalidateAdaSessions } from "@/client/features/ada/adaQueries";
import {
  ChatMessage,
  humanizeToolLabel,
  messageHasVisibleContent,
} from "@/client/components/chat/ChatMessage";
import { useStickToBottom } from "@/client/components/chat/useStickToBottom";
import { BRAND } from "@/shared/brand";

const SUGGESTIONS = [
  "What keywords should I focus on next?",
  "Who are my top SERP and AI competitors?",
  "How is my Search Console traffic trending?",
  "Find quick-win keywords I already rank for",
];

export function AdaConversation({
  projectId,
  sessionId,
}: {
  projectId: string;
  sessionId: string;
}) {
  const agent = useAgent({ agent: "sam-chat", name: sessionId });
  const { messages, sendMessage, setMessages, clearHistory, status } =
    useAgentChat({ agent });

  const isBusy = status === "submitted" || status === "streaming";
  const { scrollRef, onScroll, pinToBottom } = useStickToBottom(
    messages,
    status,
  );
  const sendText = (text: string) => {
    pinToBottom();
    void sendMessage({ text });
  };

  const rewindTo = async (messageId: string) => {
    const response = await fetch(`/agents/sam-chat/${sessionId}/rewind`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messageId }),
    });
    if (!response.ok) return false;
    const fresh = (await fetch(
      `/agents/sam-chat/${sessionId}/get-messages`,
    ).then((res) => (res.ok ? res.json() : null))) as { messages?: any[] } | null;
    if (fresh?.messages) {
      setMessages(fresh.messages);
    }
    return true;
  };

  const hasMessages = messages.length > 0;
  const prevHasMessagesRef = useRef(hasMessages);
  useEffect(() => {
    if (hasMessages && !prevHasMessagesRef.current) {
      invalidateAdaSessions(projectId);
    }
    prevHasMessagesRef.current = hasMessages;
  }, [hasMessages, projectId]);

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="min-h-0 flex-1 overflow-y-auto"
      >
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-4">
          {!hasMessages ? (
            <div className="py-12 text-center space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-medium">Ask {BRAND.agentName} anything</h3>
                <p className="text-xs text-base-content/60">
                  {BRAND.agentName} can research keywords, track AI visibility, check rankings, and inspect backlinks.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="btn btn-sm btn-ghost border border-base-300 font-normal text-xs"
                    onClick={() => sendText(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((message) => {
            if (!messageHasVisibleContent(message)) return null;
            return (
              <ChatMessage
                key={message.id}
                message={message}
                streaming={isBusy}
                resolveToolLabel={humanizeToolLabel}
              />
            );
          })}
        </div>
      </div>

      <div className="border-t border-base-300 bg-base-100 p-4">
        <div className="mx-auto max-w-2xl">
          <ChatComposer
            busy={isBusy}
            placeholder={`Ask ${BRAND.agentName} about your strategy, keywords, or AI citations…`}
            onSend={sendText}
          />
        </div>
      </div>
    </div>
  );
}

export const SamConversation = AdaConversation;
