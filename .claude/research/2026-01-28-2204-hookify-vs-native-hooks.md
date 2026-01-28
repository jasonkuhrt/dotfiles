# Hookify vs Native Claude Code Hooks

Date: 2026-01-28

Hookify trades power for ergonomics — declarative guards ("pattern matches → block/warn") vs native hooks' imperative extensions ("any event → arbitrary code → structured response"). Complementary, not mutually exclusive.

## Comparison

- **Event coverage**
  - Hookify exposes 4 of 9 events — `bash` (PreToolUse Bash), `file` (PreToolUse Edit/Write), `stop` (Stop), `prompt` (UserPromptSubmit)
  - Native-only events — PostToolUse (tool *output* — biggest loss), SubagentStop, SessionStart/End, PreCompact, Notification
- **Actions**
  - Hookify — `warn` (message, allow) or `block` (prevent)
  - Native adds — input modification, structured JSON output, arbitrary scripts, context-aware decisions
- **Matching**
  - Hookify is stronger *declaratively* — field-level extraction, 6+ operators (`regex_match`, `contains`, `equals`, `not_contains`, `starts_with`, `ends_with`), AND logic
  - Native matches tool name only (`"Edit|Write|Bash"`) — deeper matching requires custom scripts with full JSON input access

## Hookify Advantages

- Markdown config — readable, versionable, quick to author
- Live reload — no restart needed
- `/hookify` — auto-generates rules from conversation analysis
- `/hookify:list`, `/hookify:configure` — management UX

## When to Drop to Native

- React to tool **output** (PostToolUse)
- **Transform** input before execution
- **Session lifecycle** hooks (SessionStart/End, PreCompact)
- **Complex logic** — branching, external APIs, stateful decisions
- **SubagentStop** — react when Task agents complete

## Design Insight

Hookify's field-level matching > native matchers (tool name only). Native compensates with arbitrary script execution. More powerful *declaratively*, less powerful *imperatively*. Use both: hookify for pattern guards, native for advanced cases.

---
Source: claude -r 7cc2f0af-1662-466f-9f55-2835d99be963
