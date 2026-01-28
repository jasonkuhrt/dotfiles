---
name: research:flush-cc-thread
description: Use when session is ending, context filling, or you need to preserve learnings before context loss
---

# Research Flush CC Thread

Extract and preserve learnings from current Claude Code conversation before context window exhaustion or session end.

## Use Cases

- **Context preservation** — session ending, need to capture discoveries
- **Failed experiments** — document what didn't work and why
- **Non-obvious behavior** — capture gotchas for future reference
- **Decision rationale** — record alternatives considered

Triggers: "flush research", "save this to research", "preserve this thread", "capture these learnings"

## Steps

1. **Identify knowledge worth preserving**
   - technical findings, blockers, workarounds
   - decisions and alternatives considered
   - gotchas and non-obvious behavior
   - links to issues, PRs, documentation

2. **Use `research:write` skill** to create file and write content
   - follow its Post-Write Processing section for prune + format
   - include session source at end of file:
     ```
     ---
     Source: claude -r ${CLAUDE_SESSION_ID}
     ```
