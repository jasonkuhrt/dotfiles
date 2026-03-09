# cmd-ux Architecture

## Goal

`cmd-ux` exists to make Neovim command entry semantic, adaptive, and safe without splitting discovery, ranking, and execution into separate systems.

The broader adaptive-engine model is documented in [INTELLIGENCE_SPEC.md](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/local-plugins/cmd-ux/INTELLIGENCE_SPEC.md).

The architecture is built around one rule:

- every surface must read the same command truth

## Runtime Layers

### 1. Command Inventory

The inventory builder discovers the live command set from Neovim:

- builtin Ex commands
- user commands
- current-buffer user commands
- provider-owned roots

It then applies the exact blocklist and emits lightweight root entries only:

- root name
- provider id
- short description
- lightweight root frontier item

This stage does not build full semantic trees.

### 2. Command Index

The index owns the active inventory snapshot for the session.

It answers:

- root existence
- root prefix frontier queries
- root entry lookup
- lazy root description lookup

It also owns:

- persisted cache load/write
- active in-memory revision number
- live generic command maps reused by the generic provider

The persisted cache stores only inventory-grade data. It does not store semantic trees.

## 3. Semantic Resolution

When the user is interacting with a specific command family, `cmd-ux` resolves only that active root.

Resolution order:

1. dedicated provider if one exists
2. conservative generic provider otherwise

The result is a `ResolutionState`, not a cached global tree.

`ResolutionState` carries:

- rendered command text
- accepted tokens
- pending token
- semantic kind
- executable status
- refusal reason
- next valid frontier
- typed slots and current slot values for open-ended arguments

## 3.5 Capability Layer

`cmd-ux` now has a typed capability registry below the semantic forest.

It owns:

- stable capability ids such as `buffer.write_current` and `config.reload`
- availability checks
- safety metadata
- preview builders
- execution functions

This is the substrate used by:

- `Flow`
- capability-backed composite actions
- capability reporting through `Cmdux capabilities`
- future synthesis work

The critical boundary is:

- semantic roots are the user-facing grammar
- capabilities are the executable substrate
- learning and future synthesis must not bypass the capability layer

## 4. Learning Layer

The learning layer is persisted separately from the command index.

It stores:

- per-project active-day buckets
- mixed current-project and cross-project scores
- exact context-vector slices plus best matching facet slices
- in-memory session heat that is never persisted
- root and node activation
- frontier transition activation
- promoted path activation
- full rendered command execution history
- bounded semantic event history for deterministic flow proposal mining within short interaction bursts
- recency using a monotonic sequence number

Each scope advances its own active-day clock only when that scope records real activity on a new local day.
Pure AFK calendar gaps do not decay learning.
Semantic root usage is recorded whether the command is accepted through the `cmd-ux` picker flow or executed directly as an Ex command.

It changes:

- ordering
- promotions
- alias proposals
- deterministic flow proposals
- preview hints
- reports
- inbox proposals

Implementation split:

- `lua/cmd_ux/lib/learning.lua` owns persisted store I/O, recording, scoring, ranking, proposals, and public orchestration
- `lua/cmd_ux/lib/learning_reports.lua` owns human/agent report assembly and preview text over the learning API

It does not change:

- command existence
- command kind
- executability
- provider truth

## 5. Surface Adapters

Both interactive surfaces consume the same core:

- native Ex adapter
- Snacks picker adapter

Both ask the core for `ResolutionState`.
Both use the same transition policy.
Both benefit from the same learning-ranked frontier ordering.

## Cache Boundaries

There are two cache classes and they solve different problems.

### Persisted inventory cache

Purpose:

- reduce boot/reload work

Stores:

- root inventory
- lightweight frontier items

Validity rule:

- reuse only if the live discovered root set still matches

### In-memory revision caches

Purpose:

- avoid repeating expensive live metadata work during one active index lifetime

Stores:

- generic provider command summaries
- generic inference helpers tied to the active revision

Validity rule:

- drop immediately when the active index revision changes

This distinction matters.
A persisted cache generation is not the same thing as the active in-memory revision.

## Deterministic Ranking

Learning ranks structural frontiers using this order:

1. exact-context transition score
2. relaxed-context transition score
3. scoped node activation score
4. session heat in the same context mix
5. recency
6. original provider/index order
7. label for final tie-break

Promoted paths are ranked separately from structural children and then prepended as shortcut-lane items.

That keeps adaptive ordering deterministic and explainable.

## Invalidation Model

The index invalidates when command truth may have changed, including:

- explicit `:Cmdux refresh`
- config reload flows
- provider registration changes
- command creation/deletion
- current-buffer command-scope changes

When invalidated:

- a new index instance is built or loaded
- the active revision changes
- generic revision caches become stale and must not be reused

Learning data survives invalidation because usage history is orthogonal to command truth.

## Reporting and Feedback Loop

`Cmdux` exposes the learning layer as first-class reports:

- reports are assembled through `lua/cmd_ux/lib/learning_reports.lua`, not inline with persistence/ranking logic

- `capabilities`
- `compare`
- `explain`
- `forest`
- `inbox`
- `quarantine`
- `stats`
- `recent`
- `roots`
- `transitions`
- `paths`
- `noise`
- `suggest`
- `export`
- `blocklist`

This turns `cmd-ux` into a closed feedback loop:

1. observe real command behavior
2. adapt ordering automatically
3. inspect patterns and ranking causes
4. review alias/shortcut/noise proposals in the inbox
5. remove noise or promote hot flows

## Extension Rules

When extending `cmd-ux`, preserve these rules:

- do not add another command discovery path outside the index
- do not persist semantic trees unless validity can be proven
- do not let learning override semantic truth
- do not hide weakly modeled commands; improve the model instead
- prefer provider-local semantics over broad unsafe heuristics
- keep repeatable workflows reachable through `just`

## Design Test

An architecture change is probably correct if it keeps all of these true:

- startup cost depends on inventory size, not full semantic tree size
- semantic cost is paid only for the active command family
- picker and Ex see the same roots and ordering
- learning improves ordering without compromising safety
- invalidation is exact enough that stale semantic state cannot survive
