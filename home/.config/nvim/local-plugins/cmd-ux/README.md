# cmd-ux

`cmd-ux` is a local Neovim plugin that turns command entry into a semantic system instead of a raw string submission path.

Local plugin architecture in this repo follows the shared guide at [DEVELOPMENT.md](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/local-plugins/DEVELOPMENT.md).
The detailed runtime/data-flow architecture is documented in [ARCHITECTURE.md](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/local-plugins/cmd-ux/ARCHITECTURE.md).
The adaptive ranking/promotion model is specified in [INTELLIGENCE_SPEC.md](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/local-plugins/cmd-ux/INTELLIGENCE_SPEC.md).

It has one job: make command execution predictable across two surfaces:

- the native Ex cmdline
- the Snacks command picker

The plugin owns command discovery, command semantics, and transition rules. Your config only wires those semantics into keys and UI surfaces.

## Concepts

### Discovery coverage

`cmd-ux` aims to expose effectively 100% of commands that currently exist in the running Neovim session, minus the explicit denylist.

That includes:

- builtin Ex commands
- global user commands
- buffer-local user commands for the current buffer
- lazy command stubs once they exist

That does not include hypothetical commands from plugins that have not registered anything yet.

Missing coverage is a `cmd-ux` bug, not intended product behavior.

### Native Ex cmdline

The native Ex cmdline remains the canonical command buffer and execution substrate.

That does not mean it is the preferred manual typing surface for everything. It means:

- the Neovim ecosystem already terminates real Ex execution there
- Neovim exposes parsing, completion, and cmdline mutation APIs there
- other surfaces can hand off into it without inventing a second execution language

### Surface adapters

`cmd-ux` has one semantic core and two adapters:

- Ex adapter: powers `<CR>`, `<Tab>`, and semantic `<Space>` in the native Ex cmdline
- Snacks adapter: powers the semantic picker opened from `:`

Both surfaces are different UIs over the same command model.

### Persisted index cache

`cmd-ux` persists the discovered command inventory and lightweight root-list items to speed later boots.

That cache is not trusted blindly.

It is reused only when the live discovered root command set still matches the cached root set. If command discovery has changed, `cmd-ux` rebuilds the inventory from live Neovim state.

Rich root semantics are resolved lazily when a specific command becomes active. They are not eagerly materialized for every root during startup.

### Runtime architecture

`cmd-ux` is organized into four runtime layers:

1. `CommandInventory`
   - discovers the live root command set from Neovim
   - applies the denylist
   - captures lightweight list-facing metadata such as source and short description

2. `CommandIndex`
   - persists and reloads that inventory
   - answers root existence and prefix frontier queries
   - intentionally does not eagerly build full semantic root trees

3. Lazy semantic resolution
   - resolves detailed root semantics only for the currently active command family
   - delegates to dedicated providers first
   - falls back to conservative generic inference when no dedicated provider exists

4. Surface adapters
   - Ex adapter and Snacks adapter consume the same root inventory and semantic resolution pipeline
   - surfaces do not rediscover commands independently

This split is the current performance boundary:

- inventory work should scale with total command count
- semantic work should scale with the active command family only

### Cache and invalidation model

There are multiple cache layers, each with a narrow contract:

- persisted inventory cache
  - stores discovered roots and lightweight root-list items
  - reused only when the live root set still matches
  - keeps a persisted build generation for cache payload identity only

- in-memory root semantic cache
  - stores lazily described root nodes per current active index revision
  - cleared whenever the command inventory is invalidated or rebuilt

- generic provider revision cache
  - reuses the live `nvim_get_commands({})` and `nvim_buf_get_commands(0, {})` results already fetched during inventory build when available
  - otherwise fetches them once per active index revision
  - stores generic command summaries and inferred named frontiers for that same revision
  - rebuilt automatically whenever the active in-memory index instance changes after command creation/deletion, buffer-scope changes, or cache reload

What is intentionally not cached across revisions:

- open-ended dynamic argument spaces whose truth is inherently live
- semantic state that cannot be proven stable from the current session shape

An active index revision is not the same thing as the persisted cache generation.
The revision changes whenever the live in-memory index instance changes, including a cache reload after invalidation.

### Adaptive learning

`cmd-ux` now learns from actual command usage.

It persists:

- per-project active-day usage buckets
- exact context-vector slices plus best matching context facets
- exact rendered command executions
- learned transitions inside namespaces and structured frontiers
- explicit choice selections in pickers and semantic completion
- propagated ancestor/category activation from hot descendant paths
- promoted full-path shortcuts for strong recent semantic paths

It also keeps in-memory session heat:

- project-local recent behavior inside the current editor session
- exact-context and facet-context bursts that should temporarily matter now
- zero persistence across restarts so it can accelerate flow without polluting long-term habits

That learning feeds back into ordering:

- current-project evidence outweighs cross-project evidence by default
- exact live context outweighs broader facet context by default
- recent usage outweighs stale usage via a sliding active-time window
- current-session heat can temporarily outweigh older stable habits when configured to do so
- executed choices outrank merely selected choices
- higher-frequency choices outrank lower-frequency choices
- more recent choices break ties
- original provider/index order remains the final deterministic fallback

This is the behavior that lets repeated usage like `Config reload` rise above `Config help`, lets `refactor` rise after repeated use of one refactor leaf, and lets hot full paths such as `Config reload` appear as promoted shortcuts at the root layer.

The runtime context model is no longer a single flat `resource kind` string. It is a typed context vector that includes:

- surface kind and detail
- filetype
- buftype
- mode
- a legacy coarse context key for compatibility and explainability

### Built-in Semantic Roots

`cmd-ux` now ships a semantic workspace vocabulary well beyond plain command discovery:

- `Buffer`
  - semantic buffer navigation and lifecycle
  - examples: `Buffer next`, `Buffer previous`, `Buffer close`, `Buffer goto 3`

- `Pane`
  - semantic pane focus, resize, and split actions
  - examples: `Pane focus left`, `Pane resize right`, `Pane split below`, `Pane only`

- `Tab`
  - semantic tab navigation and layout
  - examples: `Tab next`, `Tab previous`, `Tab move right`, `Tab goto 2`

- `Flow`
  - context-aware actions for the current buffer
  - built from typed capability steps instead of opaque command strings
  - examples: save, write-all, source-buffer, config-reload, search-word, lsp-rename, project-files, test-nearest, git-status, debug-continue

- `Lsp`
  - semantic LSP navigation, symbols, and refactors
  - examples: `Lsp jump definition`, `Lsp references`, `Lsp symbols workspace`, `Lsp refactor action organize-imports`

- `Git`
  - semantic git status, history, hunk, and blame actions
  - examples: `Git status`, `Git history file`, `Git hunk stage`, `Git blame`

- `Test`
  - semantic test running, debugging, output, and failure navigation
  - examples: `Test run nearest`, `Test output panel`, `Test jump next-failed`

- `Debug`
  - semantic debugger control for stepping, breakpoints, REPL, and UI
  - examples: `Debug continue`, `Debug breakpoint toggle`, `Debug step over`

- `Project`
  - semantic project browsing and search
  - examples: `Project files`, `Project grep`, `Project switch`

- `Session`
  - semantic session save/restore control
  - examples: `Session save`, `Session restore last`, `Session stop`

- `Marks`
  - semantic mark browsing
  - examples: `Marks browse`

- `Registers`
  - semantic register browsing
  - examples: `Registers browse`

- `Recall`
  - replay recent executed commands
  - examples: `Recall last`, `Recall 2`

- `Search`
  - federated search across files, text, code, editor state, and result lists
  - examples: `Search files project`, `Search text word`, `Search code references`, `Search editor help`

These are still regular `cmd-ux` semantic roots, not sidecar UIs.

### Learning Reports

`Cmdux` is now both a maintenance namespace and a learning/reporting namespace.

Useful subcommands:

- `Cmdux blocklist`
- `Cmdux capabilities`
- `Cmdux compare`
- `Cmdux explain`
- `Cmdux forest`
- `Cmdux stats`
- `Cmdux recent`
- `Cmdux roots`
- `Cmdux transitions`
- `Cmdux paths`
- `Cmdux inbox`
- `Cmdux noise`
- `Cmdux quarantine`
- `Cmdux suggest`
- `Cmdux export`
- `Cmdux reset-learning`

`Cmdux quarantine` is intentionally aimed at low-value generic roots, not first-party semantic namespaces like `Buffer`, `Search`, or `Flow`.

This makes the learning layer inspectable in three different modes:

- explanation: explain
- ranking diffs: compare
- observability: stats, recent, roots, transitions, paths
- structure: forest
- substrate: capabilities
- proposal inbox: inbox, suggest
- cleanup: noise, quarantine, blocklist
- design input: inbox, suggest, export

### Command kinds

Every supported command node is classified as one of:

- `leaf`: executable command state
- `namespace`: non-executable grouping node
- `hybrid`: executable root that also exposes children

Examples:

- `Config` is a `namespace`
- `Config reload` is a `leaf`
- `Lazy` is a `hybrid`
- `Lazy health` is a `leaf`

### Resolution state

The core resolves current input into a state with:

- current rendered command text
- current command kind
- whether it is executable now
- whether more input is required
- refusal reason when blocked
- current valid frontier of next choices
- typed slots and current slot values when the state expects open-ended arguments

### Transitions

A transition is one of:

- `advance`: accept text and move deeper into the command tree or arg stage
- `execute`: run the current command
- `refuse`: keep the user in place and explain why execution is blocked
- `handoff`: move the same semantic session from picker to Ex or Ex to picker

## Invariants

These are hard rules, not preferences.

- never execute a nonexistent command
- never execute a namespace
- never execute a known-incomplete command
- never hide a currently registered command unless it is denylisted
- `<Tab>` never executes
- `<Tab>` never cycles completion selection
- `<Space>` only acts semantically in named slots; otherwise it remains a literal space
- typed slot preview/validation must never lie about the currently focused target
- `<C-j>` and `<C-k>` are the selection keys
- lack of rich command semantics is not, by itself, a valid exclusion reason

## Why providers exist

Neovim exposes useful command metadata, but not enough semantic richness to infer everything generically.

What Neovim can give:

- exact command existence
- `nargs`
- command parsing
- completion types such as `file`, `help`, `lua`, `shellcmd`
- user-command completion callbacks
- live completion frontiers for partially entered command paths

What `cmd-ux` adds on top:

- typed slot validators and previewers
- capability-backed flow composition
- context-vector adaptive ranking
- promoted shortcut lanes
- actionable deterministic proposal reports

What Neovim does not give as a first-class concept:

- `namespace`
- `hybrid`
- required semantic subcommand paths
- execution safety for custom command families
- whether a custom completion frontier represents named subcommands or argument values

Because of that, `cmd-ux` uses a provider registry.

Built-in providers register themselves during `require("cmd_ux").setup()`.
External plugins can register additional providers at runtime with:

```lua
require("cmd_ux").register("File", require("cmd_ux_fs.provider"))
```

Providers enrich command families whose semantics are richer than what Neovim can prove generically.

`cmd-ux` also performs conservative recursive generic inference for some custom completion callbacks.
If the live completion frontier at a command position looks like a bounded set of short named tokens, `cmd-ux` treats those matches as a candidate subcommand frontier and recursively descends child frontiers until it reaches a terminal case.
Immediate children are marked as `namespace` only when that recursive descent still finds another trustworthy named frontier; otherwise they collapse to `leaf`.
If the frontier instead looks like files, buffers, tags, large enums, repeatable named values, or another value-oriented terminal case, `cmd-ux` keeps the command generic and argument-oriented.

They are not an admission gate. A command does not disappear merely because it lacks a dedicated provider.

## Provider model

A provider supplies the semantics for a command family.

Each provider is responsible for:

- root description
- node kind
- human description
- help text
- examples
- frontier generation
- executability rules
- refusal reasons

The v1 providers are:

- `Buffer`
- `Cmdux`
- `Config`
- `Flow`
- `Lazy`
- `Lsp`
- `Pane`
- `Recall`
- `Search`
- `Tab`
- generic Neovim commands

### Generic provider

The generic provider is the baseline representation for discovered commands that do not yet have a richer dedicated provider.

It is responsible for:

- surfacing the command in the index
- attaching the best available metadata from Neovim
- modeling argument/frontier behavior when Neovim exposes enough structure
- inferring named subcommand frontiers from custom completion callbacks when the frontier shape is conservative enough to trust
- classifying inferred roots as `namespace` or `hybrid` from `nargs` and descendant probes
- representing open or weakly modeled families honestly instead of hiding them

Unknown richness is not a reason to exclude the command. It is a reason to improve the model.

The current generic inference contract is:

- a frontier only enters named-subcommand inference when it looks like a small set of short named tokens
- once a frontier qualifies, `cmd-ux` recursively walks each child branch until it hits a terminal case
- a child stays `namespace` only if its recursive branch still exposes another trustworthy named frontier
- a child becomes `leaf` when recursion bottoms out in a terminal case
- `nargs = "?"` with inferred named subcommands may keep the root as a `hybrid`
- `nargs = "*"`, `"+"`, or required-arg forms with inferred named subcommands make the root a `namespace`
- terminal cases include empty or non-named frontiers, path-like matches, buffer-like matches, tag-like matches, broad enum/value frontiers, repeatable named-value frontiers, and repeated ancestor frontier shapes

## Surface behavior

### `;` native Ex cmdline

`cmd-ux` changes the meaning of `<CR>`, `<Tab>`, and contextual `<Space>` in the native Ex cmdline.

#### `<CR>`

- exact executable leaf: execute
- exact hybrid root: execute
- exact namespace: advance
- partial leaf or hybrid root: accept top match, then execute if safe
- partial namespace: accept top match, then advance
- incomplete command: advance, never execute
- denied command: refuse

#### `<Tab>`

`<Tab>` uses the same semantic resolution as `<CR>`, but never executes.

- exact executable leaf: no-op
- exact hybrid root: advance
- exact namespace: advance
- partial leaf: accept text only
- partial hybrid root: accept and advance
- partial namespace: accept and advance
- incomplete command: accept and advance

Repeated `<Tab>` must never become menu cycling.

#### `<Space>`

`<Space>` is a semantic separator, but only in structured named slots.

- partial named root like `config`: accept top match and advance to `Config `
- partial provider-owned descendant like `Lazy re`: accept top match and advance to `Lazy reload `
- partial structured generic descendant like `RenderMarkdown di`: accept top match and advance to the next named token
- exact `namespace`, `hybrid`, or known-incomplete command: advance with trailing space
- generic free-form argument positions: remain literal space
- open-ended denied families: remain literal space

This prevents invalid descended states like `config ` while preserving normal argument typing for commands such as `Open README.md`.

### `:` Snacks semantic picker

The picker is not a thin wrapper over `Snacks.picker.commands()`.

It is a semantic command composer.

Behavior:

- root frontier shows commands, not raw metadata blobs
- confirm on `namespace` or `hybrid` advances deeper
- confirm on safe `leaf` executes directly
- `;` hands off the current semantic session into the native Ex cmdline
- preview content is built for the selected item only; it is not eagerly precomputed for the whole frontier
- ranked ordering follows learned usage, not just alphabetical fallback

## Picker UI contract

### Left pane

The left pane is the current valid frontier.

Every item must already be informative:

- token/name
- short description
- implicit semantic meaning through item ordering and advancement rules

The right pane should not rescue an opaque left pane.

### Right pane

The right pane is a semantic preview, not a debug dump.

It shows:

- breadcrumb
- current kind
- executable now: yes/no
- learned usage hints
- refusal reason when blocked
- help text
- current subtree/frontier
- examples

The preview is intentionally focused on the current node and its next valid choices.

It should also be readable without fighting the UI:

- preview text wraps to the preview width
- preview uses the window title for the node label instead of rendering a markdown heading in the buffer
- line numbers are suppressed because this is semantic help, not source code
- the picker layout should use most of the floating window area instead of sitting in a narrow centered box

Full tree dumps are out of scope for the main UX.

## Worked examples

### `Lazy`

State progression:

- `La` + `<CR>` -> `Lazy` executes bare root
- `La` + `<Tab>` -> `Lazy ` advances into subcommands
- `Lazy re` + `<Space>` -> `Lazy reload `
- `Lazy reload` + `<CR>` -> blocked, because plugin argument is required
- `Lazy reload lazy.nvim` + `<CR>` -> executes

Semantic classification:

- `Lazy`: `hybrid`
- `Lazy reload`: `leaf`, but incomplete until plugin arg exists

### `Config`

State progression:

- `Con` + `<CR>` -> `Config ` advances, never executes bare root
- `config` + `<Space>` -> `Config `
- `Config reload` + `<CR>` -> executes
- `Config help` + `<CR>` -> executes

Semantic classification:

- `Config`: `namespace`
- `Config help`: `leaf`
- `Config reload`: `leaf`

### Learned ordering

After repeatedly using `Config reload`:

- `Config` frontier promotes `reload` above `help`
- root ordering can promote the command families you actually use
- preview reflects the current learned bias

This behavior is generic. It is not hardcoded to `Config`.

### Generic exact command

Example: `Open README.md`

- `Open` is a generic `leaf` with a required file argument
- execution is blocked until the current argument exactly matches a known completion candidate
- once the file candidate is exact, execution is allowed

### Denied open-ended command

Example: `lua print(1)`

- command family is open-ended
- semantic completeness cannot be proven safely from generic metadata
- execution is denied until a dedicated provider exists

## System outline

Plugin structure:

- `lua/cmd_ux/core.lua`: line resolution and transition policy
- `lua/cmd_ux/lib/learning_store.lua`: learning schema defaults, normalization, migration, and persisted load path
- `lua/cmd_ux/lib/learning_scoring.lua`: scoped score composition, mixed views, promotions, ranking, and learned top-* queries
- `lua/cmd_ux/lib/learning.lua`: persistent learning runtime, recording, and orchestration over the extracted learning modules
- `lua/cmd_ux/lib/learning_candidates.lua`: alias/quarantine/flow candidate synthesis
- `lua/cmd_ux/lib/learning_reports.lua`: learned report assembly and preview text
- `lua/cmd_ux/lib/runtime.lua`: shared execution helper for replay/context actions
- `lua/cmd_ux/providers/`: semantic providers
- `lua/cmd_ux/adapters/ex.lua`: native Ex behavior
- `lua/cmd_ux/adapters/snacks.lua`: semantic picker behavior
- `ARCHITECTURE.md`: runtime layers, invariants, and extension guidance

Config responsibilities:

- map `:` to the semantic picker
- map `;` to the native Ex cmdline
- wire `blink.cmp` `<CR>` and `<Tab>` into the Ex adapter

## Reimplementation guidance

A compatible reimplementation should preserve these behaviors:

- semantic kinds are provider-owned, not guessed
- one semantic session can move between multiple surfaces
- picker preview is semantic, not structural debug output
- execution is conservative by default
- safety policy outranks convenience when the command model is not provable
