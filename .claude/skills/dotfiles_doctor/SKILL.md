---
name: dotfiles:doctor
description: Audit dotfiles setup for improvements, obsolete workarounds, and optimization opportunities. Use when user runs /audit or asks to audit their dotfiles configuration.
arg: "[scope]"
---

# Audit Dotfiles

Audit the dotfiles setup for improvements, obsolete workarounds, and optimization opportunities.

## Usage

`/audit [scope]` - Audit a specific scope, or all if none given.

## Valid Scopes

Source files live in `home/` with chezmoi naming conventions.

| Scope      | Source (in `home/`)            | Description                  |
| ---------- | ------------------------------ | ---------------------------- |
| `aws`      | private_dot_aws/               | AWS CLI configuration        |
| `brew`     | Brewfile                       | Homebrew packages and casks  |
| `chezmoi`  | .chezmoi*.toml*                | chezmoi configuration        |
| `claude`   | dot_claude/                    | Claude Code configuration    |
| `direnv`   | dot_config/direnv/             | Directory environment loader |
| `dock`     | dock/                          | macOS Dock configuration     |
| `dprint`   | dot_config/dprint/             | Code formatter config        |
| `fish`     | dot_config/fish/               | Fish shell configuration     |
| `gh`       | dot_config/gh/                 | GitHub CLI configuration     |
| `ghostty`  | dot_config/ghostty/            | Ghostty terminal config      |
| `git`      | dot_config/git/, dot_gitconfig | Git configuration            |
| `gitmux`   | dot_config/gitmux/             | Git info in tmux status      |
| `lazygit`  | dot_config/lazygit/            | Git TUI configuration        |
| `npm`      | dot_npmrc, npm/                | npm configuration            |
| `nvim`     | dot_config/nvim/               | Neovim configuration         |
| `scripts`  | .chezmoiscripts/               | Lifecycle scripts            |
| `ssh`      | private_dot_ssh/               | SSH configuration            |
| `starship` | dot_config/starship*.toml      | Starship prompt config       |
| `tmux`     | dot_config/tmux/               | tmux terminal multiplexer    |
| `zed`      | dot_config/zed/                | Zed editor configuration     |

## Audit Process

For each scope, run these checks in order:

### 1. Scope-Specific Checks

Run the defined checks for that scope (see below).

### 2. General Checks (all scopes)

* __Staleness__: Are there workarounds, hacks, or TODOs that are now obsolete?
* __Documentation__: Is any README or inline documentation accurate and up-to-date?
* __Consistency__: Does this follow patterns used elsewhere in the dotfiles?

### 3. Surprise Me

After specific checks, discover something new:

* A fish feature not being leveraged
* A tool integration that would improve workflow
* A simplification opportunity
* A modern replacement for something outdated

## Scope-Specific Checks

### fish

1. __Semantic organization__: Is config.fish optimally split for human management?
   * Are related functions grouped together?
   * Should any sections be extracted to separate files?

2. __Fish feature usage__: Are fish-specific features being leveraged?
   * Abbreviations vs aliases (used correctly?)
   * Event handlers
   * Universal variables
   * Autoloading functions in ~/.config/fish/functions/

3. __Obsolete workarounds__: Check for stale hacks:
   * `fish_default_key_bindings` Zed vim conflict - still needed?
   * fnm workaround comments - still relevant?
   * Any `# TODO` or `# HACK` comments

### brew

1. __Package audit__: Are all packages still used?
2. __Cask audit__: Are all casks still installed/needed?
3. __Tap audit__: Are all taps still needed?
4. __Duplicates__: Any packages that overlap in functionality?

### git

1. __Alias audit__: Are git aliases still useful or redundant with fish aliases?
2. __Config modernization__: Any deprecated git config options?

### zed

1. __Keybinding conflicts__: Any keybindings that conflict with system or fish?
2. __Extension audit__: Are all extensions still used/needed?
3. __Settings modernization__: Any deprecated settings?

### starship

1. __Module audit__: Are all enabled modules useful?
2. __Performance__: Any slow modules that could be optimized?
3. __Consistency__: Does prompt style match overall terminal aesthetic?

### claude

1. __Rule accuracy__: Are rules in `home/dot_claude/exact_rules/` still accurate?
2. __Scope coverage__: Are there missing rules for common workflows?

### chezmoi

1. __Script idempotency__: Are all lifecycle scripts fully idempotent?
2. __Hash triggers__: Are `run_onchange_` scripts using correct hash comments?
3. __Naming conventions__: Are `exact_`, `private_`, `encrypted_` prefixes used correctly?

### npm

1. __Global packages__: Are packages in npm/global-packages.txt still needed?
2. __npmrc settings__: Are all settings still relevant?

### tmux

1. __Plugin audit__: Are all plugins (resurrect, continuum, sessionx, etc.) still used?
2. __Keybinding conflicts__: Any keybindings that conflict with Zed, Ghostty, or system?
3. __Performance__: Are plugins slowing down tmux startup?
4. __Integration check__: Is gitmux displaying correctly in status bar?
5. __Session management__: Are resurrect/continuum saving and restoring properly?

### lazygit

1. __Keybinding audit__: Any custom keybindings that conflict or are unused?
2. __Theme consistency__: Does theme match terminal aesthetic?

### gitmux

1. __Format accuracy__: Is the status bar format still useful?
2. __Integration__: Is it loading correctly in tmux.conf?

### (other scopes)

For scopes without specific checks defined, run only general checks and "Surprise Me".

## Output Format

For each finding, report:

```
## [scope] Finding Title

**Type**: obsolete | improvement | bug | documentation
**Severity**: low | medium | high

Description of the finding.

**Recommendation**: What to do about it.
```
