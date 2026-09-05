import type { CreditFeature } from "@/shared/billing-credit-features";

export interface SearchDataCostInfo {
  costUsd: number;
  feature?: CreditFeature;
  path?: readonly string[];
}

export interface SearchDataResponse<T> {
  data: T;
  cost: SearchDataCostInfo;
}

export interface SearchDataProvider {
  readonly providerId: string;
  readonly name: string;

  // Business & Local SEO
  searchBusinessListings?(input: any): Promise<SearchDataResponse<any>>;
  getGoogleReviews?(input: any): Promise<SearchDataResponse<any>>;
  getGoogleQuestions?(input: any): Promise<SearchDataResponse<any>>;
  getGoogleBusinessUpdates?(input: any): Promise<SearchDataResponse<any>>;

  // SERP & Rank Tracking
  getSerpLive?(input: any): Promise<SearchDataResponse<any>>;
  postRankCheckTasks?(input: any): Promise<SearchDataResponse<any>>;

  // Domain & Labs
  getDomainRankedKeywords?(input: any): Promise<SearchDataResponse<any>>;
  getDomainKeywordSuggestions?(input: any): Promise<SearchDataResponse<any>>;
  getRelevantPages?(input: any): Promise<SearchDataResponse<any>>;
  getCompetitorsDomain?(input: any): Promise<SearchDataResponse<any>>;

  // Keywords & Google Ads
  getKeywordIdeas?(input: any): Promise<SearchDataResponse<any>>;
  getKeywordSearchVolume?(input: any): Promise<SearchDataResponse<any>>;

  // Backlinks
  getBacklinksSummary?(input: any): Promise<SearchDataResponse<any>>;
  getBacklinksProfile?(input: any): Promise<SearchDataResponse<any>>;
  getReferringDomains?(input: any): Promise<SearchDataResponse<any>>;
  getBacklinksHistory?(input: any): Promise<SearchDataResponse<any>>;
  getPageIntersection?(input: any): Promise<SearchDataResponse<any>>;

  // AI & LLM Citations
  getLlmMentions?(input: any): Promise<SearchDataResponse<any>>;
  getLlmResponses?(input: any): Promise<SearchDataResponse<any>>;

  // On-Page / Lighthouse
  getLighthouseLive?(input: any): Promise<SearchDataResponse<any>>;
}
