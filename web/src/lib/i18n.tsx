import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "es" | "pl";

export const translations = {
  en: {
    nav: {
      signIn: "Sign in",
      getStarted: "Get Started Free",
      pricing: "Pricing",
      features: "Features",
      blogs: "Blog",
    },
    hero: {
      badge: "⚡ 1-Click AI Articles, Rank Tracking & GEO Intelligence",
      title: "The AI-Powered SEO Engine That Ranks Your Business Everywhere.",
      subtitle:
        "Findable unites 1-Click AI article generation, Google Search Console sync, real-time rank tracking, technical audits, and AI search visibility (ChatGPT, Perplexity & Gemini) into one high-performance platform.",
      cta: "Get Started Free",
      note: "Free plan includes 100 monthly credits + 500 trial credits · No credit card required",
    },
    dashboard: {
      url: "app.findableweb.io",
      gscConnected: "Google Search Console Connected",
      clicks: "Organic Clicks",
      clicksDelta: "+18.4% this month",
      impressions: "Total Impressions",
      impressionsDelta: "+24.1% this month",
      top10: "Top 10 Rankings",
      top10Delta: "+31 positions gained",
      health: "Technical Health",
      healthDelta: "0 critical errors",
      module1Title: "1-Click AI Article Generator",
      module1Sub: "SEO & GEO Optimized Content",
      module1Desc:
        "Generate 1,500–2,500 word ranking articles with H2/H3s, JSON-LD FAQ Schema, and competitor SERP insights.",
      module2Title: "AI Search & Brand Visibility",
      module2Sub: "ChatGPT, Perplexity & Gemini",
      module2Desc:
        "Track brand mentions, citations, and AI recommendations compared to your direct competitors.",
      module3Title: "Search Console & GA4 Sync",
      module3Sub: "Official Google APIs",
      module3Desc:
        "Surface striking-distance keywords (positions 4–20), real CTR trends, and automated technical audits.",
    },
    features: {
      eyebrow: "Full-Stack SEO & AI Search Suite",
      title: "Everything you need to dominate Google and AI Search Engines",
      subtitle:
        "Engineered for high-growth businesses, founders, agencies, and developers wanting unfair organic distribution.",
      card1Title: "⚡ 1-Click AI Article Generator",
      card1Desc:
        "Transform high-intent keywords and GSC queries into structured, comprehensive 1,500–2,500 word articles with automatic FAQ Schema and internal link suggestions.",
      card2Title: "🤖 AI Search Visibility & GEO Matrix",
      card2Desc:
        "Measure and optimize how your brand is cited and recommended in ChatGPT, Perplexity, Claude, and Gemini relative to your competitors.",
      card3Title: "📈 Real-Time Google Rank Tracking",
      card3Desc:
        "Track keyword rankings daily across desktop and mobile in 190+ countries, states, and cities with accurate SERP snapshots.",
      card4Title: "🔍 Automated Technical Site Audits",
      card4Desc:
        "Crawl your website like Googlebot to instantly detect 404s, broken redirects, Core Web Vitals bottlenecks, and indexing blockers.",
      card5Title: "📊 Striking-Distance GSC Intelligence",
      card5Desc:
        "Spot high-impression queries ranking on page 2 (positions 4–20) and turn them into #1 rankings with targeted content refreshes.",
      card6Title: "🔌 MCP Server & AI Coding Agents",
      card6Desc:
        "Directly query rankings, research keywords, and audit sites inside Claude Code, Cursor, Codex, and OpenCode via Model Context Protocol.",
    },
    pricing: {
      eyebrow: "Transparent, Predictable Pricing",
      title: "Fair plans that scale with your organic growth",
      subtitle:
        "Legacy tools charge $129+/mo for rigid single-site limits. Findable gives you full-stack SEO, 1-Click AI articles, and Google integrations at transparent pricing.",
      popularBadge: "🔥 Most Popular",
      freeTier: {
        name: "Free Plan",
        price: "$0",
        period: "free forever",
        description: "Perfect for testing Findable and connecting your Google Search Console with zero commitments.",
        cta: "Start Free",
        features: [
          "1 Connected Website",
          "100 free monthly credits (+ 500 trial credits)",
          "Google Search Console & GA4 Sync",
          "Real-time Google rank checker",
          "Website technical health overview",
          "MCP Agent access (Claude, Cursor, Codex)",
        ],
      },
      starterTier: {
        name: "Starter",
        price: "$39",
        period: "per month",
        description: "For freelancers, niche site builders, and growing creators.",
        cta: "Start Starter Plan",
        features: [
          "3 Connected Websites / Projects",
          "10,000 Monthly Usage Credits",
          "10 1-Click AI Articles / mo (1,500+ words, SEO & Schema)",
          "Daily & weekly Google rank tracking",
          "Full MCP Server & AI Agent skills",
          "Technical site audits & competitor research",
          "Direct Google Search Console sync",
        ],
      },
      growthTier: {
        name: "Growth (Autopilot)",
        price: "$69",
        period: "per month",
        description: "The complete SEO & AI Search traffic engine on autopilot.",
        cta: "Start Growth Plan",
        features: [
          "6 Connected Websites / Projects",
          "35,000 Monthly Usage Credits",
          "30 1-Click AI Articles / mo (1 article daily / scheduled)",
          "ChatGPT, Perplexity & Gemini brand monitoring",
          "Weekly automated technical site audit",
          "Full backlink & competitor intelligence",
          "Export to CMS & Webhooks",
          "Priority MCP rate limits",
        ],
      },
      scaleTier: {
        name: "Scale / Agency",
        price: "$99",
        period: "per month",
        description: "For marketing agencies, multi-brand founders, and high-volume teams.",
        cta: "Start Scale Plan",
        features: [
          "10 Connected Websites / Projects",
          "100,000 Monthly Usage Credits",
          "90 1-Click AI Articles / mo",
          "Multi-domain brand & competitor monitoring",
          "White-label client PDF reports",
          "Team access & shared workspaces",
          "Priority API rate limits & dedicated support",
        ],
      },
      topUpNote: "Need extra data credits? Buy one-off top-up packs anytime (credits never expire and roll over forever).",
      comparisonTitle: "Compare with the alternative:",
      comparisonText: "Ahrefs & Semrush start at $129/mo with strict single-seat caps. Findable gives you multi-site tracking, AI article generation, and MCP access starting at $0-$39.",
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "How does the 1-Click AI Article Generator work?",
          a: "It takes your target keyword, search volume, search intent, and the top ranking competitor pages from live SERPs to generate a comprehensive 1,500–2,500 word article. It includes structured H2/H3 headings, JSON-LD FAQ Schema, and internal linking suggestions ready to publish.",
        },
        {
          q: "How do monthly credits work?",
          a: "Credits power data lookups like keyword research, live SERP checks, backlink analyses, and technical crawls. Each paid plan includes a generous monthly credit allotment (10,000 on Starter, 35,000 on Growth, 100,000 on Scale) that refreshes every billing cycle.",
        },
        {
          q: "Can I connect Google Search Console and GA4 for free?",
          a: "Yes! Connecting Google Search Console and Google Analytics 4 is included on all plans, including the Free Plan. You get full striking-distance queries, live clicks, impressions, and CTR charts.",
        },
        {
          q: "What is AI Search Visibility (GEO)?",
          a: "Generative Engine Optimization (GEO) measures how often and in what context your brand is cited and recommended in AI models like ChatGPT, Perplexity, Claude, and Google AI Overviews compared to your competitors.",
        },
        {
          q: "How does the MCP Server work with Claude Code or Cursor?",
          a: "Findable provides a built-in Model Context Protocol (MCP) server. You can connect it with Claude Desktop, Claude Code CLI, Cursor, or Codex to query your live SEO data and execute keyword research straight from your AI coding workflow.",
        },
      ],
    },
    mcp: {
      eyebrow: "Model Context Protocol",
      title: "Get superpowers with Findable MCP",
      desc: "Connect your AI agent (Claude, Codex, Gemini, OpenCode) directly to real SEO and Google Search Console data. Query rankings, discover keywords, and audit sites in natural language.",
      cta: "Connect to Findable",
      terminalCmd: "find and cluster keywords for",
      terminalKeywordLabel: "keyword",
      terminalVolLabel: "volume",
      terminalKdLabel: "kd",
      terminalSaved: "Saved 3 keywords to your workspace.",
      terminalView: "View in Findable:",
    },
    blog: {
      eyebrow: "SEO & AI Search Insights",
      title: "Latest Articles, Guides & Playbooks",
      subtitle: "Master search ranking algorithms, generative engine optimization (GEO), technical audits, and content automation.",
      readMore: "Read article",
      viewAll: "View all blog posts",
      featured: [
        {
          title: "Generowanie Artykułów SEO AI bez Spamu (2026)",
          desc: "Jak tworzyć rankingowe artykuły 2,500 słów z JSON-LD FAQ i wygrywać w wyszukiwarkach AI i Google.",
          slug: "generowanie-artykulow-seo-ai-bez-spamu",
          category: "AI Content & SEO",
          readTime: "6 min read",
        },
        {
          title: "GEO: Optymalizacja pod ChatGPT Search i Perplexity",
          desc: "Kompletny przewodnik po Generative Engine Optimization (GEO) i zdobywaniu cytowań w modelach AI.",
          slug: "geo-optymalizacja-pod-chatgpt-search",
          category: "AI Search / GEO",
          readTime: "8 min read",
        },
        {
          title: "Google Search Console: Wykorzystaj Zapytania Bliskiego Zasięgu",
          desc: "Jak zamienić zapytania z pozycji 4-20 w pozycję #1 dzięki strategii striking-distance queries.",
          slug: "google-search-console-striking-distance",
          category: "GSC Optimization",
          readTime: "5 min read",
        },
        {
          title: "Automatyzacja SEO z Claude Code i Serwerem MCP",
          desc: "Połącz agentów programistycznych z realnymi danymi SEO i audytuj witryny bezpośrednio z terminala.",
          slug: "automatyzacja-seo-claude-mcp",
          category: "MCP & Agents",
          readTime: "7 min read",
        },
      ],
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms and Conditions",
      copyright: "© 2026 Findable. All rights reserved.",
    },
  },
  es: {
    nav: {
      signIn: "Iniciar sesión",
      getStarted: "Empezar Gratis",
      pricing: "Precios",
      features: "Funcionalidades",
      blogs: "Blog",
    },
    hero: {
      badge: "⚡ Artículos con IA en 1-Clic, Rastreo de Rankings y Visibilidad GEO",
      title: "El Motor de SEO e Inteligencia Artificial que Posiciona tu Negocio en Todo Internet.",
      subtitle:
        "Findable combina la generación de artículos con IA en 1-clic, sincronización nativa con Google Search Console, auditorías técnicas, rastreo de rankings y visibilidad en motores de IA (ChatGPT, Perplexity y Gemini) en una sola plataforma.",
      cta: "Empezar Gratis Ahora",
      note: "Plan Free incluye 100 créditos mensuales + 500 de prueba · Sin tarjeta de crédito",
    },
    dashboard: {
      url: "app.findableweb.io",
      gscConnected: "Google Search Console Conectado",
      clicks: "Clics Orgánicos",
      clicksDelta: "+18.4% este mes",
      impressions: "Impresiones en Google",
      impressionsDelta: "+24.1% este mes",
      top10: "Palabras Clave en Top 10",
      top10Delta: "+31 posiciones ganadas",
      health: "Salud Técnica SEO",
      healthDelta: "0 errores críticos",
      module1Title: "Generador de Artículos IA en 1-Clic",
      module1Sub: "Contenido Optimizado SEO & GEO",
      module1Desc:
        "Genera artículos de 1,500 a 2,500 palabras estructurados con H2/H3, FAQ Schema JSON-LD y análisis SERP.",
      module2Title: "Visibilidad en Búsqueda IA (GEO)",
      module2Sub: "ChatGPT, Perplexity y Gemini",
      module2Desc:
        "Monitorea menciones de marca, citas y recomendaciones de IA frente a tus competidores directos.",
      module3Title: "Sincronización Search Console & GA4",
      module3Sub: "APIs Oficiales de Google",
      module3Desc:
        "Detecta oportunidades a tiro de Top 3 (posiciones 4-20), CTR real y auditorías técnicas automáticas.",
    },
    features: {
      eyebrow: "Suite Completa de SEO e IA",
      title: "Todo lo que necesitas para dominar Google y los Motores de Búsqueda con IA",
      subtitle:
        "Diseñado para proyectos en crecimiento, fundadores, agencias y desarrolladores que buscan una distribución orgánica imbatible.",
      card1Title: "⚡ Generador de Artículos IA en 1-Clic",
      card1Desc:
        "Convierte palabras clave y consultas de Search Console en artículos completos de 1,500 a 2,500 palabras con FAQ Schema JSON-LD y recomendaciones de enlazado interno.",
      card2Title: "🤖 Matriz de Visibilidad en IA y GEO",
      card2Desc:
        "Mide y optimiza la frecuencia y el contexto con que ChatGPT, Perplexity, Claude y Gemini recomiendan tu marca frente a tus rivales.",
      card3Title: "📈 Rastreo de Rankings en Tiempo Real",
      card3Desc:
        "Monitorea posiciones diarias en Google para escritorio y móvil en más de 190 países, ciudades e idiomas con capturas de SERP oficiales.",
      card4Title: "🔍 Auditoría Técnica Automatizada",
      card4Desc:
        "Rastrea tu sitio como lo hace Googlebot para detectar errores 404, redirecciones rotas, lentitud Core Web Vitals y bloqueos de indexación.",
      card5Title: "📊 Oportunidades 'Striking Distance' en GSC",
      card5Desc:
        "Detecta términos con miles de impresiones en página 2 (posiciones 4–20) y llévalos a la posición #1 con optimizaciones guiadas.",
      card6Title: "🔌 Servidor MCP y Agentes de Código IA",
      card6Desc:
        "Consulta rankings, investiga keywords y audita sitios directamente desde Claude Code, Cursor, Codex y OpenCode vía Model Context Protocol.",
    },
    pricing: {
      eyebrow: "Precios Transparentes y Predecibles",
      title: "Planes justos que escalan con tu crecimiento orgánico",
      subtitle:
        "Las herramientas tradicionales cobran más de $129/mes con límites rígidos. Findable te ofrece SEO integral, artículos IA y sincronización con Google desde $0 a $39/mes.",
      popularBadge: "🔥 El Más Popular",
      freeTier: {
        name: "Plan Free",
        price: "$0",
        period: "gratis para siempre",
        description: "Ideal para probar Findable y conectar Google Search Console sin ningún compromiso.",
        cta: "Probar Gratis",
        features: [
          "1 Sitio Web conectado",
          "100 créditos mensuales gratis (+ 500 de prueba)",
          "Sincronización con Google Search Console & GA4",
          "Comprobador de rankings en Google en tiempo real",
          "Auditoría de salud técnica general",
          "Acceso MCP para agentes (Claude, Cursor, Codex)",
        ],
      },
      starterTier: {
        name: "Starter",
        price: "$39",
        period: "al mes",
        description: "Para freelancers, bloggers y proyectos nicho en crecimiento.",
        cta: "Empezar Plan Starter",
        features: [
          "3 Sitios Web / Proyectos conectados",
          "10,000 Créditos de datos mensuales",
          "10 Artículos generados con IA al mes (1,500+ palabras, Schema SEO)",
          "Rastreo diario y semanal de posiciones en Google",
          "Acceso completo a MCP Server & Agentes IA",
          "Auditorías técnicas y análisis de competencia",
          "Sincronización directa con Google Search Console",
        ],
      },
      growthTier: {
        name: "Growth (Autopilot)",
        price: "$69",
        period: "al mes",
        description: "El motor completo de tráfico SEO y búsqueda con IA en piloto automático.",
        cta: "Empezar Plan Growth",
        features: [
          "6 Sitios Web / Proyectos conectados",
          "35,000 Créditos de datos mensuales",
          "30 Artículos generados con IA al mes (1 artículo diario)",
          "Monitoreo de marca en ChatGPT, Perplexity y Gemini",
          "Auditoría técnica semanal automatizada",
          "Inteligencia completa de backlinks y competidores",
          "Exportación a CMS y Webhooks",
          "Límites prioritarios en API y MCP",
        ],
      },
      scaleTier: {
        name: "Scale / Agencia",
        price: "$99",
        period: "al mes",
        description: "Para agencias de marketing, operadores multi-marca y equipos con alto volumen.",
        cta: "Empezar Plan Scale",
        features: [
          "10 Sitios Web / Proyectos conectados",
          "100,000 Créditos de datos mensuales",
          "90 Artículos generados con IA al mes",
          "Monitoreo de marca y competencia multi-dominio",
          "Reportes ejecutivos PDF White-Label para clientes",
          "Acceso para equipos y espacios de trabajo compartidos",
          "Límites prioritarios de API y soporte dedicado",
        ],
      },
      topUpNote: "¿Necesitas saldo de datos adicional? Compra recargas cuando quieras (los créditos nunca caducan y se acumulan siempre).",
      comparisonTitle: "Comparación con la alternativa:",
      comparisonText: "Los planes de entrada de Ahrefs y Semrush parten de $129/mes con límites estrictos de 1 usuario. Findable te ofrece gestión multi-sitio, artículos con IA y MCP desde $0 a $39.",
      faqTitle: "Preguntas Frecuentes",
      faqs: [
        {
          q: "¿Cómo funciona el Generador de Artículos con IA en 1-Clic?",
          a: "Toma tu palabra clave objetivo, volumen, intención de búsqueda y el contenido de las páginas mejor posicionadas en la SERP real de Google para redactar un artículo de 1,500 a 2,500 palabras. Incluye encabezados H2/H3, FAQ Schema en JSON-LD y sugerencias de enlaces internos listos para publicar.",
        },
        {
          q: "¿Cómo funcionan los créditos de datos mensuales?",
          a: "Los créditos alimentan las consultas de datos como investigación de palabras clave, comprobaciones SERP en vivo, análisis de backlinks y rastreos técnicos. Cada plan incluye una asignación mensual (10,000 en Starter, 35,000 en Growth, 100,000 en Scale) que se renueva automáticamente cada ciclo.",
        },
        {
          q: "¿Puedo conectar Google Search Console y GA4 de forma gratuita?",
          a: "¡Sí! La sincronización con Google Search Console y Google Analytics 4 está incluida en todos los planes, incluido el Plan Free. Obtienes seguimiento de consultas 'striking-distance' (posiciones 4-20), clics, impresiones y CTR real.",
        },
        {
          q: "¿Qué es la Optimización para Búsqueda en IA (GEO)?",
          a: "Generative Engine Optimization (GEO) mide cómo y cuándo los modelos de IA como ChatGPT, Perplexity, Claude y Google AI Overviews citan y recomiendan tu negocio o web frente a tus competidores.",
        },
        {
          q: "¿Cómo funciona el servidor MCP con Claude Code o Cursor?",
          a: "Findable incluye un servidor MCP nativo. Puedes conectarlo con Claude Desktop, la terminal de Claude Code, Cursor o Codex para consultar tus métricas de SEO y ejecutar búsquedas de keywords sin salir de tu entorno de desarrollo.",
        },
      ],
    },
    mcp: {
      eyebrow: "Protocolo de Contexto de Modelos (MCP)",
      title: "Obtén superpoderes con el MCP de Findable",
      desc: "Conecta tu agente o asistente de IA directamente con datos verídicos de SEO y Google Search Console. Investiga rankings, keywords y backlinks sin salir de tu entorno de desarrollo o IA.",
      cta: "Conectar con Findable",
      terminalCmd: "buscar y agrupar palabras clave para",
      terminalKeywordLabel: "palabra clave",
      terminalVolLabel: "volumen",
      terminalKdLabel: "kd",
      terminalSaved: "3 palabras clave guardadas en tu espacio.",
      terminalView: "Ver en Findable:",
    },
    blog: {
      eyebrow: "Artículos y Guías de SEO & IA",
      title: "Últimos Artículos, Estrategias y Playbooks",
      subtitle: "Domina el posicionamiento en Google, optimización para motores de IA (GEO), auditorías técnicas y automatización de contenidos.",
      readMore: "Leer artículo",
      viewAll: "Ver todos los artículos",
      featured: [
        {
          title: "Generación de Artículos SEO con IA sin Spam (2026)",
          desc: "Cómo crear artículos de 2,500 palabras que rankean en Google y motores de IA con FAQ Schema JSON-LD.",
          slug: "generowanie-artykulow-seo-ai-bez-spamu",
          category: "Contenido IA & SEO",
          readTime: "Lectura: 6 min",
        },
        {
          title: "GEO: Optimización para ChatGPT Search y Perplexity",
          desc: "Guía completa de Generative Engine Optimization (GEO) para ganar menciones y citas en modelos de IA.",
          slug: "geo-optymalizacja-pod-chatgpt-search",
          category: "Búsqueda IA / GEO",
          readTime: "Lectura: 8 min",
        },
        {
          title: "Google Search Console: Oportunidades 'Striking-Distance'",
          desc: "Cómo convertir consultas en posiciones 4 a 20 en tráfico #1 con optimizaciones rápidas de contenido.",
          slug: "google-search-console-striking-distance",
          category: "Google Search Console",
          readTime: "Lectura: 5 min",
        },
        {
          title: "Automatización SEO con Claude Code y Servidor MCP",
          desc: "Conecta agentes de programación con datos reales de SEO para auditar e investigar desde tu terminal.",
          slug: "automatyzacja-seo-claude-mcp",
          category: "MCP & Agentes IA",
          readTime: "Lectura: 7 min",
        },
      ],
    },
    footer: {
      privacy: "Política de Privacidad",
      terms: "Términos y Condiciones",
      copyright: "© 2026 Findable. Todos los derechos reservados.",
    },
  },
  pl: {
    nav: {
      signIn: "Zaloguj się",
      getStarted: "Zacznij za darmo",
      pricing: "Cennik",
      features: "Funkcje",
      blogs: "Blog",
    },
    hero: {
      badge: "⚡ Artykuły AI w 1-Klik, Monitoring Pozycji i Widoczność w GEO",
      title: "Silnik SEO i AI, który pozycjonuje Twój biznes w Google i Wyszukiwarkach AI.",
      subtitle:
        "Findable łączy generowanie artykułów SEO z AI w 1 klik, synchronizację z Google Search Console, monitoring pozycji na żywo, audyty techniczne oraz widoczność w wyszukiwarkach AI (ChatGPT, Perplexity, Gemini) w jednej platformie.",
      cta: "Zacznij za darmo",
      note: "Plan Free zawiera 100 kredytów/miesiąc + 500 próbnych · Bez karty kredytowej",
    },
    dashboard: {
      url: "app.findableweb.io",
      gscConnected: "Google Search Console Połączone",
      clicks: "Kliknięcia Organiczne",
      clicksDelta: "+18.4% w tym miesiącu",
      impressions: "Wyświetlenia w Google",
      impressionsDelta: "+24.1% w tym miesiącu",
      top10: "Słowa w Top 10",
      top10Delta: "+31 pozycji w górę",
      health: "Stan Techniczny SEO",
      healthDelta: "0 błędów krytycznych",
      module1Title: "Generator Artykułów AI w 1-Klik",
      module1Sub: "Treści Zoptymalizowane pod SEO & GEO",
      module1Desc:
        "Generuj rankingowe artykuły 1,500–2,500 słów z nagłówkami H2/H3, danymi JSON-LD FAQ Schema i analizą SERP konkurencji.",
      module2Title: "Widoczność w Wyszukiwarkach AI (GEO)",
      module2Sub: "ChatGPT, Perplexity i Gemini",
      module2Desc:
        "Monitoruj wzmianki o marce, cytowania i rekomendacje sztucznej inteligencji w porównaniu z bezpośrednimi konkurentami.",
      module3Title: "Synchronizacja Search Console & GA4",
      module3Sub: "Oficjalne API Google",
      module3Desc:
        "Odkrywaj słowa kluczowe bliskiego zasięgu (pozycje 4–20), rzeczywisty CTR i automatyczne audyty techniczne.",
    },
    features: {
      eyebrow: "Kompletny Pakiet SEO & AI Search",
      title: "Wszystko, czego potrzebujesz, aby zdominować Google i Wyszukiwarki AI",
      subtitle:
        "Zaprojektowane dla rozwijających się firm, założycieli, agencji i deweloperów szukających przewagi w organicznym ruchu.",
      card1Title: "⚡ Generator Artykułów AI w 1-Klik",
      card1Desc:
        "Zamieniaj intencyjne słowa kluczowe i zapytania z GSC w ustrukturyzowane, wyczerpujące artykuły 1,500–2,500 słów z automatyczną strukturą Schema FAQ i linkowaniem.",
      card2Title: "🤖 Widoczność w Wyszukiwarkach AI i Macierz GEO",
      card2Desc:
        "Mierz i optymalizuj częstotliwość oraz kontekst, w jakim ChatGPT, Perplexity, Claude i Gemini polecają Twoją markę na tle konkurentów.",
      card3Title: "📈 Monitoring Pozycji Google na Żywo",
      card3Desc:
        "Śledź pozycje słów kluczowych codziennie na desktopie i mobile w ponad 190 krajach i miastach z dokładnymi zrzutami SERP.",
      card4Title: "🔍 Zautomatyzowane Audyty Techniczne Witryny",
      card4Desc:
        "Crawluj witrynę jak Googlebot, aby natychmiast wykrywać błędy 404, zerwane przekierowania, problemy Core Web Vitals i blokady indeksacji.",
      card5Title: "📊 Zapytania Bliskiego Zasięgu z GSC",
      card5Desc:
        "Wykrywaj zapytania z dużą liczbą wyświetleń na 2. stronie (pozycje 4–20) i zamieniaj je w pozycję #1 dzięki precyzyjnej optymalizacji.",
      card6Title: "🔌 Serwer MCP i Agenci Programistyczni AI",
      card6Desc:
        "Odpytuj o pozycje, badaj słowa kluczowe i audytuj strony bezpośrednio w Claude Code, Cursor, Codex i OpenCode przez protokół MCP.",
    },
    pricing: {
      eyebrow: "Przejrzysty, Przewidywalny Cennik",
      title: "Uczciwe plany, które rosną razem z Twoim ruchem",
      subtitle:
        "Tradycyjne narzędzia kosztują ponad $129/mies. ze sztywnymi limitami. Findable daje Ci pełne SEO, artykuły AI i integrację z Google od $0 do $39.",
      popularBadge: "🔥 Najczęściej Wybierany",
      freeTier: {
        name: "Plan Free",
        price: "$0",
        period: "zawsze za darmo",
        description: "Idealny do przetestowania Findable i połączenia Google Search Console bez żadnych zobowiązań.",
        cta: "Zacznij za darmo",
        features: [
          "1 Połączona Witryna",
          "100 darmowych kredytów/mies. (+ 500 próbnych)",
          "Synchronizacja z Google Search Console & GA4",
          "Sprawdzanie pozycji w Google w czasie rzeczywistym",
          "Ogólny audyt techniczny witryny",
          "Dostęp do Agenta MCP (Claude, Cursor, Codex)",
        ],
      },
      starterTier: {
        name: "Starter",
        price: "$39",
        period: "miesięcznie",
        description: "Dla freelancerów, twórców stron niszowych i rozwijających się projektów.",
        cta: "Wybierz Plan Starter",
        features: [
          "3 Połączone Witryny / Projekty",
          "10,000 Kredytów danych miesięcznie",
          "10 Artykułów AI w 1-Klik / mies. (1,500+ słów, SEO & Schema)",
          "Codzienny i cotygodniowy monitoring pozycji Google",
          "Pełny Serwer MCP i umiejętności Agentów AI",
          "Audyty techniczne i badanie konkurencji",
          "Bezpośrednia synchronizacja z Google Search Console",
        ],
      },
      growthTier: {
        name: "Growth (Autopilot)",
        price: "$69",
        period: "miesięcznie",
        description: "Kompletny silnik ruchu SEO i AI Search na autopilocie.",
        cta: "Wybierz Plan Growth",
        features: [
          "6 Połączonych Witryn / Projektów",
          "35,000 Kredytów danych miesięcznie",
          "30 Artykułów AI w 1-Klik / mies. (1 artykuł dziennie)",
          "Monitoring marki w ChatGPT, Perplexity i Gemini",
          "Cotygodniowy zautomatyzowany audyt techniczny",
          "Pełna analityka linków zwrotnych i konkurentów",
          "Eksport do CMS i Webhooks",
          "Priorytetowe limity zapytań MCP",
        ],
      },
      scaleTier: {
        name: "Scale / Agencja",
        price: "$99",
        period: "miesięcznie",
        description: "Dla agencji marketingowych, właścicieli wielu marek i wymagających zespołów.",
        cta: "Wybierz Plan Scale",
        features: [
          "10 Połączonych Witryn / Projektów",
          "100,000 Kredytów danych miesięcznie",
          "90 Artykułów AI w 1-Klik / mies.",
          "Monitoring marki i konkurencji na wielu domenach",
          "Raporty PDF White-Label dla klientów",
          "Dostęp dla zespołu i współdzielone przestrzenie",
          "Dedykowane wsparcie i najwyższe limity API",
        ],
      },
      topUpNote: "Potrzebujesz dodatkowych kredytów? Dokup doładowanie w dowolnej chwili (kredyty nigdy nie wygasają i przechodzą na kolejne miesiące).",
      comparisonTitle: "Porównaj z alternatywami:",
      comparisonText: "Plany startowe Ahrefs i Semrush zaczynają się od $129/mies. z restrykcyjnym limitem 1 użytkownika. Findable daje monitoring wielu domen, generowanie artykułów AI i MCP od $0 do $39.",
      faqTitle: "Często Zadawane Pytania (FAQ)",
      faqs: [
        {
          q: "Jak działa Generator Artykułów AI w 1-Klik?",
          a: "Narzędzie pobiera wybrane słowo kluczowe, wolumen, intencję oraz analizuje najlepiej pozycjonujące się strony konkurencji z wyników Google na żywo, tworząc wyczerpujący artykuł 1,500–2,500 słów. Zawiera nagłówki H2/H3, strukturę JSON-LD FAQ Schema oraz propozycje linków wewnętrznych gotowe do wdrożenia.",
        },
        {
          q: "Jak działają miesięczne kredyty?",
          a: "Kredyty zasilają operacje pobierania danych, takie jak analiza słów kluczowych, sprawdzanie pozycji SERP, analityka linków zwrotnych czy audyty techniczne. Każdy płatny plan zawiera odnawialną co miesiąc pulę kredytów (10 000 w Starter, 35 000 w Growth, 100 000 w Scale).",
        },
        {
          q: "Czy mogę połączyć Google Search Console i GA4 za darmo?",
          a: "Tak! Podłączenie Google Search Console oraz Google Analytics 4 jest dostępne we wszystkich planach, również w Planie Free. Zyskujesz pełen podgląd zapytań bliskiego zasięgu (pozycje 4-20), kliknięć, wyświetleń i współczynnika CTR.",
        },
        {
          q: "Czym jest widoczność w wyszukiwarkach AI (GEO)?",
          a: "Generative Engine Optimization (GEO) bada częstotliwość i kontekst, w jakim modele sztucznej inteligencji, takie jak ChatGPT, Perplexity, Claude czy Google AI Overviews, wymieniają i rekomendują Twoją firmę na tle konkurencji.",
        },
        {
          q: "Jak działa serwer MCP z Claude Code lub Cursor?",
          a: "Findable posiada wbudowany serwer Model Context Protocol (MCP). Możesz połączyć go z aplikacją Claude Desktop, terminalem Claude Code, edytorem Cursor lub Codex, aby odpytywać o dane SEO i badać słowa kluczowe bezpośrednio ze swojego środowiska pracy.",
        },
      ],
    },
    mcp: {
      eyebrow: "Model Context Protocol",
      title: "Zyskaj supermoce dzięki Findable MCP",
      desc: "Połącz swojego agenta AI (Claude, Codex, Gemini, OpenCode) bezpośrednio z prawdziwymi danymi SEO i Google Search Console. Sprawdzaj pozycje, badaj frazy i audytuj serwisy w języku naturalnym.",
      cta: "Połącz z Findable",
      terminalCmd: "znajdź i zgrupuj słowa kluczowe dla",
      terminalKeywordLabel: "słowo kluczowe",
      terminalVolLabel: "wolumen",
      terminalKdLabel: "kd",
      terminalSaved: "Zapisano 3 słowa kluczowe do projektu.",
      terminalView: "Zobacz w Findable:",
    },
    blog: {
      eyebrow: "Baza Wiedzy & Artykuły SEO",
      title: "Najnowsze Artykuły, Przewodniki i Poradniki",
      subtitle: "Opanuj algorytmy wyszukiwarek, optymalizację pod wyszukiwarki AI (GEO), audyty techniczne i automatyzację publikacji.",
      readMore: "Czytaj artykuł",
      viewAll: "Zobacz wszystkie artykuły na blogu",
      featured: [
        {
          title: "Generowanie Artykułów SEO AI bez Spamu (2026)",
          desc: "Jak tworzyć rankingowe artykuły 2,500 słów z JSON-LD FAQ i wygrywać w wyszukiwarkach AI i Google.",
          slug: "generowanie-artykulow-seo-ai-bez-spamu",
          category: "AI Content & SEO",
          readTime: "6 min czytania",
        },
        {
          title: "GEO: Optymalizacja pod ChatGPT Search i Perplexity",
          desc: "Kompletny przewodnik po Generative Engine Optimization (GEO) i zdobywaniu cytowań w modelach AI.",
          slug: "geo-optymalizacja-pod-chatgpt-search",
          category: "AI Search / GEO",
          readTime: "8 min czytania",
        },
        {
          title: "Google Search Console: Wykorzystaj Zapytania Bliskiego Zasięgu",
          desc: "Jak zamienić zapytania z pozycji 4-20 w pozycję #1 dzięki strategii striking-distance queries.",
          slug: "google-search-console-striking-distance",
          category: "Optymalizacja GSC",
          readTime: "5 min czytania",
        },
        {
          title: "Automatyzacja SEO z Claude Code i Serwerem MCP",
          desc: "Połącz agentów programistycznych z realnymi danymi SEO i audytuj witryny bezpośrednio z terminala.",
          slug: "automatyzacja-seo-claude-mcp",
          category: "MCP & Agenci AI",
          readTime: "7 min czytania",
        },
      ],
    },
    footer: {
      privacy: "Polityka Prywatności",
      terms: "Regulamin i Warunki",
      copyright: "© 2026 Findable. Wszelkie prawa zastrzeżone.",
    },
  },
};

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
};

const I18nContext = createContext<I18nContextType>({
  lang: "es",
  setLang: () => {},
  t: translations.es,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("es");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("findable_lang") as Language;
      if (stored === "en" || stored === "es" || stored === "pl") {
        setLangState(stored);
        document.documentElement.lang = stored;
      } else {
        const browserLang = navigator.language.startsWith("pl")
          ? "pl"
          : navigator.language.startsWith("es")
          ? "es"
          : "en";
        setLangState(browserLang);
        document.documentElement.lang = browserLang;
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("findable_lang", newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  const t = translations[lang] || translations.en;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export function LanguageSelector({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100/90 p-0.5 text-xs font-semibold ${
        className || ""
      }`}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition-all ${
          lang === "en"
            ? "bg-white text-[#0C5C55] shadow-xs font-bold"
            : "text-neutral-500 hover:text-neutral-900"
        }`}
        aria-label="Switch to English"
      >
        <span>EN</span>
      </button>
      <button
        type="button"
        onClick={() => setLang("es")}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition-all ${
          lang === "es"
            ? "bg-white text-[#0C5C55] shadow-xs font-bold"
            : "text-neutral-500 hover:text-neutral-900"
        }`}
        aria-label="Cambiar a Español"
      >
        <span>ES</span>
      </button>
      <button
        type="button"
        onClick={() => setLang("pl")}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition-all ${
          lang === "pl"
            ? "bg-white text-[#0C5C55] shadow-xs font-bold"
            : "text-neutral-500 hover:text-neutral-900"
        }`}
        aria-label="Przełącz na Polski"
      >
        <span>PL</span>
      </button>
    </div>
  );
}
