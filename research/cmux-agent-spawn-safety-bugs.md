# cmux Agent Spawn: Bug Reports & Hard Requirements

Companion to `cmux-agent-spawn-safety.md`. This file tracks observed bugs and non-negotiable requirements from the user.

## Bug: Workspace Rename Targets Focused Workspace, Not Created Workspace (2026-03-20)

### Reproduction

1. ws1 is running an agent that dispatches work (creates ws3)
2. User is looking at ws2 (it has UI focus / is selected in sidebar)
3. ws3 is created by the dispatch
4. The `cmux rename-workspace` call targets ws2 (the focused one) instead of ws3 (the just-created one)
5. ws2 now has ws3's intended name
6. ws3 has no meaningful name
7. User has lost ws2's original name and is now confused about which workspace is which

### Screenshot

`~/Desktop/CleanShot 2026-03-20 at 13.51.49@2x.png`

Shows: "cmux workflows" name applied to the wrong workspace (the user's focused workspace, not the dispatched one).

### Root Cause (probable)

`cmux rename-workspace` without an explicit `--workspace` flag defaults to `$CMUX_WORKSPACE_ID` (the caller's workspace). If the dispatch script's `cmux rename-workspace --workspace "$ws_id" "$ws_title"` call has a stale or wrong `$ws_id`, OR if cmux itself resolves the target based on UI focus rather than the explicit flag, the rename hits the wrong workspace.

The dispatch skill does pass `--workspace "$ws_id"` explicitly. Possible causes:

- The `ws_id` returned by `cmux new-workspace` is wrong/stale
- cmux's rename-workspace ignores `--workspace` in some codepath and uses the focused workspace
- A race between workspace creation and the rename call

### Related cmux issues

- [#140](https://github.com/manaflow-ai/cmux/issues/140) — CLI commands should not change focus state (broader policy)
- [#260](https://github.com/manaflow-ai/cmux/pull/260) — Stop focus stealing in socket CLI (partially addressed)

---

## Bug: Agent Teams Creating Workspaces Instead of Splits (2026-03-20)

### Description

After the spawn safety research session, Claude Code's Agent tool with `run_in_background: true` creates new **workspaces** (sidebar entries) instead of **split panes** (within the parent workspace). The team coordination still works (messages, tasks), but teammates appear in the wrong place visually.

**Critical distinction:**

- **Agent teams (splits)** = teammates in the SAME workspace as the parent. This is the user's established workflow.
- **Dispatch (workspaces)** = INDEPENDENT agents in their OWN workspace. These are NOT team members. The dispatch skill was designed specifically for non-team work.

Conflating these is unacceptable.

### Probable Cause

The tmux shim at `~/.local/libexec/claude/cmux/tmux` was modified during this research session (Ctrl-C vifix patch). The modifications may cause `cmd_split_window` to fail on `cmux new-surface` or `drag-surface-to-split`, triggering Claude Code's fallback to workspace-based creation.

Additionally, rapid surface create/close cycles during testing corrupted cmux state (#1472), causing persistent "Surface not found" and "Surface is not a terminal" errors.

### Fix Required

1. Verify the tmux shim is not broken — compare against original
2. Restart cmux to clear corrupted surface state
3. Ensure the Ctrl-C vifix patch doesn't interfere with the split-window → send-keys flow

---

## Hard Requirements (NON-NEGOTIABLE)

These are things the user will not accept. Any solution must satisfy ALL of these.

### R1: Never rename/modify the wrong workspace

Operations that target a specific workspace (rename, set-status, reorder) MUST use the explicit workspace ID returned by the creation call. They must NEVER fall back to the focused/selected workspace. If the ID is wrong, fail loudly — do not silently target the wrong thing.

### R2: Never steal focus from the user

Creating agents, workspaces, surfaces, or splits must NEVER move the user's keyboard focus or sidebar selection. The user stays where they are. Period.

### R3: Never corrupt commands via keystroke simulation

Commands delivered to new terminals must arrive intact. No vi-mode corruption, no shell startup races, no character loss. If the delivery mechanism can't guarantee this, use a different mechanism.

### R4: Agent teams (split panes) must keep working

The user's established workflow uses Claude Code's Agent tool with `run_in_background: true` to create teammates in split panes within the same workspace. This must not be broken by spawn safety fixes. Split panes and workspace-based dispatch are BOTH valid — the user chooses which to use, not the agent.

### R5: Workspace names must be stable and correct

A workspace's name, once set, must not be changed by operations targeting other workspaces. Creating a new workspace must not rename existing workspaces as a side effect.

### R6: No silent failures

If an agent fails to spawn, the user must know immediately. Dead PTYs (#1472), stale surface IDs, "Surface not found" errors — these must surface as visible errors, not silent non-starts where the user thinks an agent is running but nothing is happening.
