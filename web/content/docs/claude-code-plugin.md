---
title: "Install the Findable plugin for Claude Code"
description: "Add Findable MCP and Agent Skills to Claude Code with one marketplace and one install command."
---

The Findable plugin bundles Findable MCP and all nine SEO Agent Skills into one install. This is the preferred way to set up Findable in Claude Code.

## Install

Run these two commands in Claude Code:

```bash
/plugin marketplace add every-app/open-seo
/plugin install findable@findable
```

If the install summary says `Run /reload-plugins to activate.`, run that command.

Claude Code connects Findable MCP at `https://app.findable.io/mcp` and enables nine skills:

- SEO Project Setup
- SEO Coach
- SEO Audit
- Keyword Research
- Keyword Clustering
- Competitive Landscape
- Competitor Analysis
- Local SEO
- Link Prospecting

## Finish the login

Claude Code should prompt you to log in to Findable right after install. If it doesn't, run `/mcp` and approve the Findable connection from there.

## Run a skill

Plugin skills are namespaced by the plugin name:

```
/findable:seo-project-setup
/findable:seo-coach
/findable:seo-audit
/findable:keyword-research
/findable:keyword-clustering
/findable:competitive-landscape
/findable:competitor-analysis
/findable:local-seo
/findable:link-prospecting
```

## Claude Desktop

Claude Desktop doesn't support this plugin format — plugins are a Claude Code feature. For Claude Desktop, [add Findable as an MCP connector](/docs/mcp#claude-desktop) instead.

## Update or remove

```bash
/plugin marketplace update findable
/plugin uninstall findable@findable
```

Updates land in the cache immediately, but the running session keeps the old version until you run `/reload-plugins` or restart Claude Code.

## Troubleshooting

To check what's actually installed, run `/plugin list` rather than bare `/plugin` — `/plugin` alone opens an interactive panel that doesn't show plain text.

If `/reload-plugins` reports `0 skills`, that's normal, not a failure — its summary only counts a plugin's `commands/` directory, not `skills/`. Confirm the skills loaded by running one directly, for example `/findable:seo-audit`.

If `/plugin uninstall findable@findable` reports "not installed in this project," you likely installed to a different scope than the one being checked (User, Project, or Local). Run `/plugin list` to see the actual scope, or sidestep the picker entirely with the shell form: `claude plugin uninstall findable@findable --scope user`.

If plugin skills don't appear, clear the plugin cache with `rm -rf ~/.claude/plugins/cache` — this clears every installed plugin's cache, not just Findable's, so reinstall anything else you have after — then restart Claude Code and reinstall the plugin.

If the Findable connection doesn't show as authenticated, run `/mcp`, select Findable, and complete the login.

## Other clients

This plugin is for Claude Code. For Codex CLI, use the [Findable plugin for Codex](/docs/codex-plugin) instead. For Cursor, Codex Desktop, Claude Desktop, or an API key setup, see [Set up Findable MCP](/docs/mcp) and [Set up Findable Agent Skills](/docs/skills/setup).
