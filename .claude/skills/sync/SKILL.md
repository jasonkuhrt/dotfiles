---
name: sync
description: Use when user says "sync" or wants to commit, push, pull, and run the dotfiles sync script
---

# Sync

Full dotfiles sync: commit, git sync, resolve conflicts, run sync script.

## Steps

1. **Check for changes**
   ```bash
   git status
   git diff
   ```

2. **Commit if changes exist**
   - Stage all changes
   - Commit with conventional commit message
   - Use appropriate scope from CLAUDE.md

3. **Git sync**
   ```bash
   git sync  # alias for: git pull --rebase && git push
   ```

4. **Resolve conflicts if any**
   - Autostash conflicts are common with `claude/settings.json`
   - Read conflicted file, resolve intelligently, then:
     ```bash
     git add <file>
     git stash drop  # if autostash conflict
     ```
   - Commit and push resolution

5. **Run sync script**
   ```bash
   ./sync
   ```

## Notes

- Sync script without sudo skips password-protected operations (casks, Touch ID, shell change)
- This is expected in Claude Code sessions - no sudo access
- User can run `sudo ./sync` manually later for full sync
