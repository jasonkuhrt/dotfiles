# Claude Code Tools Reference

Quick reference for all Claude Code plugins, MCP servers, and hooks in this setup. Forget what something does? Check here.

## Plugins

| Category         | Plugin                       | What it does                                           | Key skills / commands                                  |
| ---------------- | ---------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| **Workflow**      | `superpowers-dev`           | Structured dev workflows — planning, TDD, debugging    | brainstorming, writing-plans, systematic-debugging, test-driven-development |
| **Code Quality**  | `code-review`               | Code review of a PR or the working diff                | `/code-review`                                         |
| **Issues**        | `linear`                    | Linear workspace over MCP — issues, projects, documents | issue/project/document tools                           |
| **Creative**      | `playground`                | Interactive single-file HTML playground builder         | `/playground`                                          |
| Creative          | `show-me`                   | Visual explanation — diagrams, code sketches, artifacts | `/show-me`                                             |

Installed but disabled, kept for the occasional job: `claude-code-setup`, `claude-md-management`,
`code-simplifier`, `frontend-design`, `plugin-dev`, `ralph-loop`, `skill-creator`,
`superpowers-developing-for-claude-code`, `tsgo-lsp`. One more, `cloudflare`, is installed at project
scope against a Heartbeat worktree rather than this setup.

### Plugin sources

| Marketplace                    | Plugins                                                       |
| ------------------------------ | ------------------------------------------------------------- |
| `claude-plugins-official`      | code-review, linear, playground, and most of the disabled set |
| `superpowers-marketplace`      | superpowers-dev, superpowers-developing-for-claude-code       |
| `skills` (humanlayer/skills)   | show-me                                                       |
| `jasonkuhrt` (local directory) | tsgo-lsp                                                      |

`claude plugin list` is the live truth; which ones are on lives in `home/.claude/settings.json` under
`enabledPlugins`.

## MCP Servers

| Server              | Transport  | What it provides                                           | Runtime                                       |
| ------------------- | ---------- | ---------------------------------------------------------- | --------------------------------------------- |
| `effect-docs`       | stdio      | Effect library docs — search and retrieve                  | `npx -y effect-mcp@latest`                    |
| `msgvault`          | stdio      | Local mail and message archive — search, aggregate, export | `msgvault mcp`                                |
| `macos-automator`   | stdio      | AppleScript and JXA execution, plus scripting tips         | `npx -y @steipete/macos-automator-mcp@latest` |
| `peekaboo`          | stdio      | macOS screenshots and native UI automation                 | `peekaboo-mcp`                                |
| `planetscale`       | HTTP       | PlanetScale branches, queries, insights                    | `mcp.pscale.dev`                              |
| `linear`            | HTTP       | Linear issues and projects, supplied by the plugin         | `mcp.linear.app`                              |

These are declared in `~/.claude.json`, which mixes config with session state and so is not
dotfiles-managed — this table is the durable record.

Claude in Chrome and computer use ship with Claude Code itself and need no MCP entry. The claude.ai
Google Drive, Gmail, and Calendar connectors are present but disabled per project.

## Hooks

`home/.claude/settings.json` configures no hooks of its own; the repo's hook scripts were removed in
`05bc64c6`.

Every hook that actually fires comes from cmux, injected at launch rather than written to disk.
`/Applications/cmux.app/Contents/Resources/bin/cmux-claude-wrapper` writes a temporary settings file
wiring Notification, PermissionRequest, PreToolUse, PostToolUse, SessionStart, SessionEnd, Stop,
SubagentStop, and UserPromptSubmit, then passes it along with `--session-id`. That is what drives the
sidebar status, notifications, Feed approvals, and session restore. cmux's fish integration puts a
per-surface `claude` shim ahead of the real binary on PATH, and it loads because cmux starts the shell
itself (`fish -il --init-command …`). See the
[cmux agent-hooks docs](https://raw.githubusercontent.com/manaflow-ai/cmux/main/docs/agent-hooks.md).

Codex's side is committed rather than injected: `home/.codex/hooks.json`, symlinked to
`~/.codex/hooks.json`, carries the same cmux hooks plus `plannotator` on Stop.
