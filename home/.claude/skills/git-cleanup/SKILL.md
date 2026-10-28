---
name: git-cleanup
description: Audit and clean Git worktrees and local branches with Worktrunk, preserving feature work and ignored .session contents remotely before deletion. Use for worktree sweeps, stale branch cleanup, and restoring cleanup checkpoints.
---

# Git cleanup

Use the bundled scripts to keep the primary checkout clean and synchronized, and remove eligible local feature branches/worktrees after verified remote preservation.

## Default invocation

An explicit invocation of `$git-cleanup` with no additional text requests the full cleanup workflow for the current repository. Create a fresh plan, inspect the decisions, then execute preservation, primary-checkout preparation, local cleanup, and verification. Do not stop at the preview or require the user to append a verb.

Use the current working directory to identify the repository unless the user supplies another path. An explicit dry-run request uses the detailed dry-run mode below; an audit or preview performs planning only; an explicit restore request follows the restoration workflow. Merely loading this skill as contextual guidance is not itself a cleanup request.

## Policy

- Keep the primary checkout. Move its tracked/nonignored untracked dirt into a worktree marked as requiring review before synchronizing it.
- Select branches whose relevant same-repository PR is closed or merged, regardless of age. Use forge state, so squash merges count. A newer open PR on a reused branch overrides an older closed one.
- Otherwise select feature branches with more than **five days / 120 hours of meaningful local inactivity**, with or without an upstream. Use local branch/checkout reflog events, dirty tracked and nonignored untracked file times, and recursive `.session`/useful ignored file times. Ignore dependency, generated and cache churn. Commit dates are informational, never the inactivity clock.
- Save content fingerprints outside the repository so later observations detect changes, including deletions, renames and writes that preserve modification times. Unchanged observations do not reset the clock. Report insufficient activity evidence instead of substituting an old commit date. Evaluate activity again immediately before preservation; preservation commits do not invalidate the run's recorded eligibility.
- Automatically commit ordinary feature dirt. Push code to the feature branch's own remote ref; never blindly push to its configured upstream, which might be `origin/develop` or another feature branch.
- Force-add `.session` into a separate archive checkpoint. Its presence/size never blocks deletion; recent edits count as local activity. Idle terminals, watchers, workspace names and other weak references never establish retention.
- Copy useful or unknown ignored material outside `.session` into a verified private local archive under `~/.codex/worktree-cleanup/ignored-archives/`. Do not upload this material to GitHub commits, refs, artifacts, comments, or Secrets. Discard only paths matched by the skill's explicit dependency/generated-cache classifier; an unfamiliar ignored path is preservable data.
- Keep explicitly pending primary-dirt review branches until resolved. Do not invent further retention rules. Actual source changes require refreshed preservation; process presence alone does not establish editing.

Read [preservation.md](references/preservation.md) when restoring or repairing preservation. Historical inventories are not live evidence.

## Run

Requires Node 22+, Git, `wt`, and authenticated `gh` for GitHub PR evidence. Scripts use built-in Node modules and need no dependency installation. In Heartbeat invoke through `vp exec node`; elsewhere use the available Node runtime.

### Dry run

Invoke `$git-cleanup-dry-run` alone, or `$git-cleanup dry-run`, to show what a real run would do in the current repository:

```sh
vp exec node ~/.agents/skills/git-cleanup/scripts/cleanup.mjs dry-run --repo "$PWD"
```

The default Markdown is compact: totals, primary preparation, one decision/signal row per worktree, branch-only counts, and repairs grouped once. The JSON retains every branch's commits, push/archive destinations, verification, deletion steps, file paths, and conditions. Display the compact report with a brief chat summary; inspect the JSON when detail is requested. Remote history not available locally remains conditional on fetch/comparison.

This mode leaves Git objects, refs, indexes, worktree contents, remote refs, and the activity ledger intact. It writes only its external JSON/Markdown reports and source plan. Do not advance from a dry-run request into apply.

To preview an existing plan against live evidence using the same target reconciliation as apply:

```sh
vp exec node ~/.agents/skills/git-cleanup/scripts/cleanup.mjs apply --dry-run --plan /absolute/path/to/plan.json
```

### Plan and apply

```sh
vp exec node ~/.agents/skills/git-cleanup/scripts/cleanup.mjs plan --repo "$PWD"
```

The command reports absolute paths to its JSON plan and Markdown preview, including branch-only targets, PR/upstream facts, last local activity, decisions and reasons. Activity fingerprints live under `~/.codex/worktree-cleanup/activity/`; planning writes this external observation state while leaving repository contents intact. Inspect that report, then for an authorized cleanup run:

```sh
vp exec node ~/.agents/skills/git-cleanup/scripts/cleanup.mjs apply --plan /absolute/path/to/plan.json
```

An audit request authorizes planning. A cleanup request authorizes automatic commits, preservation pushes, primary-dirt evacuation/sync, and selected local deletions under this policy. Carry an authorized cleanup through without asking again merely because feature files or `.session` are dirty. Creating this skill does not itself run cleanup.

Apply refreshes live evidence and processes the original plan's still-eligible targets. If a remote feature ref is strictly ahead of the unchanged local source, fast-forward the local branch before preservation; true divergence still requires repair. Worktrunk transfer/removal hooks are disabled to avoid incidental setup commands. Local ref deletion checks its expected head. The final inventory reports newly discovered worktrees separately.

## Finish and repair

Check the journal's `complete` field, verified remote destinations, removed refs/paths, primary cleanliness/synchronization, and final inventory. Explain remaining branches using the missing deletion condition.

A failed step retains recovery state and a repair entry. Resume that journal instead of starting a replacement run. The journal's original eligibility and preservation record continue to govern its targets because automatic preservation changes branch history and can reset the live age clock; resume still rechecks live identity, source/session/ignored contents, remote destinations, and removal state. Intervene within the authorized scope, finish the affected target, and improve its helper when the observed case can be automated. Do not turn ordinary feature dirt into a permanent unexplained skip.

```sh
vp exec node ~/.agents/skills/git-cleanup/scripts/cleanup.mjs resume --journal /absolute/path/to/run.journal.json
```

For a legacy journal that does not embed its selected targets, also pass `--plan /absolute/path/to/original.plan.json`.

Merge remote divergence rather than overwrite it. Verify the local ignored-material archive before deletion and keep its recorded restore command. A `.session` symlink into an explicitly classified regenerable cache keeps the link and records that the target bytes were intentionally omitted; restore remaps an in-worktree cache link to a relative target inside the new checkout before regeneration. Every other target that would be lost must be preserved or repaired. Do not kill processes as incidental cleanup.

Verify helper changes in scratch Git repositories outside Heartbeat. Do not run Heartbeat tests, builds, broad formatting or typechecks as incidental cleanup checks.

The bundled verifier creates and removes its own isolated repositories:

```sh
(cd ~/.agents/skills/git-cleanup && vp exec node scripts/verify.mjs)
```

## Restore

Copy and execute the entire fenced shell script from the preservation commit's message. It contains concrete source SHA, branch, archive ref, paths, and empty-directory commands, and needs no installed skill or other document. It recreates the feature worktree with `wt`, uses a guarded mixed reset to undo only the session checkpoint, leaves `.session` present and ignored, and restores ordinary upstream tracking when available.

Pending primary-dirt review branches carry `branch.<name>.codex-cleanup-review=true`. Clear that marker after resolving their review so ordinary policy applies.
