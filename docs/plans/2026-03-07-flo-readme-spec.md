# Flo

Work items -> checkouts -> launchers -> agent context

This document is the working README and product spec for the new `flo`.
It is written as near-final end-user documentation on purpose.
Only the final section, "Temporary Implementation Notes", is intentionally non-final.

## What Flo Is

Flo is a work orchestration tool for source-controlled projects.

It resolves a piece of work from a backend such as GitHub or Linear, creates or reuses the right checkout for that work, prepares context for humans and agents, and opens that checkout in the right launcher surface.

The primary runtime surface is `cmux`.
The CLI is canonical.
Raycast is an experimental frontend over the same core.

## Why Flo Exists

Starting real work usually means doing the same setup every time:

- figure out which project the work belongs to
- resolve the work item from some backend
- create or find the right branch or worktree
- move into the correct checkout
- open the right workspace
- make the work context visible to Claude or other agents

Flo turns that from a pile of shell habits into one coherent system.

## Core Ideas

- Work items are modular. GitHub issues are one backend, not the product.
- Checkouts are first-class. A repo and a checkout are not the same thing.
- Worktrees are normal. Flo expects multiple active checkouts per repo.
- Launchers are adapters. `cmux`, Raycast, and editor surfaces sit on top of the same core.
- Agent context is generated. Flo produces context from the work item and checkout instead of relying on manual repetition.

## Quick Examples

```bash
# Open the interactive launcher
flo

# Start work from the default backend
flo start 123

# Start work from an explicit backend
flo start gh:123
flo start linear:ENG-241

# Open an existing project or checkout
flo open dotfiles
flo open heartbeat@feat-auth

# List active checkouts and runtime state
flo list

# End a piece of work
flo end gh:123
```

## What Flo Does

When you ask Flo to start or open work, it:

1. Resolves the selector into a canonical work item or checkout target.
2. Resolves the owning project.
3. Creates or reuses the correct checkout.
4. Synchronizes work context for humans and agents.
5. Opens or focuses the checkout in the selected launcher surface.

That sequence is the product.
Specific backends and launchers plug into it.

## Concepts

### Work Item

A work item is a backend-owned unit of work.

Examples:

- GitHub issue
- Linear issue

Flo treats all of these as the same category of thing:
something that can produce a title, canonical ID, branch hint, project association, and context payload.

### Project

A project is the long-lived source repository or working directory family.

Examples:

- `dotfiles`
- `heartbeat`
- `graphql-kit`

Projects own checkouts.
Projects can declare defaults such as backend routing, bootstrap commands, and launcher preferences.

### Checkout

A checkout is a concrete filesystem root that work actually runs in.

Examples:

- main checkout
- feature branch worktree
- spike worktree

Flo opens checkouts, not abstract repos.
Every launcher integration keys off checkout identity.

### Runtime Session

A runtime session is the long-lived execution context for a checkout.

For terminal-oriented launchers, this is the shell session and its child processes.
Flo assumes a checkout can own a persistent runtime session that survives launcher restarts.

Runtime sessions are not the source of truth for work identity.
They are the execution substrate bound to a checkout.

### Launcher

A launcher is a surface that opens or focuses work.

Examples:

- CLI interactive picker
- `cmux`
- Raycast
- editor command palette

Launchers do not own discovery or workflow rules.
They call Flo core.

### Context Bundle

A context bundle is the generated work context Flo attaches to a checkout.

It may include:

- work item metadata
- links back to the source backend
- a normalized summary of the task
- local project guidance
- agent-oriented context files

The exact file layout is implementation detail.
The product guarantee is that context is reproducible and backend-driven.

## Work Item Backends

Flo supports multiple backends through one interface.

Initial backend set:

- GitHub issues
- Linear issues

Backend responsibilities:

- resolve user selectors
- fetch work item metadata
- derive a branch or checkout hint
- produce normalized context
- optionally perform backend-specific actions such as assignment or completion

Flo core is intentionally backend-agnostic.
No backend-specific assumptions should leak into checkout or launcher orchestration.

## Checkouts and Worktrees

Worktrees are first-class in Flo.

The core model is:

- a project owns many checkouts
- a work item usually maps to one checkout
- a launcher opens a checkout

This means:

- multiple active worktrees in one repo are expected
- checkout identity is path-based, not branch-name-only
- workspace identity in `cmux` is tied to the checkout, not just the repo

If a matching checkout already exists, Flo reuses it.
If not, Flo can create the right checkout for the requested work.

## Launchers

### CLI

The CLI is the canonical interface.

Commands are designed so every higher-level surface can delegate to them rather than reimplementing logic.

### cmux

`cmux` is the primary runtime surface.

Flo can:

- create or focus the canonical workspace for a checkout
- keep one runtime session per active checkout
- restore the canonical workspace after a launcher restart without interrupting the underlying runtime session
- make checkout-oriented work navigation fast

`cmux` is not the source of truth for discovery or work state.
It is a launcher target.
The persistence mechanism beneath `cmux`, including a tool such as `zmx`, is a launcher implementation detail rather than a Flo core concept.

### Raycast

Raycast is an experimental frontend.

Its job is to provide a global macOS picker and action surface for Flo.
It should sit on top of the same Flo core and command model, not introduce its own workflow rules.

### Claude Skill

Flo should integrate with a Claude skill, but the skill is not a second workflow engine.

The intended relationship is:

- Flo owns work resolution, checkout orchestration, and context generation.
- The Claude skill consumes Flo state and context.
- Backend logic lives in Flo, not inside the skill.
- Skill actions such as `/dispatch` are defined in terms of Flo launcher state rather than inventing their own workspace model.

## Runtime Sessions and Views

Flo separates three identities:

- work identity
  The work item and the checkout it resolves to.
- runtime identity
  The persistent execution session attached to that checkout.
- view identity
  The launcher-specific presentation of that runtime session.

For `cmux`, the view vocabulary is:

- `home_view`
  The canonical `cmux` workspace for a checkout's runtime session.
  This is normative in v1.
  `flo open` focuses it, launcher restore rebuilds it, and `/dispatch` expands from it.
- `attached_views`
  The full set of `cmux` views attached to the same runtime session.
  This is defined now for future expansion but is not part of the v1 contract.
- `invoking_view`
  The exact `cmux` view from which a command was submitted.
  This is defined now for future expansion but is not part of the v1 contract.
- `last_focused_view`
  A launcher heuristic for the most recently focused view.
  This is defined now for future expansion but is not part of the v1 contract.

The first implementation only requires `home_view`.
That means the initial Flo workflow assumes one authoritative `cmux` workspace per persistent runtime session.
Manual multi-view attachment is outside the product contract until `attached_views` and `invoking_view` become implemented concepts rather than reserved terms.

This keeps the restart guarantee simple:
restarting `cmux` must not imply restarting the work.
The launcher rebinds the checkout's `home_view` to the already-running runtime session and the agent process continues as if the launcher restart never happened.

## Command Model

The initial public command model is:

- `flo`
  Opens the interactive launcher.
- `flo start <selector>`
  Resolve work, create or reuse a checkout, prepare context, and open it.
- `flo open [selector]`
  Open or focus an existing project or checkout.
- `flo list`
  List active checkouts and launcher state.
- `flo end [selector]`
  Resolve or conclude a piece of work and clean up the checkout when appropriate.
- `flo prune`
  Clean up stale local state.

### Selector Model

Flo accepts both explicit and implicit selectors.

Examples:

- `gh:123`
- `gh:owner/repo#123`
- `linear:ENG-241`
- `branch:feat/spike-cmux-launcher`
- `dotfiles`
- `heartbeat@feat-auth`

Bare selectors can be resolved through project defaults when unambiguous.

## Project Discovery

Flo discovers projects from configured roots.

Discovery should support:

- fuzzy resolution by project name
- explicit paths
- per-project defaults
- backend routing

Examples of useful defaults:

- default backend for bare selectors
- bootstrap command for new checkouts
- preferred launcher
- project-specific context files

## End-to-End Flows

### Start From a Work Item

Example:

```bash
flo start linear:ENG-241
```

Expected behavior:

1. Resolve `ENG-241` through the Linear backend.
2. Resolve the owning project.
3. Create or reuse the correct checkout.
4. Generate normalized work context.
5. Open or focus the checkout in `cmux`.

### Open Existing Work

Example:

```bash
flo open dotfiles
flo open heartbeat@feat-auth
```

Expected behavior:

- resolve a project or checkout target
- present an interactive picker if needed
- focus the existing `home_view` when one exists
- otherwise open the target checkout in `cmux` and establish its `home_view`

### End Work

Example:

```bash
flo end gh:123
```

Expected behavior:

- resolve the active work item and checkout
- perform backend-specific completion or closure when requested
- clean up or keep the checkout based on explicit policy
- update local Flo state

The exact cleanup policy is backend-aware, but Flo should remain explicit and safe.

## Configuration

Flo has two configuration scopes:

- global configuration
  Defines project roots, launcher defaults, and backend credentials or endpoints.
- project configuration
  Defines project-level defaults such as backend routing, bootstrap commands, and context imports.

The config format is intentionally not finalized in this spec.
What is fixed is the configuration model.

## Non-Goals

- Shell-specific implementation as part of the product contract
- GitHub-specific behavior baked into Flo core
- `cmux` becoming the source of truth for work state
- A second workflow engine inside the Claude skill
- Forcing Raycast as the primary interface

## Expansion Axes

The initial contract is intentionally small, but the model is designed to expand without being redefined.

Planned expansion axes include:

- More work backends
  Additional backend adapters should plug into the same work-item interface without changing checkout or launcher semantics.
- Richer launcher view semantics
  `attached_views`, `invoking_view`, and `last_focused_view` are already defined so Flo can later support explicit multi-view behavior without changing the vocabulary.
- More frontends over the same core
  Raycast, Claude skills, and future UI surfaces should remain adapters over the CLI and shared Flo state.
- Richer end-of-work policy
  Completion, archival, cleanup, and backend-specific closeout should expand from the same checkout-centric model rather than becoming separate workflows.

## Temporary Implementation Notes

This section is temporary and exists only to align on the initial build plan.

### Clean-Slate Direction

- archive the existing `jasonkuhrt/flo` repo as `flo-legacy`
- create a new `flo` project from the template repo
- port concepts and test intent from legacy Flo, not the Fish implementation

### Legacy Concepts Worth Preserving

- project-root discovery and fuzzy project resolution
- issue-or-branch style selection, generalized into backend selectors
- worktree-first workflow
- active checkout listing and pruning
- generated Claude context for a checkout

### Initial Delivery Slice

The first meaningful slice should prove the new architecture, not just recreate the old CLI.

Initial slice:

- typed Flo core
- GitHub backend
- checkout and worktree orchestration
- `cmux` launcher integration
- canonical CLI commands: `flo`, `flo start`, `flo open`, `flo list`

### Follow-On Slices

- Claude skill integration on top of Flo state and context
- experimental Raycast extension as a frontend over Flo core
- Linear backend
- richer launcher state including `attached_views` and `invoking_view`
- end-of-work lifecycle and cleanup policy
