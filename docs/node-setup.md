# Node Package Management

```
┌───────────────────────────────────────────────────────────────┐
│  BOOTSTRAP (first just up)                                    │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  pnpm installer ───▶ pnpm runtime ───▶ npm globals            │
│        │                  │                  │                │
│        ▼                  ▼                  ▼                │
│  pnpm (native,       node LTS           CLI tools             │
│  needs no node)      (global)           (~/.npm-global)       │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## PATH & Tool Layout

The order `config.fish` establishes in a login shell (its PATH block is a single
`fish_add_path -gP`, first argument first):

| Priority | Location             | Holds                                               |
| -------- | -------------------- | --------------------------------------------------- |
| 1st      | `~/.local/bin`       | standalone installs, which must win (e.g. `codex`)  |
| 2nd      | `~/.npm-global/bin`  | global CLI tools, and npm itself                    |
| 3rd      | `~/Library/pnpm/bin` | pnpm, and the `node` shim for pnpm's global runtime |
| 4th      | `/opt/homebrew/bin`  | Homebrew's node: fallback, and a fresh machine's first npm |

`~/Library/pnpm` itself is not on PATH. Older pnpm versions put binaries there directly; a leftover
`node` symlink at that level shadows the runtime shim and runs pnpm instead of node.

A nested shell inherits its parent's order: `fish_add_path` guarantees an entry is present, not that
it is repositioned, so it never reshuffles what the parent set.

## Bootstrap Flow

Handled by `just up` (scripts `04-node-toolchain` and `05-npm-globals`):

```
↓   curl -fsSL https://get.pnpm.io/install.sh | sh -    pnpm, into ~/Library/pnpm/bin
↓   pnpm runtime set node lts -g                         global node LTS
↓   npm install -g ...                                   globals, into ~/.npm-global
```

The script aims the installer's shell-rc edit at a throwaway file: `config.fish` already manages PATH
and is a symlink into this repo.

pnpm's node runtimes ship without npm (since pnpm 11). On a fresh machine the first `npm install -g`
therefore runs Homebrew node's npm; once `npm` itself is a global, `~/.npm-global/bin/npm` takes over.

## npx Fallback Chain

```
↓   local node_modules
↓   ~/.npm-global
↓   downloads (npx fetches)
```

This is why we use npm (not pnpm) for globals — npx checks npm's global dir.

## Key Insight

npm globals install to `~/.npm-global` independent of node version. `pnpm runtime set node 22 -g`
won't break your global tools.

## Updating Tools

| Tool | Command                        | Why                                           |
| ---- | ------------------------------ | --------------------------------------------- |
| pnpm | `pnpm self-update`             | pnpm's documented update path                 |
| node | `pnpm runtime set node lts -g` | moves the global node to the current LTS      |

## Project-Specific Versions

pnpm reads a project's `packageManager` and `devEngines.packageManager` fields itself: inside a project
that pins pnpm that way, `pnpm self-update` updates the pin rather than the global pnpm.

To run a different pnpm for one invocation, ignoring the pin, use `pnpm with <version> <command>`
(see `pnpm help with`).
