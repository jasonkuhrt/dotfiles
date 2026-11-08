# Independent Claude review workflow

Run one independent review in an app-visible Claude session, then return an
evidence-checked assessment to the originating Codex chat. The invoking public
skill supplies defaults for model, effort, and reviewer label. Jason's explicit values override those defaults. Select the model
before the reviewer label: use an explicit reviewer label when supplied;
otherwise derive the label from the selected model. The wrapper's default
label applies only to its default model. For example, `claude-opus-5-5` is
`Opus 5.5` and `claude-fable-5-1[1m]` is `Fable 5.1`.

The public skill also defines the coordinating Codex agent's receipt policy.
When it supplies none, a request for review alone means assess and report;
already authorized follow-up work still continues. A skill may explicitly
include repairing confirmed findings. Preserve Jason's task and action limits
under either policy.

## Establish the review

- Infer the target plan or change and repository from the conversation. For a
  plan, save an immutable review snapshot. For code, record the exact base,
  head, and relevant working-tree changes. Preserve concurrent work.
- Carry Jason's original request, constraints, and unresolved questions into
  the brief. Separate proposed decisions from approved work. Do not prime the
  reviewer to agree with the author.
- Use the selected model and effort exactly. Inspect `claude --help` and local
  configuration when availability is uncertain. Codex's model list does not
  establish Claude CLI availability. Never silently lower the effort, switch
  models, or add a fallback. If the requested setting is unavailable, report
  that fact instead of substituting another setting.
- The independent reviewer is read-only except for its output artifacts. Its
  permissions are separate from the coordinator's receipt policy. Pass through
  any explicitly granted reviewer check permissions; otherwise prohibit tests,
  typechecks, lint, builds, generators, installs, servers, database operations,
  commits, pushes, and external communications in the reviewer brief.

Use a fresh artifact directory belonging to this Codex chat and review run.
Keep it outside the reviewed source tree when practical. Create:

```text
review-input.md
review-brief.md
review-session.json
review.md
```

`review-input.md` is the immutable plan or exact code-review target. Fill
`review-brief.md` from the [shared reviewer brief](reviewer-brief.md), replacing
every placeholder and choosing a bounded set of questions for this task. Never
copy another review's paths, session identifiers, or architectural answers.
The reviewer creates `review.md`; never seed it with the completion marker.

## Launch an app-visible Claude session

Name the session `Via Codex – <short title>`, for example
`Via Codex – Incident response review`. Keep model and effort in the session
metadata rather than adding them to the title. Do not create a worktree for a
read-only review.

Prefer the Claude app's session-creation tool when connected. Discover its
current schema, then pass the repository cwd, selected model and effort,
title, and a prompt pointing to the filled brief. Record the returned session
identifier and verify its actual settings.

When that tool is unavailable, use the installed CLI's supported interactive
route. Inspect `claude --help` first. With the currently verified CLI:

1. Establish one interactive PTY session in the repository with a fresh UUID,
   the selected model and effort, and the required title. Its initial prompt
   asks it to confirm its settings and wait without starting the review:

   ```sh
   claude --model '<selected-model>' --effort <selected-effort> \
     --name 'Via Codex – <short title>' --disallowedTools Agent,Task \
     --add-dir '<artifact-directory>' --session-id '<fresh-uuid>' \
     -- 'Confirm your active model and effort if verifiable, then wait. Do not start the review or use tools yet.'
   ```

2. After the acknowledgment, exit that CLI process without deleting the
   session. The desktop launcher refuses a session locked by another terminal.
   From a PTY, open the same saved session in the app:

   ```sh
   claude --desktop --resume '<same-session-uuid>'
   ```

3. Resume that same session interactively with the selected settings and
   submit the filled brief. This is CLI-hosted execution with app visibility:

   ```sh
   claude --resume '<same-session-uuid>' \
     --model '<selected-model>' --effort <selected-effort> \
     --disallowedTools Agent,Task --add-dir '<artifact-directory>' \
     -- 'Read <absolute-brief-path> and conduct the independent review now. Follow its output and relay instructions exactly.'
   ```

The verified `--desktop` launcher accepts neither an initial prompt nor the
model, effort, name, session-id, or add-dir flags. It opens or resumes a
session; it does not by itself submit the review brief. Do not start a second
review to make the first visible. Report whether execution is app-hosted or
CLI-hosted with app visibility, and report any failure to open it in the app.
Never claim app-hosted execution merely because the launcher succeeded.

Quote substituted shell arguments for the actual shell; JSON encoding is not
shell escaping. Keep the substantial prompt in the brief file. Do not use a
headless `-p` review, a terminal-workspace manager, a permission-bypass flag,
or a different reviewer as a substitute.

Record the Claude session ID, app session ID when distinct, execution route,
CLI process handle when applicable, requested and verified model and effort,
source baseline, artifact paths, originating public skill, coordinator receipt
policy, task and check limits, originating Codex thread ID when available,
and any relay automation ID in `review-session.json`. Inspect only this
session to verify the model and effort. Unavailable or unverifiable settings
are reported failures, never grounds for silent substitution.

## Relay without another Codex session

The report file is the relay. A session completion message is insufficient:
the report's final nonempty line must equal `INDEPENDENT_REVIEW_COMPLETE`
exactly. Partial files are still in progress. Each run has its own report, so an
old completion marker cannot satisfy a new review.

When the desktop heartbeat tool is available, create a follow-up on the
**current Codex chat**, normally every five minutes, using `automation_update`.
This follow-up is part of the review workflow. Resolve the actual thread ID;
never guess it from a workspace name. Inspect existing automation state and
reuse this run's monitor instead of creating duplicates. Its human-readable
prompt must:

- Name the exact session metadata, report, and input paths and the completion
  marker.
- Name the originating public skill and carry its concrete coordinator receipt
  policy and the task's existing authorization and check limits. Do not copy
  the reviewer's read-only restriction onto the coordinator's follow-up work.
- Stay quiet while work progresses and notify only on completion, failure, or
  required user input. Inspect the recorded session only to diagnose a stall or
  input request.
- On completion, read the report, verify consequential findings against source
  and current state, then apply the recorded receipt policy. When it includes
  repairs, continue confirmed fixes and authorized validation and delivery in
  the current chat; report only genuine blockers or unresolved decisions that
  require Jason. Under that policy, a completed report triggers continuation
  without waiting for another request to fix it.
- Preserve the selected model, effort, and the independent reviewer's read-only
  scope. Delete the follow-up once the completed report is received and the
  coordinator resumes work, or after terminal failure or cancellation.

Without a follow-up tool, use bounded checks in the active turn. Do not promise
an automatic later notification that has not been arranged. Never launch
another Codex session or send text to a guessed terminal to simulate the relay.

Use the recorded session ID for routine review-related input. If its route
changes, locate that same session and update the metadata; do not create a
duplicate reviewer. Permission changes or additional work require existing
authorization. Preserve an interrupted session and resume it with the same
model and effort only when continuation remains authorized.

## Receive and assess

Keep the original review intact. Verify important claims using source, callers,
applicable rules, and the exact installed dependency version. Reviewers can be
wrong about counts, import graphs, existing APIs, or whether code runs at
import. An empty or failed search is not evidence of absence. Recheck source
drift since the recorded baseline before adopting line-specific findings.

Distinguish accepted findings, corrected or rejected findings, and user
decisions. For an authorized planning task, revise the working plan while
keeping its review snapshot. Apply the originating public skill's receipt
policy to code findings: when repairs are included or already authorized,
continue through confirmed fixes, necessary validation within standing
permissions, and the authorized commit/push workflow. Do not halt at the report
because the independent reviewer was read-only. Assessment-only requests stay
assessment-only. Do not widen an agreed rewrite boundary or weaken a project
rule merely to adopt the review. Settle routine details and surface genuine
blockers, consequential unresolved choices, or required authorization while
continuing independent approved work.

Use the existing Claude session for a focused follow-up only when its answer
would resolve a material uncertainty. Do not repeat a whole review by default.
Keep the Claude session available for focused follow-up; do not delete it as cleanup.

Deliver a concise verdict, important corrections, remaining decisions, and
links to the original report and revised artifact. State the repairs completed
and material verification limits. Record delivery in `review-session.json` and
ensure the run's follow-up is deleted.
Claim reviewer approval only for the exact baseline it reviewed, not a later
revision.
