import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "@/client/tanstack-db";
import { listSamSessions } from "@/serverFunctions/sam";

export function adaSessionsQueryOptions(projectId: string) {
  return queryOptions({
    queryKey: ["ada-sessions", projectId],
    queryFn: () => listSamSessions({ data: { projectId } }),
  });
}

export function invalidateAdaSessions(projectId: string) {
  void queryClient.invalidateQueries({
    queryKey: ["ada-sessions", projectId],
  });
}

export const samSessionsQueryOptions = adaSessionsQueryOptions;
export const invalidateSamSessions = invalidateAdaSessions;
