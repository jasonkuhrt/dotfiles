# Sparks: Markdown to YAML with Schema Validation

2026-01-10

## From

Markdown-based idea capture with loose structure:

```markdown
## [Short Title]
*Captured YYYY-MM-DD during [current task context]*
*Session: ~/.claude/projects/<project-hash>/<session-id>.jsonl*

[1-3 sentence description]
```

- No enforcement of structure or brevity
- Prone to AI slop (verbose, meandering text)
- Not machine-parseable for tooling
- Difficult to query/filter programmatically

## To

YAML files with JSON Schema validation:

```yaml
# .claude/sparks/2026-01-10-example.yml
title: Auto-prioritize sparks based on frequency
captured: 2026-01-10
context: Reviewing CLAUDE.md idea capture workflow
session: ~/.claude/projects/-Users-jasonkuhrt.../50ba811c.jsonl
idea: Track how often similar ideas recur across sessions. Auto-bump priority when themes repeat.
```

Schema enforces:
- `title`: max 50 chars
- `context`: max 100 chars
- `idea`: max 300 chars
- Required fields prevent omissions
- `additionalProperties: false` prevents drift

Hook validates on write using `ajv` against `.claude/sparks/schema.json`.

## Story

During a CLAUDE.md review session, we formalized an ADHD-friendly "idea capture" workflow - a system to capture exciting tangent ideas mid-work without derailing the current task or burning context window.

Initial implementation used markdown files in `.claude/sparks/` with a loose template. The human asked whether YAML might be better, noting it could enforce structure and prevent AI slop.

Analysis showed YAML + schema is objectively superior for agentic effectiveness:

1. **Slop prevention**: Character limits on fields force concision
2. **Tooling potential**: Native YAML parsing enables aggregation, filtering, priority dashboards
3. **Validation**: Hook on PostToolUse can validate writes against JSON Schema
4. **Searchability**: Query by field (date, context, tags) vs grep through prose

The tradeoff (slightly more friction to write) is acceptable because the validation catches problems immediately and the structured data has compounding value over time.
