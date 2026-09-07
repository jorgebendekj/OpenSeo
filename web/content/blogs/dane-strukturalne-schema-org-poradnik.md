---
title: "Dane Strukturalne Schema.org: JSON-LD"
description: "Kompleksowy poradnik wdrażania znaczników Schema.org i JSON-LD. Zwiększ CTR w wynikach wyszukiwania Google dzięki wynikom z elementami rozszerzonymi."
author: "Findable Team"
date: "2026-09-05"
---

Dane strukturalne (Structured Data) oparte na słowniku Schema.org to uniwersalny język, za pomocą którego przekazujesz wyszukiwarkom i modelom sztucznej inteligencji dokładne znaczenie elementów na Twojej stronie. Zamiast zmuszać algorytm do domyślania się, co jest ceną, opinią, autorem czy adresem siedziby, podajesz te fakty w ustandaryzowanym formacie **JSON-LD**.

Prawidłowa implementacja danych strukturalnych pozwala zdobyć w Google tzw. wyniki rozszerzone (*Rich Results*), które zwiększają współczynnik klikalności (CTR) nawet o 20–35%.

## Dlaczego format JSON-LD jest standardem branżowym?

Google rekomenduje format **JSON-LD** (JavaScript Object Notation for Linked Data) ponad starsze formaty, takie jak Microdata czy RDFa.

Kluczowe zalety JSON-LD:
- **Separacja od kodu HTML:** kod JSON-LD umieszczasz wewnątrz znacznika `<script type="application/ld+json">` w nagłówku `<head>` lub na końcu strony, bez konieczności modyfikacji klas CSS czy tagów HTML.
- **Łatwość w automatyzacji:** dane mogą być dynamicznie wstrzykiwane przez CMS lub wygenerowane w aplikacjach React, Next.js czy Astro.
- **Odporność na błędy renderowania:** roboty wyszukiwarek bez trudu odczytują obiekt JSON, nawet jeśli arkusze stylów nie załadują się w pełni.

## Najważniejsze typy Schema dla serwisów w Polsce

### 1. Schema FAQPage (Sekcja często zadawanych pytań)
Pozwala na wyświetlanie rozwijanych pytań i odpowiedzi bezpośrednio pod Twoim wynikiem w wyszukiwarce.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ile czasu zajmuje pozycjonowanie nowej domeny?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pierwsze efekty w postaci wzrostu pozycji na frazy long-tail są widoczne po 1–3 miesiącach, natomiast stabilny ruch na frazy konkurencyjne wymaga 6–12 miesięcy systematycznych działań."
      }
    }
  ]
}
</script>
```

### 2. Schema Product & Offer (Dla e-commerce)
Prezentuje cenę, dostępność produktu ("W magazynie") oraz ocenę w postaci gwiazdek.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Buty do biegania Trail Pro",
  "image": "https://twojsklep.pl/img/trail-pro.jpg",
  "description": "Profesjonalne buty do biegania w terenie z amortyzacją.",
  "sku": "TP-2026-PL",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "PLN",
    "price": "429.00",
    "availability": "https://schema.org/InStock",
    "url": "https://twojsklep.pl/buty-trail-pro"
  }
}
</script>
```

### 3. Schema LocalBusiness (Dla firm lokalnych w Polsce)
Łączy stronę internetową z profilem Google Maps i ułatwia kwalifikację do Local Packa:
- Podaj dokładny adres, NIP, numer telefonu i godziny otwarcia.
- Zadbaj o spójność danych NAP (Name, Address, Phone) z bazami CEIDG i KRS.

## Jak weryfikować poprawność wdrożenia?

Po zaimplementowaniu znaczników przetestuj stronę w dwóch oficjalnych narzędziach:
1. **Google Rich Results Test (Test wyników z elementami rozszerzonymi):** weryfikuje, czy strona kwalifikuje się do wyświetlenia rozszerzonych snippetów.
2. **Schema.org Validator:** bada ogólną poprawność składniową i powiązania między encjami.

W platformie [Findable](https://app.findableweb.io) każde generowane podsumowanie i artykuł zawiera poprawnie sformatowane znaczniki JSON-LD, dzięki czemu Twoje treści są natychmiast gotowe do indeksacji.
