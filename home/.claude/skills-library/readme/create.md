# Operation: create

Write a README from scratch. Read `~/.claude/skills/readme/core.md` (shared rules) and `~/.claude/skills/readme/core-readme.md` or `~/.claude/skills/readme/core-contributing.md` (file-specific rules).

## Steps

1. Classify project archetype (see `~/.claude/skills/readme/core.md` § Archetype Classification)
2. Extract source truth (see `~/.claude/skills/readme/core.md` § Source Truth Priority)
3. Build term dependency graph (see `~/.claude/skills/readme/core-readme.md` § G2)
4. Write all sections following G1-G4
5. Self-review (see `~/.claude/skills/readme/core.md` § Anti-Slop Scan)
6. Run the review operation internally to validate the result (read `~/.claude/skills/readme/review-readme.md` or `~/.claude/skills/readme/review-contributing.md`)
