---
name: dispatch-codex
description: Dispatch a peer Codex agent. Use for "$dispatch-codex", "peer Codex agent", "peer agent", "separate Codex agent", "new Codex thread", or when the user asks for another Codex agent working beside this one. This is not a subagent.
---

# Dispatch Codex

Start a **peer Codex agent**: a separate Codex thread working beside the current
thread. Use this when the user says "peer", "separate Codex agent", or
`$dispatch-codex`.

## Hard Distinction

Do **not** use a subagent or multi-agent helper tool for this skill. A peer
Codex agent is a separate Codex thread. It has its own conversation, can work
independently, and is not an in-thread helper.

| User intent | Correct dispatch |
| --- | --- |
| "$dispatch-codex", "spawn a peer Codex agent", "separate Codex agent" | `dispatch-codex` |
| "$dispatch-codex-sub", "subagent", "in-thread helper" | `dispatch-codex-sub` |
| "$dispatch-claude", "Claude agent" | `dispatch-claude` |

If the user says "peer agent" without a vendor, prefer `dispatch-codex` in a
Codex session.

## Procedure

1. Decide whether the peer should share the current worktree or use an isolated
   worktree.
   - Same worktree: use only when the user explicitly asks for "this worktree"
     or when shared uncommitted edits are the point.
   - New worktree: prefer for broad implementation work that may conflict with
     the current thread.
2. Create a separate Codex thread with the current repo/project target. If a
   Codex thread-creation tool is not already loaded, discover/load that tool
   first; do not fall back to a subagent.
3. Give the peer a bounded, self-contained task.
4. Tell the peer whether other agents are editing the same repo and which files
   it owns.
5. Do not wait by default. Continue local critical-path work unless the peer's
   result is immediately needed.

## Prompt Shape

Include:

- repo/worktree path
- branch or head SHA when relevant
- task objective
- explicit write scope
- verification expectations
- reminder not to revert unrelated edits

Example:

```text
Work in <repo path>. Implement <bounded task>. Own <files/modules>. Other agents
may be editing this repo; preserve unrelated changes. Run targeted checks and
report changed files plus unresolved decisions.
```
