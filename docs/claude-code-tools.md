# Claude Code Tools Reference

Quick reference for all Claude Code plugins, MCP servers, and hooks in this setup. Forget what something does? Check here.

## Plugins

| Category         | Plugin                       | What it does                                           | Key skills / commands                                  |
| ---------------- | ---------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| **Workflow**      | `superpowers`               | Structured dev workflows — planning, TDD, debugging    | brainstorming, writing-plans, systematic-debugging, TDD |
| Workflow          | `beads`                     | Git-backed issue tracker with cross-session persistence | create, close, ready, sync, epic, dep                  |
| **Code Quality**  | `code-review`               | PR code review                                         | `/code-review`                                         |
| Code Quality      | `plannotator`               | Interactive visual code review UI                      | `/plannotator-review`                                  |
| Code Quality      | `typescript-lsp`            | TypeScript language server integration                 | Type checking, go-to-definition                        |
| **Memory**        | `claude-supermemory`        | Persistent memory across sessions                      | `/super-search`, index, recall                         |
| **Authoring**     | `plugin-dev`                | Plugin scaffolding and development                     | create-plugin, skill/hook/command-development           |
| Authoring         | `hookify`                   | Create hooks from conversation analysis                | `/hookify`, configure, list                            |
| Authoring         | `claude-md-management`      | CLAUDE.md maintenance and improvement                  | revise-claude-md, claude-md-improver                   |
| Authoring         | `superpowers-dev-for-cc`    | CC plugin development docs and patterns                | developing-claude-code-plugins, working-with-claude-code |
| **Creative**      | `playground`                | Interactive single-file HTML playground builder         | `/playground`                                          |

### Plugin sources

| Marketplace                | Plugins                                                       |
| -------------------------- | ------------------------------------------------------------- |
| `claude-plugins-official`  | code-review, hookify, plugin-dev, typescript-lsp, playground, claude-md-management |
| `superpowers-marketplace`  | superpowers, superpowers-dev-for-cc                           |
| `beads-marketplace`        | beads                                                         |
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

| Event             | Matcher          | Script                              | What it does                                       |
| ----------------- | ---------------- | ----------------------------------- | -------------------------------------------------- |
| PreToolUse        | `Bash`           | `flo-orphan-guard.sh`               | Blocks commands outside active epic branch          |
| PreToolUse        | `Bash`           | `bead-label-guard.sh`               | Enforces label taxonomy on bead creation            |
| PermissionRequest | `Skill\|mcp__.*` | `approve-and-persist-permissions.sh` | Auto-approves and persists plugin/MCP permissions   |
| SessionStart      | —                | `session-start-resume-info.sh`      | Shows resume command on session start               |
| SessionStart      | —                | `compact-recovery.sh`               | Recovers epic context after compaction              |
