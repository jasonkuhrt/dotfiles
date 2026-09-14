# Node Package Management

```
┌───────────────────────────────────────────────────────────────┐
│  BOOTSTRAP (first just up)                                    │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Homebrew ───▶ pnpm ───▶ node LTS ───▶ npm globals            │
│     │            │          │               │                 │
│     ▼            ▼          ▼               ▼                 │
│  node + pnpm   version    runtime       CLI tools             │
│  (bootstrap)   manager                                        │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## PATH & Tool Layout

The order `config.fish` establishes in a login shell (its PATH block is a single
`fish_add_path -gP`, first argument first):

| Priority | Location           | Holds                                       |
| -------- | ------------------ | ------------------------------------------- |
| 1st      | `~/.local/bin`     | own wrappers, which must win (e.g. `codex`) |
| 2nd      | `~/.npm-global/bin`| global CLI tools                            |
| 3rd      | `~/Library/pnpm`   | the node pnpm manages                       |
| 4th      | `/opt/homebrew/bin`| pnpm itself, and brew's bootstrap node       |

A nested shell inherits its parent's order: `fish_add_path` guarantees an entry is
present, not that it is repositioned, so it never reshuffles what the parent set.

## Bootstrap Flow

Handled by `just up` (which runs scripts 04-node-toolchain + 05-npm-globals):

```
↓   brew install node pnpm       initial node + pnpm
↓   pnpm env use --global lts    pnpm installs LTS node, shadows brew's
↓   npm install -g ...           globals installed to ~/.npm-global
```

After the first `just up`, brew's node is unused (pnpm's comes first in PATH).

## npx Fallback Chain

```
↓   local node_modules
↓   ~/.npm-global
↓   downloads (npx fetches)
```

This is why we use npm (not pnpm) for globals — npx checks npm's global dir.

## Key Insight

npm globals install to `~/.npm-global` independent of node version. `pnpm env use 22` won't break
your global tools.

## Updating Tools

| Tool | Command                     | Why                                              |
| ---- | --------------------------- | ------------------------------------------------ |
| pnpm | `brew upgrade pnpm`         | pnpm is installed via Homebrew, not self-managed |
| node | `pnpm env use --global lts` | pnpm manages node versions                       |

Don't use `pnpm self-update` — it conflicts with Homebrew's version tracking.

## Project-Specific Versions

Corepack is no longer installed — see DECISION 6 for why. pnpm comes from Homebrew and is the only
package manager on PATH.

When a project needs a pnpm other than the installed one, `pnpm with` runs a single invocation at a
given version without changing anything globally; see `pnpm help with`.

Whether pnpm honours a project's `"packageManager"` field on its own is unverified here:
`manage-package-manager-versions` is unset on this machine and `pnpm config get` reports
`undefined`.
