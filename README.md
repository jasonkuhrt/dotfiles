# dotfiles

Personal macOS system configuration deployed by [dotctl](https://github.com/jasonkuhrt/dotctl). Everything lives in a single `home/` source tree. The directory layout is the configuration — no manifest to maintain, no filename prefixes to learn.

> **`jasonkuhrt/dotctl` is a private repository.** The deploy engine is fetched from it over SSH (step 5 below). Without access to that repo this setup is not reproducible by anyone else; the rest of this README still describes how the tree is organised and why.

## New Machine Setup

Steps 1–5 are prerequisites. Nothing in this repo installs them — `just up` is the thing that needs them, so it cannot be the thing that provides them.

**1. Xcode command-line tools.** Provides `git`, so the clone in step 6 is possible at all.

```sh
xcode-select --install
```

**2. Homebrew.** Same installer `scripts/setup/before/02-homebrew.sh` uses.

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**3. `just`.** `just` runs every recipe below.

```sh
brew install just
```

It is also in `scripts/data/Brewfile`, so step 7 reinstalls it idempotently. Installing it by hand here only breaks the cycle.

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

**7. Converge.** Runs the `before/` scripts, deploys every symlink and merge patch, records the deployed symlinks in its ledger, then runs the `after/` scripts once the deploy has completed.

```sh
just up
```

**8. Privileged settings.** Touch ID for `sudo`, display sleep, and fish as the login shell. `scripts/setup/after/99-sudo-hint.sh` prints this reminder at the end of step 7 when any of it is still unapplied.

```sh
just sudo-setup
```

**9. Open a new terminal.** Step 8 changes the login shell to fish, and `home/.config/fish/config.fish` is what puts `~/.bun/bin`, `~/.npm-global/bin` and the rest on `PATH` permanently.

Then `just up --dry-run` prints anything still out of place, writes nothing, and exits 1 when the next `just up` would fail.

### Repo-local extras

Neither is part of deploying the machine.

- `bun install` at the repo root installs the single dependency (`yaml`) that the scripts under `home/.claude/skills-library/check/` import. Skip it and the deploy is unaffected.
- `just hooks-install` points `core.hooksPath` at the runner for `.git-hooks/`. It shells out to `git-hooks`, which lives in a separate repo that is local-only and published nowhere — on a machine without that repo, the hooks cannot be installed.

## Daily Use

```sh
just up                             # full deploy (scripts + symlinks + merge patches)
just up --dry-run                   # what up would change; runs no scripts, writes nothing
just prune                          # list symlinks the plan no longer contains
just prune --force                  # remove them
```

`just up` is convergent and idempotent. Run it whenever you pull, edit config, or feel uncertain. It never displaces a file: a target in the way is refused, and the output names the `mv -n` (or, for a symlink at a spread directory, the `rm`) that clears it.

dotctl has exactly these two commands; the recipes wrap them:

| Command | What it does |
|---|---|
| `dotctl up [--dry-run]` | Before-scripts, deploy, after-scripts. `--dry-run` prints what a run would change and writes nothing. |
| `dotctl prune [--force]` | List symlinks into the repo's `home/` that the plan no longer contains; `--force` removes them. |

## How It Works

dotctl walks `home/` and creates symlinks into `$HOME`. Three conventions determine what happens to each entry.

**Directory symlinks.** A directory without a `.spread` marker is symlinked whole. `home/.bookmarks/` becomes `~/.bookmarks -> repo/home/.bookmarks`. Edits inside the target write directly into the repo.

**Spread directories.** A `.spread` file inside a directory tells dotctl to create the directory as a real folder in `$HOME` and symlink each child individually. This is how `home/.config/` works — dotctl owns `starship.toml` and `fish/` without claiming all of `~/.config/`. Spread is recursive: a spread directory can contain both spread subdirectories (with their own `.spread`) and whole-directory symlinks (without one).

Use `.spread` when an application writes runtime state alongside your config (logs, caches, sockets). Without it, those writes go into the repo.

**Files.** Regular files at the `home/` root or inside spread directories become individual symlinks.

### Special conventions

**Merge patches (`F.merge`).** In a spread directory, `F.merge` is the only repo file for the JSON target `F`: an RFC 7386 merge patch that `just up` applies to `~/…/F`, keeping the keys the app writes at runtime (a `null` in the patch deletes a key). Two files use it: `home/.claude/settings.json.merge` and `home/.agentsview/config.json.merge`.

**No secrets in the repo.** `home/.aws/config` gets the AWS access key from 1Password at runtime, through `credential_process` and the `op` CLI that `20-1password-cli.sh` installs.

**Nothing is skipped.** Every entry under `home/` deploys. Data that setup scripts read — the Brewfile, the Dock layout, the npm global list — lives in `scripts/data/`, outside the source tree, so no exclusion is needed.

## Source Tree

```
home/
  .agentsview/           # spread (config.json.merge; app writes DB/uploads/keys)
    .spread
  .aws/                  # spread (config: credential_process via 1Password)
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

Scripts in `scripts/setup/` run during `just up` in two phases: `before/` (prerequisites) and `after/` (configuration that depends on deployed files). Each phase directory holds `NN-name.sh` scripts that run in name order. A script runs when it has never run, or when its content, or a path it declares with `# dotctl:watch <path>`, changed since its last successful run. The `after/` scripts run only when the deploy completed with no refusal or error.

`before/` — installs the foundation the deploy itself relies on:

| Script | Purpose |
|---|---|
| `01-xcode-cli.sh` | Xcode command-line tools |
| `02-homebrew.sh` | Homebrew |
| `03-brew-bundle.sh` | `brew bundle` from `scripts/data/Brewfile` |

`after/` — configures the system once the symlinks exist:

| Script | Purpose |
|---|---|
| `04-node-toolchain.sh` | pnpm via its standalone installer, then global Node LTS |
| `05-npm-globals.sh` | npm globals from `scripts/data/npm/global-packages.txt` |
| `06-fisher.sh` | Fisher plugin manager for fish |
| `07-fisher-plugins.sh` | fish plugins from `home/.config/fish/fish_plugins` |
| `08-macos-defaults.sh` | keyboard, trackpad, Finder, screenshots, and default apps from `home/.config/duti.yml` |
| `09-dock-apps.sh` | Dock layout from `scripts/data/dock/apps.txt` |
| `10-bat-cache.sh` | rebuild bat's theme cache |
| `11-dprint-update.sh` | dprint formatter plugins |
| `12-git-maintenance.sh` | git maintenance scheduler |
| `13-git-ssh.sh` | SSH sockets dir, GitHub `known_hosts`, `gh` protocol, origin remote |
| `14-neovim-plugins.sh` | Neovim plugin install via lazy.nvim |
| `15-vscode-extensions.sh` | VS Code extensions from `scripts/data/vscode-extensions.txt` |
| `16-yo-install.sh` | `yo` notification tool |
| `17-imsg-install.sh` | `imsg` Messages CLI |
| `18-wispr-flow-shortcut.sh` | Wispr Flow hotkeys |
| `19-agentsview.sh` | pinned `agentsview` CLI into `~/.local/share/agentsview` |
| `20-1password-cli.sh` | 1Password CLI |
| `21-gh-extensions.sh` | `gh` extensions from `scripts/data/gh-extensions.txt` |
| `22-codexbar.sh` | CodexBar machine-local settings |
| `99-sudo-hint.sh` | prints the `just sudo-setup` reminder when anything privileged is unapplied |

## Configuration

There is none. dotctl's only input is `$DOTFILES_REPO_ROOT`, which the `justfile` sets, so recipes work from any directory. The root must contain a real `home/` directory.

State lives under `~/.local/state/dotctl/`: `deployed.json` (the ledger of deployed symlinks, which `prune` scans from) and `script-state.json` (each script's last successful run and content hash).

## Further Reading

- [CodexBar](docs/codexbar.md) — local quota-tracker setup alongside iCloud settings sync
- [Karabiner](docs/karabiner.md) — mental model, failure layers, and recovery workflows
- [CLI tools](docs/cli-tools.md) — installed tools and shell abbreviations
- [Node setup](docs/node-setup.md) — pnpm/node/npm-global layout and PATH order
- [Worktrunk](docs/worktrunk.md) — git worktree manager for parallel AI agents
- [Neovim](docs/neovim.md) — LazyExtras, AI stack, plugin decisions
- [Lua tooling](docs/lua-tooling.md) — selene, stylua, LuaLS, and the `just lua-*` gates
- [Known limitations](docs/known-limitations.md) — workarounds and manual intervention
- [Decisions](DECISIONS.md) — architecture decision records
