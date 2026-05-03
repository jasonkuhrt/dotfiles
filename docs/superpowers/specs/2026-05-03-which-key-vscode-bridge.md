# which-key VS Code Bridge

**Status:** Initial design — open questions remain
**Created:** 2026-05-03
**Author:** Jason Kuhrt + Claude
**Related:** docs/superpowers/specs/2026-04-29-vscode-neovim-migration-design.md (parent migration that surfaced this gap)

## Problem

The vscode-neovim migration delivered the 5-prefix chord architecture (g/q/m/t/,) but did **not** deliver the headline visualization feature: vim-native, operator-pending-aware which-key popups inside VS Code.

Source-verified root cause (vscode-neovim 1.18.24, `~/.vscode/extensions/asvetliakov.vscode-neovim-1.18.24/dist/extension.js`):

- vscode-neovim attaches as a UI client with `ext_multigrid` + `ext_cmdline` + `ext_messages` + `ext_popupmenu` etc., so it *receives* nvim float-window grid events.
- The extension uses ONLY `createQuickPick`, `createOutputChannel`, `createStatusBarItem`, `createTextEditorDecorationType`. Zero `createWebview*` calls.
- Conclusion: vscode-neovim has no code path to render arbitrary nvim float buffer content. which-key's `nvim_open_win()` popup goes to nowhere visible.

Native VS Code chord-hint extensions (Glimpse, VSpaceCode) work but lack vim-native operator-pending awareness — they don't know that pressing `d` is an operator that should show valid motions, or that the chord set differs in normal vs visual mode.

## Goal

Bridge the two sides: **get the chord-menu data from nvim/which-key, render it in VS Code's native QuickPick UI**.

This preserves vim-native semantics (mode awareness, operator-pending state, dynamically-registered chords from any plugin) AND renders correctly in VS Code (QuickPick is a first-class VS Code primitive).

## Non-goals

- Replicating which-key's full UI (hydra mode, custom layouts, animation, theme).
- Replacing which-key in terminal nvim (terminal works fine; only override under `vim.g.vscode`).
- Building a generic nvim-float-rendering layer for VS Code (much larger scope).

## Architecture

Two pieces that talk via vscode-neovim's existing two-way RPC.

### Piece 1: nvim-side bridge (Lua module)

Lives in user's nvim config, gated on `vim.g.vscode`. Intercepts which-key's show() before it calls `nvim_open_win`, extracts the menu tree, dispatches to VS Code via `vscode.action()`.

**Data flow:**
1. User presses a prefix key (e.g., `q`)
2. After idle timeout (configurable; ~250ms), trigger fires
3. Lua bridge calls `require("which-key")` internal APIs to build the menu tree for the current prefix + mode
4. Each tree node becomes a serializable item: `{ keys, desc, group?, mode, has_children? }`
5. `vscode.action("jasonkuhrt.whichKey.show", { prefix, items })` ships the menu to VS Code

**Key reuse:** which-key already knows about modes, operators, plugin-registered chords, dynamic conditions. We borrow its tree, not its UI.

### Piece 2: VS Code extension command

Lives in user's existing `jasonkuhrt.utils` extension (or a new dedicated one — open question). Adds command `jasonkuhrt.whichKey.show` that:

1. Receives `{ prefix, items }` from nvim
2. Builds a QuickPick with items mapped to `{ label, description, detail }`
3. On selection: dispatches `vscode-neovim.send` with the chord sequence (`prefix + picked.label`)
4. On cancel: sends `<Esc>` to nvim to clear pending prefix state

**Visual treatment:**
- `label` = the key (e.g., `j`, `<C-w>`, `<leader>k`)
- `description` = the chord's desc/group name
- `detail` = optional (e.g., "submenu" for chord groups)

### Trigger mechanism (open question — see below)

Three candidate triggers:

| Mechanism | How | Pros | Cons |
|---|---|---|---|
| **Timeout-based** | nvim autocmd watches keypresses; if no follow-up within 250ms after a prefix, dispatch | Matches which-key terminal UX exactly | Trickier to wire reliably across mode/state |
| **Explicit invocation** | Bind `<leader>?` to dispatch the leader menu directly. User explicitly asks for it | Simple, predictable, easy to ship MVP | Loses the "I forgot what's next, just wait" flow |
| **Per-prefix dispatch** | Each prefix chord (`q`, `m`, `t`) in `vscode_keymaps.lua` dispatches its own menu when typed alone | Tight integration with our chord scheme | Defeats which-key's discovery purpose for *unknown* prefixes |

## Reuse vs build

| Component | Status |
|---|---|
| nvim → VS Code RPC (`vscode.action`) | Already in vscode-neovim |
| VS Code → nvim RPC (`vscode-neovim.lua`, `vscode-neovim.send`) | Already in vscode-neovim |
| Chord tree data structure (mode-aware, operator-aware) | Already in which-key.nvim |
| QuickPick UI primitive | Already in VS Code API |
| Two custom-extension-host conventions | Already in jasonkuhrt.utils |
| Glue between which-key tree → QuickPick items | **Build** (~50 lines Lua) |
| QuickPick handler that dispatches chords back | **Build** (~50 lines TS) |
| Trigger detection (whichever mechanism chosen) | **Build** (~30-100 lines depending on choice) |

Total custom code: ~150-200 lines split across two surfaces.

## Effort estimate

- **MVP** (single explicit-invocation trigger, dispatches menu, pick sends keystroke, no nesting): half day
- **Polished** (timeout-based detection, operator-pending awareness, nested submenus, group descriptions): 1-2 days
- **Full which-key parity** (hydra, loop mode, theming, custom layouts): week+

## Open questions

1. **Extension home.** Add `jasonkuhrt.whichKey.show` to existing `jasonkuhrt.utils`, or create a new dedicated extension `jasonkuhrt.vscode-whichkey-bridge` (or similar)?

2. **Trigger mechanism.** Pick one (or hybrid) of the three trigger candidates above. Affects MVP scope significantly.

3. **Nested menus.** which-key supports prefix-of-prefix (e.g., `m` → `c` → `p` for "match copy path"). Does the QuickPick show one level at a time (push new QuickPick on submenu selection) or flatten the whole tree with breadcrumb labels?

4. **Operator-pending awareness.** When user presses `d` (delete operator), nvim's mode becomes `o` (operator-pending). which-key knows this and shows valid motions. How does the bridge convey this to QuickPick — via menu items with `(motion)` markers, or filter to motion-only chords, or both?

5. **Cancellation semantics.** ESC in QuickPick should clear nvim's pending prefix state (otherwise nvim is stuck waiting). Need to send `<Esc>` to nvim. What about clicking elsewhere or losing focus?

6. **Multi-key chord display.** `<leader>k` shows up as `space k` in nvim's keymap list. Render verbatim or normalize to vim notation? Both are readable; consistency matters.

7. **State persistence across prefix presses.** If user presses `q` (menu shows), then types `j` (selects next-hunk), does the chord buffer reset cleanly? What if they pre-typed `q` while still in command-completion?

8. **Performance.** Building the chord tree on every prefix press — fast enough? Or pre-compute and cache, invalidated on keymap changes?

9. **Error handling / fallback.** If which-key isn't loaded, or the bridge errors, what happens? Silent fall-through to default vim behavior, or visible error?

10. **Distribution / install.** If this lives in a separate extension (per Q1), publish it to marketplace, or keep it as a private local-build like the other `jasonkuhrt.*` extensions?

## Success criteria

A polished version delivers:

1. Press `q` (or any prefix), wait ~250ms → QuickPick opens listing the available next keys with descriptions.
2. Type to fuzzy-filter the list.
3. ESC cancels cleanly without leaving nvim in a stuck pending state.
4. Operator-pending state is respected: pressing `d` (in normal) shows motions; chord set differs in visual mode.
5. Behavior is identical to terminal nvim's which-key in semantic terms; only the rendering surface differs.

## References

- vscode-neovim source: `~/.vscode/extensions/asvetliakov.vscode-neovim-1.18.24/dist/extension.js`
- vscode-neovim Lua bridge runtime: `~/.vscode/extensions/asvetliakov.vscode-neovim-1.18.24/runtime/lua/vscode.lua`
- which-key.nvim source: `~/.local/share/nvim/lazy/which-key.nvim/`
- jasonkuhrt.utils extension: `~/projects/jasonkuhrt/vscode-utils/`
- Parent migration spec: `docs/superpowers/specs/2026-04-29-vscode-neovim-migration-design.md`
