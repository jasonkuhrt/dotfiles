# transcript-dump Spec

A script to dump Claude Code transcripts as formatted, navigable Markdown.

## Goal

Zero-AI, zero-token file transformation. Takes JSONL transcript → outputs readable Markdown with editor outline support.

## Input

- Session ID (partial match OK, e.g., `5f4bd7d3`)
- OR full path to `.jsonl` file

## Output

- Writes `.claude/transcripts/<session-id>.transcript.md` to project directory
- Creates directory if needed
- Markdown with H1 per entry, JSON in fenced code blocks

## Heading Format

Monospace columns that align vertically in editor outlines:

```
# `<n>` `<time>` `<type>` `<summary>`
```

| Column | Width | Content |
|--------|-------|---------|
| n | 3 chars | Entry number, zero-padded |
| time | 16 chars | Timestamp as mm/dd/yyyy hh:mm |
| type | 21 chars | Entry type (longest is "file-history-snapshot") |
| summary | 30 chars | Type-specific summary |

**Padding:** Uses underscores (`_`) instead of spaces to prevent formatters from collapsing whitespace.

**Summary extraction by type:**

| Type | Summary Source |
|------|----------------|
| `user` | First 30 chars of text content, or `tool_result ×N` |
| `assistant` | Tool names with counts (e.g., `Bash ×2, Read`), or `text` |
| `summary` | `(compaction)` |
| `system` | Subtype field |
| `progress` | Hook name or data.type |
| `file-history-snapshot` | `snapshot` |
| `queue-operation` | Operation name (e.g., `enqueue`) |

**Example headings:**

```markdown
# `001` `01/25/2026 22:45` `file-history-snapshot` `snapshot______________________`
# `002` `01/25/2026 22:45` `user_________________` `i noticed there is a dangerous`
# `003` `01/25/2026 22:46` `assistant____________` `Bash ×2, Read_________________`
# `004` `01/25/2026 22:46` `progress_____________` `PreToolUse:Task_______________`
```

## Implementation

Package: `packages/shan` (named after Claude Shannon)

CLI: `shan transcript dump <session-id>`

Uses Effect for:
- Type-safe schema parsing (`effect/Schema`)
- Effectful control flow (`Effect.gen`, `Effect.promise`)
- Console output (`Console.log`, `Console.warn`)

Session files live in: `~/.claude/projects/<encoded-path>/<uuid>.jsonl`

## Transcript Schema

See `packages/shan/src/lib/transcript-schema.ts` for full Effect Schema definitions.

Key entry types:
- `user` — User messages
- `assistant` — Assistant responses with tool calls
- `summary` — Compaction summaries
- `system` — System events
- `progress` — Hook and agent progress
- `file-history-snapshot` — File backup snapshots
- `queue-operation` — Message queue operations

## Usage

```bash
# By session ID prefix
bun packages/shan/src/bin/shan.ts transcript dump dc8ffe42

# By full path
bun packages/shan/src/bin/shan.ts transcript dump ~/.claude/projects/.../session.jsonl

# Show help
bun packages/shan/src/bin/shan.ts
```
