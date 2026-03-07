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
- provider ownership
- lightweight root-list item data for matchable discovery surfaces

Deep semantic root description is not built into the index eagerly.

Instead:

- the inventory stays cheap to build and cache
- root list rendering reads only lightweight indexed items
- provider/generic semantic enrichment is resolved lazily when a specific root becomes active

The index is complete first. Enrichment is demand-driven.

Current cache boundaries:

- persisted cache: discovered roots plus lightweight root-list items only
- in-memory root semantic cache: lazy root descriptions per active index revision
- generic provider cache: build-time live user/buffer command maps when available, plus command summaries and inferred frontiers per active index revision

## 2.5 CommandLearning

`CommandLearning` is the persisted feedback layer that adapts `cmd-ux` to real usage.

It stores:

- root execution/selection counts
- frontier transition counts
- executed rendered commands
- recency via monotonically increasing sequence numbers

It does not change semantic truth.
It changes ordering and reporting.

Ranking contract:

- executed paths outrank merely selected paths
- higher-frequency paths outrank lower-frequency paths
- more recent paths break ties
- original provider/index order is the deterministic fallback

The learning store is scoped to active index revisions for in-memory caches, but its persisted usage data survives across sessions.

## 3. Semantic Enrichment

`cmd-ux` enriches command families in two ways:

- explicit providers for command families like `Config`, `Lazy`, and plugin command families that deserve first-class behavior
- generic command analysis for commands without a dedicated provider

Current generic enrichment now includes:

- inferring named subcommand structure from custom completion callbacks when the live frontier is a bounded set of short named tokens
- treating `nargs = "?"` roots with inferred named subcommands as likely `hybrid`
- treating required or variadic roots with inferred named subcommands as likely `namespace`
- recursively walking named completion frontiers until a terminal case decides whether each inferred token stays a `namespace` or collapses to a `leaf`
- terminating recursive inference on empty or non-named frontiers, path-like/buffer-like/tag-like/value frontiers, repeatable named-value frontiers, and repeated ancestor frontier shapes
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
- picker root items come from `CommandIndex`
- active command semantics come from provider/generic resolution for the current root

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

## Deterministic Performance Doctrine

Safe performance work must improve one of these properties without weakening correctness:

- reduce total-command work during startup and rebuild
- reduce repeated live Neovim API calls within one active index revision
- localize expensive semantic probing to the active command family
- preserve exact invalidation when command inventory or buffer scope changes

Safe next-step candidates, if more latency remains:

- provider-local revision caches for families with expensive live metadata lookups
- narrower generic completion-probe memoization keyed by root plus accepted path
- profiling-guided reductions in resolve-path allocations and repeated string rendering
- provider-local learning-aware ordering for richer domain-specific heuristics

Rejected performance shortcuts:

- trusting persisted semantic state across revisions without proving validity
- skipping live root-set validation before reusing persisted inventory
- sharing semantic caches across command-inventory revisions

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

4. Keep learning/reporting first-class
   - learned ordering must apply consistently across picker and semantic Ex
   - learning reports must stay inspectable and exportable
   - transitions, noise candidates, and deterministic suggestions should remain first-class reports, not buried in one omnibus view
   - helper roots like `Flow` and `Recall` should remain part of the same semantic system

## Execution Notes

- `CommandSnapshot` already exists in code and means provider input context
- `CommandIndex` is the runtime command graph/cache object
- `ResolutionState` is per interaction and must not become the index itself
- `ARCHITECTURE.md` is the canonical high-level reference for runtime layers, cache boundaries, and invalidation rules

## Rejected Ideas

- hiding commands because `cmd-ux` cannot yet prove them safe
- treating provider coverage as an admission gate
- maintaining separate matchable and runnable command sources
