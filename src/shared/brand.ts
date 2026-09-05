export const BRAND = {
  name: "Findable",
  nameLower: "findable",
  domain: "findableweb.io",
  url: "https://findableweb.io",
  supportEmail: "support@findableweb.io",
  agentName: "Ada",
  mcpServerName: "Findable MCP",
  themeLight: "findable",
  themeDark: "findable-dark",
} as const;

export type BrandConfig = typeof BRAND;
