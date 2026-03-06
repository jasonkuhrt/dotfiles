---
name: writing-specs
description: Use when translating requirements into structured Gherkin specifications, establishing domain terminology for a feature, creating domain model documentation, or asked to "write spec", "create requirements", "write acceptance criteria", "model the domain", "write design doc".
---

# Writing Specs

Translate requirements into well-structured Gherkin specifications with consistent terminology.

## Process

### 1. Extract Requirements

From the requirements source, identify:

- **Problem**: What user pain point is being addressed?
- **Solution**: What's the high-level approach?
- **Acceptance criteria**: What behaviors are required?
- **Constraints**: What's explicitly out of scope?

### 2. Establish Terminology

Before writing scenarios, establish consistent terms:

- What nouns appear repeatedly? (entities)
- What verbs describe user actions? (behaviors)
- Are there synonyms that should be consolidated?

Define terms explicitly. These flow unchanged to design docs and code.

### 3. Write Gherkin Scenarios

Invoke `writing-gherkin` skill for syntax. Key conventions:

- Number scenarios: `Scenario 1:`, `Scenario 2:`
- Group with `Rule:` when 5+ scenarios have natural clusters
- Use established terms consistently throughout

### 4. Identify Gaps

Flag ambiguities in the requirements:

- Missing edge cases
- Undefined error states
- Unclear priorities
- Terms used inconsistently in source

If you can't write a clear scenario, the concept is undefined.

## Ubiquitous Language

The spec establishes shared vocabulary that flows to design docs and code. This eliminates translation drift between requirements and implementation. Well-written specs reveal entities (nouns), behaviors (scenario names), and relationships (composing terms).

**The spec IS the glossary.** If you call it "filter chip" in the spec, it should be `FilterChip` in code.

### Guidelines

| Guideline                     | Why                                            | Example                                                    |
| ----------------------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| **Source terms from users**   | Don't invent - use language the team uses      | "unread filter" not "message visibility predicate"         |
| **One term per concept**      | Synonyms create ambiguity                      | Always "thread", never mixing "conversation"/"chat"/"DM"   |
| **Terms should compose**      | Reveals domain structure                       | "filter" + "chip", "filter" + "footer", "filter" + "state" |
| **Let scenarios reveal gaps** | Can't write clear scenario = undefined concept | Surface for clarification                                  |

### Flowing Terms to Code

| Spec term     | Design doc                         | Code                                    |
| ------------- | ---------------------------------- | --------------------------------------- |
| filter chip   | "The filter chip component..."     | `FilterChip`, `filterChip`              |
| unread filter | "When unread filter is enabled..." | `UnreadFilter`, `isUnreadFilterEnabled` |
| snapshot      | "Snapshot captures thread IDs..."  | `Snapshot`, `captureSnapshot()`         |

### Anti-patterns

| Pattern                | Problem                                          | Fix                                    |
| ---------------------- | ------------------------------------------------ | -------------------------------------- |
| Synonyms               | "thread"/"conversation"/"chat" creates ambiguity | Pick one, use everywhere               |
| Invented jargon        | "message visibility predicate" obscures meaning  | Use user language: "unread filter"     |
| Implementation leakage | "click the dropdown" couples to UI               | "enable the filter" describes behavior |
| Implicit concepts      | Unnamed things can't be discussed                | If it matters, name it                 |

## Empty Sections

Use `None.` for sections with no content. Never omit sections or add explanations.

```markdown
## Technical Constraints

None.
```

This is **explicit** (section was considered) and **consistent** (always just `None.`).

## Quality Checklist

- [ ] Problem statement is clear and user-focused
- [ ] Solution describes approach without implementation details
- [ ] Key domain terms are defined explicitly
- [ ] Every scenario tests ONE behavior
- [ ] Terms used consistently throughout
- [ ] Gaps and ambiguities are identified

## Reference

- **`reference/domain-modeling.md`** — Structured design doc template: anatomy diagrams, entity schemas (TypeScript interfaces), operation specs. Use after specs establish terminology.
- REQUIRED SUB-SKILL: writing-gherkin — Gherkin DSL syntax, structure, validation
- Evans, Eric. _Domain-Driven Design_ (2003) — introduced Ubiquitous Language
- North, Dan. "Introducing BDD" (2006) — connected Ubiquitous Language to executable specs
