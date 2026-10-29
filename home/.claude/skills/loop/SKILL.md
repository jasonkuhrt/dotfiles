---
name: loop
description: Shared execution contract for repeatable improvement campaigns. Load when running or authoring a domain loop skill that composes it; the domain skill supplies selection, proof, batching and the delivery endpoint.
---

# Loop

Run a bounded campaign through useful, reviewable work units. Compose this
contract with the named domain skill: it owns what to select, what improvement
means, how to prove it, how to batch it, and where to hand it off. Use existing
task, review and PR skills for their procedures.

## Execution and authority

Start only when the user explicitly asks to execute or continue the campaign.
Creating, editing, inspecting or automatically selecting a skill does not start
it. A direct invocation of `loop` needs a domain campaign; resolve it from the
request before changing source.

Honor the user's scope, endpoint, work count, time and subscription-quota bounds.
Keep one implementation unit active. Continue in the active session; a loop
does not create a scheduler or promise work after the session stops.

The domain skill states which delivery transitions execution authorizes and
how much work may await the user. A narrower requested endpoint wins. A request
to continue, green checks, elapsed time or approval of another PR cannot supply
missing approval. For an approval identifying a PR, record its source and
revision; material changes require a fresh OK. Use the owning PR skill for
authorized transitions, merge and cleanup.

## The cycle

1. **Resume.** Reconcile the checkpoint and canonical work records with the
   current checkout, base/head, open PRs, authorizations and native proof state.
   Preserve other sessions' changes. A missing record or new chat is not a reset.
2. **Select.** Apply the domain's ordering, eligibility and held/rejected-work
   rules. Name the user or developer consequence and the smallest useful unit.
   Do not manufacture work to fill a quota or reopen a hold without its evidence
   or the user's explicit direction.
3. **Establish evidence.** Reuse valid source and receipts first. Name the
   decision, the smallest discriminating check and its stopping condition.
   Measure only what resolves that decision; preserve unresolved uncertainty.
4. **Change and prove.** Follow the domain's implementation, self-review,
   independent-review and verification owners. Reuse still-valid review and
   proof; refresh what the changed source, context or claim invalidates. Fix
   ordinary failures within the active unit instead of opening another to evade
   them. An experiment that fails its criterion is not a delivered improvement.
5. **Deliver.** Reach the domain's declared handoff with its required evidence.
   A draft, a queued run or a conflict-free branch cannot stand in for a stronger
   endpoint. Present the result, limits, outstanding decision and exact revision.
6. **Checkpoint and repeat.** Record the delivered or held state before choosing
   another unit. Refresh selection and proof after a merge or material base
   change. Repeat only while the campaign authorizes it and its waiting-work
   capacity and requested bounds permit it.

## One durable restart point

Reuse an existing campaign/session checkpoint and its work order and ledgers;
do not create a parallel audit, queue or review registry. If no owner exists,
keep `~/.codex/<campaign-skill>/<repository-key>/checkpoint.md`, deriving the
repository key from its verified remote and reusing it on later runs.

Keep scope and authorizations, canonical record links, the active unit and
worktree/head, delivered PRs and approval revisions, evidence and review receipts,
held/rejected decisions and their reopening conditions, and the exact next
action. The domain adds only its specific state. Verify claims against live
state on resume; a saved green result is not automatically current proof.
Preserve evidence outside any worktree that cleanup will remove.

## Stop honestly

Stop at the requested bound or instruction, the domain's handoff/waiting-work
limit, no evidenced useful candidate, or a concrete blocker requiring unavailable
input or access. A verification failure calls for diagnosis and supported
recovery before it becomes an external blocker. Report the exact unmet gate and
restart action; do not describe an incomplete endpoint as achieved. Stop
processes that no longer provide feedback while waiting.
