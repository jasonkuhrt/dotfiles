# Over-Engineering Simple Tasks

## Problem
- Rename `claude/scripts` → `claude/hooks/scripts` + update path references
- Task: mechanical filesystem move, ~4 edits total
- Actual cost: ~71k tokens, ~2 minutes
- Should have been: `git mv` + grep + edit, under 15 seconds

## What Happened
1. Launched Explore subagent to map entire directory structure and grep all references
2. Read 4 full files before making any edits
3. Both steps unnecessary — task was unambiguous

## Contributing Factors (Setup)
- **System prompt** (Claude Code, not user-controlled): "When exploring the codebase to gather context... it is CRITICAL that you use the Task tool with subagent_type=Explore"
  - Interpreted "rename minding path updates" as needing context gathering
  - Explore agent is expensive — full codebase scan
- **`using-superpowers` skill**: "If you think there is even a 1% chance a skill might apply, you ABSOLUTELY MUST invoke the skill"
  - Creates pressure to check skills before any action, even trivial ones
  - Absolutist language ("not negotiable") hard to override
- **CLAUDE.md `Information Quality` rule**: "HALT on incomplete information... Don't proceed with partial knowledge"
  - Good for API work, adds hesitation on mechanical tasks

## Open Question
- No clear rules fix identified
  - Adding "mechanical tasks: act immediately" rule is ambiguous — requires model to correctly classify tasks as mechanical
  - Model behavior could change between versions, making rules brittle
  - The distinction between "needs research" and "just do it" is judgment, not a rule
- User correctly notes: unclear path forward, requires insight into model internals that can change

## Takeaway
- Rules that push toward thoroughness (explore first, check skills, halt on incomplete info) have a real cost on simple tasks
- No obvious mitigation without risking under-preparation on complex tasks
- This is a model judgment problem more than a config problem

---
Source: claude -r cd9be9ff-a454-47aa-9c2e-5bdf6906aea4
