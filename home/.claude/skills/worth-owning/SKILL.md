---
name: worth-owning
description: Use when deciding what to do about a bug, review finding, edge case or risk found during work, before writing a fix, guard, check, workaround, patch, comment, test or issue for it; when triaging review or bot findings; when a dependency misbehaves; and when the user invokes worth-owning or calls a fix tech debt, esoteric, overengineered or slop. Chooses the set of actions whose benefit beats its cost, priced from the issue's and the actions' factors.
---

# Worth owning

Jason, 2026-10-28:

- "u will not add tech debt for esoteric issues, at most u will make code
  comments tracking upstream issues that have led to a problem"
- Then, replacing that rule with a model: "there is axes but also something
  else", listing the factors and actions below, and "as for intersection, it
  is something like: cost of acting vs benefit of acting".

The model governs. Its comment action is the one he named, "comment about
intentionally not doing in the code at spot", priced like every other
action, and not limited to issues that have bitten. "No tech debt for
esoteric issues" survives as a rule of section 4.

## 1. Classify the finding

- **Confirmed:** reproduced, or shown by a log line, a report or a failed run.
- **Unconfirmed:** credible, but neither shown nor ruled out.
- **Refuted:** the code, or a deterministic reproduction, shows the trigger
  cannot produce the failure.

A refuted finding gets nothing. An unconfirmed one is priced like a
confirmed one, except that only actions that gather evidence (make it
visible, a probe test) can pay. A run that never met the trigger refutes
nothing, and neither does a passing run of a timing-dependent mechanism.

- Bad: calling the shutdown race refuted after a run with the collector
  down, in which Maple's own eight-second dispose let the other exporter
  finish.
- Good: a collector answering 400 at once met the trigger, and the race
  reproduced.

Then find the source: our code, our misuse of a dependency (which is ours),
or a dependency breaking its own contract, docs or spec.

## 2. Weigh the factors

Score each factor none, low, medium, high or unknown, with the evidence
behind each score. Showing a mechanism is evidence that it exists, never of
how often it occurs.

The issue's factors:

- **Likelihood:** how often the trigger occurs. Raised by: it has bitten,
  normal operation produces it (every deploy, a config every stage has).
  Lowered by: it needs a combination normal operation does not produce.
- **Impact:** what happens when it occurs, typical and worst case, and the
  worst case's own likelihood. High: a wrong result, a failed check passing,
  lost or corrupt data, an outage, a security hole. Low: noise, a log line, a
  lost span.
- **Audience:** who is exposed: only us, or every user of the dependency who
  meets the trigger's conditions.

The factors of each candidate action, since each action is a different fix:

- **Cost:** the effort to make and verify it, and what it costs to run:
  volume, latency, spend, alert noise.
- **Code effect:** the damage it does to the code (annotations, casts,
  special cases, a parallel path, divergence from a library's own idiom, a
  test knob production lacks) or the help it gives (simpler, more correct,
  code deleted).
- **Owner:** who carries it after it lands: us, or upstream.
- **Future change:** what deferring costs, since the fix grows harder once
  data is stored in the wrong shape, a contract is published, or more
  callers depend on the behavior; and what acting leaves behind, such as a
  workaround to delete or a patch to rebase on every bump.
- **Delivery:** whether and when the benefit arrives. Immediate for our own
  code. For an upstream action: how actively the project merges and
  releases, how long related work has waited, and when we would take the
  release.

## 3. Price the actions

- **Benefit:** the harm averted for the audience reached (likelihood times
  impact, the worst case counted with its own likelihood), discounted by
  delivery, plus any code help, plus the future cost avoided by acting now.
- **Cost:** our effort, plus the action's runtime cost, plus its code damage,
  plus the future change it leaves us. What upstream spends is not ours.

An unknown factor is priced at both ends of its plausible range. An action
that pays at both ends pays, and one that fails at both does not. One that
pays at only one end turns on the unknown: settle it first when settling is
cheap, otherwise take the cheapest action that settles it, or pass over with
the unknown named.

| Action | Its benefit reaches | Its cost to us |
| :-- | :-- | :-- |
| Fix it now in our code | us | effort, runtime, code effect, upkeep |
| Workaround in our code for an upstream bug | us, until upstream ships | effort, code damage, deleting it later |
| Patch the dependency (pnpm patch) | us, with our code unchanged | effort, a rebase on every bump |
| Bump, pin or replace the dependency | us | the change's own risk and effort |
| Upstream PR | every exposed user, once released and adopted | the PR's effort, its review rounds |
| Upstream issue | every exposed user: a public reproduction now, a fix once upstream acts | a minimal reproduction |
| Add to an existing upstream issue or PR | the same, when it adds what the report lacks | a comment |
| Priority Backlog Linear issue | the team, later | the team's attention, triage |
| Comment at the site | the next reader or reviewer, who would otherwise re-derive or re-flag it | a line, stale without a link |
| Make it visible (a log line, a metric) | whoever must notice when it occurs | a little code, and its runtime cost |
| Pin the behavior in a test | whoever changes the code next | the test's upkeep |
| Nothing | nobody | nothing |

## 4. Choose the set

The set chosen is the one whose benefit most exceeds its cost, each harm
counted once whichever action averts it. To find it:

1. Add actions one at a time, best first, while what the next adds beyond
   the set already chosen exceeds its own cost.
2. Then remove any action whose removal loses less benefit than it saves in
   cost, since a later action can make an earlier one redundant.
3. Repeat both until neither changes the set.

Actions that pay only together, such as a fix and the test that pins it,
are priced as one. Nothing is the set when no action pays.

- Fails: an action whose benefit the rest of the set already holds.
  - Bad: once we take a release that fixes #7245, keeping the comment at
    `dispose`, which then explains nothing the code still does.
  - Good: the bump that takes the fix deletes the comment.
- Fails: code damage for an issue whose impact is low even at its highest
  plausible likelihood ("no tech debt for esoteric issues").
  - Bad: `a807dbd8fb`, an annotated processor list and a second shutdown path
    for the race.
  - Good: `831aaab83d`, which took them out.
- Fails: ruling out an upstream report because the issue is rare for us. An
  upstream action reaches every exposed user.
  - Bad: the first version of this skill, which gave the race "no comment, no
    issue".
  - Good: open-telemetry/opentelemetry-js#7245.
- Fails: an upstream report that is not legit. Legit means reproduced on a
  release with a minimal reproduction that holds none of our code, the same
  code read in the latest release and on main, against the dependency's own
  contract, with no open issue or PR already covering it, and every name in
  it checked against the version it names. Filing goes through the
  `upstream-wins` skill and the user's posting rules.
  - Bad: #7245's first follow-up told 3.x users to import
    `BasicTracerProvider` from `@opentelemetry/sdk-trace`, which exports
    `TracerProvider`; it was corrected after.
  - Good: #7245 itself: two bare processors on 2.12.0, the same
    `Promise.all` read at `v3.0.0` and on main, and #6980 cited as keeping
    the settlement policy.
- Fails: a comment that links nothing and explains nothing a reader would
  otherwise re-derive.
  - Bad: "may lose spans on shutdown".
  - Good: the comment at `dispose` saying a refused last batch also ends the
    provider's wait for its other processors, left as is, with #7245's link.

## 5. Report

One row per finding: its class, the factor scores with their evidence, the
set chosen, and the actions passed over with what each failed to add.

## Example (PR 3109, OpenTelemetry shutdown)

**An unreachable collector made the worker exit 1 at shutdown.** Confirmed by a reproduction.

- Likelihood likely, not measured: production runs that worker with no
  collector, so every shutdown with spans queued since the last export
  fails, and the worker drains its in-flight runs as it stops. Impact low to
  medium: a failed exit code and an error stack. Audience: us. A rejecting
  shutdown is the SDK's contract, and our `finally` let it crash.
- Fix now: low cost, the same lines with `Promise.allSettled`, neutral code
  effect. It pays even at the low end of its likelihood. Set: the fix.
  Nothing upstream: no bug there.

**A refused last batch ended the provider's shutdown while another exporter was still sending.** Confirmed by a reproduction.

- Likelihood unknown for us: never observed, and it needs our collector to
  refuse fast while Context Company is mid-export. Impact low, and bounded:
  one shutdown's Context Company spans. Audience: every SDK user who runs two
  or more processors and exits when shutdown settles, at a frequency nobody
  has measured.
- Fix now: medium cost and code damage. Even at the highest plausible
  likelihood the loss is one shutdown's spans, so it fails at both ends.
- Upstream issue: delivery uncertain. The project is active (13 PRs merged
  in the two weeks to 2026-10-28, releases on 08-31, 10-06 and 10-20), but
  the related lifecycle PR #6980 has waited since 08-06. At the low end it
  still gives every exposed user a public reproduction and gives our comment
  its link, for the cost of writing up a reproduction already made. Pays at
  both ends: taken (#7245).
- Comment at `dispose` linking #7245: one line, and it stops the next
  reviewer re-flagging the race, as one review already did. Taken.
- Passed over: an upstream PR, since #6980 rewrites the same function and
  its review would collide; and a Linear issue, since #7245 holds it.
