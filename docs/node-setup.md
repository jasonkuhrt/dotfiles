# Node Package Management

```
┌───────────────────────────────────────────────────────────────┐
│  BOOTSTRAP (./sync)                                           │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Homebrew ───▶ pnpm ───▶ npm ───▶ corepack                    │
│     │           │         │          │                        │
│     ▼           ▼         ▼          ▼                        │
│  pnpm +      LTS node   global    per-project                 │
│  bootstrap   (runtime)  CLI tools pnpm/yarn                   │
│  node                                                         │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│  RUNTIME PATH                                                 │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  1st  npm globals ────▶ CLI tools (including corepack)        │
│            │                                                  │
│            ▼                                                  │
│  2nd  pnpm ───────────▶ node + npm (shadows brew)             │
│            │                                                  │
│            ▼                                                  │
│  3rd  Homebrew ───────▶ pnpm (bootstrap only)                 │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│  PROJECT-LEVEL                                                │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  pnpm/yarn ───▶ corepack ───▶ uses version from               │
│                               packageManager field            │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## PATH & Tool Layout

```
Priority   Tool       Manages               Location
────────────────────────────────────────────────────────────────────
1st        npm        global CLI tools      ~/.npm-global/bin
2nd        pnpm       node versions         ~/Library/pnpm
3rd        Homebrew   initial bootstrap     /opt/homebrew/bin
```

## Bootstrap Flow

Handled by `./sync`:

```
↓   brew install node pnpm       initial node + pnpm
↓   pnpm env use --global lts    pnpm installs LTS node, shadows brew's
↓   npm install -g ...           globals installed to ~/.npm-global
```

After sync, brew's node is unused (pnpm's comes first in PATH).

## npx Fallback Chain

```
↓   local node_modules
↓   ~/.npm-global
↓   downloads (npx fetches)
```

This is why we use npm (not pnpm) for globals — npx checks npm's global dir.

## Key Insight

npm globals install to `~/.npm-global` independent of node version. `pnpm env use 22` won't break your global tools.

## Updating Tools

| Tool | Command                     | Why                                              |
| ---- | --------------------------- | ------------------------------------------------ |
| pnpm | `brew upgrade pnpm`         | pnpm is installed via Homebrew, not self-managed |
| node | `pnpm env use --global lts` | pnpm manages node versions                       |

Don't use `pnpm self-update` — it conflicts with Homebrew's version tracking.

## Project-Specific Versions

* Projects may specify `"packageManager": "pnpm@9.x.x"` in package.json
* Corepack handles this automatically (installed and enabled by sync)
* Corepack manages pnpm and yarn; npm is bundled with node separately

## Pitfall: Don't `brew install corepack`

Brew's corepack conflicts with brew's pnpm (both install `pnpm` and `pnpx` binaries). Use npm global install instead (handled by sync).
