# Claude Code Tools Reference

Quick reference for all Claude Code plugins, MCP servers, and hooks in this setup. Forget what something does? Check here.

## Plugins

| Category         | Plugin                       | What it does                                           | Key skills / commands                                  |
| ---------------- | ---------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| **Workflow**      | `superpowers`               | Structured dev workflows — planning, TDD, debugging    | brainstorming, writing-plans, systematic-debugging, TDD |
| **Code Quality**  | `code-review`               | PR code review                                         | `/code-review`                                         |
| Code Quality      | `plannotator`               | Interactive visual code review UI                      | `/plannotator-review`                                  |
| Code Quality      | `typescript-lsp`            | TypeScript language server integration                 | Type checking, go-to-definition                        |
| **Memory**        | `claude-supermemory`        | Persistent memory across sessions                      | `/super-search`, index, recall                         |
| **Authoring**     | `plugin-dev`                | Plugin scaffolding and development                     | create-plugin, skill/hook/command-development           |
| Authoring         | `claude-md-management`      | CLAUDE.md maintenance and improvement                  | revise-claude-md, claude-md-improver                   |
| Authoring         | `superpowers-dev-for-cc`    | CC plugin development docs and patterns                | developing-claude-code-plugins, working-with-claude-code |
| **Creative**      | `playground`                | Interactive single-file HTML playground builder         | `/playground`                                          |

### Plugin sources

| Marketplace                | Plugins                                                       |
| -------------------------- | ------------------------------------------------------------- |
| `claude-plugins-official`  | code-review, plugin-dev, typescript-lsp, playground, claude-md-management |
| `superpowers-marketplace`  | superpowers, superpowers-dev-for-cc                           |
| `supermemory-plugins`      | claude-supermemory                                            |
| `plannotator`              | plannotator                                                   |

## MCP Servers

| Server              | Transport  | What it provides                                           | Runtime                                    |
| ------------------- | ---------- | ---------------------------------------------------------- | ------------------------------------------ |
| `serena`            | stdio      | LSP-backed code nav — symbols, references, rename          | `uvx serena start-mcp-server`              |
| `Ref`               | HTTP       | Documentation lookup for libraries and frameworks          | `ref.tools` API                            |
| `effect-docs`       | stdio      | Effect library docs — search and retrieve                  | `npx effect-mcp@latest`                    |
| `mcp-supermemory-ai`| stdio→SSE  | Persistent memory — save, recall, search across sessions   | `npx mcp-remote` → `mcp.supermemory.ai`   |

## Hooks

No Claude Code hooks are configured here; the hook scripts were removed in `05bc64c6`.

cmux's Claude integration (sidebar status, notifications, Feed approvals, session restore) comes from cmux
itself. `/Applications/cmux.app/Contents/Resources/bin/cmux-claude-wrapper` injects `--session-id` and
`--settings`, and cmux's fish integration puts a per-surface `claude` shim ahead of the real binary on PATH.
That integration loads because cmux starts the shell itself (`fish -il --init-command …`). See the
[cmux agent-hooks docs](https://raw.githubusercontent.com/manaflow-ai/cmux/main/docs/agent-hooks.md).
