# Independent Claude review workflow

Run one independent review in a persistent Claude session, then return an
evidence-checked assessment to the originating Codex chat. The invoking public
skill supplies defaults for model and reviewer label. Jason's explicit values
override those defaults. Select the model before the reviewer label: use an
explicit reviewer label when supplied;
otherwise derive the label from the selected model. The wrapper's default
label applies only to its default model. For example, `claude-opus-5-5` is
`Opus 5.5` and `claude-fable-5-2` is `Fable 5.2`.

The public skill also defines the coordinating Codex agent's receipt policy.
When it supplies none, a request for review alone means assess and report;
already authorized follow-up work still continues. A skill may explicitly
include repairing confirmed findings. Preserve Jason's task and action limits
under either policy.

## Choose and verify the route

Prefer a Claude app session when its supported programmatic connection is
straightforward. App visibility helps Jason read and steer the reviewer; it
is not a prerequisite for the review. If the app route is unavailable or
requires substantial integration work, hacks or a fork, use a persistent
Claude CLI session without another approval stop. Do not omit the review,
substitute a model, or make Jason repeat the request in another app.

A missing tool starts diagnosis. Check the current host's tool registry and
connection configuration, following symlinks; use the installed integration's
source, docs and runtime to distinguish an internal app tool from an external
connection. Recover a configured connection when straightforward and confirm
with a minimal native operation. Keep investigation proportional to the
review: establishing that no supported connection is configured is enough to
choose the CLI, not a reason to build a bridge. Do not infer that Jason must
reconnect anything from an empty catalog search.

Use the selected model's full versioned ID, never an alias when Jason named a
version. Verify the actual model in the run's response metadata or receipt;
the requested argument alone is insufficient. Stop a mismatched run, retain
its evidence, correct the launch and rerun the review with the requested
version. An unavailable requested model is a real blocker; an unavailable
preferred display route is not. Never claim a version is newest without
reading a current model list.

Keep the actual route, session identifier and resume path in the run record.
Do not use UI automation, private-session channel reuse or app modification
to simulate an app API, or describe a CLI transcript as an app-hosted run.

## Establish the review

- Infer the target plan or change and repository from the conversation. For a
  plan, save an immutable review snapshot. For code, record the exact base,
  head, and relevant working-tree changes. Preserve concurrent work.
- Carry Jason's original request, constraints, and unresolved questions into
  the brief. Separate proposed decisions from approved work. Do not prime the
  reviewer to agree with the author.
- Use the selected model exactly. Inspect the chosen host's current schema or
  CLI help and its session metadata
  when availability is uncertain. Codex's model list does not establish
  Claude model availability. Never silently switch models or add a fallback.
  If the requested model is
  unavailable, report that fact instead of substituting another model.
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

## Start the review

Use the selected host's effort settings. Do not ask Jason for an effort level,
put effort instructions in the reviewer prompt, or ask the reviewer to verify
or change it.

Name the session `Via Codex – <short title>` and keep the model in its
metadata. Do not create a worktree for a read-only review.

For an app run, inspect the current session-creation and messaging schemas.
Create the session with the repository cwd, selected model, title and full
review instruction pointing to the filled brief. Verify the returned model
and that review work has begun. Use that session for questions and follow-up.

For a CLI run, follow `use-workers`'s "Launching from a Codex lead on a Mac"
section, using the exact selected model in place of its example alias. Call
plain `claude` so the user's account selector applies. Keep session
persistence enabled, record the session ID, and capture structured output
with the actual response model. Feed a prepared prompt through stdin or
terminate variadic options before a positional prompt so the CLI receives it.
Use only the tools the review needs; its brief permits writing only its own
report. Confirm launch from real response metadata and tool activity, not
just a live process. A usage-limit or startup error is not a running review.

Resume the same CLI session with `--resume <session_id>` for focused follow-up.
Keep its transcript and report, and provide an exact resume command or launcher
when the user wants to continue it. A supported app handoff may make it easier
to inspect later, but does not gate receipt of the review.

- Bad: return an unreviewed proposal because app session tools are absent.
- Good: run the requested version through the CLI, verify its actual model,
  resolve its findings and retain the session for follow-up.

Record the route, session identifier, requested and verified model, source
baseline, artifact paths, originating skill, coordinator receipt policy,
task and check limits, and originating Codex chat ID when available in
`review-session.json`. Reconcile the session before retrying an uncertain
launch; do not create a duplicate reviewer.

## Relay without another Codex session

The report file is the relay. A session completion message is insufficient:
the report's final nonempty line must equal `INDEPENDENT_REVIEW_COMPLETE`
exactly. Partial files are still in progress. Each run has its own report, so an
old completion marker cannot satisfy a new review.

Monitor the run in the active task with bounded checks. Check startup early,
then read progress only to detect failure, a blocking question or a stall.
Do not create a scheduled automation to watch a specific review job, launch
another Codex chat as its monitor, or promise a later notification that has no
working delivery mechanism. Continue independent work while it runs.

The reviewer is read-only except for its report; the coordinator retains the
originating task's authorization to verify and resolve findings. A completed
report resumes that work without another request from Jason. Recover through
the recorded session and preserve its model, context and output.

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

Use the recorded Claude session for a focused follow-up only when its answer
would resolve a material uncertainty. Do not repeat a whole review by default.
Keep the Claude session available for focused follow-up; do not delete it as
cleanup.

Deliver a concise verdict, important corrections, remaining decisions, and
links to the original report and revised artifact. State the repairs completed
and material verification limits. Record delivery in `review-session.json`
and retain the session's resume path.
Claim reviewer approval only for the exact baseline it reviewed, not a later
revision.
