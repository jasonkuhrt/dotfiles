---
name: pr-to-ready
description: Use when the user wants a PR taken to ready without merging, says "pr to ready", "get the PR green", "ready the PR", "undraft and handle Greptile", "finish review-comment closeout", or asks for an Astra review, a subagent review or PR E2E as part of readying a PR. Also composed by pr-to-landed.
---

# PR To Ready

## Contract

Takes the work to an open PR that is ready for review or merge. It creates the PR when needed, through `pr-to-draft`. It never merges.

Target end state: an open, non-draft PR with review feedback handled and required remote gates green, or explicitly reported.

Type role: second segment of the PR family. It composes `pr-to-draft`; `pr-to-landed` composes it.

The PR leaves draft only once its pushed head is proven locally. Everything a draft can absorb (any missing independent review, its fixes, local E2E) happens before that, because a draft runs no CI and a ready PR reruns CI on every push. The order is the default workflow: green local, draft PR, proofs recorded, undraft, green PR.

Core flow:

1. Run `pr-to-draft`: local checks green, work committed and pushed, a draft PR open.
2. Invoke `gate-astra-review` to reuse sufficient independent review or dispatch only missing review, then address actionable findings.
3. Record proof on the final head: the repository's proof step and local E2E pass on the committed head, which is pushed.
4. Move the PR out of draft.
5. Scan for existing Greptile review feedback. Do not wait for Greptile to appear or settle.
6. Address actionable Greptile feedback, only when it already exists.
7. Prove every later fix locally, batch the fixes, push once, and watch the requested remote checks at a quiet cadence.
8. If the PR requires CI E2E, follow the repository's E2E submission and continuation contract, then wait for its current-head checks.
9. Report the PR URL, branch, review outcome, remote check state, and any intentionally open blockers.

## Workflow

### 1. Take It To Draft

Load and follow the `pr-to-draft` skill from the current skills list, exactly as written from the invocation context. Do not duplicate, partially reimplement, or reinterpret its task-context, local-check, detached-head, branch-creation, commit, push, or PR-creation workflow here. Work that `pr-to-draft-top-down` left unchecked gets its local checks here, through `pr-to-draft`; replace the PR body's note that no local check ran with the checks that did.

Use the task context `pr-to-draft` resolved for PR title and body decisions.

A PR that is already out of draft still checks review coverage through step 2;
completed proof and ready transitions are reused, then it continues at step 5.
Its later pushes still follow step 7.

### 2. Ensure Independent Review

Load and invoke [gate-astra-review](../../skills/gate-astra-review/SKILL.md) as the single owner of
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
- Commit the intended fixes under the active history policy. Step 3 proves and pushes them.
- Record the reused or new review and resolved findings, then continue.

### 3. Record Proof

Prove the head that will go ready, on this machine, the way the repository says. When it has a proof skill or rule (Heartbeat: the `local-proof` skill, `vp exec vpp pr run` and `vp exec vpp pr proof list`), that is the step; per-package or file-scoped runs are the inner loop, never the proof. Otherwise, run the repository's full local check set on the committed head.

- Commit first, run the proof on the committed head, then push it.
- Run the E2E the change needs locally, through the repository's E2E skill (Heartbeat: `e2e-running`). A user-reachable behavior the diff changes with no journey gets one now, before ready.
- Read the result on the pushed head: every task the repository's CI would run is proven, or is one that can't record proof (its cache is off) or that a Mac can't run (Linux-only installs, the workflow files themselves), named in the report as left to CI. Read it from the proof itself (Heartbeat: `pr proof list`), not from a plan that treats a draft as running nothing.
- A task still running, red, or not rerun after a later commit keeps the PR in draft. Fix it, commit, prove again.

### 4. Move Out Of Draft

Only once step 3 holds for the pushed head, and after any skip label the repository wants applied while the PR is a draft (Heartbeat: `pr/greptile/skip`, `pr/task/skip`):

```bash
gh pr ready <number>
```

If it is already ready, treat this step as complete and say so.

### 5. Scan Greptile

Greptile is opportunistic in this workflow. It may be off, delayed, or broken. Never wait for Greptile to appear, never wait for a Greptile check/status to settle, and never treat Greptile silence as a blocker.

Do one short scan for existing Greptile material and proceed. If the user explicitly asks for Greptile, trigger or inspect it as requested, but still do not add an automatic wait unless the user gives a wait policy in that same request.

Look for Greptile in:

- PR reviews
- PR comments
- review-thread comments
- status/check contexts whose app, author, name, or body mentions `greptile`

Use GitHub GraphQL for thread-aware reads when checking review threads. A Greptile hit is any review, comment, review-thread comment, or completed Greptile check with text or author metadata matching `greptile` case-insensitively.

If Greptile has already posted, continue to the feedback-handling step. If not, report "no Greptile material found" and continue to step 7.

### 6. Address Existing Greptile Feedback

Close each addressed thread directly with GitHub GraphQL once the fix is pushed: `addPullRequestReviewThreadReply` with a body naming the commit and the concrete change (or why no code change was needed), then `resolveReviewThread`, then re-fetch `reviewThreads` and confirm `isResolved: true` with the reply present. Every addressed thread must close the loop with a reply + resolve, not just a code push. In Codex, `github:gh-address-comments` covers the same steps.

When working through threads:

- Treat existing Greptile review threads as selected for this pass.
- Separate actionable change requests from informational comments.
- Implement only actionable fixes.
- Resolve addressed threads after fixes are pushed and the requested verification passes.
- Leave ambiguous, conflicting, informational, or still-failing threads open with a clear reason.

### 7. Prove Fixes Locally, Then Remote Gates

A push to a ready PR reruns CI on every task its head has no proof for. So every push after ready carries a proven head.

Before every push after review or CI fixes:

1. Consolidate all currently known actionable fixes instead of pushing them one at a time.
2. Iterate on each failure with the narrowest repo-native command, then prove the committed head as step 3 does. The repository's proof step replays what the fix didn't touch, so a re-proof costs what the fix touched.
3. Push the proven head. A check only CI can run is pushed for, and named as such in the report.

Never push a fix to find out whether it works.

CI remains the authority for gated or remote-only checks and final current-head merge readiness. Watch the PR through the `gh-ci` skill. Never spin up an ad-hoc `gh pr checks --watch` or count-based poll.

Keep CI observation token-efficient:

- Never query or read CI status more often than once every 60 seconds. The `gh-ci` script's default `GH_CI_POLL=120` already satisfies this; never lower it below `60`.
- Start one canonical `gh-ci` watcher and keep its process/session attached. Do not interleave separate `gh pr view`, `gh api`, or check-rollup polls while it is running.
- When useful local checks, review, or diagnosis are running concurrently with CI, set `GH_CI_POLL=300` or otherwise wait up to five minutes before reading the watcher again. Resume the normal cadence after local work finishes.
- Do not narrate unchanged snapshots. Surface transitions, actionable failures, head changes, and terminal green only.

Do not report the pass complete while selected Greptile threads are still unresolved, any required review conversation is unresolved, the PR has merge conflicts, or actionable CI checks are still red. Treat `mergeStateStatus: BLOCKED` as a TODO like a failing check: it usually means merge conflicts, unresolved required conversations, or both. If a required external gate cannot be satisfied from the agent environment, report it explicitly.

### 8. Heartbeat E2E

For Heartbeat PRs with requested or required CI E2E, follow the repository's `e2e-running`
skill and its command reference for selectors, submission, continuation, and
refresh. Preserve valid saved passes and refresh only exact cases whose proof is
invalidated. Wait for the required current-head checks through `gh-ci`.

## Output

Keep the closeout short:

- PR URL and branch.
- `pr-to-draft`'s outcome: local checks, commit, push, and whether the PR was created.
- Which independent review was reused or run, and which findings were addressed.
- The proof on the head that went ready, and any check left to CI.
- Whether the PR was moved out of draft or was already ready.
- Whether Greptile feedback appeared.
- Which Greptile threads were addressed/resolved, or that none were actionable.
- Remote check status and any remaining external blockers.

## TypeSafe judgments

Classify one review comment or thread per `typesafe feedback` invocation. Put
the feedback text in `feedback`; put its stable thread ID and all applicable
diff, discussion, and verification evidence in `context`, retaining that mapping
in the caller. Consume the actionable, informational, ambiguous, or unresolved
choice inside the existing feedback workflow; fixes, replies, resolution, and
pushes remain owned here.
