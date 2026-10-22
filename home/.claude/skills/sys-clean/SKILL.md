---
name: sys-clean
description: Use when Jason says "sys clean", says his Mac is slow, hot, loud, swapping or out of memory, asks what is eating CPU, RAM or disk, asks to clean up or optimize his machine, or when an agent finds the machine near the 95% capacity limit before heavy work. Measures the machine, then runs the cleaning routines in order (idle dev processes, git worktrees and branches through git-cleanup, background apps, caches), each with his OK, and measures again.
---

# Sys clean

Jason will not run maintenance tasks himself. This skill is how his Mac gets
looked after: you measure it, run every routine below, and show what each one
freed. Each routine has its own owner and policy; this skill only composes them.

## 1. Measure

Run these together and keep the numbers for the before-and-after:

```bash
sysctl -n hw.ncpu hw.memsize; sysctl vm.loadavg vm.swapusage
memory_pressure | tail -1
ps -Ao pcpu,pmem,rss,comm -r | head -20
df -h / | tail -1; du -sh ~/Library/Caches
```

Group memory by process family (node, chrome, claude, codex/chatgpt, other),
summing `ps -Ao rss,comm` by name. Group node by worktree: map each pid's cwd
(`lsof -a -p <pid> -d cwd -Fn`) to its git worktree root.

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
2. **Git worktrees and branches: the `git-cleanup` skill.** Load it and follow
   it exactly; its policy on preservation, inactivity and restore governs, and
   is not restated here. Run it for each repository that has worktrees:
   `~/projects/heartbeat-chat/Heartbeat` and the repos behind
   `~/.codex/worktrees`. Show its compact plan with the other routines' plans;
   his OK for the whole set authorizes its `apply`.
3. **Background apps.** These are helpers using more than 10% CPU with nothing
   visible to show for it, such as updater agents. Quitting an app is his to do: name it.
4. **Caches, only when disk is short.** Commands:
   - `vp store prune` / `pnpm store prune`
   - `brew cleanup`
   - old Playwright browsers under `~/Library/Caches/ms-playwright`, keeping
     the versions the repos pin
   - `~/Library/Caches` entries of apps that are no longer installed

Already settled, and not to be raised again:

- Spotlight is off (`scripts/sync-sudo.sh` in dotfiles).
- Caffeine and sleep prevention are on purpose.
- Codex Computer Use stays running: he uses it.
- The Dropbox, Google and Steam updater LaunchAgents are disabled
  (`launchctl disable gui/$UID/<label>`).

## 3. Ask once, then act

Show one table with each candidate, its routine, what it frees (GB or CPU %),
and why it's safe. Ask once for the whole set ("Clean these 14?"). Then run
the routines in order, and measure again to show the before and after.

Never change a system setting, run sudo, or quit an app he is using. Name it
and let him do it.
