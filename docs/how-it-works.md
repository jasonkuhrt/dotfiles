# How It Works

This repo uses [chezmoi](https://www.chezmoi.io/) for declarative dotfiles management. Config files live in `home/` with chezmoi naming conventions, and `chezmoi apply` deploys them to `$HOME`.

## Source State

The repo root contains project files (justfile, docs, packages). The actual dotfiles source lives in `home/`, selected by `.chezmoiroot`:

```
dotfiles/                     # git repo root
├── .chezmoiroot              # contains "home"
├── justfile                  # wraps chezmoi commands
├── sync-sudo                 # manual sudo ops
├── docs/, packages/, .beads/ # project files
│
└── home/                     # CHEZMOI SOURCE STATE
    ├── .chezmoi.toml.tmpl    # chezmoi config (sourceDir, encryption)
    ├── .chezmoiignore        # files to exclude from deployment
    ├── .chezmoiexternal.toml # external repos (tpm-redux)
    ├── .chezmoitemplates/    # shared script helpers
    ├── .chezmoiscripts/      # lifecycle scripts (brew, defaults, etc.)
    │
    ├── dot_claude/           # → ~/.claude/
    ├── dot_config/           # → ~/.config/
    ├── dot_gitconfig         # → ~/.gitconfig
    ├── dot_npmrc             # → ~/.npmrc
    ├── private_dot_ssh/      # → ~/.ssh/ (mode 0700)
    ├── private_dot_aws/      # → ~/.aws/ (mode 0700)
    └── ...
```

## Naming Conventions

Chezmoi uses filename prefixes to control deployment behavior:

| Prefix | Effect | Example |
|---|---|---|
| `dot_` | Target starts with `.` | `dot_gitconfig` → `.gitconfig` |
| `exact_` | Remove unmanaged files in target dir | `exact_skills/` cleans stale skills |
| `private_` | Mode 0700/0600 | `private_dot_ssh/` → `.ssh/` |
| `encrypted_` | age-encrypted at rest | `encrypted_credentials.age` → `credentials` |
| `executable_` | Set execute bit | `executable_toggle-chore-files.sh` |
| `symlink_` | Create symlink (file contents = target path) | `symlink_skills.tmpl` |
| `empty_` | Create a 0-byte file | `empty_dot_hushlogin` → `.hushlogin` |

Multiple prefixes compose: `private_dot_aws/encrypted_credentials.age` → `~/.aws/credentials` (private dir + encrypted file).

Note: `exact_` is NOT recursive — it only enforces exactness on immediate children of the directory, not subdirectories.

## Lifecycle Scripts

Scripts in `.chezmoiscripts/` run during `chezmoi apply`. The filename determines when and how often:

| Pattern | Behavior |
|---|---|
| `run_once_before_*` | Runs once on first apply, before file deployment |
| `run_onchange_before_*` | Re-runs before file deployment when content/hash changes |
| `run_onchange_after_*` | Re-runs after file deployment when content/hash changes |
| `run_once_after_*` | Runs once after file deployment |

The number in the filename (`00`, `03`, `08`, etc.) controls ordering. `before_` scripts run before chezmoi writes files; `after_` scripts run after.

### Script Inventory

**Bootstrap (run once on new machines):**

| # | Script | What |
|---|---|---|
| 00 | migrate-symlinks | Clean up old sync infrastructure |
| 01 | xcode-cli | Install Xcode command line tools |
| 02 | homebrew | Install Homebrew |
| 06 | fisher | Install Fisher plugin manager |
| 13 | git-ssh | SSH known_hosts, gh protocol, remote fix |
| 14 | neovim-plugins | Install vim-plug plugins |
| 15 | tmux-plugins | Install tpm plugins |
| 16 | yo-install | Install yo notification app |
| 17 | kitty-theme | Bootstrap Kitty Tokyo Night theme |
| 99 | sudo-hint | Print `sync-sudo` instructions |

**Ongoing (re-run when content changes):**

| # | Script | Trigger |
|---|---|---|
| 03 | brew-bundle | `Brewfile` hash changes |
| 04 | node-toolchain | Script content changes |
| 05 | npm-globals | `npm/global-packages.txt` hash changes |
| 07 | fisher-plugins | `fish_plugins` hash changes |
| 08 | macos-defaults | Script content changes |
| 09 | dock-apps | `dock/apps.txt` hash changes |
| 10 | dprint-update | `dprint.json` hash changes |
| 11 | skills-sync | Script content changes |

### Hash Trigger Pattern

The `run_onchange_` scripts use a comment with a hash to detect changes:

```bash
# Brewfile hash: {{ include "Brewfile" | sha256sum }}
```

chezmoi evaluates this template on each run. If `Brewfile` has changed since last apply, the hash is different, and chezmoi re-runs the script. This is the idiomatic chezmoi pattern — `sha256sum` is a built-in sprig template function, no external process needed.

## Data Files

Some files exist in `home/` for script access but are NOT deployed to `$HOME`. They're listed in `.chezmoiignore`:

- `Brewfile` — Homebrew packages, casks, and Mac App Store apps
- `dock/apps.txt` — Dock layout
- `npm/global-packages.txt` — npm global packages

These must be inside `home/` (the source directory) because chezmoi's `include` function can only read files within the source directory. The hash-trigger pattern (`{{ include "Brewfile" | sha256sum }}`) wouldn't work if these files were at the repo root.

## Encryption

Secrets use age encryption (built into chezmoi). Encrypted files have the `encrypted_` prefix and are decrypted on `chezmoi apply`. The age key lives at `~/.config/chezmoi/key.txt`.

## Drift Detection

```bash
just verify      # check for drift (exits non-zero if any)
just diff        # preview what apply would change
just re-add      # capture external changes back to source
```

Use `just re-add <file>` when external tools modify managed files (e.g., Fisher updates `fish_plugins`, Lazy.nvim updates `lazy-lock.json`).

## Commands

Run `just` from the repo root to see all available recipes. The key ones:

```bash
# Core workflow
just sync           # commit + pull + push + apply (daily driver)
just apply          # apply without git sync
just diff           # preview changes

# Inspection
just doctor         # system health check
just verify         # detect drift
just managed        # list all managed files
just unmanaged      # find unmanaged files in ~/.config

# Editing
just edit <target>  # edit source by target path
just re-add <file>  # capture external changes

# Brew
just brew           # run brew bundle
just brew-check     # show what's missing
just brew-cleanup   # remove unlisted packages
```

For operations beyond what the justfile wraps, use `chezmoi` directly — see `chezmoi --help`.

## Notes

- **Browser sync** — automatic via Google login (Chrome) and iCloud (Safari)
- **Keyboard settings** — chezmoi sets fast key repeat via `defaults`, but requires logout/login to take effect
- **CC settings.json** — NOT managed by chezmoi (both use atomic writes, creating a race condition). CC owns this file at runtime.
- **Sudo operations** — remain manual via `sudo ./sync-sudo` (power management, Touch ID, Fish default shell)
