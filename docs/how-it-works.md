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

| Prefix | Effect |
|---|---|
| `dot_` | Target starts with `.` |
| `exact_` | Remove unmanaged files in target dir |
| `private_` | Mode 0700/0600 |
| `encrypted_` | age-encrypted at rest |
| `executable_` | Set execute bit |
| `symlink_` | Create symlink (file contents = target path) |

## Lifecycle Scripts

Scripts in `.chezmoiscripts/` run during `chezmoi apply`:

- **`run_once_before_*`** — Run once on first apply (xcode, homebrew, migration)
- **`run_onchange_before_*`** — Re-run when content hash changes (brew bundle)
- **`run_onchange_after_*`** — Re-run when content changes (defaults, dock, npm globals)
- **`run_once_after_*`** — Run once after files are deployed (fisher, neovim plugins, tmux)

Hash triggers use chezmoi's built-in `include` + `sha256sum`:
```
# Brewfile hash: {{ "{{" }} include "Brewfile" | sha256sum {{ "}}" }}
```

## Data Files

Some files exist in `home/` for script access but are NOT deployed to `$HOME` (listed in `.chezmoiignore`): `Brewfile`, `dock/apps.txt`, `npm/global-packages.txt`.

## Encryption

Secrets use age encryption (built into chezmoi). Encrypted files have the `encrypted_` prefix and are decrypted on `chezmoi apply`. The age key lives at `~/.config/chezmoi/key.txt`.

## Drift Detection

```bash
chezmoi verify    # check for drift
chezmoi re-add    # capture external changes back to source
chezmoi diff      # preview what apply would change
```

Use `chezmoi re-add` when external tools modify managed files (e.g., Fisher updates `fish_plugins`, Lazy.nvim updates `lazy-lock.json`).

## Common Commands

```bash
just apply            # chezmoi apply -v
just diff             # preview changes
just doctor           # system health check
just edit <target>    # edit source file by target path
just verify           # detect drift
just re-add           # capture external changes
```

## Notes

- **Browser sync** — automatic via Google login (Chrome) and iCloud (Safari)
- **Keyboard settings** — chezmoi sets fast key repeat via `defaults`, but requires logout/login to take effect
- **CC settings.json** — NOT managed by chezmoi (both use atomic writes, creating a race condition). CC owns this file at runtime.
- **Sudo operations** — remain manual via `sudo ./sync-sudo` (power management, Touch ID, Fish default shell)
