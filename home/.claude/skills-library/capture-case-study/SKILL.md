---
name: capture-case-study
description: Capture a reusable case study from the current conversation into home/.claude/case-studies. Use when the user explicitly asks to save a case study or workflow example.
allowed-tools:
  - Write
  - Bash(mkdir:*)
disable-model-invocation: true
---

# Capture Case Study

Save a case study from the current conversation to `home/.claude/case-studies/<category>/<slug>.md`.

## Categories

- `agent-optimization` - Improvements to Claude Code workflows, skills, rules, or configuration that increase agentic effectiveness

## Steps

1. Determine category. If it is not obvious from context, ask once.
2. Extract:
   - `Title`
   - `From`
   - `To`
   - `Story`
3. Generate a lowercase hyphenated `slug` from the title.
4. Create `home/.claude/case-studies/<category>/` if needed.
5. Write `home/.claude/case-studies/<category>/<slug>.md` in this format:

```markdown
# [Title]

[YYYY-MM-DD]

## From

[Description of previous state, with code examples if relevant]

## To

[Description of new state, with code examples if relevant]

## Story

[Narrative: what prompted the change, analysis performed, why the new approach is better]
```

## Notes

- Keep `From` and `To` concrete with code or config examples when relevant.
- `Story` should explain why the new approach is better and any tradeoffs considered.
- Reference the session transcript if it materially improves the case study.
