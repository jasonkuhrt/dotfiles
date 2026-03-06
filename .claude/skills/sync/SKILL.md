---
name: sync
description: Use when the user says "sync" or wants to commit, rebase, push, and converge this dotfiles repo. Uses just up as the public converge command instead of raw chezmoi apply.
---

# Sync

Full dotfiles sync: commit, rebase, converge with `just up`, then push.

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

3. **Rebase onto remote**
   ```bash
   git pull --rebase
   ```

4. **Resolve conflicts if any**
   - Read conflicted file, resolve intelligently, then:
     ```bash
     git add <file>
     git stash drop  # if autostash conflict
     ```
   - Commit resolution if needed

5. **Converge the machine**
   ```bash
   just up
   ```

6. **Inspect post-converge drift**
   - `just up` can capture intentional live config back into repo source
   - Run `git status` again
   - If new intentional source changes appeared, commit them before pushing

7. **Push the data and git remotes**
   ```bash
   bd dolt pull
   bd dolt push
   git push
   git status
   ```

8. **Relay sudo reminder if shown**
   - If output shows `sudo ./scripts/sync-sudo`, tell the user exactly that

## What `just up` Does

**`just up`**:
- refreshes the cached symlink manifest
- runs the dotctl healer once
- applies chezmoi in symlink mode
- Runs lifecycle scripts (brew bundle, node setup, macOS defaults, etc.)
- installs or reloads the launchd healer
- leaves read-only inspection to `just status`, `just doctor`, and `just explain`

**`./scripts/sync-sudo`** (user runs manually, only if needed):
- Power management (display sleep)
- Touch ID for sudo
- Fish as default shell (/etc/shells + chsh)

## Troubleshooting

- **Machine health:** `just status`
- **Deep drift check:** `just doctor`
- **Explain one target:** `just explain <target>`
- **Low-level diff:** `chezmoi diff`
- **Encrypted files:** `chezmoi edit <target>`
