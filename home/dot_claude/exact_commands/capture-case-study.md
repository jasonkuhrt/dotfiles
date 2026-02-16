---
description: Capture a case study example from the current conversation
allowed-tools: Write, Bash(mkdir:*)
---

# Capture Case Study

Flush a case study from the current conversation to `claude/case-studies/<category>/<slug>.md`.

## Categories

- `agent-optimization` - Improvements to Claude Code workflows, skills, rules, or configurations that increase agentic effectiveness

## Workflow

1. **Determine category**: If obvious from context, use it. Otherwise ask.
2. **Extract from conversation**:
   - **Title**: Concise name for the case
   - **From**: Previous state/approach (what was suboptimal)
   - **To**: New state/approach (what we changed to)
   - **Story**: Narrative of how we got here, why it matters
3. **Generate slug**: Lowercase hyphenated from title
4. **Write file** to `claude/case-studies/<category>/<slug>.md`

## Format

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

## Guidelines

- Keep From/To concrete with code/config examples
- Story explains the "why" and reasoning process
- Include tradeoffs considered
- Reference session transcript if useful
