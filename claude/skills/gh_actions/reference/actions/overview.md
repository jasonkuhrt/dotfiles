# GitHub Actions

## PRs

- Squash merge by default: `gh pr merge --squash`

## Naming Conventions

| Element       | Convention | Examples                                    |
| ------------- | ---------- | ------------------------------------------- |
| Workflow name | Title Case | `Build Whitelabel Apps`, `Push OTA Update`  |
| Job name      | lowercase  | `types`, `lint (preview)`, `build-and-push` |
| Step name     | Title Case | `Checkout Repository`, `Check Types`        |

Step names: imperative verb phrases. Avoid noun phrases (`Job Summary` -> `Write Job Summary`, `Rust Cache` -> `Cache Rust`).

## Log Groups

Only use `::group::`/`::endgroup::` when a step has multiple distinct operations. Steps are already collapsible -- don't wrap entire content.

## Job Summaries

Only add when surfacing info NOT already visible in workflow UI. Don't repeat what UI already shows (job name, pass/fail, commit/branch).

| Useful                                          | Not useful                    |
| ----------------------------------------------- | ----------------------------- |
| Error/warning counts from check output          | `${{ job.status }}` (visible) |
| Deploy URLs, preview links                      | Job name as heading (visible) |
| Dispatch inputs (version, platform)             | Commit/branch (in header)     |
| Explanation when status is misleading (preview)  | Context already in job name   |

**Separate summary steps**: Never inline `$GITHUB_STEP_SUMMARY` writes into work steps. Use a dedicated summary step with conditional execution based on `$GITHUB_OUTPUT` from previous steps.

**Markdown syntax**: REQUIRED SUB-SKILL: writing-markdown
