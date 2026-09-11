---
name: land-pr
description: Prepare a branch or GitHub PR to an open, ready PR by verifying locally before pushes, composing land-worktree, creating a PR when missing, moving it out of draft, handling existing Greptile feedback, running an independent subagent review iteration, and waiting efficiently for current-head PR checks and Heartbeat PR-control E2E when required. Use when the user says to land to PR, prepare a PR, create or ready the PR, undraft and handle existing Greptile feedback, finish review-comment closeout, run a subagent/code-review pass during PR landing, handle PR E2E mode, or get the PR green without merging.
---

# Land PR

## Contract

This skill prepares a worktree/branch to an open GitHub PR that is ready for review or merge. It creates the PR when needed. It never merges.

Target end state: an open, non-draft PR with review feedback handled and required remote gates green or explicitly reported.

Type role: PR-ready segment. A human can merge after this and then run `land-merged`; `land-complete` automates that pipe as `land-pr` -> remote merge on green -> `land-merged`.

Core flow:

1. Run the relevant local verification, then run `land-worktree` to resolve task context, normalize the current worktree, create/attach a branch when needed, commit intended dirty work, and push the locally proven branch.
2. Resolve or create the PR from the prepared branch unless the user gave a PR URL or number.
3. Move the PR out of draft.
4. Scan for existing Greptile review feedback. Do not wait for Greptile to appear or settle.
5. Use the PR-review-comments rule to address actionable Greptile feedback only when it already exists.
6. Run one independent subagent review iteration against the current PR diff, then address actionable findings.
7. Verify and batch any fixes locally, push once, handle requested Heartbeat PR-control E2E mode changes, and watch the requested remote checks at a quiet cadence.
8. If the PR requires E2E through PR-control, ensure the target mode is set before relying on CI, then wait for the normal PR CI E2E checks.
9. Report the PR URL, branch, review outcome, remote check state, and any intentionally open blockers.

## Workflow

### 1. Verify Locally, Then Prepare Worktree

Run local verification before invoking `land-worktree`, because its push step can start CI. A `land-pr` invocation authorizes safe, repo-native local checks unless the user explicitly gives a narrower verification policy.

Prefer the smallest local gate that completely covers the current delta:

- Use a repo-defined affected or targeted check when available.
- Otherwise select the relevant package/project tests, types, lint, formatting, or build checks from the diff and repository instructions.
- Expand to broad local checks only when the change breadth or repository landing policy warrants them.
- Keep E2E under the explicit policy in section 8; do not add local E2E by default.

Do not push a known local failure or use CI as the first debugging loop. Fix local failures and rerun the proving check before continuing.

Load and follow the `land-worktree` skill from the current skills list.

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

### 4. Scan Greptile

Greptile is opportunistic in this workflow. It may be off, delayed, or broken. Never wait for Greptile to appear, never wait for a Greptile check/status to settle, and never treat Greptile silence as a blocker.

Do one short scan for existing Greptile material and proceed. If the user explicitly asks for Greptile, trigger or inspect it as requested, but still do not add an automatic wait unless the user gives a wait policy in that same request.

Look for Greptile in:

- PR reviews
- PR comments
- review-thread comments
- status/check contexts whose app, author, name, or body mentions `greptile`

Use GitHub GraphQL for thread-aware reads when checking review threads. A Greptile hit is any review, comment, review-thread comment, or completed Greptile check with text or author metadata matching `greptile` case-insensitively.

If Greptile has already posted, continue to the feedback-handling step. If not, report "no Greptile material found" and continue to the subagent review iteration.

### 5. Address Existing Greptile Feedback

Use the current harness's PR review-comment workflow: in Claude Code the `gh-close-review-threads` skill, in Codex `github:gh-address-comments`. Every addressed thread must close the loop with a reply + resolve, not just a code push.

When working through threads:

- Treat existing Greptile review threads as selected for this pass.
- Separate actionable change requests from informational comments.
- Implement only actionable fixes.
- Resolve addressed threads after fixes are pushed and the requested verification passes.
- Leave ambiguous, conflicting, informational, or still-failing threads open with a clear reason.

### 6. Subagent Review Iteration

Load and follow the `dispatch-codex-sub` skill from the current skills list.

After existing Greptile feedback has been handled, dispatch one in-thread Codex subagent for an independent code-review pass on the current PR diff. The subagent review is a required PR-landing gate, not a substitute for Greptile, CI, or the main agent's own review.

Use this prompt shape:

```text
Review PR <number> on branch <branch> for correctness, regressions, missing verification, and repo-convention violations. Other agents may be editing the repo; do not revert unrelated changes. Do not edit files. Report only actionable findings with severity, file/line evidence, and the smallest fix that would satisfy the concern.
```

Handle the subagent result:

- Implement actionable correctness, regression, verification, or repo-convention findings.
- Leave opinion-only or ambiguous findings unimplemented unless local evidence confirms them.
- Run the narrow verification that proves the applied fixes.
- Commit or amend as appropriate for the current land-worktree state, then push.
- If the subagent reports no actionable findings, record that outcome and continue.

If fixes from the subagent review materially change the PR, re-check unresolved PR review threads before moving to CI watching.

### 7. Local-First Checks, Then Remote Gates

Use the user's requested verification policy. If no policy was given, prefer local verification over repeated CI feedback.

Before every push after review or CI fixes:

1. Consolidate all currently known actionable fixes instead of pushing them one at a time.
2. Run the narrowest repo-native local gate that proves the changed surface; do not duplicate checks whose coverage is already subsumed by a stronger local gate.
3. Diagnose and fix local failures before pushing. Push only after the relevant local evidence is green or a genuinely remote-only limitation is explicitly understood.

CI remains the authority for remote-only gates and final current-head merge readiness. Once the local gate is green, push the consolidated batch and watch the PR through the `gh-ci` skill. Never spin up an ad-hoc `gh pr checks --watch` or count-based poll.

Keep CI observation token-efficient:

- Never query or read CI status more often than once every 60 seconds. The `gh-ci` script's default `GH_CI_POLL=120` already satisfies this; never lower it below `60`.
- Start one canonical `gh-ci` watcher and keep its process/session attached. Do not interleave separate `gh pr view`, `gh api`, or check-rollup polls while it is running.
- When useful local checks, review, or diagnosis are running concurrently with CI, set `GH_CI_POLL=300` or otherwise wait up to five minutes before reading the watcher again. Resume the normal cadence after local work finishes.
- Do not narrate unchanged snapshots. Surface transitions, actionable failures, head changes, and terminal green only.

Do not report the land pass complete while selected Greptile threads are still unresolved, any required review conversation is unresolved, the PR has merge conflicts, or actionable CI checks are still red. Treat `mergeStateStatus: BLOCKED` as a TODO like a failing check: it usually means merge conflicts, unresolved required conversations, or both. If a required external gate cannot be satisfied from the agent environment, report it explicitly.

### 8. Heartbeat PR-Control E2E

Handle this section only for Heartbeat PRs when the user asks for PR E2E, when the PR has E2E mode labels, or when the PR dashboard/comment indicates an enabled E2E target.

Current Heartbeat E2E is PR-control label driven. There is no separate E2E workflow or commit status to trigger. Use the repo-local `e2e-run` skill as the source of truth — the repo owns this command surface and it changes; on any `Unknown subcommand` reply from PR CLI, re-read the repo-local `e2e` skill instead of retrying variants.

Current commands (no per-target subcommands — the old `/pr e2e <target> mode ...` form is gone):

- `/pr e2e mode off` — keep E2E out of regular PR CI.
- `/pr e2e mode on` — request E2E in regular PR CI.
- `/pr e2e run` — one-shot: run E2E on the next commit, independent of mode.
- `/pr e2e ratchet mode off` / `/pr e2e ratchet mode on` — persistent failure-ratchet control.
- `/pr e2e ratchet reset` — one-shot: next run executes the complete suite and replaces the cached failure set. Never schedules E2E by itself.

Semantics that matter for landing:

- `mode` and `ratchet mode` are independent persistent controls; `run` and `ratchet reset` are independent one-shot signals recorded against the current PR head.
- A completed ratchet satisfies an E2E request without launching the jobs (plan reports `ratchet-complete`). To force a fresh full-suite execution, post both `/pr e2e ratchet reset` and `/pr e2e run` in one comment.
- If a prior E2E run failed at suite load time (zero tests executed), the saved ratchet state can make the next `--last-failed` restore run nothing and phantom-green — always `ratchet reset` after such a run.
- The PR plan snapshots command state once per workflow run. Post commands BEFORE pushing, and wait for the acknowledgment labels (`pr:e2e:...`) to appear on the PR before the push that should consume them.

When PR-control E2E is required:

1. Resolve the current head and labels immediately before acting:

   ```bash
   gh pr view <number> --json number,url,headRefName,headRefOid,labels,statusCheckRollup
   ```

2. If the requested state is not already reflected by labels or the PR dashboard, post the slash command as a PR comment. One comment may contain multiple commands on separate lines:

   ```bash
   gh pr comment <number> --body $'/pr e2e mode on\n/pr e2e ratchet reset\n/pr e2e run'
   ```

   Then poll the PR labels until the corresponding `pr:e2e:...` labels appear before relying on them.

3. Wait for normal PR CI via `gh-ci`. Do not dispatch separate E2E workflows and do not look for a separate E2E status. If CI already ran before the mode was enabled, report that the PR needs a new normal PR CI run for the current head SHA.

4. If a new commit lands while waiting, restart this section with the new `headRefOid`. If any E2E check fails, debug it like any other required PR gate using CI artifacts (`gh run download <run-id> --name pw-report`).

## Output

Keep the closeout short:

- PR URL and branch.
- Whether dirty work was committed, pushed, and whether a PR had to be created.
- Whether the PR was moved out of draft or was already ready.
- Whether Greptile feedback appeared.
- Which Greptile threads were addressed/resolved, or that none were actionable.
- Which subagent review findings were addressed, or that the subagent reported no actionable findings.
- Remote check status and any remaining external blockers.
