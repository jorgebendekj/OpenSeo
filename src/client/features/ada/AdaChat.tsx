import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { createSamSession } from "@/serverFunctions/sam";
import {
  adaSessionsQueryOptions,
  invalidateAdaSessions,
} from "@/client/features/ada/adaQueries";
import { useAdaAccess } from "@/client/features/ada/useAdaAccess";
import { AdaConversation } from "@/client/features/ada/AdaConversation";
import { AdaSetupGate } from "@/client/features/ada/AdaSetupGate";
import { BRAND } from "@/shared/brand";

export function AdaChat({
  projectId,
  activeSessionId,
}: {
  projectId: string;
  activeSessionId?: string;
}) {
  const navigate = useNavigate();
  const accessQuery = useAdaAccess(projectId);
  const sessionsQuery = useQuery(adaSessionsQueryOptions(projectId));
  const sessions = sessionsQuery.data ?? [];

  const createSession = useMutation({
    mutationFn: () => createSamSession({ data: { projectId } }),
    onSuccess: ({ id }) => {
      invalidateAdaSessions(projectId);
      void navigate({
        to: "/p/$projectId/sam",
        params: { projectId },
        search: { s: id },
      });
    },
  });

  useEffect(() => {
    if (activeSessionId) return;
    if (sessions.length > 0) {
      void navigate({
        to: "/p/$projectId/sam",
        params: { projectId },
        search: { s: sessions[0].id },
        replace: true,
      });
    }
  }, [activeSessionId, sessions, projectId, navigate]);

  if (accessQuery.isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="size-6 animate-spin text-base-content/40" />
      </div>
    );
  }

  if (accessQuery.data && !accessQuery.data.enabled) {
    return (
      <div className="p-6">
        <AdaSetupGate
          errorMessage="Ada strategist requires project setup."
          isRefetching={accessQuery.isRefetching}
          onRetry={() => void accessQuery.refetch()}
        />
      </div>
    );
  }

  if (activeSessionId) {
    return (
      <AdaConversation
        key={activeSessionId}
        projectId={projectId}
        sessionId={activeSessionId}
      />
    );
  }

  if (sessionsQuery.isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="size-5 animate-spin text-base-content/40" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Sparkles className="size-6" />
      </div>
      <div className="space-y-1">
        <p className="text-lg font-medium">What should we work on?</p>
        <p className="max-w-sm text-sm text-base-content/60">
          {BRAND.agentName} is your in-app SEO and AI search visibility agent with access to every {BRAND.name} research tool. Start a chat to get going.
        </p>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-sm gap-1"
        disabled={createSession.isPending}
        onClick={() => createSession.mutate()}
      >
        {createSession.isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Plus className="size-4" />
        )}
        New chat
      </button>
    </div>
  );
}

export const SamChat = AdaChat;
