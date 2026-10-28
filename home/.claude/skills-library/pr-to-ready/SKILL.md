---
name: pr-to-ready
description: Use when the user wants a PR taken to ready without merging, says "pr to ready", "get the PR green", "ready the PR", "undraft and handle Greptile", "finish review-comment closeout", or asks for a subagent review or PR E2E as part of readying a PR. Also composed by pr-to-landed.
---

# PR To Ready

## Contract

Takes the work to an open PR that is ready for review or merge. It creates the PR when needed, through `pr-to-draft`. It never merges.

Target end state: an open, non-draft PR with review feedback handled and required remote gates green, or explicitly reported.

Type role: second segment of the PR family. It composes `pr-to-draft`; `pr-to-landed` composes it.

Core flow:

1. Run `pr-to-draft`: local checks green, work committed and pushed, a draft PR open.
2. Move the PR out of draft.
3. Scan for existing Greptile review feedback. Do not wait for Greptile to appear or settle.
4. Address actionable Greptile feedback, only when it already exists.
5. Invoke `astra-review` to reuse sufficient independent review or dispatch only missing review, then address actionable findings.
6. Verify fixes under the active check policy, batch them, push once, and watch the requested remote checks at a quiet cadence.
7. If the PR requires E2E, follow the repository's E2E submission and continuation contract, then wait for its current-head checks.
8. Report the PR URL, branch, review outcome, remote check state, and any intentionally open blockers.

## Workflow

### 1. Take It To Draft

Load and follow the `pr-to-draft` skill from the current skills list, exactly as written from the invocation context. Do not duplicate, partially reimplement, or reinterpret its task-context, local-check, detached-head, branch-creation, commit, push, or PR-creation workflow here. Work that `pr-to-draft-top-down` left unchecked gets its local checks here, through `pr-to-draft`; replace the PR body's note that no local check ran with the checks that did.

Use the task context `pr-to-draft` resolved for PR title and body decisions.

### 2. Move Out Of Draft

If `isDraft` is true:

```bash
gh pr ready <number>
```

If it is already ready, treat this step as complete and say so.

### 3. Scan Greptile

Greptile is opportunistic in this workflow. It may be off, delayed, or broken. Never wait for Greptile to appear, never wait for a Greptile check/status to settle, and never treat Greptile silence as a blocker.

Do one short scan for existing Greptile material and proceed. If the user explicitly asks for Greptile, trigger or inspect it as requested, but still do not add an automatic wait unless the user gives a wait policy in that same request.

Look for Greptile in:

- PR reviews
- PR comments
- review-thread comments
- status/check contexts whose app, author, name, or body mentions `greptile`

Use GitHub GraphQL for thread-aware reads when checking review threads. A Greptile hit is any review, comment, review-thread comment, or completed Greptile check with text or author metadata matching `greptile` case-insensitively.

If Greptile has already posted, continue to the feedback-handling step. If not, report "no Greptile material found" and continue to the subagent review iteration.

### 4. Address Existing Greptile Feedback

Close each addressed thread directly with GitHub GraphQL once the fix is pushed: `addPullRequestReviewThreadReply` with a body naming the commit and the concrete change (or why no code change was needed), then `resolveReviewThread`, then re-fetch `reviewThreads` and confirm `isResolved: true` with the reply present. Every addressed thread must close the loop with a reply + resolve, not just a code push. In Codex, `github:gh-address-comments` covers the same steps.

When working through threads:

- Treat existing Greptile review threads as selected for this pass.
- Separate actionable change requests from informational comments.
- Implement only actionable fixes.
- Resolve addressed threads after fixes are pushed and the requested verification passes.
- Leave ambiguous, conflicting, informational, or still-failing threads open with a clear reason.

### 5. Ensure Independent Review

Load and invoke [astra-review](../../skills/astra-review/SKILL.md) as the single owner of
review reuse and dispatch. Give it the current base/head and diff, required
repository criteria, and existing self-review, peer review, and finding records
from the preceding workflow. Follow its reuse decision instead of launching
another reviewer because this skill was entered.

An implementation review completed during `loop-improve-e2e` can satisfy this
gate. The gate owner checks its coverage and independence; author self-review
and proposal review remain distinct. Any required self-review precedes a new
peer pass. The repository's `review` skill owns the roster and supported size;
this workflow carries no separate prompt or size alias.

Handle findings through the gate owner's result rules:

- Implement actionable correctness, regression, verification, or repo-convention findings.
- Leave opinion-only or ambiguous findings unimplemented unless local evidence confirms them.
- Verify the fixes under the active check policy and repository gates, then commit and push them under the active history policy.
- Record the reused or new review and resolved findings, then continue.

If fixes materially change the PR, re-check unresolved PR review threads before moving to CI watching.

### 6. Local-First Checks, Then Remote Gates

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

Do not report the pass complete while selected Greptile threads are still unresolved, any required review conversation is unresolved, the PR has merge conflicts, or actionable CI checks are still red. Treat `mergeStateStatus: BLOCKED` as a TODO like a failing check: it usually means merge conflicts, unresolved required conversations, or both. If a required external gate cannot be satisfied from the agent environment, report it explicitly.

### 7. Heartbeat E2E

For Heartbeat PRs with requested or required E2E, follow the repository's `e2e-running`
skill and its command reference for selectors, submission, continuation, and
refresh. Preserve valid saved passes and refresh only exact cases whose proof is
invalidated. Wait for the required current-head checks through `gh-ci`.

## Output

Keep the closeout short:

- PR URL and branch.
- `pr-to-draft`'s outcome: local checks, commit, push, and whether the PR was created.
- Whether the PR was moved out of draft or was already ready.
- Whether Greptile feedback appeared.
- Which Greptile threads were addressed/resolved, or that none were actionable.
- Which independent review was reused or run, and which findings were addressed.
- Remote check status and any remaining external blockers.

## TypeSafe judgments

Classify one review comment or thread per `typesafe feedback` invocation. Put
the feedback text in `feedback`; put its stable thread ID and all applicable
diff, discussion, and verification evidence in `context`, retaining that mapping
in the caller. Consume the actionable, informational, ambiguous, or unresolved
choice inside the existing feedback workflow; fixes, replies, resolution, and
pushes remain owned here.
