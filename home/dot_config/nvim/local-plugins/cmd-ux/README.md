# cmd-ux

`cmd-ux` is a local Neovim plugin that turns command entry into a semantic system instead of a raw string submission path.

It has one job: make command execution predictable across two surfaces:

- the native Ex cmdline
- the Snacks command picker

The plugin owns command semantics, safety policy, and transition rules. Your config only wires those semantics into keys and UI surfaces.

## Concepts

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
- `<Tab>` never executes
- `<Tab>` never cycles completion selection
- `<Space>` only acts semantically in named slots; otherwise it remains a literal space
- `<C-j>` and `<C-k>` are the selection keys
- open-ended command families are denied by default unless a provider exists

## Why providers exist

Neovim exposes useful command metadata, but not enough semantic richness to infer everything generically.

What Neovim can give:

- exact command existence
- `nargs`
- command parsing
- completion types such as `file`, `help`, `lua`, `shellcmd`
- user-command completion callbacks

What Neovim does not give as a first-class concept:

- `namespace`
- `hybrid`
- required semantic subcommand paths
- execution safety for custom command families

Because of that, `cmd-ux` uses a provider registry.

Providers are only needed for command families whose semantics are richer than what Neovim can prove.

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

- `Lazy`
- `Config`
- generic Neovim commands

### Generic provider

The generic provider is intentionally conservative.

It only allows execution when Neovim can prove enough:

- exact zero-arg or optional-arg command roots can execute
- enumerable completion families can execute only after exact candidate match
- open-ended families like `lua`, `execute`, and `terminal` are denied

Unknown richness is not guessed.

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
- refusal reason when blocked
- help text
- current subtree/frontier
- examples

The preview is intentionally focused on the current node and its next valid choices.

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
- `lua/cmd_ux/providers/`: semantic providers
- `lua/cmd_ux/adapters/ex.lua`: native Ex behavior
- `lua/cmd_ux/adapters/snacks.lua`: semantic picker behavior

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
