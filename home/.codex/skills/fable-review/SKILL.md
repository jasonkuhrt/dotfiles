---
name: fable-review
description: Run an independent Claude Fable review in a new cmux workspace, relay its report back to Codex, and verify the findings. Use when Jason asks for a Fable review or invokes $fable-review. Defaults to Fable 5.1 at xhigh effort.
---

# Fable review

Use the [shared independent-review workflow](../.shared/independent-review/workflow.md)
with these defaults:

- Model: `claude-fable-5-1[1m]`
- Effort: `xhigh`
- Reviewer label: `Fable 5.1`
- Run-name prefix: `fable-review`

Apply the shared override and reviewer-label derivation rules. Never silently
substitute another model or effort.
