# dotfiles

Personal system configuration managed by [chezmoi](https://www.chezmoi.io/).

## New Machine Setup

```sh
# 1. Install chezmoi + clone + apply in one shot
sh -c "$(curl -fsLS get.chezmoi.io)" -- init --apply jasonkuhrt/dotfiles

# 2. Paste age key from password manager, then re-apply to decrypt secrets
#    (key goes at ~/.config/chezmoi/key.txt)
chezmoi apply

# 3. Complete manual steps (GitHub auth, email, macOS settings)
#    See docs/manual-setup.md
```

After initial setup, **`just` is the primary interface.** The bootstrap installs Homebrew → just, so from this point forward everything goes through the justfile:

```sh
cd ~/projects/jasonkuhrt/dotfiles
just          # see all available recipes
just sync     # commit + pull + push + apply (daily driver)
just apply    # just apply without git sync
just diff     # preview what apply would change
```

---

## How This Repo Is Organized

This is a git repo with a `home/` directory inside it. That `home/` directory is the **chezmoi source state** — it mirrors the structure of `$HOME` using chezmoi's naming conventions. When you run `chezmoi apply`, chezmoi reads `home/`, strips the naming prefixes, and writes the resulting files to your home directory.

```
dotfiles/                          ← git repo root
├── .chezmoiroot                   ← tells chezmoi "home/ is the source"
├── justfile                       ← command runner (wraps chezmoi)
├── sync-sudo                      ← manual sudo operations
├── DECISIONS.md                   ← architecture decision records
├── docs/                          ← documentation
├── .claude/                       ← project-local Claude Code config
├── .beads/                        ← issue tracking (bd)
│
└── home/                          ← CHEZMOI SOURCE STATE
    ├── .chezmoi.toml.tmpl         ← chezmoi config (source dir, encryption, data)
    ├── .chezmoiignore             ← files NOT deployed to $HOME
    ├── .chezmoiexternal.toml      ← external git repos (tpm)
    ├── .chezmoitemplates/         ← shared helpers included by scripts
    ├── .chezmoiscripts/           ← lifecycle scripts (19 total)
    │
    ├── Brewfile                   ← data file (NOT deployed, used by scripts)
    ├── dock/apps.txt              ← data file (NOT deployed)
    ├── npm/global-packages.txt    ← data file (NOT deployed)
    │
    ├── dot_config/                ← → ~/.config/
    │   ├── fish/                  ← Fish shell (config.fish, modules/, fish_plugins)
    │   ├── nvim/                  ← Neovim (full LazyVim config)
    │   ├── ghostty/               ← Ghostty terminal
    │   ├── zed/                   ← Zed editor
    │   ├── tmux/                  ← tmux
    │   ├── starship.toml          ← Starship prompt
    │   └── ...                    ← bat, ripgrep, lazygit, gh, lsd, etc.
    │
    ├── dot_claude/                ← → ~/.claude/ (Claude Code global config)
    │   ├── CLAUDE.md
    │   ├── exact_commands/        ← stale commands auto-removed on apply
    │   ├── exact_rules/
    │   ├── exact_skills/
    │   ├── exact_hooks/
    │   ├── exact_checks/
    │   └── exact_schemas/
    │
    ├── dot_gitconfig              ← → ~/.gitconfig
    ├── dot_npmrc                  ← → ~/.npmrc
    ├── empty_dot_hushlogin        ← → ~/.hushlogin (empty file)
    ├── private_dot_ssh/           ← → ~/.ssh/ (mode 0700)
    └── private_dot_aws/           ← → ~/.aws/ (mode 0700)
```

### Naming Conventions

chezmoi uses filename prefixes to declare what should happen at deploy time. You never write deployment logic — the filename IS the logic:

| Prefix | What it does | Example |
|---|---|---|
| `dot_` | Target starts with `.` | `dot_gitconfig` → `.gitconfig` |
| `exact_` | Remove files in target dir that aren't in source | `exact_skills/` cleans stale skills |
| `private_` | Set mode 0700/0600 | `private_dot_ssh/` → `.ssh/` with restricted perms |
| `encrypted_` | Decrypt with age on deploy | `encrypted_credentials.age` → `credentials` |
| `executable_` | Set the execute bit | `executable_toggle-chore-files.sh` |
| `empty_` | Create a 0-byte file | `empty_dot_hushlogin` → `.hushlogin` |
| `symlink_` | Create symlink (file contents = target path) | `symlink_skills.tmpl` |

Multiple prefixes compose: `private_dot_aws/encrypted_credentials.age` → `~/.aws/credentials` (private dir + encrypted file).

### Data Files

Some files live inside `home/` but are **not deployed** to `$HOME`. They exist so that lifecycle scripts can reference them via chezmoi's built-in `include` function. These are listed in `.chezmoiignore`:

- `Brewfile` — Homebrew packages, casks, and Mac App Store apps
- `dock/apps.txt` — Dock layout
- `npm/global-packages.txt` — npm global packages

---

## Daily Workflows

### The Sync Loop

The most common operation — edit something, deploy it, push it:

```sh
# Edit a config (opens source file in $EDITOR from target path)
just edit ~/.config/fish/config.fish

# Preview what changed
just diff

# Commit + pull + push + apply (the daily driver)
just sync
```

Or if you just want to apply without git sync:

```sh
just apply
```

### Editing a Config

Two ways to find and edit a managed file:

```sh
# By target path (chezmoi resolves it to the source file)
just edit ~/.config/fish/config.fish

# By source path directly (you need to know where it is)
nvim home/dot_config/fish/config.fish
```

### Adding a New Config File

```sh
# Bring an existing file under management
chezmoi add ~/.config/foo/bar.toml
# → copies into home/dot_config/foo/bar.toml

# For secrets (encrypted at rest)
chezmoi add --encrypt ~/.config/fish/config.secrets.fish
```

### Capturing External Changes

Some tools write to files chezmoi manages. Pull those changes back into source:

```sh
# Fisher modified fish_plugins
just re-add ~/.config/fish/fish_plugins

# Lazy.nvim updated lazy-lock.json
just re-add ~/.config/nvim/lazy-lock.json

# Check for drift across all managed files
just verify
```

### Adding a Homebrew Package

1. Edit `home/Brewfile`
2. `just sync` — the brew-bundle script re-runs automatically (detects Brewfile hash changed)

Or run brew directly: `just brew`

### Adding a Claude Code Skill/Rule/Command

Global CC config lives in `home/dot_claude/`. The `exact_` prefix means chezmoi **removes** anything at `~/.claude/skills/` not present in source:

```sh
mkdir -p home/dot_claude/exact_skills/my-skill
# Write SKILL.md
just apply
```

Project-local CC config (dotfiles repo only) lives in `.claude/` at the repo root — standard git, chezmoi doesn't touch it.

### Adding a macOS Default

Edit `home/.chezmoiscripts/run_onchange_after_08-macos-defaults.sh.tmpl`. The script re-runs whenever its content changes.

### Previewing Before Applying

```sh
just diff                    # unified diff of what would change
just apply -- --dry-run      # simulate apply without writing
```

---

## Lifecycle Scripts

The `home/.chezmoiscripts/` directory contains 19 scripts that run during `chezmoi apply`. They replace the old monolithic `sync` script.

### How Script Naming Works

The filename determines **when** and **how often** a script runs:

| Pattern | Runs | Re-runs when |
|---|---|---|
| `run_once_before_*` | Once ever, before file deployment | Never (unless script content changes) |
| `run_onchange_before_*` | Before file deployment | Data file hash changes |
| `run_onchange_after_*` | After file deployment | Data file hash changes |
| `run_once_after_*` | Once ever, after file deployment | Never |

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
| 10 | betterdisplay | Script content changes |
| 11 | dprint-update | `dprint.json` hash changes |
| 12 | skills-sync | Script content changes |

### Hash Trigger Pattern

The `run_onchange_` scripts use a comment with a hash to detect changes:

```bash
# Brewfile hash: {{ include "Brewfile" | sha256sum }}
```

chezmoi evaluates this template on each run. If `Brewfile` has changed since last apply, the hash is different, and chezmoi re-runs the script. This is the idiomatic chezmoi pattern — no external `shasum` process needed.

---

## Encryption

Secrets are encrypted at rest using [age](https://github.com/FiloSottile/age), which is built into chezmoi.

- **Key location:** `~/.config/chezmoi/key.txt`
- **Key backup:** Store in your password manager (this is the only secret to transfer between machines)
- **Encrypted files** have the `encrypted_` prefix in source and `.age` extension

```sh
# Encrypt a new secret
chezmoi add --encrypt ~/.config/fish/config.secrets.fish

# Edit an encrypted file (decrypts → edit → re-encrypts)
chezmoi edit ~/.config/fish/config.secrets.fish

# The encrypted file in source state looks like:
# home/dot_config/fish/encrypted_config.secrets.fish.age
```

---

## Skills Mirroring

Claude Code skills are the source of truth at `~/.claude/skills/` (deployed by chezmoi from `home/dot_claude/exact_skills/`). They're mirrored to other AI tools:

- **`~/.agents/skills/`** — whole-directory symlink to `~/.claude/skills/` (via chezmoi `symlink_skills.tmpl`)
- **`~/.codex/skills/`** — per-skill symlinks (via lifecycle script 12). Preserves codex's `.system/` directory

---

## Commands Reference

### justfile (from repo root)

```sh
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
just update         # git pull + apply

# Brew
just brew           # run brew bundle
just brew-check     # show what's missing
just brew-cleanup   # remove unlisted packages
```

### chezmoi directly

```sh
chezmoi add <file>              # bring a new file under management
chezmoi add --encrypt <file>    # bring a secret under management
chezmoi forget <file>           # stop managing a file
chezmoi unmanaged ~/.config     # find files NOT managed by chezmoi
chezmoi source-path <target>    # show source file path for a target
chezmoi target-path <source>    # show target file path for a source
chezmoi data                    # show template data (name, email, etc.)
chezmoi cat <target>            # show what chezmoi would write (after templates)
```

---

## Things That Need Manual Intervention

- **`sync-sudo`** — sudo operations (power management, Touch ID, Fish as default shell). Run `sudo ./sync-sudo` when prompted
- **Fisher plugin removals** — `fisher update` handles removals, but some plugins leave behind universal variables in `~/.config/fish/fish_variables` that need manual cleanup
- **`settings.json`** — `~/.claude/settings.json` is NOT managed by chezmoi (both use atomic writes, causing a race condition). CC owns it at runtime
- **Keyboard repeat rate** — set by macOS defaults script, but requires logout/login to take effect

---

## Modern Unix Replacements

Interactive shell abbreviations expand classic commands to modern replacements. Scripts are unaffected (abbreviations only fire in interactive mode):

| Type | Expands to | Why |
|---|---|---|
| `ls` | `lsd` | Icons, git integration |
| `cat` | `bat` | Syntax highlighting, paging |
| `grep` | `rg` | Fast, .gitignore-aware |
| `find` | `fd` | Simpler syntax, fast |
| `top` | `btm` | Graphical resource monitor |
| `du` | `dust` | Visual disk usage bars |
| `diff` | `difft` | Structural diff (understands syntax) |
| `vim` | `nvim` | Neovim |

Full list in `home/dot_config/fish/config.fish`.

---

## Documentation

| Doc | What |
|---|---|
| [How it works](docs/how-it-works.md) | chezmoi source state model (detailed) |
| [Node setup](docs/node-setup.md) | Node/pnpm/npm architecture |
| [Manual setup](docs/manual-setup.md) | Post-apply configuration steps |
| [CLI tools](docs/cli-tools.md) | Reference for installed tools |
| [Known limitations](docs/known-limitations.md) | Bugs, workarounds, TODOs |
| [Decisions](DECISIONS.md) | Architecture decision records (the "why") |
| [Inspiration](docs/inspiration.md) | Other dotfiles & resources |
