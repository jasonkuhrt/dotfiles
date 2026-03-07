# dotfiles

Personal macOS system configuration deployed by [dotctl](https://github.com/jasonkuhrt/dotctl). Everything lives in a single `home/` source tree. The directory layout is the configuration — no manifest to maintain, no filename prefixes to learn.

## New Machine Setup

```sh
git clone git@github.com:jasonkuhrt/dotfiles.git ~/projects/jasonkuhrt/dotfiles
cd ~/projects/jasonkuhrt/dotfiles
bun install
just up
```

Paste your age private key from your password manager into `~/.config/dotctl/age-key.txt` before the first `just up` if you have encrypted secrets. Complete remaining manual steps in [docs/manual-setup.md](docs/manual-setup.md).

## Daily Use

```sh
just up                          # full deploy (scripts + symlinks + manifest)
just edit ~/.config/ghostty/config  # open the source file for any managed target
just status                      # deployment health
just doctor                      # 55 invariant checks
just explain ~/.config/dprint    # how a target is managed
```

`just up` is convergent and idempotent. Run it whenever you pull, edit config, or feel uncertain.

## How It Works

dotctl walks `home/` and creates symlinks into `$HOME`. Three conventions determine what happens to each entry.

**Directory symlinks.** A directory without a `.spread` marker is symlinked whole. `home/.ssh/` becomes `~/.ssh -> repo/home/.ssh`. Edits inside the target write directly into the repo.

**Spread directories.** A `.spread` file inside a directory tells dotctl to create the directory as a real folder in `$HOME` and symlink each child individually. This is how `home/.config/` works — dotctl owns `starship.toml` and `fish/` without claiming all of `~/.config/`. Spread is recursive: a spread directory can contain both spread subdirectories (with their own `.spread`) and whole-directory symlinks (without one).

Use `.spread` when an application writes runtime state alongside your config (logs, caches, sockets). Without it, those writes go into the repo.

**Files.** Regular files at the `home/` root or inside spread directories become individual symlinks.

### Special conventions

**Encrypted files (`.age`).** `home/.aws/credentials.age` is decrypted with [age](https://github.com/FiloSottile/age) at deploy time and written as `~/.aws/credentials` with mode `0600`. The age identity lives at `~/.config/dotctl/age-key.txt`. Keep it in your password manager — it is the only secret you need to transfer between machines.

**Modify scripts (`.modify` sidecars).** A file `F` with a companion `F.modify` script uses merge deployment. The sidecar receives the source path via `$DOTCTL_SOURCE`, writes merged output to stdout. This lets you combine managed configuration with machine-local values.

**Skipped entries.** `Brewfile`, `dock/`, and `npm/` live in `home/` but are not deployed — they exist so setup scripts can reference them. Additional skips are configurable via `homeRootSkip` in `dotctl.config.json`.

## Source Tree

```
home/
  .aws/                  # dir-symlink (contains credentials.age)
  .bookmarks/            # dir-symlink (bookmarks sync config)
  .claude/               # spread (skills, rules, hooks — runtime writes transcripts/)
    .spread
  .config/               # spread (owns specific app configs, not all of ~/.config)
    .spread
    fish/                # spread (config + fish_variables; fish writes completions/)
      .spread
    gh/                  # spread
      .spread
    ghostty/             # dir-symlink (pure config)
    starship.toml        # file symlink
    ...
  .gitconfig             # file symlink
  .serena/               # spread (config; Serena writes logs/, memories/)
    .spread
  .ssh/                  # spread (config + known_hosts; SSH writes sockets/)
    .spread
  Library/               # spread
    .spread
    LaunchAgents/        # spread (plist files)
      .spread
  Brewfile               # skipped — read by brew-bundle setup script
  dock/                  # skipped — read by dock-apps setup script
  npm/                   # skipped — read by npm-globals setup script
```

## Setup Scripts

Scripts in `scripts/setup/` run during `just up` in two phases: `before/` (prerequisites) and `after/` (configuration that depends on deployed files). Each phase has `once/` (first run only) and `onchange/` (re-runs when watched files change) subdirectories.

Before scripts install foundational dependencies:

- `01-xcode-cli.sh` — Xcode command-line tools
- `02-homebrew.sh` — Homebrew
- `03-brew-bundle.sh` — `brew bundle` from `home/Brewfile` (re-runs on Brewfile change)

After scripts configure the system:

- `04-node-toolchain.sh` — Node.js via fnm
- `05-npm-globals.sh` — global npm packages from `home/npm/global-packages.txt`
- `06-fisher.sh` — Fisher plugin manager for fish
- `07-fisher-plugins.sh` — fish plugins from `home/.config/fish/fish_plugins`
- `08-macos-defaults.sh` — keyboard repeat, trackpad speed, Finder preferences
- `09-dock-apps.sh` — Dock layout from `home/dock/apps.txt`
- `11-dprint-update.sh` — dprint formatter plugins
- `12-skills-sync.sh` — Claude Code skill installation
- `13-git-ssh.sh` — SSH key for GitHub
- `14-neovim-plugins.sh` — Neovim plugin install via lazy.nvim

## Heal Agent

A macOS launchd agent runs `dotctl heal` every 5 minutes. Some applications replace symlinks with regular files during atomic saves — the healer detects this drift and restores the symlinks. `just up` installs and loads the agent automatically.

## Configuration

`dotctl.config.json` in the repo root:

```json
{
  "sourceDir": "home",
  "scriptsDir": "scripts/setup",
  "stateDir": "~/.local/state/dotfiles-symlink",
  "homeRootSkip": ["Brewfile", "dock", "npm"],
  "age": {
    "identity": "~/.config/dotctl/age-key.txt",
    "recipient": "age1..."
  },
  "heal": {
    "label": "com.jasonkuhrt.chezmoi-symlink-heal",
    "intervalSeconds": 300
  }
}
```

## Further Reading

- [How it works](docs/how-it-works.md) — detailed conventions and commands reference
- [Symlink platform](docs/symlink-platform.md) — lane model, capture policy, runtime state
- [Manual setup](docs/manual-setup.md) — post-bootstrap steps (GitHub auth, macOS settings)
- [CLI tools](docs/cli-tools.md) — installed tools and shell abbreviations
- [Neovim](docs/neovim.md) — LazyExtras, AI stack, plugin decisions
- [Known limitations](docs/known-limitations.md) — workarounds and manual intervention
- [Decisions](DECISIONS.md) — architecture decision records
