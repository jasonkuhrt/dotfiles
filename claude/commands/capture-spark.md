---
description: Capture an idea/spark mid-work without derailing the current task
---

# Capture Spark

Capture idea(s) to `.claude/sparks/YYYY-MM-DD-<slug>.yml` and return to current work.

## Schema

See `${CLAUDE_PLUGIN_ROOT}/sparks/schema.json` for authoritative schema. Key fields:

| Field           | Required | Description                                                                                 |
| --------------- | -------- | ------------------------------------------------------------------------------------------- |
| `title`         | yes      | Concise name for the idea                                                                   |
| `captured`      | yes      | ISO date YYYY-MM-DD                                                                         |
| `context`       | yes      | What we were working on when this arose                                                     |
| `session`       | yes      | Path to session transcript                                                                  |
| `idea`          | yes      | Complete, non-lossy capture of the thought                                                  |
| `revisit`       | yes      | When/context to revisit (patterns: `fast-follow:`, `near-term:`, `someday:`, `pie-in-sky:`) |
| `relatedSparks` | no       | Array of paths to sparks that underpin, build on, or relate to this one                     |

## Workflow

### Invocation Modes

__Agent-invoked__ (backup behavior - You noticed a tangent):

* You already have context on what the spark is
* Propose everything in one prompt: "Spark? [proposed title]. When to revisit?"
* User confirms/adjusts revisit timing → capture immediately

__User-invoked__ (`/capture-spark`):

* If recent conversation makes spark obvious: propose like agent-invoked
* If unclear, ask with full context:
  ```
  What idea do you want to capture?

  Also, when should we revisit it?
  - fast-follow: next session or soon
  - near-term: this week/month
  - someday: no rush, eventually
  - pie-in-sky: maybe never, just parking it
  ```
* If user provides spark but not revisit: infer from context or ask once with the revisit options above

### Detecting Spark Count

__What__: Check if user's input contains obviously distinct ideas. This is NOT scrum epic breakdown - just looking for major fault lines.

__Default__: Err on side of one spark. Faster workflow, gets user back on track, and non-lossy capture means it can always be split later.

__Examples__:

* "Migrate to tsgo, and that reminds me I wanted to build an AST parser for linting my DSL" → 2 sparks (migration vs tooling)
* "Add dark mode with a toggle in settings and persistence" → 1 spark (all part of dark mode)
* "Refactor the auth module" → 1 spark (even if complex, it's one theme)

### Execution

1. Run: `mkdir -p .claude/sparks`
2. Extract for each spark:
   * `title`: Concise name
   * `context`: What we were doing (same for all sparks in batch)
   * `session`: Derive from tool results path (`~/.claude/projects/<hash>/<id>.jsonl`)
   * `idea`: Full user thought, cleaned up but __non-lossy__
   * `revisit`: User's answer or inferred timing
   * `relatedSparks`: If relates to others just captured or existing ones
3. Generate filename: `YYYY-MM-DD-<slug>.yml` (unique slug per spark)
4. Write YAML file(s)
5. Validate each: `yq -o=json <file> > /tmp/spark.json && ajv validate -s ${CLAUDE_PLUGIN_ROOT}/sparks/schema.json -d /tmp/spark.json`
6. Acknowledge using appropriate template combination below

## Example Output

```yaml
title: Auto-prioritize sparks based on frequency
captured: 2026-01-10
context: Reviewing CLAUDE.md idea capture workflow
session: ~/.claude/projects/-Users-jasonkuhrt-projects-jasonkuhrt-dotfiles/50ba811c.jsonl
idea: |
  Track how often similar ideas recur across sessions. When the same theme
  appears multiple times, auto-bump its priority. Could use fuzzy matching
  on titles or embedding similarity on idea content.
revisit: "fast-follow: next time we're improving the sparks system"
relatedSparks:
  - .claude/sparks/2026-01-10-spark-schema-validation.yml
```

## Acknowledgment Template

```
[SPARKED LINE - pick one]
  Single:   Sparked: [title]
  Multiple: Sparked [N] ideas:
            1. [title1] → [revisit1]
            2. [title2] → [revisit2]

[REVISIT LINE - single spark only, multiple folds into sparked line]
Revisit: [revisit summary]

[REWIND LINE - include when tangent consumed notable context window]
Rewind: Esc+Esc → [suggested point] → "Conversation only"

[RESUME LINE - always]
Continuing with [previous task]...
```

## Guidelines

* __Non-lossy capture__: Preserve the user's full thought. Taking their exact prompt (cleaned up) is valid. Do not summarize away detail.
* __Don't elaborate__: You're parking the idea, not expanding it. Capture what user said, nothing more.
* __Return quickly__: The point is to not derail. Acknowledge briefly and continue.
* __Use YAML pipe `|`__ for multi-line idea content for readability.
* __Link related sparks__: If capturing multiple sparks that relate, or if a new spark builds on an existing one, populate `relatedSparks`.

## Validation

Requires:

* `yq` - `brew install yq`
* `ajv-cli` - `npm install -g ajv-cli`

Pipeline (ajv doesn't support stdin, use intermediate file):

```bash
yq -o=json .claude/sparks/<file>.yml > /tmp/spark.json && ajv validate -s ${CLAUDE_PLUGIN_ROOT}/sparks/schema.json -d /tmp/spark.json
```
