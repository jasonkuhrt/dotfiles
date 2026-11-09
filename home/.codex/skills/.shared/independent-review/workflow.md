# Independent Claude review workflow

Run one independent review in an app-hosted Claude session, then return an
evidence-checked assessment to the originating Codex chat. The invoking public
skill supplies defaults for model and reviewer label. Jason's explicit values
override those defaults. Select the model
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
- Use the selected model exactly. Inspect the app session tool,
  its current schema and the session metadata when availability is uncertain.
  Codex's model list does not establish Claude app model availability. Never
  silently switch models or add a fallback. If the requested setting is unavailable, report
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

## Start the review in the Claude app

Effort belongs to the app's settings. Do not ask Jason for an effort level,
put effort instructions in the reviewer prompt, or ask the reviewer to verify
or change it.

The review runs in a Claude app session that Jason can read, message and steer
while it works. Name it `Via Codex – <short title>`, for example
`Via Codex – Incident response review`. Keep the model in the session
metadata rather than the title. Do not create a worktree for a read-only review.

Discover the app's session-creation and messaging tools and inspect their
current schemas. Create the app session with the repository cwd, selected
model, title, and the full review instruction pointing to the
filled brief. The first task starts the actual review; it does not ask the
reviewer to confirm settings and wait.

Verify the returned app session's model and submitted task. Then check
that the review has begun in that app session through its messages or status.
A launcher success, an imported transcript or a session title alone does not
establish that. Keep this same app session for reviewer questions and follow-up
so Jason's messages reach the reviewer doing the work.

- Bad: open a model-check-and-wait exchange in the app, then resume the review
  through a CLI process. Jason sees an idle placeholder and cannot participate
  in the actual review.
- Good: create one app session with the review brief as its first task, verify
  that it is reviewing there, and use that session for the review and follow-up.

If the app tools are absent or fail, check the installed app integration's
supported recovery before reporting the limitation. Preserve the prepared
brief and report the actual missing capability if app dispatch remains
unavailable. Do not substitute a CLI-hosted review, create a placeholder app
session, or claim a CLI transcript is a live app review. A CLI-only review
requires Jason to request that route explicitly.

To recover an existing CLI review, preserve its work and use the supported
handoff into the app. Do not resume it through the CLI after handoff. Verify
that the actual review continues in the app before reporting it as running.

Record the app session identifier, requested and verified model,
source baseline, artifact paths, originating public skill, coordinator receipt
policy, task and check limits, originating Codex thread ID when available,
and any relay automation ID in `review-session.json`. Record a prior CLI
session only as recovery history, not as the active reviewer. Unavailable or
unverifiable settings are reported failures, never grounds for substitution.

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
- Preserve the selected model and the independent reviewer's read-only
  scope. Delete the follow-up once the completed report is received and the
  coordinator resumes work, or after terminal failure or cancellation.

Without a follow-up tool, use bounded checks in the active turn. Do not promise
an automatic later notification that has not been arranged. Never launch
another Codex session or send text to a guessed terminal to simulate the relay.

Use the recorded app session ID for routine review-related input. If recovery
changes its identifier, preserve the work and update the metadata; do not
create a duplicate reviewer. Permission changes or additional work require
existing authorization. Preserve an interrupted session and resume it in the
app with the same model only when continuation remains authorized.

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
