---
name: opus-review
description: Run an independent Claude Opus review in a new cmux workspace, relay its report back to Codex, and verify the findings. Use when Jason asks for an Opus review or invokes $opus-review. Defaults to Opus 5.5 at max effort.
---

# Opus review

Use the [shared independent-review workflow](../.shared/independent-review/workflow.md)
with these defaults:

- Model: `claude-opus-5-5`
- Effort: `max`
- Reviewer label: `Opus 5.5`
- Run-name prefix: `opus-review`

Apply the shared override and reviewer-label derivation rules. Never silently
substitute another model or effort.
