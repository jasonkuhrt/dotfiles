# Local Lua Plugin Development Guide

This guide defines the development policy for local Lua plugins under [`home/.config/nvim/local-plugins`](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/local-plugins).

It exists to keep plugin architecture consistent across:

- local Neovim plugins
- shared Lua utilities
- tests

## Stack

Local plugin development follows this stack:

1. Neovim runtime and Lua builtins
2. community libraries
3. local stdlib
4. application code

The approved community libraries are:

- `plenary.nvim`
- `penlight`

The intended layering is:

- `plenary.nvim` for Neovim-oriented runtime and test support
- `penlight` for generic Lua utility coverage
- local `stdlib` for repo-blessed reusable utilities and stable conventions
- plugin/application code for product behavior

## Policy

### 1. Use community before bespoke

Before adding new utility code, check whether the need is already solved cleanly by:

- Lua builtins
- Neovim runtime APIs
- `plenary.nvim`
- `penlight`

Do not write custom infrastructure if one of those already solves the problem cleanly.

### 2. Own the stable boundary locally

Even when community libraries are used, the repo should still own its stable internal boundary.

That boundary is the local `stdlib`.

The purpose of `stdlib` is:

- define repo-level conventions
- provide stable reusable helpers across plugins
- keep repeated infrastructure out of plugin/application code

### 3. Application code may depend on `plenary` and `penlight` directly

Direct dependency is allowed.

`stdlib` is not a mandatory facade over every external dependency.

Use direct imports when:

- the library API is already the correct abstraction
- wrapping it would add no clarity
- the code remains easy to understand

Use `stdlib` instead when:

- the same pattern appears across multiple plugins
- the repo needs one blessed convention
- the external API is too noisy or too low-level for repeated direct use

## What goes where

## 1. `plenary.nvim`

Use `plenary.nvim` for:

- test harnesses
- async/job helpers
- path/scandir helpers when they are clearly better than raw APIs
- Neovim-specific utility support

Do not use `plenary` to hide simple built-in Lua or Neovim APIs behind extra wrappers without a real gain.

## 2. `penlight`

Use `penlight` for:

- generic collection helpers
- string helpers
- path and file helpers
- table/list shaping

Do not treat `penlight` as an invitation to import broad subsystems indiscriminately. Use the smallest useful surface.

## 3. `stdlib`

The local stdlib should contain only reusable infrastructure.

Good stdlib content:

- collections
- strings
- fs and cache helpers
- validation helpers
- generic test helpers
- Neovim wrappers under a host-specific namespace

Bad stdlib content:

- picker behavior
- command semantics
- provider logic
- plugin-specific domain concepts
- anything with only one real consumer

## 4. application code

Application code is the plugin itself.

It owns:

- domain semantics
- UX behavior
- product rules
- provider-specific logic
- plugin-specific state machines

Application code should not become a dumping ground for utility code that is clearly cross-plugin infrastructure.

## Stdlib structure

The top-level namespace should be `stdlib`, not `nvim_lib`.

Reason:

- the stdlib is conceptually broader than Neovim
- generic utilities should not carry host-specific naming
- host-specific code should be explicit and contained

Preferred shape:

- `stdlib.collections`
- `stdlib.strings`
- `stdlib.fs`
- `stdlib.cache`
- `stdlib.validate`
- `stdlib.test`
- `stdlib.nvim.commands`
- `stdlib.nvim.async`
- `stdlib.nvim.ui`

Rule:

- host-agnostic utilities go in `stdlib.*`
- Neovim-specific bindings go in `stdlib.nvim.*`

## Promotion rule

Promote code into `stdlib` when all of these are true:

1. it is not product/domain logic
2. it is reusable across multiple plugins or clearly should be
3. it defines or reinforces a repo convention
4. it becomes easier to test or reason about once extracted

Keep code in the plugin when any of these are true:

1. it is specific to one plugin's semantics
2. it names domain concepts from that plugin
3. extracting it would only rename code without reducing coupling

## Testing rule

Use `plenary.nvim` as the default test harness for local Lua plugins.

Test layering should be:

1. deterministic logic tests
2. adapter/integration tests
3. live smoke tests when UI/runtime behavior matters

If a smoke test needs a child Neovim process, integrate it into the main suite. Do not create a second ad hoc runner unless there is no viable in-suite path.

## Dependency rule of thumb

When adding new Lua code, ask these questions in order:

1. can raw Lua or Neovim do this simply already?
2. does `plenary.nvim` solve the Neovim-shaped problem cleanly?
3. does `penlight` solve the generic Lua problem cleanly?
4. should this become a repo-blessed `stdlib` utility?
5. if none of the above, write plugin-local code

## Current decision

The formal policy for this repo is:

- use `plenary.nvim`
- use `penlight`
- use local `stdlib`
- keep the remainder as application code

Direct application dependency on `plenary.nvim` and `penlight` is explicitly allowed.
