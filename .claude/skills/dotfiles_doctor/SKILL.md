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

Source of truth now lives in both `home/` and `symlink-roots/`, depending on lane. Use `just explain <target>` when a live path is ambiguous.

| Scope      | Source of truth                | Description                  |
| ---------- | ------------------------------ | ---------------------------- |
| `aws`      | private_dot_aws/               | AWS CLI configuration        |
| `brew`     | Brewfile                       | Homebrew packages and casks  |
| `chezmoi`  | .chezmoi*.toml*                | chezmoi configuration        |
| `claude`   | home/dot_claude/, symlink-roots/claude/ | Claude Code configuration |
| `direnv`   | symlink-roots/config/direnv/ | Directory environment loader |
| `dock`     | dock/                          | macOS Dock configuration     |
| `dprint`   | symlink-roots/config/dprint/ | Code formatter config       |
| `fish`     | dot_config/fish/               | Fish shell configuration     |
| `gh`       | dot_config/gh/                 | GitHub CLI configuration     |
| `ghostty`  | symlink-roots/config/ghostty/ | Ghostty terminal config    |
| `git`      | symlink-roots/config/git/, home/dot_gitconfig | Git configuration |
| `lazygit`  | symlink-roots/config/lazygit/ | Git TUI configuration      |
| `npm`      | dot_npmrc, npm/                | npm configuration            |
| `nvim`     | dot_config/nvim/               | Neovim configuration         |
| `scripts`  | .chezmoiscripts/               | Lifecycle scripts            |
| `ssh`      | private_dot_ssh/               | SSH configuration            |
| `starship` | dot_config/starship*.toml      | Starship prompt config       |
| `zmx`      | dot_config/fish/, dot_config/starship.toml | zmx workflow + prompt context |
| `zsm`      | Brewfile                       | zmx session manager install  |
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

1. __Rule accuracy__: Are rules in `symlink-roots/claude/rules/` and other global Claude sources still accurate?
2. __Lane placement__: Do files under `home/dot_claude/` vs `symlink-roots/claude/` still belong in the right lane?
3. __Scope coverage__: Are there missing rules for common workflows?

### chezmoi

1. __Script idempotency__: Are all lifecycle scripts fully idempotent?
2. __Hash triggers__: Are `run_onchange_` scripts using correct hash comments?
3. __Lane fit__: Are `trueDir`, `fileSymlink`, and `special` lanes still assigned correctly?
4. __Naming conventions__: Are `exact_`, `private_`, `encrypted_` prefixes used correctly?

### npm

1. __Global packages__: Are packages in npm/global-packages.txt still needed?
2. __npmrc settings__: Are all settings still relevant?

### zmx

1. __Workflow consistency__: Are session attach helpers still aligned across fish/zed docs?
2. __Prompt context__: Is `ZMX_SESSION` shown correctly in Starship when attached?
3. __Failure modes__: Is behavior documented for detached sessions and stale names?

### lazygit

1. __Keybinding audit__: Any custom keybindings that conflict or are unused?
2. __Theme consistency__: Does theme match terminal aesthetic?

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
