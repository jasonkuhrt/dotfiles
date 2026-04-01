# cmux Spatial Model & UX Reference

## Spatial Model

```
Window (macOS window)
└── Sidebar                          ← human navigates here, clicks to switch
    └── Workspace                    ← only ONE is visible at a time
        └── Pane                     ← split region, tiles the workspace area
            ├── Tab bar              ← top of each pane
            │   ├── Surface (tab)    ← a terminal or browser
            │   ├── Surface (tab)
            │   └── Surface (tab)
            └── Visible area         ← shows the SELECTED surface's content
```

Key: a workspace is like a virtual desktop. Switching workspaces swaps the entire view. Within a workspace, panes split the space. Within a pane, surfaces are stacked as tabs — only the selected one is visible.

## Human UX (GUI, not CLI)

The human:
- Sees **one workspace** at a time. Sidebar shows all workspaces with names + status pills.
- Clicks sidebar to switch workspaces. The visible content completely changes.
- Within the visible workspace, sees **panes** tiling the area. Each pane has a **tab bar** at top.
- Clicks tabs to switch surfaces within a pane. The pane's content changes, layout doesn't.
- Splits/drags to create or rearrange panes.
- Never touches the CLI directly for navigation — it's all mouse/keyboard shortcuts.

## Agent inside cmux

An agent runs inside **one surface** (terminal). It has `CMUX_WORKSPACE_ID` and `CMUX_SURFACE_ID` set by the environment. It calls `cmux` CLI commands to interact with the multiplexer — the CLI is the agent's UI to cmux, the way the sidebar/tabs are the human's UI.

The tmux shim exists because Claude Code speaks tmux protocol internally. The shim translates tmux calls to cmux API calls.

## What the human sees when things spawn

| Mechanism | What happens in cmux | Human disruption |
|---|---|---|
| **Dispatch** (skill) | New workspace in sidebar | None — sidebar gets a new entry, current view unchanged |
| **Teammate** (old: `new-split`) | New pane splits the workspace | **High** — layout fragments, cursor jumps, screen real estate stolen |
| **Teammate** (new: `new-surface`) | New tab in the tab bar | **Low** — tab bar gets a new entry, visible content unchanged |

## Verified Focus Behavior

- **`new-surface`** does NOT steal focus. The new tab is created with `selected_in_pane: false`. The user's selected tab and workspace stay unchanged.
- **`close-surface`** does NOT steal focus cross-workspace. If the user is in workspace A and a tab closes in workspace B, the user stays in A.
- **`close-surface`** CAN shift tab selection within the same workspace — if the user is actively viewing a workspace and a sibling tab is closed, cmux may reselect tabs. This is a minor edge case since users are typically in a different workspace than where teammates run.

## Verified Tab Naming

- Claude Code sets the tab title from the prompt/task description (e.g., "Test environment variables and workspace configuration")
- The claude hook integration adds a status prefix icon (e.g., `⠂`, `✳`)
- Tabs show a blue activity dot when the session is working

## Open Questions

1. **Multi-pane edge case** — if the human has manually split their workspace into 2+ panes, `new-surface --workspace` without `--pane` creates the tab in... the default pane? The focused pane? Which pane gets it matters because the teammate's tab could end up in a pane the human isn't looking at.
