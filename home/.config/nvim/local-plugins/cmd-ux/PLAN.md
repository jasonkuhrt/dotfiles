# cmd-ux Plan

Working plan for `cmd-ux`.

This file is the active design and execution plan. `README.md` is the stable product spec.

## Product Contract

`cmd-ux` must expose effectively 100% of commands that currently exist in the running Neovim session, minus the explicit denylist.

That means:

- builtins are in scope
- global user commands are in scope
- buffer-local user commands for the current buffer are in scope
- lazy stubs are in scope once they exist in the session
- commands are never hidden merely because `cmd-ux` lacks rich semantics for them

Out of scope for this guarantee:

- hypothetical commands from plugins that have not registered anything yet

This is the critical correction:

- discovery completeness is mandatory
- semantic richness is enrichment, not admission
- if a registered command is missing from `cmd-ux` and is not denylisted, that is a `cmd-ux` bug

## Goal

Build one command system with two surfaces:

- native Ex cmdline
- Snacks picker

Both surfaces must read the same command graph and therefore agree on:

- what commands exist
- what text is matchable
- what can execute now
- what requires deeper input

## Architecture

## 1. CommandInventory

`CommandInventory` is the complete discovered set of commands in the current session.

It contains:

- builtin command roots discovered from Neovim completion
- global user commands from `nvim_get_commands({})`
- buffer-local user commands for the current buffer from `nvim_buf_get_commands(0, {})`
- provider-owned roots
- root metadata gathered from Neovim where available

The denylist is applied here. Nothing else is an exclusion rule.

## 2. CommandIndex

`CommandIndex` is the authoritative runtime graph used by `cmd-ux`.

It contains one entry for every discovered command in `CommandInventory`, minus denylisted roots.

Each indexed command has:

- root name
- current scope (`builtin`, `user`, `buffer-local`, provider-owned)
- baseline node shape
- semantic kind when known (`leaf`, `namespace`, `hybrid`)
- generic or provider-owned help/description
- modeled frontier rules where available
- open/freeform slot description where richer modeling is not yet available

The index is complete first, then enriched.

## 3. Semantic Enrichment

`cmd-ux` enriches index entries in two ways:

- explicit providers for command families like `Config`, `Lazy`, and plugin command families that deserve first-class behavior
- generic command analysis for commands without a dedicated provider

Current generic enrichment now includes:

- inferring named subcommand structure from custom completion callbacks when the live frontier is a bounded set of short named tokens
- treating `nargs = "?"` roots with inferred named subcommands as likely `hybrid`
- treating required or variadic roots with inferred named subcommands as likely `namespace`
- probing one level deeper to decide whether each inferred token is a leaf or another namespace
- rejecting path-like, buffer-like, tag-like, and broad enum/value frontiers as namespace evidence

This keeps the common "command hub with named subcommands" case generic while preserving dedicated providers for families that need richer help, execution behavior, or argument semantics than the heuristic can safely infer.

If a command family is not yet richly modeled:

- it still appears in the index
- it still appears in the picker/cmdline UX
- its weak modeling is a bug/improvement target, not a reason to hide it

## 4. Runtime Surfaces

Both surfaces must read only `CommandIndex`.

That means:

- root matches come from `CommandIndex`
- root existence checks come from `CommandIndex`
- picker items come from `CommandIndex`
- advancement and execution decisions start from `CommandIndex`

There must not be a second path that discovers commands ad hoc.

## 5. Dynamic Slot Resolution

Some argument spaces are inherently dynamic and remain live resolvers:

- file and path slots
- help tags
- buffer names
- runtime plugin names
- open-ended text arguments

These are not exclusions from the index. They are dynamic slots attached to index entries.

## 6. Refresh Lifecycle

The index lifecycle is explicit:

- build at `cmd_ux.setup()`
- rebuild on `:Cmdux refresh`
- rebuild after `Config reload`
- rebuild on `User LazyReload`
- rebuild when user commands are created or deleted
- rebuild when the current-buffer command scope changes

The runtime should trust the current index. If the index is stale, that is a coherence bug.

## Current Task List

1. Build complete `CommandInventory` and `CommandIndex`
   - include all live commands minus denylist
   - stop using “provably safe” as an admission filter
   - represent weakly modeled commands honestly instead of hiding them

2. Make match/run symmetry structural
   - picker and semantic Ex read the same index
   - remove ad hoc root rediscovery from surfaces
   - ensure list membership and root existence cannot drift

3. Persist the index cache
   - after full index build, emit a cache artifact
   - on next boot, reuse the cache only if the live discovered root set still matches
   - `:Cmdux refresh` rebuilds and rewrites the cache
   - cache is an acceleration layer over the same command graph model

## Execution Notes

- `CommandSnapshot` already exists in code and means provider input context
- `CommandIndex` is the runtime command graph/cache object
- `ResolutionState` is per interaction and must not become the index itself

## Rejected Ideas

- hiding commands because `cmd-ux` cannot yet prove them safe
- treating provider coverage as an admission gate
- maintaining separate matchable and runnable command sources
