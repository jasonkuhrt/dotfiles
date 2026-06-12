---
name: dispatch-codex-sub
description: Dispatch an in-thread Codex subagent. Use only for "$dispatch-codex-sub", "subagent", "sub-agent", "in-thread helper", or "multi-agent subtask". Do not use for "peer agent".
---

# Dispatch Codex Subagent

Start a **Codex subagent** inside the current thread. This is the multi-agent
helper path, not a peer Codex thread.

## Hard Distinction

Use this only when the user explicitly asks for a subagent, sub-agent, or
`$dispatch-codex-sub`.

Do **not** use this for:

- "peer Codex agent"
- "peer agent"
- "separate Codex agent"
- "new Codex thread"

Those mean `dispatch-codex`.

## Procedure

1. Keep the delegated task concrete, bounded, and parallelizable.
2. Do not hand off the immediate critical-path blocker if the current agent can
   do it faster locally.
3. Give the subagent a clear write scope.
4. Say that other agents may be editing the repo and unrelated changes must be
   preserved.
5. Continue non-overlapping local work while the subagent runs.

## Prompt Shape

```text
Implement <bounded subtask>. Own <files/modules>. Other agents may be editing
the repo; do not revert unrelated changes. Run <targeted checks>. Report changed
files and unresolved decisions.
```
