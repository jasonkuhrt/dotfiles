# GitHub Workflow Dispatch

## The API works on ANY branch

`workflow_dispatch` via the GitHub Actions API does NOT require the workflow file to exist on the default branch. The file only needs to exist on the target `ref`.

```bash
gh api -X POST "repos/OWNER/REPO/actions/workflows/WORKFLOW.yml/dispatches" -f ref="any-branch"
```

This is the correct way to test workflows before merging.

## Common mistake

The `gh workflow run` CLI command looks up workflows from the default branch index — it WILL fail if the workflow isn't there. This is a CLI limitation, not an API limitation. Always use `gh api` directly.

## Never do these

- Never tell the user they need to merge a workflow to the default branch first
- Never create "bootstrap" PRs to register workflow files on develop/main
- Never claim workflow_dispatch requires the default branch
