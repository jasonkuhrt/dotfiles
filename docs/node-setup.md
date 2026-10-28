# Node Package Management

Vite+ manages the active Node.js and package-manager commands. Fish puts
`~/.vite-plus/bin` first, so `node`, `npm`, `npx`, `pnpm`, and `bun` resolve through
its shims. Each shim selects the runtime or package manager for the current
directory using the project's version declaration and the managed defaults.

## PATH and Tool Layout

`home/.config/fish/config.fish` establishes this order with one
`fish_add_path -gPm` block. The `-m` flag restores that order in nested shells.

| Priority | Location | Holds |
| --- | --- | --- |
| 1 | `~/.vite-plus/bin` | Vite+ and active Node/package-manager shims |
| 2 | `~/.local/bin` | Standalone installs such as Codex |
| 3 | `~/.npm-global/bin` | Global npm CLI tools |
| 4 | `~/Library/pnpm/bin` | Standalone pnpm and its Node runtime |
| 5 | `~/.bun/bin` | Standalone Bun and Bun global commands |
| Later | `/opt/homebrew/bin` | Homebrew tools and bootstrap Node/npm |

Global npm tools live in `~/.npm-global` independently of the active Node
version. A Vite+ shim and a binary in a later PATH directory can therefore have
different versions; check the resolved command when auditing an upgrade.

## Bootstrap

`just up` runs `04-node-toolchain.sh` and `05-npm-globals.sh`. They ensure
standalone pnpm, its current Node LTS runtime, and the packages declared in
`scripts/data/npm/global-packages.txt` are installed. The npm setup also updates
existing global packages.

The pnpm installer writes shell setup to a temporary file, because Fish's PATH
is already managed by this repository. Homebrew Node provides the first npm on
a fresh machine; pnpm's Node runtimes ship without npm.

The active Vite+ installation is managed independently of those bootstrap
tools. Its bundled documentation is available under
`~/.vite-plus/current/node_modules/vite-plus/docs/guide`.

## Updating Tools

Run the machine-level workflows through their existing root recipes:

| Tool | Recipe |
| --- | --- |
| Vite+ | `just --justfile ~/me/justfile tooling-vite-upgrade` |
| Managed Node LTS | `just --justfile ~/me/justfile tooling-node-lts` |
| Managed npm/npx | `just --justfile ~/me/justfile tooling-npm-upgrade` |
| Standalone pnpm | `just tooling-pnpm-upgrade` |
| Global npm tools | `just tooling-npm-globals-upgrade PACKAGE@VERSION ...` |

Use the project's package-manager workflow to update its dependencies and
lockfile. Projects in the `~/me` Bun workspace install from `~/me`, so workspace
packages share one physical copy of Effect.

## Project-Specific Versions

Vite+ reads project declarations before managed defaults. Use `vp env current`
to inspect the resolved selection. Its `env.md` documentation explains project
pins, global defaults, and temporary shell selections.
