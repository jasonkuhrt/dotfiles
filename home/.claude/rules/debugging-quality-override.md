# Debugging Quality Override

The `superpowers:systematic-debugging` skill says in Phase 4.2:

> "No 'while I'm here' improvements"
> "No bundled refactoring"

**OVERRIDE:** This user's CLAUDE.md says "Always do the complete cut — never 'move now, remodel later.'" The CLAUDE.md takes precedence.

## Correct behavior during debugging

- Stay focused on the root cause fix (the skill is right about this)
- But if investigation reveals adjacent broken code, wrong assertions, or incorrect behavior: fix it or surface it
- "While I'm here" improvements that affect CORRECTNESS are expected, not prohibited
- "Bundled refactoring" for code cleanliness can wait, but correctness fixes cannot

## The distinction

| Found during debugging | Action |
|---|---|
| Wrong test assertion | Fix it — this is correctness |
| Stale comment that contradicts code | Fix it — this is correctness |
| Performance budget contradicting its rationale | Fix it — this is correctness |
| Code style you'd do differently | Leave it — this is preference |
| Refactoring opportunity | Leave it — this is architecture |
| Unused import | Leave it — this is cleanup |
