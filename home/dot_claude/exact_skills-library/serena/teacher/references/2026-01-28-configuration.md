# Serena Configuration Reference

## Configuration Hierarchy

Loaded in order of precedence (highest first):

1. **CLI arguments** to `start-mcp-server`
2. **Project config** `.serena/project.yml`
3. **User config** `~/.serena/serena_config.yml`
4. **Active modes and contexts**

## User Config: `~/.serena/serena_config.yml`

Located at `~/.serena/serena_config.yml` (auto-created on first run). Override location with `SERENA_HOME` env var.

Edit with: `serena config edit`

## Project Config: `.serena/project.yml`

Per-project settings. Auto-generated on first use or explicitly with `serena project create [options]`.

The `.serena/` directory is **optional** — Serena auto-creates it on demand. Without it, Serena still starts and detects the project via `.git`.

## Contexts

A context defines the environment Serena runs in. Set at startup, cannot change mid-session.

| Context | For | Tools |
|---------|-----|-------|
| `desktop-app` | Claude Desktop (default) | Full toolset |
| `claude-code` | Claude Code | Disables CC-duplicate tools, single-project |
| `codex` | OpenAI Codex | Optimized for Codex |
| `ide` | VSCode, Cursor, Cline | Augments existing IDE capabilities |
| `agent` | Autonomous agents (Agno) | Full autonomy toolset |

**Important:** `claude-code` and `ide` contexts are **single-project** — they disable project activation tools and limit tools to those relevant for the active project.

Set with: `--context claude-code`

Manage: `serena context list`, `serena context create <name>`, `serena context edit <name>`

## Modes

Modes refine behavior for specific task types. Multiple can be active simultaneously. Can be switched mid-session via `switch_modes` tool.

| Mode | Purpose |
|------|---------|
| `interactive` | Conversational back-and-forth (default) |
| `editing` | Direct code modification (default) |
| `planning` | Planning and analysis |
| `one-shot` | Single-response tasks |
| `no-onboarding` | Skip onboarding, keep memory tools |
| `onboarding` | Focus on project onboarding |
| `no-memories` | Disable all memory tools |

**Default modes:** `interactive` + `editing`. When specifying modes explicitly, you must include defaults if you want them:

```shell
--mode interactive --mode editing --mode no-memories
```

Manage: `serena mode list`, `serena mode create <name>`, `serena mode edit <name>`

## Our Setup

User-scope MCP in `~/.claude.json`:

```
serena → uvx --from "git+https://github.com/oraios/serena" serena start-mcp-server --context claude-code --project-from-cwd
```

- `--context claude-code` — disables tools CC already provides
- `--project-from-cwd` — detects project from: `.serena/project.yml` → `.git` → cwd fallback
- No `--enable-web-dashboard` by default (add per-session if needed)

## Custom Prompts

Override default prompts by adding `.yml` files to `~/.serena/prompt_templates/`. Inspect defaults at: https://github.com/oraios/serena/tree/main/src/serena/resources/config/prompt_templates
