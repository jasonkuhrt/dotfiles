---
name: serena_teacher
description: Use when onboarding to Serena MCP, configuring project.yml, troubleshooting language server issues, or learning which Serena tools to use for code navigation.
---

# Serena

LSP-backed code navigation MCP server. This skill covers **meta work** (setup, config, troubleshooting)—not mainline tool usage.

> **To navigate code:** Just call `mcp__serena__find_symbol`, `mcp__serena__get_symbols_overview`, etc. directly. Don't invoke this skill.

## Tools

For tool quick reference and common workflows, see [references/2026-01-28-workflow.md](references/2026-01-28-workflow.md).

## Configuration

See [references/2026-01-28-configuration.md](references/2026-01-28-configuration.md).

## Workflow Patterns

See [references/2026-01-28-workflow.md](references/2026-01-28-workflow.md).

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Tools not available | Check `claude mcp list` for serena status |
| Stale symbols after external edits | `mcp__serena__restart_language_server` |
| Wrong project detected | Serena uses `--project-from-cwd`: check `.serena/project.yml` or `.git` presence |
| Language server not starting | Check `.serena/project.yml` has correct `language` and `root_path` |
| Too many tools showing | Ensure `--context claude-code` is set (disables CC-duplicate tools) |
