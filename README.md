# dotfiles

Personal macOS system configuration deployed by [dotctl](https://github.com/jasonkuhrt/dotctl). Everything lives in a single `home/` source tree. The directory layout is the configuration — no manifest to maintain, no filename prefixes to learn.

> **`jasonkuhrt/dotctl` is a private repository.** The deploy engine is fetched from it over SSH (step 5 below). Without access to that repo this setup is not reproducible by anyone else; the rest of this README still describes how the tree is organised and why.

## New Machine Setup

Steps 1–5 are prerequisites. Nothing in this repo installs them — `just up` is the thing that needs them, so it cannot be the thing that provides them.

**1. Xcode command-line tools.** Provides `git`, so the clone in step 6 is possible at all.

```sh
xcode-select --install
```

**2. Homebrew.** Same installer `scripts/setup/before/once/02-homebrew.sh` uses.

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**3. `just` and `age`.** `just` runs every recipe below. `age` decrypts `.age` files during the deploy phase, and the deploy happens before the shell that started it ever sees a new `PATH`.

```sh
brew install just age
```

Both are also in `scripts/data/Brewfile`, so step 8 reinstalls them idempotently. Installing them by hand here only breaks the cycle.

**4. Bun.** dotctl's entrypoint is `#!/usr/bin/env bun`. Bun is not in the Brewfile and no setup script installs it.

```sh
curl -fsSL https://bun.com/install | bash
export PATH="$HOME/.bun/bin:$PATH"
```

**5. dotctl.** Installed globally from its private repo over SSH, which requires a GitHub SSH key already trusted by that account.

```sh
bun add -g git+ssh://git@github.com/jasonkuhrt/dotctl.git
```

**6. Clone.**

```sh
git clone git@github.com:jasonkuhrt/dotfiles.git ~/projects/jasonkuhrt/dotfiles
cd ~/projects/jasonkuhrt/dotfiles
```

**7. Age identity.** Needed before the first deploy — `home/.aws/credentials.age` is decrypted with it. Paste the private key from the password manager:

```sh
mkdir -p ~/.config/dotctl
pbpaste > ~/.config/dotctl/age-key.txt
chmod 600 ~/.config/dotctl/age-key.txt
```

**8. Converge.** Runs the `before/` scripts, deploys every symlink, writes the manifest, then runs the `after/` scripts.

```sh
just up
```

**9. Privileged settings.** Touch ID for `sudo`, display sleep, and fish as the login shell. `scripts/setup/after/once/99-sudo-hint.sh` prints this reminder at the end of step 8 when any of it is still unapplied.

```sh
just sudo-setup
```

**10. Open a new terminal.** Step 9 changes the login shell to fish, and `home/.config/fish/config.fish` is what puts `~/.bun/bin`, `~/.npm-global/bin` and the rest on `PATH` permanently.

Then `just doctor` reports whatever is still drifting.

### Repo-local extras

Neither is part of deploying the machine.

- `bun install` at the repo root installs the single dependency (`yaml`) that the scripts under `home/.claude/skills-library/check/` import. Skip it and the deploy is unaffected.
- `just hooks-install` points `core.hooksPath` at the runner for `.git-hooks/`. It shells out to `git-hooks`, which lives in a separate repo that is local-only and published nowhere — on a machine without that repo, the hooks cannot be installed.

## Daily Use

```sh
just up                             # full deploy (scripts + symlinks + manifest)
just edit ~/.config/ghostty/config  # open the source file for any managed target
just status                         # deployment health
just doctor                         # invariant checks
just explain ~/.config/dprint       # how a target is managed
```

`just up` is convergent and idempotent. Run it whenever you pull, edit config, or feel uncertain.

For finer control, call dotctl directly:

| Command | What it does |
|---|---|
| `dotctl deploy [--dry-run] [--verbose]` | Symlinks only, no scripts. |
| `dotctl scripts [--dry-run]` | Setup scripts only, no symlinks. |
| `dotctl prune [--dry-run]` | Remove symlinks into the repo that the plan no longer contains. |
| `dotctl manifest [--write]` | Show or rewrite the cached manifest that `status` and `explain` read. |
| `dotctl doctor [--show-pass] [--render focus\|sectioned\|compact\|table\|tree]` | Invariant checks, with alternate renderings. |

## How It Works

dotctl walks `home/` and creates symlinks into `$HOME`. Three conventions determine what happens to each entry.

**Directory symlinks.** A directory without a `.spread` marker is symlinked whole. `home/.bookmarks/` becomes `~/.bookmarks -> repo/home/.bookmarks`. Edits inside the target write directly into the repo.

**Spread directories.** A `.spread` file inside a directory tells dotctl to create the directory as a real folder in `$HOME` and symlink each child individually. This is how `home/.config/` works — dotctl owns `starship.toml` and `fish/` without claiming all of `~/.config/`. Spread is recursive: a spread directory can contain both spread subdirectories (with their own `.spread`) and whole-directory symlinks (without one).

Use `.spread` when an application writes runtime state alongside your config (logs, caches, sockets). Without it, those writes go into the repo.

**Files.** Regular files at the `home/` root or inside spread directories become individual symlinks.

### Special conventions

**Encrypted files (`.age`).** `home/.aws/credentials.age` is decrypted with [age](https://github.com/FiloSottile/age) at deploy time and written as `~/.aws/credentials` with mode `0600`. The age identity lives at `~/.config/dotctl/age-key.txt`. Keep it in your password manager — it is the only secret you need to transfer between machines.

**Modify scripts (`.modify` sidecars).** A file `F` with a companion `F.modify` script uses merge deployment. The sidecar receives the source path via `$DOTCTL_SOURCE` and writes merged output to stdout. This lets you combine managed configuration with machine-local values. Two files use it: `home/.claude/settings.json.modify` and `home/.agentsview/config.json.modify`.

**Nothing is skipped.** Every entry under `home/` deploys. Data that setup scripts read — the Brewfile, the Dock layout, the npm global list — lives in `scripts/data/`, outside the source tree, so no exclusion is needed. `homeRootSkip` in `dotctl.config.json` can exclude source-tree root entries; this repo sets none.

## Source Tree

```
home/
  .agentsview/           # spread (config.json.modify; app writes DB/uploads/keys)
    .spread
  .aws/                  # spread (contains credentials.age)
    .spread
  .bookmarks/            # dir-symlink (bookmarks sync config)
  .claude/               # spread (skills, rules, hooks — runtime writes here too)
    .spread
  .codex/                # spread
    .spread
  .config/               # spread (owns specific app configs, not all of ~/.config)
    .spread
    fish/                # spread (config + fish_variables; fish writes completions/)
      .spread
    gh/                  # spread
      .spread
    hunk/                # spread
      .spread
    lnav/                # spread, recursive (formats/, formats/installed/)
      .spread
    ghostty/             # dir-symlink (pure config)
    nvim/                # dir-symlink
    karabiner/           # dir-symlink
    zed/                 # dir-symlink
    starship.toml        # file symlink
    duti.yml             # file symlink (read by 08-macos-defaults.sh)
    ...
  .local/                # spread (bin/, libexec/ — each spread in turn)
    .spread
  .ssh/                  # spread (config + known_hosts; SSH writes sockets/)
    .spread
  Library/               # spread
    .spread
    Application Support/ # spread, recursive down to Code/User/
      .spread
  .gitconfig             # file symlink
  .gitignore             # file symlink
  .hushlogin             # file symlink
  .markdownlint-cli2.yaml # file symlink
  .npmrc                 # file symlink
```

## Setup Scripts

Scripts in `scripts/setup/` run during `just up` in two phases: `before/` (prerequisites) and `after/` (configuration that depends on deployed files). Each phase has `once/` (first run only) and `onchange/` (re-runs when watched files change) subdirectories.

`before/` — installs the foundation the deploy itself relies on:

| Script | Runs | Purpose |
|---|---|---|
| `once/01-xcode-cli.sh` | once | Xcode command-line tools |
| `once/02-homebrew.sh` | once | Homebrew |
| `onchange/03-brew-bundle.sh` | on change | `brew bundle` from `scripts/data/Brewfile` |

`after/` — configures the system once the symlinks exist:

| Script | Runs | Purpose |
|---|---|---|
| `onchange/04-node-toolchain.sh` | on change | pnpm via its standalone installer, then global Node LTS |
| `onchange/05-npm-globals.sh` | on change | npm globals from `scripts/data/npm/global-packages.txt` |
| `once/06-fisher.sh` | once | Fisher plugin manager for fish |
| `onchange/07-fisher-plugins.sh` | on change | fish plugins from `home/.config/fish/fish_plugins` |
| `onchange/08-macos-defaults.sh` | on change | keyboard, trackpad, Finder, screenshots, and default apps from `home/.config/duti.yml` |
| `onchange/09-dock-apps.sh` | on change | Dock layout from `scripts/data/dock/apps.txt` |
| `onchange/10-bat-cache.sh` | on change | rebuild bat's theme cache |
| `onchange/11-dprint-update.sh` | on change | dprint formatter plugins |
| `once/13-git-ssh.sh` | once | SSH sockets dir, GitHub `known_hosts`, `gh` protocol, origin remote |
| `once/14-neovim-plugins.sh` | once | Neovim plugin install via lazy.nvim |
| `once/15-vscode-extensions.sh` | once | VS Code extensions from `scripts/data/vscode-extensions.txt` |
| `onchange/15-git-maintenance.sh` | on change | git maintenance scheduler |
| `once/16-yo-install.sh` | once | `yo` notification tool |
| `once/17-imsg-install.sh` | once | `imsg` Messages CLI |
| `onchange/18-wispr-flow-shortcut.sh` | on change | Wispr Flow hotkeys |
| `onchange/19-agentsview.sh` | on change | pinned `agentsview` CLI into `~/.local/share/agentsview` |
| `onchange/20-1password-cli.sh` | on change | 1Password CLI |
| `onchange/21-gh-extensions.sh` | on change | `gh` extensions from `scripts/data/gh-extensions.txt` |
| `onchange/22-codexbar.sh` | on change | CodexBar machine-local settings |
| `once/99-sudo-hint.sh` | once | prints the `just sudo-setup` reminder when anything privileged is unapplied |

## Configuration

`dotctl.config.json` in the repo root. Every field except `age.recipient` has a default, and this repo overrides none of them:

```json
{
  "age": {
    "recipient": "age1..."
  }
}
```

| Field | Default | Description |
|---|---|---|
| `sourceDir` | `"home"` | Source tree directory, relative to the repo root. |
| `scriptsDir` | `"scripts/setup"` | Setup scripts directory, relative to the repo root. |
| `stateDir` | `"~/.local/state/dotctl"` | Manifest, health, captures, logs, backups. |
| `homeRootSkip` | `[]` | Source-tree root entries to skip during deployment. |
| `age.identity` | `"~/.config/dotctl/age-key.txt"` | Path to the age private key. |
| `age.recipient` | *(required for `.age` files)* | Age public key used for encryption. |

dotctl finds the repo root by walking up from the current directory for `dotctl.config.json`, falling back to `$DOTFILES_REPO_ROOT`. The `justfile` sets that variable so recipes work from any directory.

State lives under `~/.local/state/dotctl/`: `manifest.json` (deployed symlinks), `health.json` (last check), `captures.json` (files backed up before being replaced), `script-state.json` (once/onchange bookkeeping), `backups/`, and `logs/`.

## Further Reading

- [CodexBar](docs/codexbar.md) — local quota-tracker setup alongside iCloud settings sync
- [Karabiner](docs/karabiner.md) — mental model, failure layers, and recovery workflows
- [Symlink platform](docs/symlink-platform.md) — lane model, capture policy, runtime state
- [CLI tools](docs/cli-tools.md) — installed tools and shell abbreviations
- [Node setup](docs/node-setup.md) — pnpm/node/npm-global layout and PATH order
- [Worktrunk](docs/worktrunk.md) — git worktree manager for parallel AI agents
- [Neovim](docs/neovim.md) — LazyExtras, AI stack, plugin decisions
- [Lua tooling](docs/lua-tooling.md) — selene, stylua, LuaLS, and the `just lua-*` gates
- [Known limitations](docs/known-limitations.md) — workarounds and manual intervention
- [Decisions](DECISIONS.md) — architecture decision records
