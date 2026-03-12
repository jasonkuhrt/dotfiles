# Tooling Stack Consolidation

## Intent

Define the ideal end-state for Jason's local tooling stack from macOS down to Neovim.

This document is intentionally opinionated:

- no compromise stack
- one authority per layer
- best possible DX over backward compatibility
- explicit separation from the active Flo feature lane

The goal is to remove the current "almost coherent" feeling around pane management,
editor/agent orchestration, and visual design.

## Current Findings

### 1. Spatial authority is split

The repo currently has multiple runtime authorities for the same concerns:

- `home/.config/kitty/kitty.conf` calls Kitty the primary terminal
- `home/.config/ghostty/config` calls Ghostty/cmux the primary terminal
- `home/.config/nvim/lua/plugins/smart-splits.lua` binds Neovim pane crossing to Kitty
- `home/.config/zed/keymap.json` independently owns pane movement inside Zed

This means the hjkl vision exists at the documentation layer, but not yet at the
runtime architecture layer.

### 2. The keymap is specified but not executable

`keymap.yml` and `hjkl-navigation.md` clearly define the intended grammar:

- bare = local motion
- Shift = medium jump
- Ctrl = cross-boundary focus
- Alt = structural resize
- Ctrl+Cmd = create

But `keymap.yml` is not compiled into tool configs. It is documentation only.
That guarantees drift.

### 3. Zed is overloaded

Zed is excellent as:

- an editor
- an agent review surface
- a secondary pane environment

Zed is not a good core terminal authority for this stack:

- Fish vi mode is disabled inside Zed terminal
- terminal navigation requires special-casing
- the pane grammar is not identical to the main terminal runtime

### 4. The AI/editor stack is under-realized

The Neovim extras already enable:

- `ai.claudecode`
- `ai.copilot-native`
- `ai.sidekick`

But the setup has not yet been pushed into a coherent "AI cockpit" model.

### 5. The visual system is promising but decentralized

There is already a recognizable design language:

- Monaspace
- Tokyo Night
- hand-tuned Zed theme overrides
- custom FZF colors
- terminal cursor tuning

But the system is still app-by-app. The result is themed, not authored.

## Ideal Stack

One authority per layer:

1. **Flo**
   Work orchestration, checkout/worktree resolution, context bundle creation, launcher targeting.

2. **AeroSpace**
   macOS window/workspace layout authority.

3. **Ghostty + cmux**
   Terminal runtime, workspace/surface graph, shell-visible work surface.

4. **Neovim**
   Primary code editing surface and split authority inside a checkout.

5. **Zed**
   Secondary editor and agent-review surface, not the primary pane runtime.

6. **SketchyBar + JankyBorders**
   Visual shell for focus, work item, workspace, and agent state.

## Top 10 Changes

### 1. Make Flo the control plane

Flo should own:

- work item resolution
- checkout/worktree selection
- context bundle materialization
- cmux workspace creation/focus
- launcher targeting

Flo should not own low-level pane logic inside Neovim or OS window management rules.
It should orchestrate them.

### 2. Declare Ghostty + cmux the only terminal runtime

Remove Kitty from the active pane-management story.

Reasons:

- cmux is already the intended runtime surface
- Ghostty is already documented as the cmux-facing terminal
- dual-terminal authority is the main source of conceptual drift

### 3. Replace Kitty-bound pane crossing with a cmux-aware Neovim bridge

The target is:

- `<C-hjkl>` crosses `nvim split -> cmux surface -> Ghostty workspace surface`
- `<A-hjkl>` resizes the active split or pane depending on boundary
- create/close/zoom semantics remain modifier-consistent

This is the highest-value non-Flo implementation lane.

### 4. Add AeroSpace as the macOS spatial layer

Complete the hjkl grammar at the OS level:

- focus window/container with directional hjkl
- move nodes directionally
- resize with the same structural modifier family
- use workspaces as real spatial contexts

This finishes the "from macOS down to nvim" promise.

### 5. Turn `keymap.yml` into a compiler target

Generate bindings for:

- Neovim
- Ghostty
- Zed
- AeroSpace

The keymap spec should become source-of-truth data, not prose.

### 6. Demote Zed terminal to an auxiliary surface

Keep Zed for:

- file editing
- inline AI work
- reviews
- diagnostics

Do not require Zed terminal to participate in the core pane contract.

### 7. Promote Sidekick to the Neovim AI cockpit

Use Neovim as the place where:

- Claude sessions receive curated context
- Codex runs fast non-interactive tasks
- AI-produced diffs are reviewed and applied

This is the right way to take `nvim + Claude Code + Codex` to the next level.

### 8. Give Codex a first-class local role

Clear role split:

- Claude = long-running interactive strategist/orchestrator
- Codex = fast executor/reviewer/search-backed surgical worker

The local Codex CLI already has the right primitives:

- `exec`
- `resume`
- `apply`
- `review`
- worktrees
- multi-agent features

### 9. Add a spatial HUD with SketchyBar + JankyBorders

Show:

- current Flo work item
- current checkout
- current cmux workspace
- active app/editor
- active pane/window focus
- agent activity state

The right aesthetic layer also improves cognition.

### 10. Build one repo-owned visual system

Define once:

- typography roles
- code font vs UI font
- color tokens
- semantic accent colors
- border/focus colors

Generate the per-tool variants from that system.

## Flo Boundary Contract

This section exists to avoid traffic with the active Flo feature lane.

This document does **not** prescribe Flo internals.
It only defines what the rest of the stack needs from Flo.

### Required external contract

Flo should eventually expose stable ways to:

- resolve a selector into a checkout path
- open or focus a checkout in cmux
- return stable checkout/work item metadata
- return stable context bundle locations
- identify the active checkout/work item for the current shell surface

### Nice-to-have external contract

Flo could later expose:

- machine-readable JSON commands for `start`, `open`, `list`, `inspect`
- event-friendly output for status bars and review surfaces
- stable workspace naming conventions for cmux and OS-level bars

### Explicit non-goals for this lane

This lane does **not** modify:

- Flo command semantics
- Flo backend model
- Flo launcher internals

It only prepares adjacent layers to integrate cleanly once Flo settles.

## Safe Lanes Outside Active Flo Work

These can be worked independently:

1. `nvim <-> cmux` pane bridge
2. keymap compiler/generator
3. visual token system
4. Zed role simplification
5. Sidekick/Codex local integration in Neovim
6. AeroSpace config and layout grammar

## Suggested Execution Order

### Slice 1

Define and build the `nvim <-> cmux` pane bridge.

Why first:

- highest pain
- highest leverage
- does not require Flo internals
- lets Ghostty/cmux become the actual terminal authority

### Slice 2

Add AeroSpace and align the OS-level grammar.

### Slice 3

Compile `keymap.yml` into real configs.

### Slice 4

Promote Sidekick/Codex/Claude into a real AI cockpit.

### Slice 5

Add SketchyBar/JankyBorders and the shared visual system.

## Sources

- AeroSpace: <https://github.com/nikitabobko/AeroSpace>
- Ghostty config reference: <https://ghostty.org/docs/config/reference>
- SketchyBar: <https://github.com/FelixKratz/SketchyBar>
- JankyBorders: <https://github.com/FelixKratz/JankyBorders>
- smart-splits.nvim: <https://github.com/mrjones2014/smart-splits.nvim>
- sidekick.nvim: <https://github.com/folke/sidekick.nvim>
- OpenAI Codex docs: <https://developers.openai.com/codex>
- OpenAI Codex repo: <https://github.com/openai/codex>
- Claude Code subagents: <https://docs.anthropic.com/en/docs/claude-code/sub-agents>
- Claude Code hooks: <https://docs.anthropic.com/en/docs/claude-code/hooks>
- Claude Code IDE integrations: <https://docs.anthropic.com/en/docs/claude-code/ide-integrations>
