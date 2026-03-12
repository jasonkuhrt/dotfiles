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
| Authoring         | `hookify`                   | Create hooks from conversation analysis                | `/hookify`, configure, list                            |
| Authoring         | `claude-md-management`      | CLAUDE.md maintenance and improvement                  | revise-claude-md, claude-md-improver                   |
| Authoring         | `superpowers-dev-for-cc`    | CC plugin development docs and patterns                | developing-claude-code-plugins, working-with-claude-code |
| **Creative**      | `playground`                | Interactive single-file HTML playground builder         | `/playground`                                          |

### Plugin sources

| Marketplace                | Plugins                                                       |
| -------------------------- | ------------------------------------------------------------- |
| `claude-plugins-official`  | code-review, hookify, plugin-dev, typescript-lsp, playground, claude-md-management |
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

| Event             | Matcher          | Script                              | What it does                                       |
| ----------------- | ---------------- | ----------------------------------- | -------------------------------------------------- |
| PermissionRequest | `Skill\|mcp__.*` | `approve-and-persist-permissions.sh` | Auto-approves and persists plugin/MCP permissions   |
| Notification      | `permission_prompt\|idle_prompt\|elicitation_dialog` | `cmux-claude-hook.sh notification` | Sends compact cmux notifications for blocked/input events, keeps `idle_prompt` as status-only, updates workspace status, falls back to local notification outside cmux |
| Stop              | —                | `cmux-claude-hook.sh stop`          | Fires when Claude finishes responding; sends a compact completion notification plus workspace status |
| UserPromptSubmit  | —                | `cmux-claude-hook.sh user-prompt-submit` | Marks the workspace as working and stores a short prompt summary for later ready/waiting states |
| SessionStart      | —                | `session-start-resume-info.sh`      | Shows resume command on session start               |
| SessionStart      | —                | `cmux-claude-hook.sh session-start` | Resets workspace Claude status to ready at session start |
| SessionStart      | —                | `compact-recovery.sh`               | Recovers epic context after compaction              |
| PreCompact        | —                | `cmux-claude-hook.sh precompact`    | Marks the workspace as compacting before context compaction |
| SessionEnd        | —                | `cmux-claude-hook.sh session-end`   | Clears Claude-specific workspace status on session exit |
| SubagentStop      | —                | `cmux-claude-hook.sh subagent-stop` | Logs subagent completions into cmux without user-facing notification noise |
