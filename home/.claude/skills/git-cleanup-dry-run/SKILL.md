---
name: git-cleanup-dry-run
description: Show what Git Cleanup would commit, push, preserve, synchronize, and delete without changing Git or worktrees. Use for a cleanup dry run or preview of the real cleanup actions.
---

# Git Cleanup dry run

An explicit invocation of `$git-cleanup-dry-run` alone requests a compact cleanup preview for the current repository. Use another repository only when the user supplies its path.

Read the shared [Git Cleanup instructions](../git-cleanup/SKILL.md), then run its dry-run mode:

```sh
vp exec node ~/.agents/skills/git-cleanup/scripts/cleanup.mjs dry-run --repo "$PWD"
```

Show the compact Markdown report: totals, the main-checkout change, one row per worktree with its decision and signal, branch-only counts, and shared repairs. Keep the chat reply to a few lines plus the report link. Detailed branch names, destinations, commands, paths, and session inventories stay in the JSON report; read or show them when requested. Distinguish confirmed removals from outcomes requiring checks or repair.

This invocation authorizes the dry run and external reports only. Keep Git objects, refs, indexes, checkout/session contents, remote refs, and the activity ledger intact. Do not execute apply, commits, pushes, fetches, dirt transfers, resets, or deletions as part of this variant.

The scripts are shared with Git Cleanup; no separate implementation or cleanup policy is maintained here. In Heartbeat invoke through `vp exec node`; elsewhere use the available Node 22+ runtime.
