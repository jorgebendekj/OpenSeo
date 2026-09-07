---
title: "Automatyzacja SEO z Claude Code i MCP"
description: "Dowiedz się, jak połączyć Claude Code i protokół MCP z Findable, aby badać frazy kluczowe, audytować kod i analizować SERP bezpośrednio w terminalu."
author: "Findable Team"
date: "2026-09-05"
---

Połączenie sztucznej inteligencji z inżynierią oprogramowania stworzyło nową generację narzędzi: asystentów terminalowych, takich jak **Claude Code**, oraz środowiska IDE nowej ery (Cursor, Windsurf). Dzięki otwartemu standardowi **Model Context Protocol (MCP)**, stworzonemu przez firmę Anthropic, agenci AI mogą teraz wchodzić w interakcję z zewnętrznymi API i bazami danych dokładnie tak, jak programista korzystający z terminala.

Integracja [Findable MCP Server](/docs/mcp) z Claude Code przenosi analizę SEO bezpośrednio do Twojego środowiska pracy, eliminując konieczność ciągłego przełączania się między dziesiątkami kart w przeglądarce.

## Jak działa integracja MCP w praktyce?

Protokół MCP definiuje ustandaryzowane schematy JSON-RPC, za pomocą których model językowy dowiaduje się, jakimi narzędziami dysponuje, jakich argumentów oczekują i w jaki sposób interpretować zwrócone dane.

Po podłączeniu serwera Findable, Claude Code otrzymuje natywny zestaw komend SEO:
- **`keyword_research`:** badanie fraz powiązanych, wolumenu i trudności KD w polskim Google.
- **`serp_inspect`:** analiza nagłówków, adresów URL i elementów rozszerzonych dla dowolnego zapytania.
- **`backlinks`:** inspekcja domen odsyłających i parametrów siły profilu linkowego.
- **`site_audit`:** weryfikacja kodu HTML pod kątem błędów kanonicznych, tagów meta i nagłówków.

## Krok po kroku: Instalacja i konfiguracja Claude Code z Findable

Konfiguracja zajmuje mniej niż 2 minuty:

### 1. Rejestracja i wygenerowanie klucza API
Zaloguj się na swoje konto w [Findable](https://app.findableweb.io) i przejdź do zakładki **Ustawienia → AI & MCP**, aby skopiować swój indywidualny klucz API lub autoryzować sesję OAuth.

### 2. Dodanie serwera w terminalu
Wpisz w konsoli polecenie:

```bash
claude mcp add --transport http --scope user findable https://app.findableweb.io/mcp
```

### 3. Przykłady promptów i komend

Możesz teraz zlecać Claude Code złożone zadania analityczne w naturalnym języku:

```bash
# Badanie słów kluczowych pod nowy artykuł
"Claude, zbadaj frazę 'pozycjonowanie lokalne warszawa' za pomocą narzędzia findable. Zwróć tabelę z powiązanymi frazami o KD poniżej 25 i zaproponuj strukturę nagłówków H2."

# Audyt kodu przed wdrożeniem produkcyjnym
"Przeanalizuj plik src/routes/cennik.tsx i za pomocą findable sprawdź, czy wdrożone znaczniki JSON-LD spełniają wymagania Google Rich Results."
```

## Przykładowa odpowiedź z narzędzia findable.keyword_research

Podczas wywołania komendy w terminalu, agent otrzymuje ustrukturyzowaną odpowiedź JSON:
```json
{
  "keyword": "pozycjonowanie lokalne warszawa",
  "search_volume": 1600,
  "cpc": 12.40,
  "difficulty": 22,
  "intent": "commercial",
  "serp_features": ["local_pack", "people_also_ask"]
}
```

Na tej podstawie model AI może samodzielnie zaplanować strukturę landing page'a lub przygotować zoptymalizowany szablon komponentu React.

## Korzyści dla programistów i zespołów marketingu

- **Weryfikacja SEO w procesie CI/CD:** Możesz zautomatyzować sprawdzanie poprawności tagów meta, linków kanonicznych i sitemapy przy każdym Pull Requeście w GitHubie.
- **Koniec z kopiowaniem danych:** Wyniki analiz natychmiast trafiają do plików Markdown, dokumentacji Notion lub kodu aplikacji.
- **Błyskawiczne prototypowanie landing page'y:** Claude generuje kod komponentu w React/Next.js wraz ze zoptymalizowanymi nagłówkami i danymi strukturalnymi w jednym przebiegu.
