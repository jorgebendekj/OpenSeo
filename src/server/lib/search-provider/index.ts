import { DataForSeoProvider } from "@/server/lib/search-provider/DataForSeoProvider";
import type { SearchDataProvider } from "@/server/lib/search-provider/SearchDataProvider";

export type {
  SearchDataProvider,
  SearchDataResponse,
  SearchDataCostInfo,
} from "@/server/lib/search-provider/SearchDataProvider";
export { DataForSeoProvider } from "@/server/lib/search-provider/DataForSeoProvider";

let defaultProvider: SearchDataProvider | null = null;

export function getSearchDataProvider(): SearchDataProvider {
  if (!defaultProvider) {
    defaultProvider = new DataForSeoProvider();
  }
  return defaultProvider;
}
