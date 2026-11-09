---
name: fable-review
description: Run an independent Claude Fable review through the Claude app session API, relay its report back to Codex, and verify the findings. Use when Jason asks for a Fable review or invokes $fable-review. Defaults to Fable 5.1.
---

# Fable review

Use the [shared independent-review workflow](../.shared/independent-review/workflow.md)
with these defaults. Dispatch requires the programmatic app API; no CLI or UI
automation fallback.

- Model: `claude-fable-5-1[1m]`
- Reviewer label: `Fable 5.1`

Apply the shared override and reviewer-label derivation rules. Never silently
substitute another model.
