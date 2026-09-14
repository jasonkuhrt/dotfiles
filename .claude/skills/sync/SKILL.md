---
name: sync
description: Use when the user says "sync" or wants to commit, rebase, push, and converge this dotfiles repo. Uses just up as the public converge command.
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
   - Use conventional commits: `type(scope): subject`. Scope is the surface touched
     (`claude`, `codex`, `fish`, `git`, `brew`, `just`, `hunk`, …) — follow `git log --oneline`
   - Example: fish config change + claude settings change = 2 commits

3. **Rebase onto remote**
   ```bash
   git pull --rebase --no-autostash
   ```
   `rebase.autoStash` is on globally, but this checkout is shared with other agents and
   stashing there is banned. If the rebase refuses because the tree is dirty, go back to
   step 2 and commit the work.

4. **Resolve conflicts if any**
   - Read the conflicted file, resolve it, then:
     ```bash
     git add <file>
     ```
   - Commit the resolution if needed

5. **Converge the machine**
   ```bash
   just up
   just prune   # drop symlinks the deployment plan no longer contains
   ```

6. **Inspect post-converge drift**
   - `just up` never copies live edits back into the repo; deploy only writes targets
   - If an app replaced a managed symlink with a real file (`test -L <target>` fails),
     copy that file into `home/` before converging, or `just up` reverts it
   - Run `git status` again and commit anything intended

7. **Push**
   ```bash
   git push
   git status
   ```

8. **Relay sudo reminder if shown**
   - If the output asks for privileged setup, tell the user to run `just sudo-setup`

## What `just up` Does

**`just up`** runs, in order:
- `scripts/setup/before/*` (brew bundle, node toolchain, …)
- deploy: symlink, modify and encrypted entries; a conflicting real file is moved to
  `.dotctl-backup-*`
- regenerates the cached manifest that `just explain` and `just status` read
- `scripts/setup/after/*` (macOS defaults, dock, gh extensions, bat cache, …)

It prunes nothing: `just prune` removes symlinks into the repo that the plan dropped.
The launchd healer is gone — dotctl removed that daemon upstream.

**`just sudo-setup`** (user runs manually, only if needed):
- Power management (display sleep)
- Touch ID for sudo
- Fish as default shell (/etc/shells + chsh)

## Troubleshooting

- **Machine health:** `just status`
- **Deep drift check:** `just doctor`
- **Explain one target:** `just explain <target>`
- **Low-level diff:** `dotctl status` / `just status`
- **Encrypted files:** `just edit <target>`
