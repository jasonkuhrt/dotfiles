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
| `claude/hooks/scripts/git-worktree-guard.sh`              | CC file-history                     | New file — PreToolUse hook blocking git branch switches                                          |
| `claude/hooks/scripts/skill-scripts-no-bun-on-sh.sh`      | CC session JSONL (5d1909f0)         | New file — PreToolUse hook blocking bun on .sh scripts                                           |
| `claude/hooks/scripts/rename-ghostty-tab.sh`              | CC file-history                     | New file — UserPromptSubmit hook for /rename tab titles (cleaned of debug logging)                |
| `claude/skills/check/SKILL.md`                            | CC file-history (69fe4eee)          | New file — main check skill (258 lines), replaces review                                        |
| `claude/skills/check/add/SKILL.md`                        | CC file-history (69fe4eee)          | New file — guided check creation workflow (191 lines)                                           |
| `claude/skills/check/help/SKILL.md`                       | CC file-history (69fe4eee)          | New file — checks system help display                                                            |
| `claude/skills/check_add/SKILL.md`                        | CC file-history (69fe4eee)          | New file — redirect stub for check:add                                                          |
| `claude/skills/check_ask/SKILL.md`                        | CC file-history (69fe4eee)          | New file — redirect stub for check:ask                                                          |
| `claude/skills/check_gate/SKILL.md`                       | CC file-history (69fe4eee)          | New file — redirect stub for check:gate                                                         |
| `claude/skills/check_help/SKILL.md`                       | CC file-history (69fe4eee)          | New file — redirect stub for check:help                                                         |
| `claude/skills/check_polish/SKILL.md`                     | CC file-history (69fe4eee)          | New file — redirect stub for check:polish                                                       |
| `claude/skills/effect/SKILL.md`                           | CC file-history (69fe4eee)          | New file — Effect conventions (46 lines), separate from effect_review                           |
| `claude/skills/effect/CHECKS.quality.md`                  | CC session JSONL (e422f24f)         | New file — 15 Effect quality checks (335 lines)                                                 |
| `claude/skills/remind/SKILL.md`                           | CC session JSONL (f66170fd)         | New file — reminder/todo skill                                                                   |
| `claude/skills/find-session/SKILL.md`                     | CC file-history (7594b7e0)          | New file — CC session search skill                                                               |
| `claude/rules/typescript.md`                              | CC file-history (69fe4eee)          | Modified — `/review @checks` → `/check @checks`                                                |

## Lost — Modified Tracked Files

These files exist at HEAD but had uncommitted modifications. The diffs are gone.

| File                                     | What was likely changed                     |
| ---------------------------------------- | ------------------------------------------- |
| `fish/config.fish`                       | Many incremental edits (100+ across sessions), no full Write found |
| `zed/settings.json`                      | tmux shell config added to terminal section |
| `serena/serena_config.yml`               | Unknown                                     |
| `npmrc`                                  | Already on disk, intact                     |
| `sync-lib.sh`                            | Already on disk, matches recovered version  |
| `packages/shan/.gitignore`               | Unknown                                     |
| `claude/checks/ts.quality.md`            | Already on disk, intact                     |
| `claude/checks/ts.types.quality.md`      | Already on disk, intact                     |
| `claude/hooks/scripts/notify-ghostty.sh` | One Edit simplified notification to sound-only; on-disk has pre-edit version |
| `claude/skills/ts/SKILL.md`              | Already on disk, intact                     |
| `docs/how-it-works.md`                   | Already on disk, matches recovered version  |

## Lost — New Untracked Files

These files were never committed and have no recovery source.

| File                                                 | Purpose                                                                   | Status           |
| ---------------------------------------------------- | ------------------------------------------------------------------------- | ---------------- |
| `claude/hooks/scripts/git-worktree-guard.sh`         | PreToolUse hook — blocked `git checkout/switch/stash` in shared worktrees | **RECOVERED**    |
| `claude/hooks/scripts/rename-ghostty-tab.sh`         | Hook script — renamed Ghostty tab on session events                       | **RECOVERED**    |
| `claude/hooks/scripts/skill-scripts-no-bun-on-sh.sh` | PreToolUse hook — blocked `bun` from running `.sh` scripts                | **RECOVERED**    |
| `claude/checks/ts.namespaces.quality.md`             | Quality check for TypeScript namespace patterns                           | Unrecoverable    |
| `claude/skills/agent_markers/`                       | Skill for reviewing `@claude`/`@agent` markers in code                    | Project-specific (Heartbeat), not dotfiles |
| `claude/skills/check`                                | Skill — run code checks (replaced `review`)                               | **RECOVERED**    |
| `claude/skills/check_add/`                           | Skill — guided check creation                                             | **RECOVERED**    |
| `claude/skills/check_ask/`                           | Skill — interactive check dispatcher                                      | **RECOVERED**    |
| `claude/skills/check_gate/`                          | Skill — gate-tier checks shortcut                                         | **RECOVERED**    |
| `claude/skills/check_help/`                          | Skill — show available checks and config                                  | **RECOVERED**    |
| `claude/skills/check_polish/`                        | Skill — polish-tier checks shortcut                                       | **RECOVERED**    |
| `claude/skills/effect`                               | Skill — Effect conventions                                                | **RECOVERED**    |
| `claude/skills/find-session/`                        | Skill — find CC session by transcript search                              | **RECOVERED**    |
| `claude/skills/remind/`                              | Skill — save reminders/todos for later                                    | **RECOVERED**    |
| `codex/`                                             | Codex agent config (AGENTS.md, etc.)                                      | Unrecoverable    |
| `zed-config-requirements.md`                         | Zed configuration requirements doc                                        | Unrecoverable    |

## Lost — Deleted Tracked Files (intentional deletions, now reverted to HEAD)

These were intentionally deleted from the working tree (shown as `D` in original status) as part of the review→check rename. They are now restored to HEAD state. The new `check` replacements have been recovered above.

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
| CC file-history (`~/.claude/file-history/`) | Recovered hook scripts, check skills, effect skill, find-session, typescript.md, how-it-works.md |
| CC session JSONL (`~/.claude/projects/`)    | Recovered no-bun-on-sh hook, remind skill, effect CHECKS, effect-review SKILL |
| CC plan files (`~/.claude/plans/`)          | Architectural descriptions only, no file contents                  |
| Conversation context                        | Recovered `skill-scripts-bun-only.md`, `debugging-hooks.md`        |
| Trash (`~/.Trash/`)                         | Empty for dotfiles content                                         |

## Cause

Unknown. No destructive git operations in reflog. No `rm` commands found in CC debug logs. Only non-hidden files were deleted — consistent with `rm -rf *` (glob doesn't match dotfiles) but no evidence of who/what ran it.
