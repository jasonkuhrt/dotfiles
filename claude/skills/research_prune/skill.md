---
name: research:prune
description: Use when research files contain conversational artifacts from PR comments, discussions, or Q&A
---

# Research Prune

Remove non-factual content from research files. Intentionally lossy — removes conversational artifacts to distill knowledge.

## Use Cases

- After importing PR comments or conversation excerpts
- When research files contain Q&A formatting
- To distill knowledge from discussion threads

Triggers: "prune research", "clean up research", "remove conversational bits"

## Scope

| Request                   | Target                               |
| ------------------------- | ------------------------------------ |
| "prune research"          | All recent (`.claude/research/*.md`) |
| "prune current/latest"    | Most recent (`01-*.md`)              |
| "prune dirty/changed"     | Git dirty files                      |
| "prune these docs" + list | Specified files                      |
| "prune all including old" | Include `older-than-30/`             |

**Default: recent only** — avoids accidentally processing large archives.

## Conversational Heuristics

| Pattern             | Example                                  | Action                         |
| ------------------- | ---------------------------------------- | ------------------------------ |
| Greetings           | "Hey @person, here's the lowdown..."     | Remove                         |
| Quoted Q&A          | `> Question` + response                  | Extract fact, remove framing   |
| Agreement           | "Right!", "Yes.", "Correct."             | Remove                         |
| Opinion framing     | "I'd push back on this"                  | Keep fact, remove framing      |
| Hedging             | "maybe", "I think", "IIUC"               | Remove or convert to fact      |
| PR negotiation      | "Fine to do it in this PR"               | Remove                         |
| Questions to reader | "But I don't think we're doing X?"       | Convert to statement           |
| Personal refs       | "like I've done with X, Y, Z"            | Remove                         |
| Future intentions   | "I'll look into...", "TODO for tomorrow" | Remove or track in Linear      |
| Status updates      | "no more major changes"                  | Delete file if no facts remain |

## Process

1. **Read file**
2. **Present removals** — table with line numbers and suggestions
3. **Wait for confirmation** — user approves or adjusts
4. **Apply edits** — only after approval
