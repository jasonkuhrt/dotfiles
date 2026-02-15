# Lost Work — 2026-02-15

Working tree deletion of 4356 tracked files. Cause unknown. All non-hidden files were removed from disk; `.git/`, `.beads/`, `.claude/`, `.serena/` survived. Tracked files restored from `git checkout HEAD -- .`. Modifications and new untracked files below were not committed and are lost unless noted.

## Recovered

| File                                                      | Source                              | Notes                                                                                            |
| --------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| `.gitignore`                                              | Survived on disk                    | Added `tmp/`, removed shan-managed block                                                         |
| `sync`                                                    | CC file-history (Feb 11, 775 lines) | Added skills-library link, Agents section, Codex section. May be missing edits made after Feb 11 |
| `claude/rules/skill-scripts-bun-only.md`                  | Conversation context                | Added bash `.sh` script rules alongside `.ts` rules                                              |
| `claude/rules/debugging-hooks.md`                         | Conversation context                | New file — hook debugging patterns with counter file technique                                   |
| `claude/rules/no-branch-switching-in-shared-worktrees.md` | CC file-history (Feb 13)            | New file — prohibits `git checkout/switch/stash` in shared worktrees                             |

## Lost — Modified Tracked Files

These files exist at HEAD but had uncommitted modifications. The diffs are gone.

| File                                     | What was likely changed |
| ---------------------------------------- | ----------------------- |
| `fish/config.fish`                       | Unknown                 |
| `zed/settings.json`                      | Unknown                 |
| `serena/serena_config.yml`               | Unknown                 |
| `npmrc`                                  | Unknown                 |
| `sync-lib.sh`                            | Unknown                 |
| `packages/shan/.gitignore`               | Unknown                 |
| `claude/checks/ts.quality.md`            | Unknown                 |
| `claude/checks/ts.types.quality.md`      | Unknown                 |
| `claude/hooks/scripts/notify-ghostty.sh` | Unknown                 |
| `claude/skills/ts/SKILL.md`              | Unknown                 |
| `docs/how-it-works.md`                   | Unknown                 |
| `claude/rules/typescript.md`             | Unknown                 |

## Lost — New Untracked Files

These files were never committed and have no recovery source.

| File                                                 | Purpose                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------- |
| `claude/hooks/scripts/git-worktree-guard.sh`         | PreToolUse hook — blocked `git checkout/switch/stash` in shared worktrees |
| `claude/hooks/scripts/rename-ghostty-tab.sh`         | Hook script — renamed Ghostty tab on session events                       |
| `claude/hooks/scripts/skill-scripts-no-bun-on-sh.sh` | PreToolUse hook — blocked `bun` from running `.sh` scripts                |
| `claude/checks/ts.namespaces.quality.md`             | Quality check for TypeScript namespace patterns                           |
| `claude/skills/agent_markers/`                       | Skill for reviewing `@claude`/`@agent` markers in code                    |
| `claude/skills/check`                                | Skill — run code checks (replaced `review`)                               |
| `claude/skills/check_add/`                           | Skill — guided check creation                                             |
| `claude/skills/check_ask/`                           | Skill — interactive check dispatcher                                      |
| `claude/skills/check_gate/`                          | Skill — gate-tier checks shortcut                                         |
| `claude/skills/check_help/`                          | Skill — show available checks and config                                  |
| `claude/skills/check_polish/`                        | Skill — polish-tier checks shortcut                                       |
| `claude/skills/effect`                               | Skill — Effect conventions                                                |
| `claude/skills/find-session/`                        | Skill — find CC session by transcript search                              |
| `claude/skills/remind/`                              | Skill — save reminders/todos for later                                    |
| `codex/`                                             | Codex agent config (AGENTS.md, etc.)                                      |
| `zed-config-requirements.md`                         | Zed configuration requirements doc                                        |

## Lost — Deleted Tracked Files (intentional deletions, now reverted to HEAD)

These were intentionally deleted from the working tree (shown as `D` in original status) as part of the review→check rename. They are now restored to HEAD state.

| File                                    | Why it was deleted                           |
| --------------------------------------- | -------------------------------------------- |
| `claude/skills/effect_review`           | Replaced by `claude/skills/effect`           |
| `claude/skills/just`                    | Removed                                      |
| `claude/skills/review`                  | Replaced by `claude/skills/check`            |
| `claude/skills/review_/CORE.md`         | Part of review→check rename                  |
| `claude/skills/review_ask/SKILL.md`     | Replaced by `check_ask`                      |
| `claude/skills/review_gate/SKILL.md`    | Replaced by `check_gate`                     |
| `claude/skills/review_help`             | Replaced by `check_help`                     |
| `claude/skills/review_polish/SKILL.md`  | Replaced by `check_polish`                   |
| `claude/skills/review_quality/SKILL.md` | Replaced by `check_quality` (now in `check`) |

## Recovery Sources Checked

| Source                                      | Result                                                             |
| ------------------------------------------- | ------------------------------------------------------------------ |
| Git index (staged changes)                  | Clean — nothing was staged                                         |
| Git stash                                   | 4 entries, none relevant (oldest: `autostash` with 1 trivial file) |
| Git dangling blobs (`fsck`)                 | 0 — files were never `git add`'d                                   |
| Time Machine                                | Not configured                                                     |
| APFS local snapshots                        | Only OS update snapshots                                           |
| CC file-history (`~/.claude/file-history/`) | Recovered `sync`, `no-branch-switching.md`, `debugging-hooks.md`   |
| Conversation context                        | Recovered `skill-scripts-bun-only.md`, `debugging-hooks.md`        |
| Trash (`~/.Trash/`)                         | Empty for dotfiles content                                         |

## Cause

Unknown. No destructive git operations in reflog. No `rm` commands found in CC debug logs. Only non-hidden files were deleted — consistent with `rm -rf *` (glob doesn't match dotfiles) but no evidence of who/what ran it.
