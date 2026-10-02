import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";
import { esHomeFaqs } from "@/lib/i18n";
import { buildPageSeo } from "@/lib/seo";

const title = "Findable: SEO y visibilidad en IA para empresas en España";
const description =
  "Consulta si ChatGPT y Google AI Overviews mencionan tu marca, investiga palabras clave en español, sigue tu posicionamiento en España y conecta Search Console. Pagas por uso, sin cuota por usuario.";

const schemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://findableweb.io/es#software",
      name: "Findable",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://findableweb.io/es",
      inLanguage: "es",
      description,
      featureList: [
        "Consulta de menciones y citas de tu marca en ChatGPT y Google AI Overviews",
        "Investigación de palabras clave con datos de España",
        "Seguimiento de posiciones en Google para España y ciudades",
        "Auditoría técnica del sitio",
        "Integración con Google Search Console y Google Analytics 4",
        "Servidor MCP para Claude Code, Cursor y Codex",
      ],
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "0",
        highPrice: "99",
        offerCount: "4",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://findableweb.io/#org",
      name: "Findable",
      legalName: "Ribentek AI",
      url: "https://findableweb.io",
      logo: "https://findableweb.io/logo.svg",
    },
    {
      "@type": "FAQPage",
      "@id": "https://findableweb.io/es#faq",
      inLanguage: "es",
      mainEntity: esHomeFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
});

export const Route = createFileRoute("/_marketing/es")({
  head: () => {
    const seo = buildPageSeo({
      title,
      description,
      path: "/es",
      locale: "es_ES",
      imageAlt: "Panel de Findable con visibilidad en IA y SEO",
      alternates: [
        { hreflang: "es", path: "/es" },
        { hreflang: "en", path: "/" },
        { hreflang: "x-default", path: "/" },
      ],
    });

    return {
      ...seo,
      meta: [
        ...(seo.meta ?? []),
        {
          name: "robots",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
      ],
      scripts: [{ type: "application/ld+json", children: schemaJson }],
    };
  },
  component: LandingPage,
});
