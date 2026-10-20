# Independent Claude review workflow

Run one independent review through the local Claude CLI, then return an
evidence-checked assessment to the originating Codex chat. The invoking public
skill supplies four defaults: model, effort, reviewer label, and run-name
prefix. Jason's explicit values override those defaults. Select the model
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

## Launch in native cmux

Read the installed `cmux`, `cmux-local`, and `cmux-workspace` skills for current
commands and routing. Resolve the caller window from cmux context. If it is
absent, use `cmux identify --json` and state that the focused window is the
fallback.

Create a **new workspace** in the established repository directory. Name it
from the selected run-name prefix and target, for example
`<run-name-prefix>-<topic>`. Do not create a worktree. Set `--focus false` and
launch via `cmux new-workspace --command`: cmux must start its native
interactive shell so Claude session restoration works. Do not replace the shell
with a Ghostty command, run a detached headless review, or use a Codex subagent
as a substitute.

The command delivered to that shell has this shape:

```text
claude --model '<selected-model>' --effort <selected-effort>
  --name '<topic> <reviewer-label> review' --disallowedTools Agent,Task
  --add-dir '<artifact-directory>' --session-id '<fresh-uuid>'
  -- 'Read <absolute-brief-path> and conduct the independent review now. Follow its output and relay instructions exactly.'
```

Construct one shell-safe command, then pass it as one `--command` argument to
cmux using an argv-based process call. Shell-quote every substituted value for
the native shell; JSON encoding is not shell escaping. Keep the substantial
prompt in the brief file. Do not pass a model fallback or permission-bypass
flag.

Capture the created window, workspace, and surface refs and UUIDs; Claude
session UUID; requested model and effort; source baseline; brief, input, and
report paths; originating public skill and coordinator receipt policy; task
and check limits; originating Codex thread ID when available; and eventual relay
automation ID in `review-session.json`. Inspect only that new surface to verify
Claude is working and actually displays the requested model and effort. Record
requested and verified settings separately. An unavailable or unverifiable
setting is a reported failure, never grounds for a silent substitution.

## Relay without another Codex session

The report file is the relay. A terminal completion message is insufficient:
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
  required user input. Inspect the review surface only to diagnose a stall or
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

A workspace can move between windows. If saved routing fails, find the same
workspace UUID in the current window inventory and update the session metadata;
do not create a duplicate reviewer. Routine review-related input may be
answered in its exact surface. Permission changes or additional work require
the existing authorization to cover them. Preserve an interrupted session and
resume that session with the same model and effort only when continuation
remains authorized.

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
Keep the cmux workspace and session available; do not close them as cleanup.

Deliver a concise verdict, important corrections, remaining decisions, and
links to the original report and revised artifact. State the repairs completed
and material verification limits. Record delivery in `review-session.json` and
ensure the run's follow-up is deleted.
Claim reviewer approval only for the exact baseline it reviewed, not a later
revision.
