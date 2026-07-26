---
name: ci-e2e-off
description: Turn off Heartbeat PR-control E2E modes by posting target-scoped PR E2E mode-off commands and verifying E2E mode labels/checks are no longer blocking. Use when a PR's broad E2E gate is unnecessary for the current change, when the user says to turn E2E off, disable E2E, remove E2E on-demand/CI mode, or when the PR dashboard has an E2E target enabled but targeted checks already cover the work.
---

# CI E2E Off

## Workflow

Use this skill for Heartbeat PRs controlled by PR-control E2E labels. The important bit is that target mode lives in labels managed by PR comments, not in a workflow file or a sidecar commit status.

Current target ids are:

- `webapp`
- `subscriptions-importer`

There is no separate E2E workflow or commit status in the current repo.

1. Resolve the PR and repository.

   ```bash
   PR_NUMBER="$(gh pr view --json number --jq .number)"
   REPO="$(gh repo view --json nameWithOwner --jq .nameWithOwner)"
   ```

2. Inspect current E2E labels and the dashboard projection.

   ```bash
   gh pr view "$PR_NUMBER" --json labels,statusCheckRollup \
     --jq '{labels: [.labels[].name], checks: [.statusCheckRollup[] | .name // .context // .workflowName]}'

   gh api "repos/$REPO/issues/$PR_NUMBER/comments?per_page=100" \
     --paginate \
     --jq '.[] | select(.body | contains("<!-- pr-dashboard -->")) | {id, body}'
   ```

3. Post `off` commands for every enabled target. One comment can contain multiple commands on separate lines. If inspection is ambiguous, turning both known targets off is safe because `off` is the default no-label mode.

   ```bash
   gh pr comment "$PR_NUMBER" --body $'/pr e2e webapp mode off\n/pr e2e subscriptions-importer mode off'
   ```

4. Verify active E2E mode labels are gone or converted to `off`. Because `off` is the default mode, there should be no `e2e:<target>:mode:ci` or `e2e:<target>:mode:on-demand` label left.

   ```bash
   gh pr view "$PR_NUMBER" --json labels \
     --jq '[.labels[].name | select(test("^e2e:[^:]+:mode:(ci|on-demand)$"))]'
   ```

5. Verify current checks are not blocked by PR-control E2E. Existing E2E jobs that already started may still finish or fail, but the PR should not require a new enabled E2E target after the mode labels are off.

   ```bash
   gh pr checks "$PR_NUMBER"
   ```

## Notes

- Do not edit workflow YAML just to turn E2E off for one PR.
- Do not edit the generated dashboard comment with regexes. Post PR-control slash commands and verify labels/checks.
- Do not dispatch or cancel separate E2E workflows; the current repo does not use one.
- If the dashboard comment is missing, rely on labels and slash commands. The dashboard is a projection, not the source of truth.
