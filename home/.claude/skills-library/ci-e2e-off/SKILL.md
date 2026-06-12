---
name: ci-e2e-off
description: Turn off Heartbeat PR E2E mode by editing the generated PR Dashboard comment checkbox and syncing the E2E Local Sign Off status. Use when a PR's broad E2E gate is unnecessary for the current change, when the user says to turn E2E off, disable E2E, remove E2E local signoff, or when the PR dashboard has Local or Local Sign Off checked but the targeted CI checks already cover the work.
---

# CI E2E Off

## Workflow

Use this skill for Heartbeat PRs with the generated `<!-- pr-dashboard -->` comment.
The important bit is that the mode lives in a PR comment, not in a workflow file.

1. Resolve the PR and repository.

   ```bash
   PR_NUMBER="$(gh pr view --json number --jq .number)"
   REPO="$(gh repo view --json nameWithOwner --jq .nameWithOwner)"
   ```

2. Inspect the dashboard comment and confirm the current E2E mode.

   ```bash
   gh api "repos/$REPO/issues/$PR_NUMBER/comments?per_page=100" \
     --paginate \
     --jq '.[] | select(.body | contains("<!-- pr-dashboard -->")) | {id, body}'
   ```

3. Patch the dashboard comment so `Off` is checked and the other E2E modes are unchecked. Preserve any other dashboard sections such as Docs UI.

   ```bash
   COMMENT_ID="$(
     gh api "repos/$REPO/issues/$PR_NUMBER/comments?per_page=100" \
       --paginate \
       --jq '.[] | select(.body | contains("<!-- pr-dashboard -->")) | .id' \
       | head -n 1
   )"

   BODY="$(
     gh api "repos/$REPO/issues/comments/$COMMENT_ID" --jq .body \
      | perl -0pe 's/- \\[[ xX]\\] Off/- [x] Off/g; s/- \\[[ xX]\\] Local$/- [ ] Local/mg; s/- \\[[ xX]\\] Local Sign Off/- [ ] Local Sign Off/g; s/(\\n\\s*)- \\[[ xX]\\] trigger/$1- [ ] trigger/g'
   )"

   gh api "repos/$REPO/issues/comments/$COMMENT_ID" \
     --method PATCH \
     -f body="$BODY"
   ```

4. If the repo has the PR dashboard sync tool, run it from the repo root so the `E2E Local Sign Off` commit status is updated to success for the current head SHA.

   ```bash
   GITHUB_REPOSITORY="$REPO" npx tsx tools/pr-dashboard/cli.ts sync-e2e-mode --pr-number "$PR_NUMBER"
   ```

5. If an unnecessary `e2e-local.yml` run was already queued or running, cancel it.

   ```bash
   gh run list --workflow e2e-local.yml --limit 10 \
     --json databaseId,status,headSha,url

   gh run cancel <run-id>
   ```

6. Verify the PR no longer has an E2E Local Sign Off failure.

   ```bash
   gh pr checks "$PR_NUMBER"
   ```

## Notes

- Do not edit workflow YAML just to turn E2E off for one PR.
- Do not assume clicking a checkbox in GitHub UI happened; verify via `gh api` or `gh pr checks`.
- If the dashboard comment is missing, run the repo sync command first; it creates the dashboard comment with the default E2E mode.
