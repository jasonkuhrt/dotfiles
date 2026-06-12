# Operation: update

Modify an existing README. Preserve what works, rewrite what doesn't. Read `~/.claude/skills/readme/core.md` (shared rules) and `~/.claude/skills/readme/core-readme.md` or `~/.claude/skills/readme/core-contributing.md` (file-specific rules).

## Steps

1. Read existing README fully
2. Identify what changed: conversation context, git diff, recent commits
3. Determine which sections are affected (respects the Focus dimension — whole, affected-by-changes, or named sections)
4. Rewrite affected sections following G1-G4
5. Verify semantic ordering still holds across the full document (not just changed sections — a new term introduction can break ordering elsewhere)
6. Self-review changed sections + any sections that reference changed terms (see core.md)

## Recovery

If output is unsatisfactory, `git checkout -- README.md` restores the previous version.
