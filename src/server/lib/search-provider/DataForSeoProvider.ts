import type {
  SearchDataProvider,
  SearchDataResponse,
} from "@/server/lib/search-provider/SearchDataProvider";
import * as ai from "@/server/lib/dataforseo/ai";
import * as backlinks from "@/server/lib/dataforseo/backlinks";
import * as business from "@/server/lib/dataforseo/business";
import * as googleAds from "@/server/lib/dataforseo/google-ads";
import * as labs from "@/server/lib/dataforseo/labs";
import * as lighthouse from "@/server/lib/dataforseo/lighthouse";
import * as serp from "@/server/lib/dataforseo/serp";

export class DataForSeoProvider implements SearchDataProvider {
  readonly providerId = "dataforseo";
  readonly name = "DataForSEO";

  async searchBusinessListings(input: any): Promise<SearchDataResponse<any>> {
    const res = await business.fetchBusinessListingsSearch(input);
    return { data: res.data, cost: { costUsd: 0.002 } };
  }

  async getGoogleReviews(input: any): Promise<SearchDataResponse<any>> {
    const res = await business.fetchMyBusinessInfo(input);
    return { data: res, cost: { costUsd: 0.002 } };
  }

  async getGoogleQuestions(input: any): Promise<SearchDataResponse<any>> {
    const res = await business.fetchQuestionsAnswers(input);
    return { data: res.data, cost: { costUsd: 0.002 } };
  }

  async getGoogleBusinessUpdates(input: any): Promise<SearchDataResponse<any>> {
    const res = await business.fetchMyBusinessInfo(input);
    return { data: res, cost: { costUsd: 0.002 } };
  }

  async getSerpLive(input: any): Promise<SearchDataResponse<any>> {
    const res = await serp.fetchLiveSerp(input);
    return { data: res.data, cost: { costUsd: 0.002 } };
  }

  async postRankCheckTasks(input: any): Promise<SearchDataResponse<any>> {
    const res = await serp.fetchRankCheckSerp(input);
    return { data: res.data, cost: { costUsd: 0.002 } };
  }

  async getDomainRankedKeywords(input: any): Promise<SearchDataResponse<any>> {
    const res = await labs.fetchRankedKeywords(input);
    return { data: res.data, cost: { costUsd: 0.01 } };
  }

  async getDomainKeywordSuggestions(input: any): Promise<SearchDataResponse<any>> {
    const res = await labs.fetchKeywordSuggestions(input);
    return { data: res.data, cost: { costUsd: 0.01 } };
  }

  async getRelevantPages(input: any): Promise<SearchDataResponse<any>> {
    const res = await labs.fetchRelevantPages(input);
    return { data: res.data, cost: { costUsd: 0.01 } };
  }

  async getCompetitorsDomain(input: any): Promise<SearchDataResponse<any>> {
    const res = await labs.fetchSerpCompetitors(input);
    return { data: res.data, cost: { costUsd: 0.01 } };
  }

  async getKeywordIdeas(input: any): Promise<SearchDataResponse<any>> {
    const res = await labs.fetchKeywordIdeas(input);
    return { data: res.data, cost: { costUsd: 0.01 } };
  }

  async getKeywordSearchVolume(input: any): Promise<SearchDataResponse<any>> {
    const res = await googleAds.fetchAdsSearchVolume(input);
    return { data: res.data, cost: { costUsd: 0.005 } };
  }

  async getBacklinksSummary(input: any): Promise<SearchDataResponse<any>> {
    const res = await backlinks.fetchBacklinksSummary(input);
    return { data: res.data, cost: { costUsd: 0.02 } };
  }

  async getBacklinksProfile(input: any): Promise<SearchDataResponse<any>> {
    const res = await backlinks.fetchBacklinksRows(input);
    return { data: res.data, cost: { costUsd: 0.02 } };
  }

  async getReferringDomains(input: any): Promise<SearchDataResponse<any>> {
    const res = await backlinks.fetchReferringDomains(input);
    return { data: res.data, cost: { costUsd: 0.02 } };
  }

  async getBacklinksHistory(input: any): Promise<SearchDataResponse<any>> {
    const res = await backlinks.fetchBacklinksHistory(input);
    return { data: res.data, cost: { costUsd: 0.02 } };
  }

  async getLlmMentions(input: any): Promise<SearchDataResponse<any>> {
    const res = await ai.fetchLlmMentionsSearch(input);
    return { data: res.data, cost: { costUsd: 0.01 } };
  }

  async getLlmResponses(input: any): Promise<SearchDataResponse<any>> {
    const res = await ai.fetchLlmResponse(input);
    return { data: res.data, cost: { costUsd: 0.01 } };
  }

  async getLighthouseLive(input: any): Promise<SearchDataResponse<any>> {
    const res = await lighthouse.fetchLighthouseResult(input);
    return { data: res.data, cost: { costUsd: 0.005 } };
  }
}
