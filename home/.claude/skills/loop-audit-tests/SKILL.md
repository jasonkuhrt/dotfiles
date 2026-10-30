---
name: loop-audit-tests
description: Run repeated deep audits of test contents to find fresh fixture, case, generator and oracle waste, then deliver reviewed, actionable Linear findings. Use for ruthless test-suite audits or another pass beyond findings already handed off; the endpoint is an audit issue, not implementation.
---

# Loop Audit Tests

Help contributors get trustworthy verification with less test code and less
repeated work. Inspect what tests actually do: cases, setup, fixtures, generated
inputs, assertions and support. A smaller suite earns its cut by preserving the
consequential behavior it protects.

## Contract and owners

Load the shared [loop](../loop/SKILL.md) contract. Its work unit here is one
read-only audit pass; "change and prove" means refining and reviewing findings,
not implementing them. Load the repository's testing contract first, then
[test-review](../test-review/SKILL.md). Load browser/E2E authoring guidance when
those surfaces are examined, and the repository's issue-filing guidance before
publishing. These owners supply framework, proof and tracker conventions.

An explicit request to execute this skill authorizes a deep pass and creation
or amendment of its audit issue. Respect a requested draft-only endpoint.
Creating or editing the skill does not execute it. Implementation, PRs and
messages to other people need their own requested scope.

Automatic selection alone authorizes neither a campaign nor a tracker post.
When applied implicitly, follow the audit scope and delivery channel the user
requested. If that request does not include an issue/update, deliver findings
there; do not infer permission to publish from loading this skill. Reuse an
existing request for tracker output without asking again.

Default to one complete pass and its tracker handoff, then stop. "Again" means
another pass seeking findings beyond the previous ones. Honor an explicit
multi-pass or time/quota bound through the shared loop; do not manufacture a
finding count or imply background work after the session ends.

## Resume and choose fresh ground

1. Resolve the repository, prepared checkout, canonical base and current head.
   Read applicable guidance and preserve other sessions' work.
2. Read the live target issue, earlier audit issues and dispatched work. Build
   a compact exclusion map: finding/owner, tested behavior, avoidable mechanism,
   affected regions and proposed reduction. Deduplicate by behavior and work,
   not title or filename. A new region in the same file can still earn a finding.
3. Consult relevant backlog, recent PR diffs and upstream contributions to
   understand prior cuts and intentional tests. Respect a requested lookback;
   otherwise search selectively. Reuse established history, refreshing what
   changed rather than rereading months of work each pass. Current source owns
   claims about current behavior.
4. Select underexamined surfaces or mechanisms from the checkpoint. File size,
   repeated setup, table products, generators and subprocess calls are leads,
   not findings. Follow fixture consumers and production callers before judging
   a test. Do not turn this into a runner/cache/toolchain audit merely because
   those also affect CI speed.

When useful, reuse a small pool of subagents on disjoint fresh surfaces. Follow
the available dispatch skill. Give each the same head, exclusions, write scope
(audit notes only), proof obligations and report format. The lead owns tracker
updates and reconciliation. Call them subagents; create a sidebar chat only
when the user asks for one.

## Find work that can actually go

Inspect the test, its support, owning implementation and a real consumer.
Start from what the contributor runs or the user expects, then identify the
repeated work or wrong result the test accepts.

| Lens | What earns a change |
| --- | --- |
| Fixtures | Unconsumed actors/data; repeated key generation, schema emission, Git setup, compilation or immutable baseline construction |
| Cases | Same failure proved twice; a Cartesian dimension with no distinct behavior; repeated prefixes that fit one coherent checked lifecycle |
| Tables | One data-driven engine for the same shape; literal rows for distinct branches/boundaries; remove rows that only copy production dictionaries |
| Generators | Randomness that never affects the assertion; constant-valued properties run repeatedly; a finite protocol better represented by authored classes |
| Oracles | Fake constants, call choreography, private structure, circular expectations, shallow copies sharing mutable state, or lossy projections |
| Proof ownership | A compiler fact or existing public proof already owns the claim; a fake dependency cannot prove the database/browser/OS semantics claimed |
| Support and types | Repeated harnesses and signature mirrors; excessive scaffolding around useful inference witnesses |

Property tests earn their generator when varied inputs expose a meaningful
invariant. Preserve useful shrinking, round-trips and supported cross-API
relationships. No blanket arbitrary ban, sample-budget cut or preference for
tables solely because they are shorter.

Map each proposed deletion to a surviving public proof or a concrete admission
failure. If the existing proof is insufficient, specify the required replacement
before deletion. Retain distinct error classes, source shapes, lifecycle states,
negative/persistence/recovery outcomes and failure boundaries. A merged case
loses later execution after an earlier failure and retries its whole history;
keep separate cases when those boundaries matter.

Share immutable material, not mutable state or verdicts. Keep per-case clients,
caches, clocks, actors and cleanup where their isolation matters. Count tests,
fixtures, stories, generators and helpers together: relocating code is not a
reduction, and a new fixture framework must earn its maintenance cost.

### Check the proposed proof, not its label

- A fake or callback returning a constant cannot establish real integration
  behavior. Class names cannot establish geometry; browser claims need browser
  outcomes. Follow the local test owner rather than inventing another surface.
- Immutability expectations must not alias the input. Check each combinator's
  actual input: a later call can mutate an intermediate model while the original
  remains unchanged.
- Concurrency/readiness claims need synchronized outstanding work. Observe the
  complete result and bound, not a negative assertion made before work starts.
- Contextual callback inference and the returned API can regress independently.
  Preserve both when consequential; exact equality may subsume exclusions and
  extracted union-arm mirrors. Do not change public types to simplify a test.
- Preserve exact identities, order and authored fields where consumers depend
  on them. A title-only or presence-only projection may discard the very error
  the test should detect.

## Evidence proportional to the decision

For each candidate, name the decision, smallest discriminating check and stop
condition. Source evidence often settles an audit finding. Run a bounded probe
only when it resolves an uncertainty material to the recommendation, using the
prepared checkout's normal workflow. Do not run broad suites or invent benchmark
infrastructure just to validate an audit.

Expand tables, loops and fixture lifetimes when counting. State the unit:
registrations, material generations, database copies, queries, subprocesses,
browser contexts or actual requests. Do not infer one from another. Separate
fresh-state from reused-state provisioning and candidate regions from net LOC.
Source-derived operation savings are not measured local or CI time savings.

If a probe is warranted, record its selection, revision, conditions, result and
limits; stop once the decision is settled. Distinguish a source-demonstrated
false oracle from a mutant actually run. Future implementation checks can be
acceptance criteria without pretending the audit executed them.

## Review and deliver

Before publishing, independently review concrete findings when delegation is
available. Reuse workers as cross-reviewers of different surfaces. Have the
reviewer inspect source and challenge novelty, counts, consumer consequence and
every retained/replacement proof. The lead reconciles findings and corrections;
do not treat an agent's summary as verified evidence. Record a material review
gap if independent review is unavailable.

Use the current audit issue as the canonical work queue. Append fresh findings
while it remains open for discovery. Once dispatched or under implementation,
default to a new linked issue so its agreed scope stays stable; an explicit user
request to enhance that issue wins. Re-read immediately before updating and
patch the intended section, preserving existing text, metadata and other work.
Do not create an empty issue when no new candidate survives review.

Each actionable finding contains:

- **Problem:** who pays for redundant work or accepts a wrong verdict.
- **Evidence:** revision, repository-relative source anchors, consumer and
  current/proposed work in a compact comparison; identify counts versus timing.
- **Change:** the smallest implementable cut or proof correction, with its
  surviving owner and mandatory replacement outcomes.
- **Check/stop:** the discriminating wrong behavior, smallest verification and
  completion condition, plus what remains unverified.

Group findings into independently deliverable slices without a fixed quota.
Link existing owners instead of refiling their work. Mark true prerequisites
separately from shared files: file overlap does not itself require stacking.
Name concrete shared edit targets and coordinate them when parallel execution
is requested. Record checked keeps/rejections so later passes do not rediscover
them without new evidence.

Reconcile any source drift before handoff, narrowing or refreshing affected
claims. Read back the saved issue to confirm content and metadata. The final
reply links the issue, states how many genuinely new findings were added and
highlights the strongest ones. Report audit/probe limits without claiming every
test line was exhausted or that proposed savings already happened.

## Checkpoint for the next pass

Use the shared loop's single restart point; the issues remain the findings
ledger. Add only audit-specific state: prior issue/dispatch links, audited head,
visited surfaces, novel mechanisms delivered, keeps/rejections with reopening
conditions, review/probe evidence and the next underexamined surface. Keep durable
evidence outside disposable worktrees; temporary reports alone are not a restart
point. Stop at the requested pass/handoff, a real access blocker or no further
evidenced candidate. Another pass begins from this state, not from zero.
