---
name: dotfiles-doctor
description: Audit this dotfiles repo for breakage, dead config, and improvements worth making. Use when the user asks to audit, review, or health-check the dotfiles, or names a scope to audit.
arg: "[scope]"
---

# Audit Dotfiles

Find two things: **dumpster fires** (broken, dead, wrong, insecure, or quietly rotting)
and **bells & whistles** (capabilities this setup should be using). Prefer **slam dunks**
— small, verifiable changes with clear payoff — and list **icebergs** separately instead
of starting them.

## Usage

`/dotfiles-doctor [scope]` — audit one scope, or every scope if none is given.

## How this repo works (read before judging anything)

* `home/` mirrors `$HOME` and is deployed by `dotctl` (`just up`). A directory holding a
  `.spread` marker has its children linked individually; one without it is linked whole,
  so whatever a tool writes there lands in the repo.
* **dotctl plans from the filesystem, not from git.** Untracked and ignored files under
  `home/`, empty directories included, are deployed too.
* `settings.json` uses the modify lane (`settings.json.modify`): managed keys overwrite,
  live-only keys survive. Deleting an object key in the repo does not remove it live.
* **The repo is public.** Runtime state (`fish_variables`, `known_hosts`, `*.db`, app
  state files) belongs on the machine, never in `home/`.
* `git status` hides tracked files carrying skip-worktree bits: audit with
  `git ls-files -v | grep -v '^H '`.
* The root `justfile` is the entry point for every repeatable workflow; `just explain
  <target>` resolves a live path to its source. Commits are `type(scope): subject`.

## Valid Scopes

| Scope | Source of truth | Covers |
| --- | --- | --- |
| `agents` | `home/.claude/`, `home/.codex/`, `AGENTS.md`, `.claude/` | Claude Code and Codex config, skills, commands, permissions |
| `aws` | `home/.aws/` | AWS CLI config (`credentials.age` is encrypted) |
| `bat` | `home/.config/bat/` | Pager theme and syntax cache (delta shares it) |
| `brew` | `scripts/data/Brewfile` | Formulae, casks, taps, and tap trust |
| `dock` | `scripts/setup/after/onchange/09-dock-apps.sh` | macOS Dock contents |
| `dprint` | `home/.config/dprint/` | Formatter config |
| `fish` | `home/.config/fish/` | Shell: config.fish, conf.d, functions, modules, completions |
| `gh` | `home/.config/gh/` | GitHub CLI (tokens must stay untracked) |
| `ghostty` | `home/.config/ghostty/` | Terminal config, which cmux reads |
| `git` | `home/.gitconfig`, `home/.config/git/`, `.git/hooks-personal` | Git config, hooks, guardrails |
| `hunk` | `home/.config/hunk/` | Review TUI, its extensions and theme |
| `infra` | `justfile`, `dotctl.config.json`, `home/.local/`, `home/Library/LaunchAgents/` | Workflow entry points, deploy config, scripts, launch agents |
| `karabiner` | `home/.config/karabiner/` | Keyboard remapping |
| `lazygit` | `home/.config/lazygit/` | Git TUI |
| `lnav` | `home/.config/lnav/` | Log navigator formats |
| `npm` | `home/.npmrc`, `scripts/data/npm/global-packages.txt` | npm config and global packages |
| `nvim` | `home/.config/nvim/` | Neovim; gate with `just lua-check` |
| `scripts` | `scripts/setup/{before,after}/{once,onchange}/` | Lifecycle scripts |
| `ssh` | `home/.ssh/config` | SSH config (`known_hosts` is machine state) |
| `starship` | `home/.config/starship.toml` | Prompt |
| `vscode` | `home/Library/Application Support/Code/User/` | VS Code, which runs vscode-neovim |
| `yazi` | `home/.config/yazi/` | File manager |
| `zed` | `home/.config/zed/` | Zed editor |

Any other directory under `home/.config/` (bookmarks, duti, libra, lsd, ripgrep, shan)
is its own scope: run the general checks against it.

## Audit Process

### 1. Scope-Specific Checks

Run the checks defined for that scope below.

### 2. General Checks (every scope)

* __Breakage__: does it still load? Run the tool's own validator (`fish -n`,
  `ghostty +validate-config`, `just lua-check`, `brew bundle check`) and check its
  version before calling a key deprecated.
* __Dangling references__: config, docs, or rules naming files, tools, or commands that
  no longer exist.
* __State in the repo__: anything the tool writes back into `home/` that should be local.
* __Staleness__: workarounds and TODOs whose cause is gone.
* __Consistency__: does it follow the patterns used elsewhere here?

### 3. Surprise Me

Find one capability worth adopting: a feature of an installed tool that isn't used, a
simplification, or a modern replacement.

## Scope-Specific Checks

### fish

1. __One owner per function__: `config.fish` sources `modules/*.fish` alphabetically, so a
   later module silently replaces an earlier one's function. Load every module the way
   `config.fish` does before asserting anything (`just fish-check`).
2. __Dead shortcuts__: abbreviations, aliases, and functions whose target isn't installed.
3. __abbr vs alias__: follow the rule stated above the abbreviation block in `config.fish`.
4. __Stale integrations__: blocks for tools no longer installed, duplicate PATH setup.
5. __Startup cost__: `hyperfine 'fish -i -c exit'`; profile with `fish --profile-startup`.

### brew

1. __Tap trust__: Homebrew refuses untrusted taps. Every tap package needs a fully
   qualified name plus `trusted: true`, or a fresh `brew bundle` fails.
2. __Declared vs installed__: `brew bundle check --verbose`, and `brew leaves` against the
   Brewfile. Note that `brew bundle cleanup --force` uninstalls anything undeclared and
   resets the trust store.
3. __Dead weight__: taps with no installed package, deprecated or disabled formulae,
   commented-out entries whose package is still installed.

### git

1. __Guardrails__: `just git-guardrail-check` — bare `git` opens the dashboard, and
   `checkout`, force pushes (`-f`, `+ref`, clusters like `-fu`, and `-C`/`-c` prefixed
   forms) and `reset --hard` are blocked interactively.
2. __Config__: keys deprecated for the installed git, settings pointing at missing tools.
3. __Aliases__: broken or redundant with the fish shortcuts.

### agents

1. __Dead config__: `skillOverrides` naming skills that exist in no skills directory or
   plugin, allow-list entries for removed plugins, broken skill symlinks.
2. __Dangling instructions__: CLAUDE.md, AGENTS.md, skills, or commands referring to
   removed rules, hooks, scripts, or skills.
3. __Skill hygiene__: kebab-case names matching their directory; Codex-only skills under
   `~/.codex/skills`; no duplicate skills shadowing each other.

### nvim, zed, vscode

1. __Deprecated APIs and settings__ for the installed version.
2. __Plugins and extensions__ configured but absent, or installed but unused.
3. __Keybindings__ that collide across the editor, the terminal, and Karabiner.

### starship, ghostty, lazygit, hunk, bat

1. __Config keys__ valid for the installed version.
2. __Theme consistency__: Tokyo Night is the house theme.
3. __Slow or erroring modules__ (`starship timings`).

### scripts, infra

1. __Broken recipes__: `just --list`, then check that each recipe's scripts and tools exist.
2. __Lifecycle scripts__ referencing removed tools.
3. __Launch agents__: every `ProgramArguments[0]` exists and the agent isn't crash-looping.

## Output Format

For each finding:

```
## [scope] Finding Title

**Kind**: dumpster fire | bells & whistles
**Severity**: low | medium | high
**Effort**: slam dunk | iceberg

**Evidence**: file:line, plus the command and the output that proves it.

**Fix**: the exact change — file, lines, replacement, or command.
```

End with an `## Icebergs` list: one line each, no investigation.
