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
   just prune           # lists symlinks the deployment plan no longer contains
   just prune --force   # removes them, after reading the list
   ```

6. **Inspect post-converge drift**
   - `just up` never copies live edits back into the repo; deploy only writes targets
   - If an app replaced a managed symlink with a real file whose bytes differ, `just up`
     refuses that entry, exits 1, and prints the `mv` that clears it. Copy the file into
     `home/` first if its content should be kept
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
- deploy: symlinks, plus `F.merge` patches merged into JSON targets; a conflicting real
  file or directory is refused with a `mv` remedy, never displaced
- records the deployed targets, and reports any that have left the plan
- `scripts/setup/after/*` (macOS defaults, dock, gh extensions, bat cache, …)

It prunes nothing: `just prune` lists symlinks into the repo that the plan dropped, and
`just prune --force` removes them.
The launchd healer is gone — dotctl removed that daemon upstream.

**`just sudo-setup`** (user runs manually, only if needed):
- Power management (display sleep)
- Touch ID for sudo
- Fish as default shell (/etc/shells + chsh)

## Troubleshooting

- **What would change:** `just up --dry-run` prints every entry a real run would change and
  the scripts it would run, writes nothing, and exits 1 when the real run would fail
- **Leftover symlinks:** `just prune`
