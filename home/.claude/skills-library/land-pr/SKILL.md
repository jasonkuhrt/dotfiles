---
name: land-pr
description: Prepare a branch or GitHub PR to an open, ready PR through authorized verification, land-worktree, PR creation and readiness, existing Greptile feedback, an independent subagent review, and current-head PR checks including required E2E. Use when the user says to land to PR, prepare a PR, create or ready the PR, undraft and handle existing Greptile feedback, finish review-comment closeout, run a subagent/code-review pass during PR landing, handle PR E2E mode, or get the PR green without merging.
---

# Land PR

## Contract

This skill prepares a worktree/branch to an open GitHub PR that is ready for review or merge. It creates the PR when needed. It never merges.

Target end state: an open, non-draft PR with review feedback handled and required remote gates green or explicitly reported.

Type role: PR-ready segment. A human can merge after this and then run `land-merged`; `land-complete` automates that pipe as `land-pr` -> remote merge on green -> `land-merged`.

Core flow:

1. Run relevant verification permitted by the user's policy and repository gates, then run `land-worktree` to resolve task context, normalize the current worktree, create/attach a branch when needed, commit intended dirty work, and push the branch.
2. Resolve or create the PR from the prepared branch unless the user gave a PR URL or number.
3. Move the PR out of draft.
4. Scan for existing Greptile review feedback. Do not wait for Greptile to appear or settle.
5. Use the PR-review-comments rule to address actionable Greptile feedback only when it already exists.
6. Run one independent subagent review iteration against the current PR diff, then address actionable findings.
7. Verify fixes under the active check policy, batch them, push once, and watch the requested remote checks at a quiet cadence.
8. If the PR requires E2E, follow the repository's E2E submission and continuation contract, then wait for its current-head checks.
9. Report the PR URL, branch, review outcome, remote check state, and any intentionally open blockers.

## Workflow

### 1. Verify, Then Prepare Worktree

Run permitted local verification before invoking `land-worktree`, because its push step can start CI. Follow the user's active check policy and repository agent gates; this skill does not override them. Use CI for required checks that are gated or only available remotely.

Prefer the smallest local gate that completely covers the current delta:

- Use a repo-defined affected or targeted check when available.
- Otherwise select the relevant package/project tests, types, lint, formatting, or build checks from the diff and repository instructions.
- Expand to broad local checks only when the change breadth or repository landing policy warrants them.
- Keep E2E under the explicit policy in section 8; do not add local E2E by default.

Fix known failures before continuing, using permitted local feedback or CI when the proving check is gated or only available remotely.

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

Close each addressed thread directly with GitHub GraphQL once the fix is pushed: `addPullRequestReviewThreadReply` with a body naming the commit and the concrete change (or why no code change was needed), then `resolveReviewThread`, then re-fetch `reviewThreads` and confirm `isResolved: true` with the reply present. Every addressed thread must close the loop with a reply + resolve, not just a code push. In Codex, `github:gh-address-comments` covers the same steps.

When working through threads:

- Treat existing Greptile review threads as selected for this pass.
- Separate actionable change requests from informational comments.
- Implement only actionable fixes.
- Resolve addressed threads after fixes are pushed and the requested verification passes.
- Leave ambiguous, conflicting, informational, or still-failing threads open with a clear reason.

### 6. Subagent Review Iteration

Use the active harness's native in-thread subagent tools. In Codex, load and
follow the `dispatch-codex-sub` skill from the current skills list.

After existing Greptile feedback has been handled, dispatch one in-thread subagent for an independent code-review pass on the current PR diff. The subagent review is a required PR-landing gate, not a substitute for Greptile, CI, or the main agent's own review.

Use this prompt shape:

```text
Review PR <number> on branch <branch> for correctness, regressions, missing verification, and repo-convention violations. Other agents may be editing the repo; do not revert unrelated changes. Do not edit files. Report only actionable findings with severity, file/line evidence, and the smallest fix that would satisfy the concern.
```

Handle the subagent result:

- Implement actionable correctness, regression, verification, or repo-convention findings.
- Leave opinion-only or ambiguous findings unimplemented unless local evidence confirms them.
- Verify the applied fixes under the active check policy and repository gates.
- Commit the intended fixes under the active history policy, then push.
- If the subagent reports no actionable findings, record that outcome and continue.

If fixes from the subagent review materially change the PR, re-check unresolved PR review threads before moving to CI watching.

### 7. Local-First Checks, Then Remote Gates

Use the user's active verification policy and repository gates. Where local checks are permitted, prefer them over repeated CI feedback.

Before every push after review or CI fixes:

1. Consolidate all currently known actionable fixes instead of pushing them one at a time.
2. Run the narrowest permitted repo-native local gate that proves the changed surface; do not duplicate checks whose coverage is already subsumed by a stronger gate.
3. Diagnose and fix known failures. Push after permitted local verification, using CI for required gated or remote-only checks and reporting that evidence accurately.

CI remains the authority for gated or remote-only checks and final current-head merge readiness. Push the consolidated batch after permitted verification and watch the PR through the `gh-ci` skill. Never spin up an ad-hoc `gh pr checks --watch` or count-based poll.

Keep CI observation token-efficient:

- Never query or read CI status more often than once every 60 seconds. The `gh-ci` script's default `GH_CI_POLL=120` already satisfies this; never lower it below `60`.
- Start one canonical `gh-ci` watcher and keep its process/session attached. Do not interleave separate `gh pr view`, `gh api`, or check-rollup polls while it is running.
- When useful local checks, review, or diagnosis are running concurrently with CI, set `GH_CI_POLL=300` or otherwise wait up to five minutes before reading the watcher again. Resume the normal cadence after local work finishes.
- Do not narrate unchanged snapshots. Surface transitions, actionable failures, head changes, and terminal green only.

Do not report the land pass complete while selected Greptile threads are still unresolved, any required review conversation is unresolved, the PR has merge conflicts, or actionable CI checks are still red. Treat `mergeStateStatus: BLOCKED` as a TODO like a failing check: it usually means merge conflicts, unresolved required conversations, or both. If a required external gate cannot be satisfied from the agent environment, report it explicitly.

### 8. Heartbeat E2E

For Heartbeat PRs with requested or required E2E, follow the repository's `e2e-running`
skill and its command reference for selectors, submission, continuation, and
refresh. Preserve valid saved passes and refresh only exact cases whose proof is
invalidated. Wait for the required current-head checks through `gh-ci`.

## Output

Keep the closeout short:

- PR URL and branch.
- Whether dirty work was committed, pushed, and whether a PR had to be created.
- Whether the PR was moved out of draft or was already ready.
- Whether Greptile feedback appeared.
- Which Greptile threads were addressed/resolved, or that none were actionable.
- Which subagent review findings were addressed, or that the subagent reported no actionable findings.
- Remote check status and any remaining external blockers.

## TypeSafe judgments

Classify one review comment or thread per `typesafe feedback` invocation. Put
the feedback text in `feedback`; put its stable thread ID and all applicable
diff, discussion, and verification evidence in `context`, retaining that mapping
in the caller. Consume the actionable, informational, ambiguous, or unresolved
choice inside the existing feedback workflow; fixes, replies, resolution, and
pushes remain owned here.
