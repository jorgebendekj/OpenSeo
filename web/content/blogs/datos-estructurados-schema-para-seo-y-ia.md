---
title: "Datos estructurados (schema.org) para SEO e IA: qué marcar en tu web"
description: "Qué tipos de schema.org añadir a una web en España (Organization, LocalBusiness, FAQPage, Article), cómo validarlos y qué esperar de ellos."
author: "Findable Team"
date: "2026-10-02"
lang: "es"
---

Los datos estructurados son un bloque de código (normalmente JSON-LD) que describe en un formato estándar lo que ya dice tu página: quién eres, qué vendes, cuánto cuesta, qué preguntas respondes. Los buscadores lo leen para interpretar la página con menos ambigüedad.

## Qué esperar de ellos

- **Sí:** pueden habilitar resultados enriquecidos en Google y ayudan a que los sistemas automáticos entiendan tu negocio.
- **No hay garantía:** no existe prueba pública de que el schema, por sí solo, haga que ChatGPT o AI Overviews te citen. Trátalo como higiene técnica, no como atajo.
- **Regla de oro:** lo que marques tiene que estar visible en la página. Marcar contenido que el usuario no ve va contra las directrices de Google.

## Los cinco tipos que casi todo negocio en España necesita

### 1. Organization (en la página de inicio)

Identifica tu empresa. Incluye nombre, URL, logotipo y perfiles oficiales (`sameAs`) en LinkedIn, X, YouTube o Google Business Profile. Esa coherencia entre sitios ayuda a confirmar que eres la misma entidad.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Tu Empresa S.L.",
  "url": "https://www.tuempresa.es",
  "logo": "https://www.tuempresa.es/logo.png",
  "sameAs": ["https://www.linkedin.com/company/tuempresa"]
}
```

### 2. LocalBusiness (si atiendes en un local o zona)

Añade dirección, teléfono, horario y zona de servicio. Los datos deben coincidir letra por letra con tu ficha de Google Business Profile.

### 3. Service o Product

Describe lo que vendes con nombre, descripción y, si procede, precio y moneda (EUR). Un rango de precios claro en la página es también una señal útil para las personas.

### 4. FAQPage

Solo si la página tiene preguntas y respuestas visibles. Google limita hoy los resultados enriquecidos de FAQ a ciertos sitios, pero las respuestas cortas y bien formuladas siguen siendo fáciles de resumir para cualquier sistema.

### 5. Article (en el blog)

Marca título, autor, fecha de publicación y de actualización. La fecha de actualización importa: mantén tus guías al día.

## Cómo validar

1. Pega la URL en la [prueba de resultados enriquecidos de Google](https://search.google.com/test/rich-results).
2. Revisa los informes de mejoras en Search Console.
3. Corrige errores y advertencias antes de ampliar a más páginas.

## Errores frecuentes

- Marcar precios o valoraciones que no aparecen en la página.
- Duplicar bloques contradictorios (el plugin del CMS y uno manual).
- Dejar el schema desactualizado tras un cambio de tarifas.

## Siguiente paso

El schema es una parte del plan. El conjunto lo tienes en la [guía GEO para empresas en España](/blogs/como-aparecer-en-chatgpt-guia-geo-espana). Si quieres auditar el estado técnico de tu sitio, la [auditoría de Findable](/features/site-audit) revisa indexación, metadatos y rendimiento.
