---
name: serena_teacher
description: Use when onboarding to Serena MCP, configuring project.yml, troubleshooting language server issues, or learning which Serena tools to use for code navigation. NOT for using Serena tools directly—just call mcp__serena__* tools.
---

# Serena

LSP-backed code navigation MCP server. This skill covers **meta work** (setup, config, troubleshooting)—not mainline tool usage.

> **To navigate code:** Just call `mcp__serena__find_symbol`, `mcp__serena__get_symbols_overview`, etc. directly. Don't invoke this skill.

## When to Use Serena vs Claude Code Built-ins

| Task | Use Serena | Not |
|------|-----------|-----|
| Find symbol definition | `mcp__serena__find_symbol` | Grep for function name |
| Find references | `mcp__serena__find_referencing_symbols` | Grep for usage |
| Understand file structure | `mcp__serena__get_symbols_overview` | Read entire file |
| Rename across codebase | `mcp__serena__rename_symbol` | Find-and-replace |
| Search text patterns | `mcp__serena__search_for_pattern` | Grep (either works) |

## Key Tools (claude-code context)

The `claude-code` context disables tools that duplicate CC built-ins (file ops, shell). What remains:

### Navigation
- `find_symbol` — Global/local symbol search by name (optionally filter by type)
- `find_referencing_symbols` — Find what references a symbol at a given location
- `get_symbols_overview` — Top-level symbols in a file
- `search_for_pattern` — Pattern search across project

### Refactoring
- `rename_symbol` — LSP-powered rename across entire codebase
- `replace_symbol_body` — Replace a symbol's full definition
- `insert_before_symbol` / `insert_after_symbol` — Insert content relative to a symbol

### Project
- `onboarding` — Identify project structure and essential tasks
- `get_current_config` — Show active config, tools, modes

### Memory
- `write_memory` / `read_memory` / `list_memories` / `delete_memory` — Project-specific persistent memory

### Meta
- `switch_modes` — Change active modes mid-session
- `restart_language_server` — Fix stale state after external edits

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
