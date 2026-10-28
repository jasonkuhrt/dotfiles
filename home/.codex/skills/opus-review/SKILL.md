---
name: opus-review
description: Run an independent Claude Opus review in a new cmux workspace, relay its report back to Codex, and repair confirmed findings within the originating task. Use when Jason asks for an Opus review or invokes $opus-review. Defaults to Opus 5.5 at xhigh effort.
---

# Opus review

Use the [shared independent-review workflow](../.shared/independent-review/workflow.md)
with these defaults:

- Model: `claude-opus-5-5`
- Effort: `xhigh`
- Reviewer label: `Opus 5.5`
- Run-name prefix: `opus-review`
- Coordinator receipt policy: verify and repair confirmed findings.

Apply the shared override and reviewer-label derivation rules. Never silently
substitute another model or effort.

Invoking this skill authorizes the coordinating Codex agent to verify the
report and repair confirmed issues in the requested change, unless Jason asks
for assessment only. The independent reviewer remains read-only. Continue the
originating task's validation and delivery workflow, including commits and
pushes when already authorized; existing check permissions and other task
limits still apply.

Receiving a completed report resumes that work in the same chat. Do not stop
at an assessment or ask whether to fix confirmed findings merely because the
reviewer was read-only. Resolve routine implementation details autonomously;
pause only for a genuine blocker, a consequential unresolved decision, or an
action the existing authorization does not cover. Carry this receipt policy
and the task's limits into the relay heartbeat prompt.
