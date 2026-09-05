import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { checkSamAccess } from "@/serverFunctions/sam";

export function adaAccessQueryOptions(projectId: string) {
  return queryOptions({
    queryKey: ["ada-access", projectId],
    queryFn: () => checkSamAccess({ data: { projectId } }),
  });
}

export function useAdaAccess(projectId: string) {
  return useQuery(adaAccessQueryOptions(projectId));
}

export const samAccessQueryOptions = adaAccessQueryOptions;
export const useSamAccess = useAdaAccess;
