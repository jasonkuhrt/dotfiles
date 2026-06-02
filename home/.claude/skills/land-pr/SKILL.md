---
name: land-pr
description: Prepare a branch or GitHub PR to an open, ready PR by composing land-worktree first, then creating a PR when missing, moving it out of draft, waiting for Greptile review comments, addressing actionable Greptile feedback, watching PR checks, and triggering E2E Local Sign Off after other checks are green when required. Use when the user says to land to PR, prepare a PR, create or ready the PR, undraft and handle Greptile, wait for Greptile, finish review-comment closeout, handle local sign off, or get the PR green without merging.
---

# Land PR

## Contract

This skill prepares a worktree/branch to an open GitHub PR that is ready for review or merge. It creates the PR when needed. It never merges.

Target end state: an open, non-draft PR with review feedback handled and required remote gates green or explicitly reported.

Type role: PR-ready segment. A human can merge after this and then run `land-merged`; `land-complete` automates that pipe as `land-pr` -> remote merge on green -> `land-merged`.

Core flow:

1. Run `land-worktree` to resolve task context, normalize the current worktree, create/attach a branch when needed, commit intended dirty work, and push the branch.
2. Resolve or create the PR from the prepared branch unless the user gave a PR URL or number.
3. Move the PR out of draft.
4. Wait for Greptile review comments to appear.
5. Use the PR-review-comments rule to address actionable Greptile feedback.
6. Push any fixes and watch the requested remote checks.
7. If the PR requires E2E Local Sign Off, wait until all other checks are green, trigger the sign-off workflow for the current head SHA, then wait for that gate.
8. Report the PR URL, branch, Greptile outcome, remote check state, and any intentionally open blockers.

## Workflow

### 1. Prepare Worktree

Load and follow:

`/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.claude/skills/land-worktree/SKILL.md`

Run `land-worktree` exactly as written from the invocation context. Do not duplicate, partially reimplement, or reinterpret its task-context, detached-head, branch-creation, dirty-work commit, or push workflow here.

Use the task context resolved by `land-worktree` for PR title/body decisions. Do not let `gh pr create --fill` override a clear chat-derived Linear issue.

### 2. Resolve Or Create The PR

Use local git plus GitHub CLI:

```bash
gh pr view --json number,url,isDraft,headRefName,headRefOid
```

If the user gave a PR URL or number, use that PR. Otherwise resolve the PR from the current branch.

If no current-branch PR exists, create one for the current branch instead of asking for a PR number. Prefer explicit `--title` and `--body` from the resolved task context when a chat-derived issue or PR scope exists. Use `gh pr create --fill` only when the resolved task context and commit history point to the same title/body:

```bash
gh pr create --fill
```

After creating the PR, re-read it:

```bash
gh pr view --json number,url,isDraft,headRefName,headRefOid
```

After creating or resolving a PR, verify that its title/body match the resolved task context. If they do not and the chat context is unambiguous, update the metadata before continuing:

```bash
gh pr edit <number> --title "<context-derived title>" --body-file <body-file>
```

### 3. Move Out Of Draft

If `isDraft` is true:

```bash
gh pr ready <number>
```

If it is already ready, treat this step as complete and say so.

### 4. Wait For Greptile

Poll the PR until Greptile has posted review material or until a clear timeout is reached. Default to 60 second polls for up to 30 minutes unless the user asks otherwise.

Look for Greptile in:

- PR reviews
- PR comments
- review-thread comments
- status/check contexts whose app, author, name, or body mentions `greptile`

Use GitHub GraphQL for thread-aware reads when checking review threads. A Greptile hit is any review, comment, review-thread comment, or completed Greptile check with text or author metadata matching `greptile` case-insensitively.

If Greptile has already posted, continue immediately. If Greptile times out without posting, report that the PR was moved out of draft but no Greptile feedback arrived.

### 5. Address Greptile Feedback

Follow the `pr-review-comments` rule at `~/.claude/rules/pr-review-comments.md`. Every addressed thread must close the loop with a reply + resolve, not just a code push.

When working through threads:

- Treat Greptile review threads as selected for this pass.
- Separate actionable change requests from informational comments.
- Implement only actionable fixes.
- Resolve addressed threads after fixes are pushed and the requested verification passes.
- Leave ambiguous, conflicting, informational, or still-failing threads open with a clear reason.

### 6. Checks

Use the user's requested verification policy. If no policy was given, prefer PR CI status checks over broad local checks.

After pushing any review fixes, watch the remote PR checks via the `gh-ci` skill (`~/.claude/skills/gh-ci/`). Never spin up an ad-hoc `gh pr checks --watch` or count-based poll — `gh-ci` is the only authority for PR CI status.

Do not report the land pass complete while selected Greptile threads are still unresolved or actionable CI checks are still red. If a required external gate cannot be satisfied from the agent environment, report it explicitly.

### 7. E2E Local Sign Off

Handle this section when either the user asks for local sign off or the PR has the `E2E Local Sign Off` status/check.

The repo's dashboard semantics are:

- `Off` means the sign-off status is not required.
- `Local` runs E2E in regular PR CI.
- `Local Sign Off` means the `E2E Local Sign Off` commit status passes only after `.github/workflows/e2e-local.yml` succeeds for the current PR head SHA.
- Each new commit needs a new sign-off run.

When sign off is required:

1. Resolve the current head immediately before acting:

   ```bash
   repo="$(gh repo view --json nameWithOwner --jq .nameWithOwner)"
   gh pr view <number> --json number,url,headRefName,headRefOid,headRepository,headRepositoryOwner
   ```

2. Wait until every required check except the exact `E2E Local Sign Off` status is green. Treat a failing or missing `E2E Local Sign Off` as the deferred gate for this section, not as the code failure to debug yet.

3. Trigger the sign-off workflow for the current head SHA:

   ```bash
   gh workflow run e2e-local.yml \
     --repo "$repo" \
     --ref "<headRefName>" \
     -f pr-number=<number> \
     -f head-sha=<headRefOid>
   ```

   This is the same workflow dispatched by the PR dashboard trigger. For same-repository PRs you may alternatively check the dashboard's nested `trigger` box under `Local Sign Off` and let `tools/pr-dashboard/cli.ts sync-e2e-mode` dispatch it, but the workflow inputs must still use the current `headRefOid`.

4. Watch the dispatched workflow and then the PR checks until `E2E Local Sign Off` is green for that same head SHA. Prefer the `gh-ci` skill over ad-hoc polling.

5. If a new commit lands while waiting, restart this section with the new `headRefOid`. If the sign-off workflow fails, debug and fix it like any other required gate.

## Output

Keep the closeout short:

- PR URL and branch.
- Whether dirty work was committed, pushed, and whether a PR had to be created.
- Whether the PR was moved out of draft or was already ready.
- Whether Greptile feedback appeared.
- Which Greptile threads were addressed/resolved, or that none were actionable.
- Remote check status and any remaining external blockers.
