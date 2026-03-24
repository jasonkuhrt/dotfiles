# Git Auto-Fetch

## Problem

Starship's `⇡⇣` ahead/behind counts and the Claude Code statusline's `⇡` unpushed count both read from local git tracking refs (`@{upstream}`). These refs only update on `git fetch`. Without periodic fetching, the prompt and statusline show phantom counts — e.g., `⇡21⇣6` when `git push` says "Everything up-to-date".

## Solution

A shared script that background-fetches when tracking refs are stale, called from two surfaces.

## Components

### `~/.local/bin/git-auto-fetch-maybe`

Bash script. Takes an optional directory argument (defaults to `$PWD`).

Logic:
1. Exit if not inside a git work tree
2. Exit if `.git` is not writable
3. Exit if `.git/NO_AUTO_FETCH` guard file exists
4. Read mtime of `.git/FETCH_LOG` — exit if less than `$GIT_AUTO_FETCH_INTERVAL` seconds old (default: 300)
5. Write timestamp to `FETCH_LOG`
6. Background `git fetch --all` with `GIT_TERMINAL_PROMPT=0` and `GIT_SSH_COMMAND="command ssh -o BatchMode=yes"` to prevent auth hangs
7. Append fetch output to `FETCH_LOG`

### `~/.config/fish/conf.d/git-auto-fetch.fish`

Fish prompt hook. Calls the shared script on each `fish_prompt` event.

### `~/.config/fish/functions/git-auto-fetch.fish`

User command. Toggles per-repo auto-fetch by creating/removing `.git/NO_AUTO_FETCH`.

### `~/.claude/statusline-command.sh` (modification)

Add one line near the top to call `git-auto-fetch-maybe "$cwd"`.

## Configuration

- `GIT_AUTO_FETCH_INTERVAL` — env var, seconds between fetches (default: 300)
- Per-repo disable: `git-auto-fetch` toggle command (creates `.git/NO_AUTO_FETCH`)

## What this does NOT do

- No `--recurse-submodules` (not needed, slower)
- No Fisher plugin or separate repo — lives entirely in dotfiles
- No daemon or cron — only runs when a prompt renders or statusline refreshes

## Prior art

- [oh-my-zsh git-auto-fetch plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git-auto-fetch) — same pattern, zsh-only
- `git maintenance prefetch` — does NOT update tracking refs (stores in `refs/prefetch/`), so it cannot fix this problem
