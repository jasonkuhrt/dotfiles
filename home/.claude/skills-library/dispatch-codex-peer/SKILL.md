---
name: dispatch-codex-peer
description: Dispatch a peer Codex agent as a parallel top-level task in the current working worktree. Use for "$dispatch-codex-peer", "peer Codex agent", "peer agent", "parallel lane", "separate Codex agent", "new Codex thread", or when the user asks for another Codex agent working beside this one. Never create a new worktree and never use a subagent.
---

# Dispatch Codex Peer

Create a separate top-level Codex task in the macOS app. It works in parallel
with this task against the same established worktree.

## Contract

- Infer the real working worktree from the conversation, repository state, and
  living task context. Never require the user to restate an already-established
  path.
- Never create an isolated or new worktree.
- Never use a subagent. Use `dispatch-codex-sub` for that.
- Preserve and share the current worktree's staged and unstaged state.

## Procedure

1. Resolve the current working worktree without asking the user when context
   already identifies it.
2. Create a separate Codex task with the thread-creation tool.
3. If the host cannot start it in that worktree, handle the limitation silently
   by making the peer prompt begin with an unmistakable relocation gate:
   - name the exact target path;
   - state that the starting cwd is wrong;
   - forbid reading, editing, or running repo commands there;
   - require the first tool call to verify the target path and branch using the
     exact target as its tool cwd;
   - require every later tool call to stay anchored to that cwd.
4. Give the peer a bounded, self-contained task.
5. Tell the peer whether other agents are editing the worktree and which files
   it owns.
6. Do not wait unless the user's next action depends on the result.
