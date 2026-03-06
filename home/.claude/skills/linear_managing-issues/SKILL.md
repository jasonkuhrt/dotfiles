---
name: linear_managing-issues
description: Compatibility alias for projects that still reference `linear_managing-issues`. Use when searching, creating, updating, or commenting on Linear issues.
---

# linear_managing-issues

Compatibility alias for legacy project instructions.

Use the canonical `linear` skill for full workflows and references:
- `~/.claude/skills/linear/SKILL.md`

Primary commands:
- `bun ~/.claude/skills/linear/scripts/search.ts "<query>"`
- `bun ~/.claude/skills/linear/scripts/get.ts <ISSUE_ID_OR_IDENTIFIER>`
- `bun ~/.claude/skills/linear/scripts/create.ts --title "<title>" --team <TEAM_KEY>`
- `bun ~/.claude/skills/linear/scripts/update.ts <ISSUE_ID_OR_IDENTIFIER> --state "<state>"`
- `bun ~/.claude/skills/linear/scripts/comment.ts <ISSUE_ID_OR_IDENTIFIER> "<comment>"`
