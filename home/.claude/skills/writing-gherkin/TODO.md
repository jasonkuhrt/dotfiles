# Writing Gherkin Skill - Expansion TODO

Private notes for future skill expansion.

## Gherkin Versioning (Research)

Gherkin doesn't have formal versioned "specs" like HTML or ECMAScript. The parser library has version numbers (currently in the 20s+), but the language syntax evolved incrementally.

| Era              | Notable Changes                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| Early (v1-v5)    | Core syntax: `Feature`, `Scenario`, `Given/When/Then/And/But`, `Background`, `Scenario Outline` + `Examples` |
| Gherkin 6 (2018) | Added `Rule` keyword for grouping related scenarios                                                          |
| Recent           | Incremental parser improvements, better i18n support (70+ languages)                                         |

The core syntax has been stable for years. The `Rule` keyword was the last significant language addition.

## Gherkin Syntax Coverage

| Feature           | In SKILL.md? | Notes                                |
| ----------------- | ------------ | ------------------------------------ |
| Tags              | Yes          | Categorization for docs/organization |
| Data Tables       | Yes          | Structured data within steps         |
| Doc Strings       | Yes          | Multi-line text/payloads             |
| Comments          | Yes          | Inline notes with `#`                |
| Rule              | Yes          | Grouping related scenarios           |
| Scenario Outline  | Yes          | Parameterized scenarios              |
| Multiple Examples | Partial      | Named/tagged groups - basic coverage |
| Asterisk step     | No           | Rare use, low value                  |

## Agentic Programming with Claude Code

### Spec-Driven Development

Gherkin as contract between human intent and agent execution:

```
Human writes spec → Agent implements → Agent validates against spec
```

Potential workflow:

1. Human writes/approves Gherkin spec
2. Agent generates implementation
3. Agent writes tests that map to scenarios
4. Agent runs tests, iterates until green
5. Human reviews impl against spec

### Agent-Executable Specs

Could Gherkin scenarios become directly executable by Claude Code?

- Agent parses scenario
- Maps Given/When/Then to tool calls or code actions
- Executes and validates outcomes
- Reports pass/fail per scenario

This would make Gherkin a **programming language for agents**.

### Testing Integration

If we add test automation:

- Tags become essential (filter what agent runs)
- Data Tables enable parameterized setup
- Doc Strings pass exact payloads

Questions:

- What test framework? (Cucumber.js, Playwright BDD, custom?)
- Agent-driven test generation from specs?
- Continuous validation: agent re-runs specs after each change?

### Validation Tooling Ideas

Current: syntax check, slop detection, linting

Future:

- **Coverage mapping**: Which code paths does each scenario exercise?
- **Spec drift detection**: Has code diverged from spec?
- **Agent self-test**: Agent writes spec, implements, validates own work

## Future Research

- [ ] Research Cucumber.js / Playwright BDD integration
- [ ] Prototype: Agent implements feature from Gherkin spec
- [ ] Prototype: Agent generates tests from Gherkin scenarios
- [ ] Consider: Gherkin as agent task specification format
