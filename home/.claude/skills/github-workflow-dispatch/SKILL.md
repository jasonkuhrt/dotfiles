---
name: github-workflow-dispatch
description: Dispatching GitHub Actions workflows via the API, especially branch-modified or brand-new workflow files. Use when running workflow_dispatch, when gh workflow run fails on a branch, or when a dispatch returns 404. Explains the workflow registry, why net-new files must first run from a real trigger, and why bootstrap PRs are banned.
---

# GitHub Workflow Dispatch

## The dispatch API addresses a REGISTERED workflow, dispatched against any ref

`workflow_dispatch` via the API runs the workflow file **as it exists on the target
`ref`** — any branch. The default branch is NOT required for the dispatched *content*.

```bash
gh api -X POST "repos/OWNER/REPO/actions/workflows/WORKFLOW.yml/dispatches" -f ref="any-branch"
```

This is the correct way to test *modified* workflows before merging.

## The nuance: net-new workflows need registration first (verified 2026-07-09)

The `WORKFLOW.yml` in the URL addresses a **workflow entity in the repo's registry**
(`GET /actions/workflows`). A file that has NEVER existed on the default branch and has
NEVER run is not in the registry → dispatch returns **404**, even though the file is
visible on the branch via the Contents API. Verified on Heartbeat with a branch-only
`alchemy-stack-smoke.yml`: Contents API showed the file, `/actions/workflows` (42
entries) did not, dispatch 404'd.

A workflow gets registered when EITHER:
1. the file lands on the default branch, OR
2. the workflow **runs once via a real event trigger** (`push` / `pull_request`) from
   any branch.

## Remedy for net-new workflows — still no bootstrap PRs

Give the workflow a real trigger alongside `workflow_dispatch` — usually a
`pull_request` trigger with `paths:` scoped to what the workflow proves. The first
PR run registers it; manual dispatch works from then on. This is usually the better
permanent design anyway (the workflow runs exactly when its subject changes).

## Common mistake

The `gh workflow run` CLI command looks up workflows from the default branch index — it
WILL fail for branch-modified workflows even when the API would succeed. Always use
`gh api` directly.

## Never do these

- Never create "bootstrap" PRs to merge a workflow to develop/main just to register it —
  add a real `push`/`pull_request` trigger and let its first run register it
- Never claim the dispatched *content* comes from the default branch — it comes from `ref`
- Never diagnose a dispatch 404 as "file missing on ref" without checking
  `GET /actions/workflows` — registry absence is the usual cause for net-new files
