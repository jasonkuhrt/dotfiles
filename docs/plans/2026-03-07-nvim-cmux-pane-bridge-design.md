# Neovim <-> cmux Pane Bridge Design

## Problem

The current cross-boundary pane story is tied to Kitty via `smart-splits.nvim`.

That is now the wrong abstraction boundary.

The target stack is:

- macOS window/workspace layer: AeroSpace
- terminal runtime layer: Ghostty + cmux
- editor split layer: Neovim

To make the hjkl vision real, Neovim must cross into **cmux**, not into Kitty.

## Goal

Implement a Neovim pane bridge that preserves the current modifier grammar:

- `<C-hjkl>` = focus across split/pane boundaries
- `<A-hjkl>` = resize across split/pane boundaries
- `<C-D-hjkl>` = create directional split/pane
- close/zoom remain separate management actions

The bridge must:

1. prefer native Neovim split movement when a split exists locally
2. fall through to cmux only at the edge of the local Neovim layout
3. behave predictably in terminal buffers
4. avoid any Kitty dependency

## Existing Repo Assets

The repo already contains useful cmux integration patterns.

### 1. `cmux` environment detection

`home/.config/nvim/lua/config/link_open.lua` and
`home/.config/nvim/lua/config/image_open.lua` already use:

- `CMUX_WORKSPACE_ID`
- `vim.fn.executable("cmux")`

as the runtime detection boundary.

### 2. Existing cmux command usage

The repo already uses or simulates these cmux commands:

- `identify`
- `list-pane-surfaces`
- `new-pane`
- `focus-pane`
- `resize-pane`
- `close-surface`
- `send`
- `send-key`

This is enough to define a first bridge API without inventing a new protocol.

### 3. Existing fake cmux for tests

`scripts/tests/fake-cmux.sh` already models:

- current workspace
- pane/surface identity
- split creation
- focus
- resize
- close

That gives this lane a test harness without touching live cmux.

## Design Principles

### Native first

If Neovim can satisfy a move or resize locally, it should.

cmux is only consulted when the current window is at the edge of the local Neovim
layout.

### No hidden authority

The plugin should not ask Kitty, Ghostty, or Flo for pane topology.

Its only cross-boundary runtime is cmux.

### Fail quiet, surface explicit diagnostics

If cmux is unavailable or returns malformed data:

- local Neovim behavior should still work
- cross-boundary behavior should no-op
- a short `vim.notify` warning is acceptable in debug/failure cases

### Small surface area

Do not build a general multiplexer abstraction.

This plugin should be explicitly cmux-oriented.

## Proposed Plugin Shape

Suggested local plugin path:

- `home/.config/nvim/local-plugins/cmux-nav/`

Suggested module layout:

- `lua/cmux_nav/init.lua`
- `lua/cmux_nav/runtime.lua`
- `lua/cmux_nav/navigation.lua`
- `lua/cmux_nav/resize.lua`
- `lua/cmux_nav/split.lua`
- `lua/cmux_nav/types.lua`

## Runtime API

### Detection

```lua
cmux_nav.in_cmux() -> boolean
cmux_nav.identify_current_surface() -> CmuxIdentity|nil, err?
cmux_nav.list_pane_surfaces() -> CmuxSurface[], err?
```

### Navigation

```lua
cmux_nav.move_left()
cmux_nav.move_down()
cmux_nav.move_up()
cmux_nav.move_right()
```

### Resize

```lua
cmux_nav.resize_left()
cmux_nav.resize_down()
cmux_nav.resize_up()
cmux_nav.resize_right()
```

### Split management

```lua
cmux_nav.split_left()
cmux_nav.split_down()
cmux_nav.split_up()
cmux_nav.split_right()
cmux_nav.close_surface()
```

## Navigation Algorithm

Directional move algorithm:

1. Record the current Neovim window id.
2. Attempt native Neovim window movement.
3. If the current window changed, stop.
4. If not in cmux, stop.
5. Resolve current surface identity from cmux.
6. Ask cmux for the adjacent pane in the requested direction.
7. Focus that pane.

Important:

- movement across terminal buffers must use the same algorithm
- the plugin should not require special terminal-mode wrappers beyond the
  existing `<C-\><C-n>` exit pattern already used in keymaps

## Resize Algorithm

Directional resize algorithm:

1. Check whether the current Neovim layout can resize locally in the requested direction.
2. If yes, resize the Neovim split.
3. If not and in cmux, call `cmux resize-pane`.

If cmux resize granularity differs from Neovim resize granularity, normalize at
the key repeat level, not by inventing extra key families.

## Split Creation Algorithm

Directional split algorithm:

1. If the action targets Neovim-local editing splits, use native `:split` / `:vsplit`.
2. If the intent is terminal-surface creation, create via cmux.

This document chooses the stricter rule:

- inside Neovim, split creation remains **editor-local by default**
- terminal-surface creation belongs to Ghostty/cmux keybindings and Flo launchers

That keeps boundaries clean.

Implication:

- the first phase of this plugin only owns **focus and resize**
- split creation can remain outside the plugin until the runtime contract is stable

## Surface Identification Model

The plugin should treat cmux as a two-level graph:

- workspace
- surface

Pane focus should target the owning pane identity returned by `cmux identify`.

Suggested internal types:

```lua
---@class CmuxIdentity
---@field workspace_id string
---@field workspace_ref string
---@field surface_id string
---@field surface_ref string
---@field pane_id string
---@field pane_ref string

---@class CmuxSurface
---@field surface_id string
---@field surface_ref string
```

## Interaction with Flo

This lane should not depend on Flo.

The only contract assumed is:

- if Neovim is running inside a cmux-managed surface, it gets `CMUX_WORKSPACE_ID`
- `cmux` is on `$PATH`

Later, Flo may improve naming, launch behavior, or context bundles.
None of that should be required for the first bridge.

## Interaction with Ghostty

Ghostty remains the terminal host, but the bridge should not use Ghostty APIs.

Ghostty-specific behavior should be limited to:

- key passthrough
- shell environment
- visual behavior

The pane graph authority is cmux.

## Interaction with Existing Keymaps

The current mappings can stay conceptually the same:

- `Ctrl-h/j/k/l` -> move
- `Alt-h/j/k/l` -> resize

But the Neovim implementation should stop loading `smart-splits.nvim` once the
cmux bridge replaces it.

## Testing Strategy

### Unit-ish integration tests

Use `scripts/tests/fake-cmux.sh` as the deterministic backend.

Test cases:

1. local move succeeds -> no cmux call
2. local move blocked at edge -> cmux focus call issued
3. local resize succeeds -> no cmux call
4. local resize blocked at edge -> cmux resize call issued
5. malformed cmux JSON -> safe no-op + error path
6. no `CMUX_WORKSPACE_ID` -> local-only behavior

### Neovim test harness

Follow the existing local plugin pattern:

- small local plugin under `home/.config/nvim/local-plugins/`
- `plenary` tests
- headless execution via `nvim --headless`

## Rollout Plan

### Phase 1

Design + tests + local plugin scaffolding.

### Phase 2

Wire `Ctrl-h/j/k/l` and `Alt-h/j/k/l` to the new plugin behind a feature flag or
one clean plugin swap.

### Phase 3

Remove Kitty-specific smart-splits integration and related comments/docs.

### Phase 4

Update `hjkl-navigation.md`, `keymap.yml`, and Neovim docs to describe cmux as the
cross-boundary runtime.

## Non-Goals

This lane does not:

- redesign Flo
- redesign Zed pane behavior
- create a universal mux abstraction
- preserve Kitty compatibility
- solve macOS window management

Those belong to adjacent lanes.

## Decision

The correct next implementation lane is:

**replace `smart-splits.nvim` with a repo-owned cmux-native Neovim pane bridge,
starting with directional focus and resize only.**
