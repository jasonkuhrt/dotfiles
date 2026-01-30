---
name: writing-gherkin
description: Use when writing Gherkin scenarios, when another skill (like writing-specs) needs Given/When/Then syntax, or when asked to "create scenarios", "write acceptance criteria".
---

# Writing Gherkin

Write precise, well-structured Gherkin specifications for requirements documentation.

## Agent Mode

For multi-scenario features, use Task tool to keep validation loops out of main context:

```
Task tool:
  subagent_type: "general-purpose"
  prompt: |
    Write Gherkin specs for: [feature description]

    Rules: First-person "I" voice, one behavior per scenario, no filler/passive.

    Fix issues and re-validate until pass. Return ONLY final validated Gherkin.
```

The agent handles write-validate-fix iterations internally. Main context receives only final output.

## CRITICAL

### Avoid AI Slop

Common AI mistakes that make Gherkin verbose and imprecise:

| Mistake            | Example                                        | Fix                        |
| ------------------ | ---------------------------------------------- | -------------------------- |
| Filler words       | "Then the user should be able to see"          | "Then I see"               |
| Passive voice      | "Then the message is displayed"                | "Then I see the message"   |
| Over-specification | "Given I am a logged-in user on the home page" | "Given I am on Home"       |
| Future tense       | "Then the system will show"                    | "Then I see"               |
| Generic actors     | "the user", "the system"                       | "I" (first person)         |
| Vague verbs        | "the page updates"                             | "I see [specific element]" |

### One Scenario = One Behavior

Test exactly one behavior per scenario. Avoid multiple behaviors or branching logic.

## Notes

- Write each scenario to be understandable in isolation
- Never reference other scenarios or features
- Use Background sparingly - only for truly universal preconditions
- Keep tables focused on data-driven scenarios

## Reference

-> Read `reference/syntax-and-style.md` for syntax, style rules, structure, and examples

REQUIRED SUB-SKILL: writing-specs - spec authoring process, Ubiquitous Language, terminology
