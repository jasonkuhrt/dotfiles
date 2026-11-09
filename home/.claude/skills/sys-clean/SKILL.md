---
name: sys-clean
description: Use when Jason says "sys clean", says his Mac is slow, hot, loud, swapping, out of memory or out of disk, asks what is eating CPU, RAM or disk, asks to clean up or optimize his machine, or when an agent finds the machine near the 95% capacity limit before heavy work. Measures the machine (the disk with dust), runs the daily disk clean now, empties the Trash, then the routines that need judgment (idle dev processes, background apps, what the daily clean can't reach), and measures again.
---

# Sys clean

Jason will not run maintenance tasks himself. This skill is how his Mac gets
looked after: you measure it, run every routine below, and show what each one
freed. Each routine has its own owner and policy; this skill only composes them.

## The daily disk clean

MeOS runs `meos-sys-clean` at 04:30 every day (launchd
`com.jasonkuhrt.meos-sys-clean`), and every hour while the disk has under
50 GB free (`com.jasonkuhrt.meos-sys-clean-short`, `run --when-short`): on
2026-11-08 Go's cache grew from nothing to 77 GB between one morning's run and
midnight. Code in `~/me/.machinery/code/lib/sys-clean/`. Its
policy lives in that code's `POLICY`; each step takes back only what its owner
can rebuild or has already preserved:

| Step | What it does | Skips when |
|---|---|---|
| Worktrees | `git-cleanup` plan and apply on Heartbeat | a changed file in the primary checkout was written in the last 24 hours |
| Reference clones | keeps the fewest heads in `~/repo-references` (below), saving any uncommitted work first | per head: written in the last 3 days, or a submodule with uncommitted changes; a clone also when its commit is only here, or it has a stash or unpushed commits |
| Cargo targets | deletes a `target/` (with `CACHEDIR.TAG` and a sibling `Cargo.toml`) under `~/projects` and `~/repo-references` with no file written in 3 days | |
| Go cache | keeps `go env GOCACHE` to its 20 GB most recently used entries | Go isn't installed |
| pnpm store | `pnpm store prune` | a pnpm install is running: the prune has no lock and would sweep packages it is linking |
| Homebrew | `brew cleanup --prune=7` | |
| Trash | deletes what was trashed more than 7 days ago (moving into the Trash sets an item's ctime) | an item another user owns, such as an app installer's files: it needs `sudo` |

- Run it now: `just sys-clean` in `~/me`. One run at a time; a second fails at once.
- Log: `~/Library/Logs/meos-sys-clean/run.log`, one line per step with what it freed.
- A failed step files a beads task under the MeOS area (`--external-ref sys-clean:<step>`). A git-cleanup repair is resumed through the `git-cleanup` skill, with the journal the task names.

**Reference clones keep the fewest heads.** Jason, 2026-11-07: "for repo
references i just want the least heads, if these are forks that's another
thing". Heads are grouped by their origin (`owner/repo`):

- A pure reference keeps one clone: the one named after the repository, else
  the one with the newest commit. Version and dated copies and worktrees of the
  same upstream are extra; `git worktree add <path> <tag>` from the kept clone
  brings a version back.
- A fork (a `jasonkuhrt/` remote) keeps its clones; its worktrees are extra.
  Removing one keeps its branch in the clone, so `git worktree add` restores it.
- Every other extra head goes. The only ones kept are in the skip column, and
  uncommitted work is saved first. Jason, 2026-11-08, after a session left 21
  saveable heads and suggested deferring them: "why not remove those ref
  heads???", then "consider this a skill failure".
  - **A worktree:** its changes, and any commits no branch holds, become a
    commit whose parent is its HEAD, on
    `refs/sys-clean/preserved/<name>/<time>` in its clone, which stays. To
    restore: `git worktree add <path> <ref>`, then `git reset HEAD~1` in it.
  - **A clone** on a commit its origin has: re-cloneable, so it goes. Any
    changes are saved first to
    `~/.local/state/meos-sys-clean/preserved/<name>/<time>.patch`: one
    `deleted: <path>` line per deleted file, then a patch of everything else,
    headed by the restore command.
  - The save starts from the checkout's own index, so files a sparse checkout
    skips aren't recorded as deletions. It is checked to hold every file
    `.gitignore` doesn't exclude before anything is deleted, and it never
    overwrites an earlier save. Ignored files (`node_modules`, a local `.env`)
    go with the folder (Jason's OK, 2026-11-07).
  - Read-only folders, such as a Go module cache inside a worktree, are made
    writable before deleting.
- "Last used" is write time. Read time (atime) is useless here: something
  reads every clone at once now and then, and on 2026-11-02 11 of 58 sampled
  clones were last read in the same hour.

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

For disk, map the whole data volume with `dust` (Homebrew, installed), in the
background since it takes about 5 minutes:

```bash
dust -x -p -b -d 3 -n 70 /System/Volumes/Data 2>/dev/null
```

Show it as one table of the buckets that matter, grouped by what they are
(code and agents, games, macOS and apps, Jason's files, Trash), each with GB.

- What a delete freed is the change in `df`, never `dust` or `du`: APFS
  clones and pnpm's hard links count the same bytes in several places. On
  2026-11-07 `dust` summed to 915 GB on a volume using 825 GB.
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
3. **Empty the Trash**, all of it, when disk is short: `find ~/.Trash
   -mindepth 1 -maxdepth 1 -exec rm -rf {} +`. The daily clean only deletes
   items trashed over 7 days ago, so agents' recent trash stays undoable until
   this step. An item another user owns needs `sudo`: give Jason the one-line
   command.
4. **What the daily clean skips or can't reach.**
   - A worktrees step it skipped because the primary checkout is in use:
     the `git-cleanup` skill by hand, once that session is done.
   - A reference head the daily clean couldn't save or remove (its log says
     `failed:`): fix the step in `~/me/code/lib/sys-clean/` and run it
     again. Never leave a head that could be saved and removed, and never
     defer one because disk isn't short.
   - Other repositories with many worktrees: the `git-cleanup` skill.
5. **Background apps.** These are helpers using more than 10% CPU with nothing
   visible to show for it, such as updater agents. Quitting an app is his to do: name it.

Jason's data, never deleted; name it with its size when disk is short:
Steam and CrossOver games (Death Stranding is 72 GB), OrbStack's Docker data (pruning needs OrbStack
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

Show one table with each candidate from routines 1, 4 and 5, its routine, what
it frees (GB or CPU %), and why it's safe. Ask once for the whole set ("Clean
these 14?"). Then run the routines in order, and measure again to show the
before and after.

Never change a system setting, run sudo, or quit an app he is using. Name it
and let him do it.
