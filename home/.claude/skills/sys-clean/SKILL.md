---
name: sys-clean
description: Use when Jason says "sys clean", says his Mac is slow, hot, loud, swapping, out of memory or out of disk, asks what is eating CPU, RAM or disk, asks to clean up or optimize his machine, or when an agent finds the machine near the 95% capacity limit before heavy work. Measures the machine, runs the daily disk clean now, then the routines that need judgment (idle dev processes, background apps, what the daily clean can't reach), and measures again.
---

# Sys clean

Jason will not run maintenance tasks himself. This skill is how his Mac gets
looked after: you measure it, run every routine below, and show what each one
freed. Each routine has its own owner and policy; this skill only composes them.

## The daily disk clean

MeOS runs `meos-sys-clean` at 04:30 every day (launchd
`com.jasonkuhrt.meos-sys-clean`, code in `~/me/code/lib/sys-clean/`). Its
policy lives in that code's `POLICY`; each step takes back only what its owner
can rebuild or has already preserved:

| Step | What it does | Skips when |
|---|---|---|
| Worktrees | `git-cleanup` plan and apply on Heartbeat | a changed file in the primary checkout was written in the last 24 hours |
| Cargo targets | deletes a `target/` (with `CACHEDIR.TAG` and a sibling `Cargo.toml`) under `~/projects` and `~/repo-references` with no file written in 3 days | |
| Go cache | keeps `go env GOCACHE` to its 20 GB most recently used entries | Go isn't installed |
| pnpm store | `pnpm store prune` | a pnpm install is running: the prune has no lock and would sweep packages it is linking |
| Homebrew | `brew cleanup --prune=7` | |

- Run it now: `just sys-clean` in `~/me`. One run at a time; a second fails at once.
- Log: `~/Library/Logs/meos-sys-clean/run.log`, one line per step with what it freed.
- A failed step files a beads task under the MeOS area (`--external-ref sys-clean:<step>`). A git-cleanup repair is resumed through the `git-cleanup` skill, with the journal the task names.

Why it exists: on 2026-11-07 the 1 TB disk reached 2.6 GB free three times in a
week. Go's cache had grown to 65 GB in 4 days (Go only trims entries unused for
5 days, and has no size cap), Heartbeat had 71 worktrees, three idle Rust
`target/` folders held 26 GB, and 242 of the pnpm store's 317 registered
projects no longer existed.

## 1. Measure

Run these together and keep the numbers for the before-and-after:

```bash
sysctl -n hw.ncpu hw.memsize; sysctl vm.loadavg vm.swapusage
memory_pressure | tail -1
ps -Ao pcpu,pmem,rss,comm -r | head -20
df -h /System/Volumes/Data | tail -1
```

Group memory by process family (node, chrome, claude, codex/chatgpt, other),
summing `ps -Ao rss,comm` by name. Group node by worktree: map each pid's cwd
(`lsof -a -p <pid> -d cwd -Fn`) to its git worktree root.

For disk, size the known buckets in parallel, each `du -sk` in the background
with a timeout (some take minutes): `~/repo-references`, `~/projects`,
`~/Library/pnpm`, `$(go env GOCACHE)`, `~/.codex`, `~/.claude`, `~/.local`,
`~/Library/Caches`, `~/Library/Application Support/*` and
`~/Library/Group Containers/*`.

- What a delete freed is the change in `df`, never `du`: APFS clones and
  pnpm's hard links make `du` count bytes a delete doesn't free.
- Other sessions clean too. Read `df` again right before acting; on
  2026-11-07 another session emptied the Go cache while this one measured it.

Open with the verdict: which resource is short and by how much.

- CPU is short when load is above the core count.
- Memory is short when swap use is above half, or free memory is under 20%.
- Disk is short when less than 50 GB is free.

## 2. Routines, in this order

The order matters: processes hold worktrees open, so they go first.

1. **Idle dev processes.** These are node, Playwright Chromium, Maple and
   Alchemy processes in a worktree with no live agent session. Check Claude
   sessions with `mcp__ccd_session_mgmt__list_sessions`, and check the
   worktree for recent file changes. Never touch a worktree with a running
   session. Send `kill` (TERM) first, and `kill -9` only to processes still
   alive after 10 seconds.
2. **The daily disk clean, now:** `just sys-clean` in `~/me`. Its policy is
   standing; it needs no OK.
3. **What the daily clean skips or can't reach.**
   - A worktrees step it skipped because the primary checkout is in use:
     the `git-cleanup` skill by hand, once that session is done.
   - **Reference worktrees in `~/repo-references`** (177 GB across 706
     clones on 2026-11-07). git-cleanup can't run there unattended: most are
     forks whose `origin` is upstream (preservation goes to Jason's fork
     remote, `--remote fork`), and a dirty submodule in a primary checkout
     blocks every target. Look up each `-uw-`/`-wt-` worktree's PR on the
     upstream repository; remove the ones whose PR merged or closed after
     checking their branch is on the fork; `trash` dated snapshot clones
     nothing references.
   - Other repositories with many worktrees: the `git-cleanup` skill.
4. **Background apps.** These are helpers using more than 10% CPU with nothing
   visible to show for it, such as updater agents. Quitting an app is his to do: name it.

Jason's data, never deleted; name it with its size when disk is short:
Steam and CrossOver games, OrbStack's Docker data (pruning needs OrbStack
running), pre-upgrade copies under `~/.local/state/tooling-upgrades/`,
`~/.local/state/msgvault-backups`, Claude and Codex transcripts
(`~/.claude/projects`, `~/.codex/archived_sessions`), Downloads and Pictures.

Already settled, and not to be raised again:

- Spotlight is off (`scripts/sync-sudo.sh` in dotfiles).
- Caffeine and sleep prevention are on purpose.
- Codex Computer Use stays running: he uses it.
- The Dropbox, Google and Steam updater LaunchAgents are disabled
  (`launchctl disable gui/$UID/<label>`).

## 3. Ask once, then act

Show one table with each candidate from routines 1, 3 and 4, its routine, what
it frees (GB or CPU %), and why it's safe. Ask once for the whole set ("Clean
these 14?"). Then run the routines in order, and measure again to show the
before and after.

Never change a system setting, run sudo, or quit an app he is using. Name it
and let him do it.
