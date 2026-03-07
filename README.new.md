# dotfiles

Personal macOS system configuration deployed by [dotctl](https://github.com/jasonkuhrt/dotctl). The directory layout under `home/` is the configuration -- no manifest to maintain, no filename prefixes to learn.

## Overview

This repo mirrors `$HOME`. dotctl reads the `home/` directory, diffs it against the actual home directory, and creates symlinks to close the gap. Marker files (`.spread`) and naming conventions (`.age`, `.modify`) tell dotctl which deployment strategy to use for each entry -- but the default is a plain symlink, and most files need no annotation at all.

The problem it solves: keeping system configuration in version control without a templating layer, filename encoding scheme, or separate manifest that drifts from reality. The directory structure *is* the manifest.

Use this when you want convention-driven dotfile deployment on macOS. If you need cross-platform support or template rendering, dotctl is not the right tool.

Design goals:

- **Convention over configuration.** The directory layout determines behavior. Explicit config exists only for values that can't be inferred from structure.
- **Idempotent convergence.** Running `just up` twice changes nothing. It always converges toward the declared state.
- **Secrets stay encrypted at rest.** Age-encrypted files live in the repo; plaintext never touches version control.

## Setup

```bash
git clone git@github.com:jasonkuhrt/dotfiles.git ~/projects/jasonkuhrt/dotfiles
cd ~/projects/jasonkuhrt/dotfiles
bun install
just up
```

If you have encrypted secrets, paste your age private key into `~/.config/dotctl/age-key.txt` before the first `just up`. Complete remaining manual steps in [docs/manual-setup.md](docs/manual-setup.md).

Requires: macOS, [Bun](https://bun.sh), [just](https://github.com/casey/just), [dotctl](https://github.com/jasonkuhrt/dotctl) (`bun install -g dotctl`).

## Terminology

| Term | Meaning |
|---|---|
| Source tree | The `home/` directory in this repo. Its structure mirrors `$HOME`. |
| Lane | The deployment strategy for a single entry: directory symlink, file symlink, or special. dotctl infers the lane from conventions -- you never set it explicitly. |
| Spread marker | A `.spread` file inside a source tree directory. Tells dotctl to create a real folder in `$HOME` and symlink each child individually, instead of symlinking the directory whole. |
| Modify sidecar | A companion script named `F.modify` next to a file `F`. Receives the source path via `$DOTCTL_SOURCE` and writes merged output to stdout, enabling machine-local customization of managed files. |
| Capture | A backup of an existing target file taken before dotctl replaces it with a symlink. Stored in `~/.local/state/dotctl/backups/`. |
| Drift | When a target symlink has been replaced by a regular file -- typically because an application did an atomic save. The heal agent detects and repairs this. |

## Core Concepts

### Deployment lanes

Every entry in the source tree needs to reach `$HOME`, but not every entry should get there the same way. A directory you fully control (like `~/.aws/`) can be one symlink. A directory shared with other applications (like `~/.config/`) cannot -- symlinking it whole would swallow files that don't belong to you.

dotctl assigns each entry a lane based on conventions:

- **Directory symlink.** The default for directories. `home/.aws/` becomes `~/.aws -> repo/home/.aws`. Edits inside the target write directly into the repo.
- **File symlink.** The default for regular files. `home/.gitconfig` becomes `~/.gitconfig -> repo/home/.gitconfig`.
- **Spread.** A directory containing a `.spread` marker gets a real folder in `$HOME`; its children are symlinked individually. Spread is recursive -- a spread directory can contain both spread subdirectories (with their own `.spread`) and whole-directory symlinks (without one).
- **Special.** Entries with `.age` or `.modify` suffixes receive custom treatment (see below).

### Spread directories

You want to own `~/.config/starship.toml` and `~/.config/fish/` without claiming all of `~/.config/`. Placing a `.spread` marker inside `home/.config/` tells dotctl to create `~/.config/` as a real directory and symlink each child individually. Applications that write their own files into `~/.config/` coexist without interference.

Use `.spread` whenever an application writes runtime state alongside your config -- logs, caches, sockets. Without it, those writes land in the repo.

### Encrypted files

Secrets need to live in the repo (so a fresh machine gets them) but must not exist as plaintext in version control. Files ending in `.age` are decrypted at deploy time using [age](https://github.com/FiloSottile/age) and written to `$HOME` with mode `0600`. Only one secret -- the age private key itself -- must be transferred manually between machines.

### Modify sidecars

Some deployed files need values that vary per machine -- paths containing the username, local network addresses, hardware-specific settings. A modify sidecar (`F.modify`) is a script that receives the source file path and writes the final content to stdout. dotctl runs the sidecar instead of creating a plain symlink.

Three files in this repo use modify sidecars: the Claude Code settings, the Serena config, and the launchd heal plist (which injects the correct `$HOME` path).

### Heal agent

Symlinks break. Text editors that do atomic saves (write temp file, rename over original) replace the symlink with a regular file. A macOS launchd agent runs `dotctl heal` every 5 minutes, scanning for this drift and restoring the symlinks. `just up` installs and loads the agent automatically.

### Setup scripts

Deploying symlinks is only half the job. A fresh machine also needs Homebrew, CLI tools, shell plugins, and macOS preferences. Scripts in `scripts/setup/` run during `just up` in two phases:

**Before** (prerequisites that must exist before symlinks are useful):

| Script | Runs | Purpose |
|---|---|---|
| `01-xcode-cli.sh` | once | Xcode command-line tools |
| `02-homebrew.sh` | once | Homebrew |
| `03-brew-bundle.sh` | on change | `brew bundle` from `scripts/data/Brewfile` |

**After** (configuration that depends on deployed files):

| Script | Runs | Purpose |
|---|---|---|
| `04-node-toolchain.sh` | on change | Node.js via fnm |
| `05-npm-globals.sh` | on change | Global npm packages from `scripts/data/npm/global-packages.txt` |
| `06-fisher.sh` | once | Fisher plugin manager for fish |
| `07-fisher-plugins.sh` | on change | Fish plugins from `home/.config/fish/fish_plugins` |
| `08-macos-defaults.sh` | on change | Keyboard repeat rate, trackpad speed, Finder preferences |
| `09-dock-apps.sh` | on change | Dock layout from `scripts/data/dock/apps.txt` |
| `11-dprint-update.sh` | on change | dprint formatter plugins |
| `12-skills-sync.sh` | on change | Claude Code skill installation |
| `13-git-ssh.sh` | once | SSH key for GitHub |
| `14-neovim-plugins.sh` | once | Neovim plugin install via lazy.nvim |
| `16-yo-install.sh` | once | yo CLI tool |
| `17-kitty-theme.sh` | once | Kitty terminal theme |
| `18-wispr-flow-shortcut.sh` | on change | Wispr Flow keyboard shortcuts |

"Once" scripts run on first deploy and never again. "On change" scripts re-run when their watched input files change.

## Source Tree

```
home/
  .aws/                  # dir-symlink (contains credentials.age)
  .bookmarks/            # dir-symlink
  .claude/               # spread (skills, rules, hooks, commands, schemas)
    .spread
  .config/               # spread
    .spread
    bat/                 # dir-symlink
    direnv/              # dir-symlink
    dprint/              # dir-symlink
    fish/                # spread (config.fish, fish_plugins, fish_variables, modules)
      .spread
    gh/                  # spread
      .spread
    ghostty/             # dir-symlink
    git/                 # dir-symlink
    karabiner/           # dir-symlink
    kitty/               # dir-symlink
    lazygit/             # dir-symlink
    libra/               # dir-symlink
    lnav/                # dir-symlink
    lsd/                 # dir-symlink
    nvim/                # dir-symlink
    ripgrep/             # dir-symlink
    starship.toml        # file symlink
    yazi/                # dir-symlink
    zed/                 # dir-symlink
  .gitconfig             # file symlink
  .hushlogin             # file symlink
  .markdownlint-cli2.yaml # file symlink
  .npmrc                 # file symlink
  .serena/               # spread (config with modify sidecar)
    .spread
  .ssh/                  # spread (config + known_hosts)
    .spread
  Library/               # spread
    .spread
    LaunchAgents/        # spread (heal plist with modify sidecar)
      .spread
```

## Commands

`just` wraps dotctl. Run `just up` whenever you pull, edit config, or feel uncertain -- it converges toward the declared state and does nothing if already converged.

| Command | What it does |
|---|---|
| `just up` | Full deploy: run setup scripts, create symlinks, write manifest. |
| `just edit <target>` | Open the source file backing a managed target (e.g., `just edit ~/.config/ghostty/config`). |
| `just status` | Print deployment health. |
| `just doctor` | Run invariant checks across the system. |
| `just explain <target>` | Show how a target path is deployed -- its lane, source, and capture policy. |

For finer control, call dotctl directly:

| Command | What it does |
|---|---|
| `dotctl deploy [--dry-run] [--verbose]` | Symlink deployment only, no scripts. |
| `dotctl scripts [--dry-run]` | Run setup scripts only, no symlinks. |
| `dotctl heal [--background]` | Scan for drift and restore broken symlinks. |
| `dotctl prune [--dry-run]` | Remove orphaned symlinks whose source no longer exists. |
| `dotctl manifest [--write]` | Show or write the deployment manifest. |

## Configuration

`dotctl.config.json` in the repo root. Most fields have sensible defaults; this repo's config only sets the age recipient:

```json
{
  "$schema": "./node_modules/dotctl/dotctl.schema.json",
  "age": {
    "recipient": "age1..."
  }
}
```

| Field | Default | Description |
|---|---|---|
| `sourceDir` | `"home"` | Source tree directory, relative to repo root. |
| `scriptsDir` | `"scripts/setup"` | Setup scripts directory, relative to repo root. |
| `stateDir` | `"~/.local/state/dotctl"` | Manifest, logs, and backups. Supports `~` expansion. |
| `homeRootSkip` | `[]` | Entries at the source tree root to skip during deployment. |
| `age.identity` | `"~/.config/dotctl/age-key.txt"` | Path to the age private key. Supports `~` expansion. |
| `age.recipient` | *(required if using age)* | Age public key for encryption. |
| `heal.label` | `"dotctl-heal"` | macOS launchd agent label. |
| `heal.intervalSeconds` | `300` | Seconds between automated heal runs. |

## Internals

State lives at `~/.local/state/dotctl/`:

| Path | Purpose |
|---|---|
| `manifest.json` | Record of all deployed symlinks and their metadata. |
| `health.json` | Last health check results. |
| `captures.json` | Registry of captured (backed-up) files. |
| `backups/` | Timestamped backups of files replaced during deployment. |
| `logs/` | Heal agent logs and launchd stdout/stderr. |
| `heal.lock/` | Lock directory preventing concurrent heal runs. |

dotctl is an external package installed globally via Bun (`bun install -g dotctl`). The `packages/dotctl/` directory in this repo is a workspace link for local development.

## Further Reading

- [How it works](docs/how-it-works.md) -- detailed conventions and commands reference
- [Symlink platform](docs/symlink-platform.md) -- lane model, capture policy, runtime state
- [Manual setup](docs/manual-setup.md) -- post-bootstrap steps (GitHub auth, macOS settings)
- [CLI tools](docs/cli-tools.md) -- installed tools and shell abbreviations
- [Neovim](docs/neovim.md) -- LazyExtras, AI stack, plugin decisions
- [Known limitations](docs/known-limitations.md) -- workarounds and manual intervention
- [Decisions](DECISIONS.md) -- architecture decision records
