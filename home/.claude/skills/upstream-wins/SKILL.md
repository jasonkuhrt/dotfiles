---
name: upstream-wins
description: "Run or resume a dependency improvement loop: simplify our code with installed or newer upstream capabilities first, then prepare upstream contributions only after proving the active dependencies are at their ceilings. Accepts packages, repos, or devdeps. Excludes the frozen Expo app by default."
---

# Upstream wins

Deliver local simplification first. Use what dependencies already provide,
upgrade to released capabilities that replace our code, and remove the
workarounds they make unnecessary. Upstream implementation becomes the primary
work only after the requested active scope is proved at its available ceiling.

Creating, editing or inspecting this skill does not start a campaign. An
invocation or request to execute, continue or resume does. When the project
provides a `loop` skill, load its execution contract; this skill supplies the
selection, evidence, batching and delivery rules. Do not install a project loop
skill at user level. Otherwise use the cycle below.

## Scope and the frozen app

`/upstream-wins <target>...` accepts package names, upstream repos, or
`devdeps`. Derive package repos and exact pins from the registry, manifests,
catalogs and lockfile; use `vp info` in Vite+ projects.

For `devdeps`, enumerate external development dependencies of active workspace
packages, follow workspace links to their external tools, and include the
patches and wrappers over those owners. Group sibling packages by upstream.
Do not equate a package name containing "dev" with the active graph.

**Exclude Expo by default.** Heartbeat's `apps/heartbeat-expo/**` is frozen;
treat it as absent. Exclude its source, history-only leads, native qualification
and exclusive dependency closure from discovery, upgrades and ceiling claims.
Do not let Expo, React Native or a frozen SDK's peer pins cap active web or
tooling dependencies. Keep shared dependencies when an active consumer uses
them. Include the frozen app only when the user explicitly requests it; a broad
`devdeps`, React or dependency-upgrade request does not opt it in. Carry the
exclusion into every worker brief and checkpoint without asking again.

Use the repository's established validation workflow. If a shared gate still
forces Expo, use an existing authorized package exclusion or skip. When no such
route exists, record the exact gate and missing capability; do not investigate
Expo, invent proof, silently change shared validation policy, or ask whether
Expo should be excluded again.

## The cycle

Keep one implementation unit active. Reuse a small pool of workers for related
evidence and review; batch a broad inventory by upstream cohort, rather than
launching fresh workers for every package.

1. **Resume.** Reconcile the checkpoint, active worktree/head, canonical ledger,
   open PRs, authorizations and native proof. Refresh changeable facts. Resume
   unfinished delivery before selecting another implementation.
2. **Select a local win.** Prefer a native API already installed; then a
   released upgrade that removes a patch, wrapper or duplicated mechanism; then
   a released capability with a measured workload benefit. Read the actual
   supported export, implementation and consumer contract. Similar names and
   an unused helper are not sufficient evidence.
3. **Prove the decision.** Name what this check decides, the smallest check
   that distinguishes the options and when to stop. Reuse valid receipts.
   Compare the consumer's output, error, resource and demand behavior where
   the change matters. Do not postpone a proven local win to finish a broad
   audit or prepare an upstream patch.
4. **Implement and deliver locally.** Migrate consumers and delete what the
   upstream replaces in the same unit. Follow the repository's formatting,
   self-review, independent-review, proof, PR and merge workflows. Fix ordinary
   verification failures within the unit.
5. **Checkpoint and repeat.** Record the actual delivered or held state and the
   exact next action, then select the next eligible local win. Repeat within
   the user's bounds and authorization. A queued run or draft is not a landed
   improvement.
6. **Use the upstream lane only at the ceiling.** When the active requested
   scope has no remaining evidenced local adoption win and its ceiling checks
   are complete, read [upstream contribution evidence](references/upstream-contributions.md).
   Preserve upstream bug leads while doing local work; recording one does not
   promote it ahead of local simplification.

## What proves a ceiling

A version inventory alone proves no capability ceiling. For the requested
active scope, retain:

- Exact installed versions and current published versions on the chosen release
  channel, with lookup date and source. Check a newer major and its required
  peer cohort rather than ruling it out because today's consumers need work.
  An intentional prerelease need not move backward to an older stable version.
- Which released native APIs, configuration and fixes replace the local
  mechanisms under review, checked against actual artifacts and consumers.
  A merge on main is not release containment.
- The attempted adoption, its proof and removed local responsibilities; or
  the concrete contract/access/workload fact that prevents adoption. Keep
  unchecked candidates explicitly unchecked and holds with reopening evidence.

Do not claim "latest and greatest" while newer targets or native replacements
remain unchecked. Do not switch to upstream implementation to escape an
unfinished local upgrade, failed check or missing ceiling evidence.

## Delivery and authority

The default unit is a reviewed, proven PR to our repo that simplifies our code.
Land it when the user's standing repo rules authorize that transition; otherwise
reach the authorized handoff and wait. A narrower endpoint wins. Keep at most
one local unit awaiting a user decision, and do not start another implementation
to evade that decision. Continue after a delivered unit while the campaign's
scope and bounds permit useful work.

External posts follow the user's posting conventions and the task's actual
authorization. When the requested task includes an issue, PR or comment, post
it after its evidence and review gates without another text-approval stop.
An audit or local implementation alone does not authorize an unrelated external
message. Do not wait on a maintainer's response in the active loop: checkpoint
it and continue eligible local work.

Stop at the user's bound or instruction, the waiting-work limit, no evidenced
useful candidate, or a concrete unavailable input/access/gate after supported
recovery. State the unmet endpoint and exact restart action. A loop runs in the
active session; it creates no scheduler or promise of work after the session.

## One restart point and one bug ledger

Reuse the existing campaign/session checkpoint and canonical
`tmp/upstream/README.md` index; do not create parallel queues or review
registries. If no checkpoint exists, use
`~/.codex/upstream-wins/<repository-key>/checkpoint.md`, deriving the key from
the verified remote. Keep evidence and durable records outside a worktree that
cleanup will remove, and link them from the index.

Record scope and Expo exclusion, authorizations and bounds, the active unit's
worktree/base/head, delivered PRs, release/API ceiling receipts, proof and review
receipts, held/rejected reasons and reopening conditions, and the next action.
Reconcile these records with live state on resume; saved green is not current
proof.

Keep `tmp/upstream/untracked-bugs.md` as the canonical discovered-bug ledger.
Retain a verified upstream bug even when fixing it cannot remove our workaround.
Separate confirmed defects, unverified leads, known tracking, published fixes,
closed-without-fix reports and refutations. Record bounded duplicate searches
and their gaps; absence from a search is not proof no issue exists. Link the
local patch, wrapper or FIXME when one exists; do not invent a local tracker
for a bug with none. When filed, add the issue URL and update the local tracking
pointer through the normal repo workflow.
