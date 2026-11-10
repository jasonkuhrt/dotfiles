---
name: fable-review
description: Run an independent Claude Fable review, prefer app visibility when available, preserve a resumable session, and verify the findings. Use when Jason asks for a Fable review or invokes $fable-review. Defaults to Fable 5.2.
---

# Fable review

Use the [shared independent-review workflow](../.shared/independent-review/workflow.md)
with these defaults. The shared workflow owns app preference, CLI dispatch,
session retention and exact-model verification.

- Model: `claude-fable-5-2`
- Reviewer label: `Fable 5.2`

Apply the shared override and reviewer-label derivation rules. Never silently
substitute another model.
