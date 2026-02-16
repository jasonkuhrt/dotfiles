---
name: sync
description: Use when user says "sync" or wants to commit, push, pull, and apply dotfiles via chezmoi. Also use when a chezmoi apply fails.
---

# Sync

Full dotfiles sync: commit, git sync, apply via chezmoi.

## Steps

1. **Check for changes**
   ```bash
   git status
   git diff
   ```

2. **Commit if changes exist**
   - Analyze diff for distinct semantic changes
   - Make multiple commits if changes span different scopes/concerns
   - Use conventional commit format with scope from CLAUDE.md
   - Example: fish config change + claude settings change = 2 commits

3. **Git sync**
   ```bash
   git sync  # alias for: git pull --rebase && git push
   ```

4. **Resolve conflicts if any**
   - Read conflicted file, resolve intelligently, then:
     ```bash
     git add <file>
     git stash drop  # if autostash conflict
     ```
   - Commit and push resolution

5. **Apply dotfiles** (Claude Code runs this directly)
   ```bash
   chezmoi apply -v
   ```

6. **Relay sudo reminder if shown**
   - The script auto-detects if `sync-sudo` is needed
   - If output shows "Next: Run sudo ./sync-sudo", relay that to user
   - If no reminder shown, everything is configured - done!

## What chezmoi apply Does

**`chezmoi apply`** (Claude Code runs directly):
- Deploys config files from `home/` source state to `$HOME`
- Runs lifecycle scripts (brew bundle, node setup, macOS defaults, etc.)
- Installs Fisher plugins and npm global packages
- `run_once_` scripts run only on first apply; `run_onchange_` scripts re-run when content changes

**`./sync-sudo`** (user runs manually, only if needed):
- Power management (display sleep)
- Touch ID for sudo
- Fish as default shell (/etc/shells + chsh)

## Troubleshooting

- **Preview changes:** `chezmoi diff`
- **Dry run:** `chezmoi apply --dry-run`
- **System health:** `chezmoi doctor`
- **Drift detection:** `chezmoi verify`
- **Capture external changes:** `chezmoi re-add <file>`
