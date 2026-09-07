---
title: "Optymalizacja Core Web Vitals: Poradnik"
description: "Praktyczny przewodnik po metrykach Core Web Vitals: LCP, INP i CLS. Dowiedz się, jak przyspieszyć stronę i spełnić rygorystyczne wymogi Google."
author: "Findable Team"
date: "2026-09-05"
---

Wskaźniki Core Web Vitals (Podstawowe Wskaźniki Internetowe) to zestaw metryk opracowanych przez inżynierów Google, mierzących realne doświadczenia użytkowników związane z szybkością ładowania, responsywnością i stabilnością wizualną stron. W 2026 roku stanowią one nieodzowny element oceny jakości strony (Page Experience Signals).

Strony, które nie spełniają minimalnych progów wydajnościowych, tracą pozycje w rankingu na rzecz szybszych konkurentów oraz odnotowują wyższy współczynnik odrzuceń (Bounce Rate).

## Trzy filary Core Web Vitals

### 1. LCP (Largest Contentful Paint) – Czas renderowania największego elementu
Mierzy czas, jaki upływa od momentu rozpoczęcia ładowania strony do pełnego wyświetlenia największego bloku tekstu lub grafiki widocznej w oknie przeglądarki (above the fold).

- **Dobry wynik:** poniżej 2,5 sekundy.
- **Wymaga poprawy:** między 2,5 a 4,0 sekundy.
- **Słaby wynik:** powyżej 4,0 sekund.

**Jak poprawić LCP?**
- Zastosuj formaty nowej generacji: WebP lub AVIF zamiast ciężkich plików PNG/JPEG.
- Wdróż nagłówek `rel="preload"` dla kluczowej grafiki w sekcji Hero:
  ```html
  <link rel="preload" as="image" href="/hero-banner.webp" type="image/webp" />
  ```
- Skonfiguruj sieć dostarczania treści (CDN), np. Cloudflare, aby zredukować Time to First Byte (TTFB) do poniżej 200 ms.

### 2. INP (Interaction to Next Paint) – Płynność interakcji
Wprowadzona przez Google metryka, która zastąpiła przestarzały wskaźnik First Input Delay (FID). Mierzy opóźnienie wszystkich interakcji użytkownika (kliknięcia w przyciski, otwarcie menu, wpisywanie w pole formularza) przez cały czas trwania sesji na stronie.

- **Dobry wynik:** poniżej 200 milisekund.
- **Wymaga poprawy:** między 200 a 500 milisekund.
- **Słaby wynik:** powyżej 500 milisekund.

**Jak poprawić INP?**
- Rozbijaj długie zadania JavaScript (Long Tasks powyżej 50 ms) przy pomocy `setTimeout` lub `requestIdleCallback`.
- Ogranicz liczbę zewnętrznych skryptów śledzących (piksele Facebooka, zbędne widgety czatów).
- Używaj technik Server-Side Rendering (SSR) lub Static Site Generation (SSG) z selektywną hydratacją.

### 3. CLS (Cumulative Layout Shift) – Stabilność wizualna
Mierzy nieoczekiwane przesunięcia elementów układu strony podczas jej ładowania (np. gdy użytkownik chce kliknąć przycisk, a w tym momencie wczytuje się baner reklamowy i przesuwa treść w dół).

- **Dobry wynik:** poniżej 0,1.
- **Wymaga poprawy:** między 0,1 a 0,25.
- **Słaby wynik:** powyżej 0,25.

**Jak wyeliminować CLS?**
- Zawsze definiuj atrybuty `width` i `height` na tagach `<img>` i `<video>` lub stosuj właściwość CSS `aspect-ratio`:
  ```css
  img {
    aspect-ratio: 16 / 9;
    width: 100%;
    height: auto;
  }
  ```
- Rezerwuj stałe miejsce na reklamy i dynamicznie ładowane moduły za pomocą minimalnej wysokości (`min-height`).
- Używaj `font-display: swap` w arkuszach stylów, aby zapobiec efektowi FOIT (Flash of Invisible Text).

## Narzędzia do audytu wydajności

W audytorze technicznym [Findable Site Audit](/features/site-audit) metryki Core Web Vitals są sprawdzane automatycznie dla wszystkich podstron serwisu, wskazując dokładne selektory CSS i pliki JavaScript odpowiedzialne za opóźnienia.
