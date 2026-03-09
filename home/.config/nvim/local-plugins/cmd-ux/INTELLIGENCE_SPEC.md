# Semantic Command Intelligence Spec

## Purpose

This document defines the ideal adaptive intelligence layer for `cmd-ux`.

It is intentionally broader than Neovim.
The same model can power any semantic command system for:

- desktop apps
- websites
- editors
- launchers
- command palettes
- internal tools

The core requirement is simple:

- the product must expose a stable vocabulary of typed actions or capabilities

Once that exists, the rest of this system is largely app-agnostic.

## Goals

- make command ordering reflect real user intent
- make shortcuts emerge from demonstrated behavior instead of hardcoding
- make stale habits fade without destructive penalties
- let local context dominate while still benefiting from broader history
- surface workflow opportunities, not just command popularity
- give offline AI review enough semantic signal to propose new commands, flows, and capabilities

## Non-Goals

- replacing semantic truth with learned truth
- using opaque model scores for live ranking
- logging raw keystrokes as primary product semantics
- building one universal tree for every legacy command spelling
- promoting shortcuts that are no longer fresh

## Core Objects

### Semantic Forest

The interactive command vocabulary is modeled as a forest, not a single giant tree.

Each root family owns one semantic tree:

- `Config`
- `Lazy`
- `Buffer`
- `Pane`
- `Tab`
- `File`

Each tree contains typed nodes:

- `namespace`
  - non-executable grouping node
- `hybrid`
  - executable node that also has children
- `leaf`
  - executable terminal semantic action
- `slot`
  - typed argument position whose value space is not expanded into arbitrary children

Why a forest instead of one universal tree:

- many historical command systems are flat, inconsistent, or hostile
- modern first-party namespaces can still be clean and structured
- promoted paths restore the practical benefits of flat discoverability without sacrificing semantic structure

### Stable Node Id

Every semantic node must have a stable canonical id.

Examples:

- `Config`
- `Config/reload`
- `Lsp/refactor`
- `Lsp/refactor/rename`
- `File/open`
- `File/open/$path`

Rules:

- ids are semantic, not presentation-oriented
- ids do not include user-facing aliases
- slot ids represent argument positions, not every concrete value

### Capability Graph

The forest is the user-facing command grammar.
The capability graph is the underlying executable ability graph.

Examples:

- `config.reload`
- `buffer.write_current`
- `buffer.close_current`
- `diagnostics.open_loclist`
- `explorer.reveal_current_file`
- `lsp.rename`

Multiple command nodes may target the same capability.
AI synthesis must compose capabilities, not arbitrary source code.

### Action Event

The raw intelligence substrate is a semantic action log, not a command-only log.

Each event records:

- event id
- timestamp
- session id
- episode id
- app id
- workspace id
- project id
- resource kind
- surface class
- input modality
- semantic node id, capability id, or both
- event kind
- outcome
- optional latency
- optional metadata payload

### Scope

Learning is scoped.

The two required scopes are:

- `project`
- `cross_project`

`cross_project` is derived from all project scopes other than the active project.
It is not primary truth.

Project identity should be:

1. git root when available
2. workspace root
3. cwd or app-local project root

### Active-Day Bucket

Learning uses per-scope active-day buckets in the user's local timezone.
A scope advances only when it records real activity on a new local day.
Pure AFK calendar gaps do not decay learning.

The system does not rely on infinite lifetime counters.
Recent behavior matters more than ancient behavior.

## Event Model

The event log should capture semantic intent and semantic friction.

### Goal Signals

These mean the user completed or strongly expressed a real action.

- `node_executed`
- `capability_invoked`
- `path_shortcut_executed`
- `mapping_invoked`
- `picker_choice_executed`

### Preference Signals

These mean the user showed preference, but not necessarily completion.

- `choice_selected`
- `top_suggestion_accepted`
- `shortcut_expanded`
- `surface_handoff_confirmed`

### Friction Signals

These mean the interface likely failed to offer a good keyboard-semantic path.

- `pointer_fallback`
- `motion_burst`
- `selection_churn`
- `backtrack`
- `abort`
- `undo_soon_after`
- `surface_ping_pong`

### Discovery Signals

These indicate curiosity, not strong intent.

- `preview_opened`
- `help_opened`
- `node_hovered`

Discovery signals should never dominate ranking.

## Context Model

Live ranking must be context-aware.

The minimum context dimensions are:

- project id
- semantic parent context
- resource kind
- surface class

Examples of `resource_kind`:

- `typescript`
- `lua_config`
- `markdown`
- `explorer_panel`
- `diagnostics_panel`
- `dashboard`
- `repo_root`

Examples of `surface_class`:

- `commandline`
- `picker`
- `sidebar`
- `toolbar`
- `context_menu`

The system should be able to answer:

- what is hot in this exact context
- what is hot in this semantic parent regardless of resource kind
- what is hot in this project generally
- what is hot across other projects

### Context Vector

The runtime context should be a typed vector, not one opaque string.

Minimum fields:

- `surface`
- `surface_detail`
- `filetype`
- `buftype`
- `mode`
- `legacy_key`

The engine should derive:

- one exact key from the whole vector
- a bounded set of facet keys such as surface-only, filetype-only, or surface+filetype

Ranking should prefer:

1. exact context
2. best matching facet context
3. global semantic truth

## Signal Credits

The system should use integer credits only.

Suggested default credits:

- direct execute: `100`
- explicit select: `35`
- implicit accept of top suggestion: `20`
- mapping-invoked capability: `90`
- shortcut expansion without execution: `15`
- preview/help open: `2`

Friction credits are separate and must not be mixed into live ranking:

- pointer fallback: `120`
- motion burst: `80`
- selection churn: `25`
- backtrack: `30`
- abort: `40`
- undo soon after: `100`
- surface ping-pong: `60`

These defaults are intentionally asymmetric.
Real completed intent must outweigh soft signals.

## Ancestor Propagation

Direct leaf usage should also activate its ancestor categories.

When a node receives a direct positive signal, the system walks from the node toward the root and applies diminishing propagated credit at each ancestor.

Default propagated credit vector:

- depth `0` direct node: `100%`
- depth `1` parent: `35%`
- depth `2` grandparent: `12%`
- depth `3` great-grandparent: `4%`
- depth `4+`: `0%`

Example:

- executing `Lsp/refactor/rename`
  - `Lsp/refactor/rename += 100`
  - `Lsp/refactor += 35`
  - `Lsp += 12`

This is what lets one hot refactor path lift the broader refactor category without flattening the forest.

Preference signals propagate too, but with their own lower direct credit.

## Transition Learning

The system must also learn edge transitions.

Transition stats are recorded from:

- semantic parent context -> chosen child node
- executed node -> next executed node in the same episode

Two edge classes matter:

- tree edge
  - what choice is preferred inside a semantic parent
- workflow edge
  - what action tends to follow another action

Tree edges drive live ranking in frontiers.
Workflow edges drive AI review, shortcut proposals, and future flow synthesis.

## Temporal Model

All derived learning tables are bucketed by active day per scope.

The engine computes effective scores over a sliding window.

Suggested defaults:

- `window_days = 21`
- `freshness_days = 5`

Active-day weight formula:

```text
day_weight(active_day_age) = window_days - active_day_age
```

For `window_days = 21`:

- current active day: `21`
- previous active day: `20`
- ...
- 20 active days ago: `1`

Anything outside the window contributes `0`.

This gives deterministic linear decay based on continued activity:

- recent usage matters most
- stale usage fades as the scope keeps being used
- no negative counters are needed

## Derived Tables

The system should maintain derived active-day bucket tables keyed by stable ids.

### Node Activation

Per node id, per scope, per context slice:

- direct execute credit
- direct preference credit
- propagated execute credit
- propagated preference credit
- last active sequence

### Transition Activation

Per context -> node edge, per scope:

- execute credit
- preference credit
- last active sequence

### Path Activation

Per full semantic path, per scope:

- execute credit
- preference credit
- shortcut use credit
- last active sequence

### Friction Tables

Per scope and context:

- pointer fallback credit
- motion burst credit
- churn credit
- abort credit
- undo credit

These are for diagnosis and AI review, not direct ranking.

## Scope Mixing

Live ranking combines project-local and cross-project evidence.

Suggested defaults:

- `project_weight = 4`
- `cross_project_weight = 1`

Score mixing:

```text
mixed_score = project_score * project_weight
            + cross_project_score * cross_project_weight
```

Cross-project influence must be independently disableable.

If disabled:

- `mixed_score = project_score`

## Session Heat

The live engine should also keep an in-memory session layer.

Rules:

- it is never persisted
- it uses the same semantic ids as durable learning
- it can temporarily bias ranking toward what is hot right now
- it resets cleanly on restart or explicit learning reset

Suggested defaults:

- `session_project_weight = 6`
- `session_cross_project_weight = 1`

## Ranking Algorithm

Ranking must be deterministic and explainable.

For a candidate node `n` visible in live context `c`:

1. compute exact-context transition score
2. compute relaxed-context transition score
3. compute mixed node activation score
4. add session heat in the same exact/facet context mix
5. break ties by recency
6. break ties by original structural order
7. break final ties by label

Suggested numeric form:

```text
rank_score(n, c) =
    8 * mixed_exact_transition_score(n, c)
  + 3 * mixed_relaxed_transition_score(n, c)
  + 2 * mixed_node_activation_score(n)
```

Where:

- `exact_transition` means same semantic parent, same resource kind, same surface class
- `relaxed_transition` means same semantic parent regardless of resource kind/surface
- `node_activation` includes direct and propagated credit

Recency is a tiebreaker, not a dominant term.

That avoids unstable oscillation from one-off recent events.

## Promotion

Promotion is the act of surfacing a full semantic path as a shortcut.

Examples:

- `Config reload`
- `Buffer close`
- `Flow save-and-config-reload`

Promoted paths are not normal frontier nodes.
They are a separate section above the structural frontier.

Why:

- structural truth must remain honest
- shortcuts are acceleration, not grammar

### Promotion Eligibility

A path may be promoted only if all are true:

- the path is currently valid
- the path is executable now, or safely expandable to a deeper valid state
- it saves at least `2` semantic hops from the current context
- it passes freshness
- it ranks within the top promoted candidates for the current context

Suggested defaults:

- `promotion_max_per_context = 3`
- `promotion_min_hops_saved = 2`
- `promotion_freshness_days = 5`

### Promotion Score

Promotion should emphasize exact path repetition, not just hot categories.

Suggested score:

```text
promotion_score(path, c) =
    6 * mixed_exact_path_score(path, c)
  + 2 * mixed_relaxed_path_score(path, c)
  + 1 * mixed_node_activation_score(target_leaf(path))
```

Shortcut usage should contribute only discounted credit.
Otherwise promoted shortcuts can lock themselves in place artificially.

### Promotion UX Rules

- `<CR>` on a promoted executable path executes it
- `<Tab>` expands the full path without executing
- if the target is incomplete, selecting the promotion expands into that deeper state
- promotions must be visually distinct from structural choices

## Decay and Demotion

Demotion should happen through absence of fresh evidence, not through negative penalties.

The correct mechanism is:

- sliding-window scoring
- freshness gates
- limited shortcut slots per context

A previously promoted path disappears automatically when:

- it falls below the promotion threshold
- it has no activity inside the freshness window
- stronger paths take its place

This is superior to decrementing counters because:

- it is easier to reason about
- it is easier to explain
- it avoids irreversible history

## Signal Ranking Doctrine

Not all signals are equal.

The system should rank signals in this order:

1. completed semantic action
2. explicit semantic choice
3. accepted suggestion
4. discovery behavior

And separately:

1. pointer fallback
2. regret or undo
3. churn and backtracking
4. surface ping-pong
5. motion bursts

Positive ranking signals shape live ordering.
Friction signals shape review output and synthesis opportunities.

## Episode Model

Workflow mining needs episodes, not just isolated events.

An episode is a bounded task interaction span.

Suggested episode boundaries:

- inactivity gap greater than `30s`
- project change
- major resource kind change
- explicit mode reset or command clear
- successful terminal action followed by inactivity

Within an episode, the system can mine:

- frequent subsequences
- repeated multi-step workflows
- oscillation patterns
- friction clusters

## AI Review Loop

AI review should be offline and proposal-oriented.

It should consume:

- raw semantic event log
- derived node/path/transition tables
- friction summaries
- capability graph
- semantic forest snapshot

It should produce:

- new aliases
- promoted-path candidates
- new composite flow candidates
- missing capability proposals
- namespace design proposals
- dead-weight discovery/noise reports

### AI Review Rules

- never generate rankings directly for live UI
- never bypass the capability graph
- never invent executable code as the primary artifact
- always propose structured command specs first

The ideal artifact is:

- a structured command or flow spec
- rationale
- evidence
- test cases
- docs impact

## Typed Slots

Open-ended arguments should be modeled as typed slots.

Each slot should define:

- stable slot id
- human label
- slot kind
- required/optional flag
- validator
- previewer

Examples:

- `Buffer goto <buffer>`
- `Tab goto <tab>`
- `File open <path>`

## Capability-Composed Flows

Flow-like actions should be expressed as ordered capability steps, not opaque command strings.

Ideal shape:

```lua
{
  id = "flow.config.save_and_reload",
  steps = {
    { capability = "buffer.write_current" },
    { capability = "config.reload" },
  },
}
```

## Reports

The engine should expose reports for humans and agents:

- top roots
- top nodes
- top transitions
- top promoted paths
- alias proposals
- deterministic flow proposals
- capability inventory
- semantic forest snapshot
- ranking compare reports
- command-system inbox
- quarantine candidates
- stale promoted paths
- friction hotspots
- workflow candidates
- unused or weakly justified roots

Runtime boundary:

- persisted schema defaults, normalization, and migration stay in `lua/cmd_ux/lib/learning_store.lua`
- learning runtime, scoring, and ranking truth stays in `lua/cmd_ux/lib/learning.lua`
- alias/quarantine/flow candidate synthesis stays in `lua/cmd_ux/lib/learning_candidates.lua`
- human/agent report assembly and preview text stays in `lua/cmd_ux/lib/learning_reports.lua`

Every report should be sliceable by:

- project
- cross-project
- exact context
- time window

## Config Surface

The ideal configuration lives in typed product config, not sidecar text files.

Suggested shape:

```lua
learning = {
  scope = {
    project_weight = 4,
    cross_project_weight = 1,
    cross_project_enabled = true,
  },
  time = {
    window_days = 21,
    freshness_days = 5,
  },
  propagation = {
    execute = { 100, 35, 12, 4 },
    select = { 35, 12, 4, 1 },
  },
  profiles = {
    Config = {
      execute = { 100, 50, 20, 8 },
    },
  },
  context = {
    exact_weight = 6,
    facet_weight = 2,
  },
  session = {
    enabled = true,
    project_weight = 6,
    cross_project_weight = 1,
  },
  promotions = {
    enabled = true,
    max_per_context = 3,
    min_hops_saved = 2,
    min_recent_executes = 2,
    freshness_days = 5,
  },
  aliases = {
    enabled = true,
    max = 8,
    min_recent_executes = 2,
    min_depth = 2,
    min_score = 120,
  },
  flows = {
    enabled = true,
    history_limit = 512,
    max_gap_seconds = 180,
    max = 6,
    max_steps = 4,
    min_support = 2,
    min_score = 180,
    same_context_only = true,
  },
  quarantine = {
    min_unused_roots = 1,
    max = 16,
  },
}
```

Richer semantic action telemetry remains deferred work and is intentionally not part of the current shipped `cmd_ux.setup()` runtime config surface.

## Implemented Deterministic Surfaces

The current `cmd-ux` implementation already ships the non-AI half of this model:

- context-scoped adaptive ordering
- active-day decay
- session heat
- promoted path shortcuts
- alias proposals
- deterministic flow proposals from bounded event history and short interaction bursts
- semantic forest inspection
- ranking compare
- quarantine recommendations
- safety tiers and outcome previews through the capability layer

The `window_days` and `freshness_days` names are configuration surface labels.
Semantically they mean active days, not raw calendar elapsed days.

## Safety Invariants

These rules must hold in every implementation:

- learning never changes semantic truth
- promotions never masquerade as structural children
- stale shortcuts decay automatically
- project-local habits outrank broad habits by default
- cross-project influence is optional
- friction signals do not directly poison live ranking
- AI synthesis targets typed capabilities, not freeform imperative code

## Why This Generalizes

This model is not specific to Neovim.

Any product with:

- a typed action vocabulary
- stable entities or contexts
- multiple interaction surfaces

can adopt the same system.

Examples:

- web app command palettes
- admin dashboards
- design tools
- IDEs
- launchers
- knowledge tools

The forest is the semantic vocabulary.
The capability graph is the executable substrate.
The action log is the intent record.
The intelligence layer is the adaptive ranking, promotion, and synthesis engine.

That is the core abstraction.
