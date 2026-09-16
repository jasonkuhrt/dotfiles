---
name: simplicity
description: Design, simplify, or review software for clear responsibilities, strong contracts, and low conceptual complexity. Use for architecture, abstraction boundaries, encapsulation, API and configuration design, or questions about overengineering and taste; not merely a request to shorten code.
---

# Simplicity

Make the system easy to understand correctly and change deliberately. Minimize
the concepts, decisions, coordination, and hidden obligations someone must hold
in mind. Preserve the complexity inherent in the problem; remove the complexity
introduced by its representation and distribution.

Start from the intended behavior and an ideal interface. The current file layout,
implementation, and sunk effort are evidence to inspect, not a design to defend.
Respect the user's chosen assumptions and ergonomics. Do not invent a broader
product or compatibility target in the name of generality.

## Judge the system, not a proxy

- **Responsibility:** each concern has an identifiable owner and reason to change.
- **Cohesion:** a module's operations and invariants form one intelligible contract.
- **Encapsulation:** callers express their intent without knowing the owner's
  representation, protocol details, or operational bookkeeping.
- **Composition:** the caller visibly connects meaningful operations; understanding
  the happy path does not require reconstructing an implicit framework.
- **Type safety:** types express valid states and meaningful distinctions, rather
  than leaving callers to coordinate flags, strings, casts, and conventions.
- **Developer experience:** names, signatures, configuration, errors, and docs tell
  the same story. Someone unfamiliar with the implementation can use it correctly.

LOC, file count, dependency count, and diff size describe size, not architectural
quality. Consumer count is never a system-design criterion. Duplication is a clue
to investigate, not the definition of a missing abstraction. Conversely, moving
code behind another name does not by itself improve encapsulation.

## Find the right owners

Read a real use path through its orchestration, contracts, implementation, and
dependencies before endorsing its shape. Separate the decisions being made from
the mechanics executing them. Ask what knowledge each caller has to carry and
whether that knowledge belongs there.

Push a concern to the lowest layer that can own its complete meaning without
knowing the higher layer's policy. Keep domain decisions in their domain owner.
A lower layer should not acquire app identifiers, workflow choices, or persistence
policy merely to make a callsite shorter.

For example, a wire-format codec owns parsing, validation, and representation
rules; a transport owns acquisition; an application owns what an accepted value
means for its workflow. Passing low-level primitives through a large function
does not establish those semantic boundaries.

Inspect existing libraries, SDKs, and upstream APIs for the needed operation.
Verify that their contracts actually fit; naming similarity is insufficient.
Reuse a suitable owner, or give a distinct responsibility a focused module or
library with a supported interface. Do not force it into an unrelated utility
bag, and do not create a framework when a concrete operation expresses the need.

In Effect code, compose the existing resource, filesystem, network, process, and
error capabilities. Runtime dependencies belong at the established service
boundaries. A meaningful operation may deserve its own contract above those
primitives: using Effect throughout does not prove that responsibilities are
properly separated. Follow the repository's runtime conventions when another
runtime or SDK already owns execution.

Evaluate an extraction by both sides: what coherent responsibility becomes owned
below, and what policy remains readable above? A new helper that still makes its
caller orchestrate every internal detail has not completed the extraction. A
helper that hides the caller's policy has crossed the boundary in the other
direction.

## Remove decisions and coordination

Prefer one authoritative declaration with derived views over independently
maintained versions of the same fact. Apply this across code, package metadata,
configuration, workflow YAML, generated files, and docs—not just within a function.
Keep orchestration at integration sites and implementation with its owner.

Make the normal use path direct. Derive values the system already knows; expose
inputs only for choices the caller actually owns. Conventions should remove
repeated decisions and be discoverable, with one definition and actionable errors.
Do not add a parallel configuration protocol over a task runner or platform that
already owns the relevant semantics.

Prefer explicit data and ordinary composition to registries, factories, mode flags,
callback protocols, or lifecycle machinery when those mechanisms add concepts
without expressing a real requirement. Preserve meaningful differences instead
of forcing superficially similar operations through conditional generalization.

Store state when its history matters; otherwise derive it. Make lifecycle,
invalidation, and authority explicit for state that must exist. Validate external
or uncertain input at its boundary; avoid making every internal layer re-establish
the same invariant. Use precise types to carry established guarantees onward.

Each extra option, fallback, adapter, cache, or defensive branch must serve a
concrete supported behavior or consequential failure. Do not speculate about
unsupported environments or remote edge cases. Record accepted limitations and
risks honestly; simplifying the implementation must not silently alter semantics.

## Make the interface prove the design

Sketch the intended callsite or configuration before elaborating its internals.
Use the smallest concrete representation that exposes the decision: a signature,
short code example, or before/after dependency shape.

Check whether the interface names the actual domain operation, makes illegal
combinations difficult to express, and keeps the caller's policy visible. Prefer
familiar language and canonical domain names over invented terminology for
implementation artifacts. Important guarantees, assumptions, and failure behavior
belong in self-documenting types, JSDoc, and focused comments beside their owner.
Comments should explain why a constraint exists, with evidence when it comes from
a tool limitation—not narrate obvious code or excuse avoidable entanglement.

A short README happy path is a useful test: can it explain the purpose and ordinary
use without first teaching internal stages, directory layouts, or hidden switches?
If not, investigate the interface before adding more documentation to compensate.

## Review with evidence and independent judgment

For a consequential finding, show the actual source, the mixed responsibilities
or unnecessary decisions, a concrete replacement shape, and the invariants and
tradeoffs it preserves. Explain what becomes easier to reason about. “Cleaner,”
“small,” “reusable,” and “the tests pass” are not architectural arguments.

Check both where complexity is needed and where it belongs. Demonstrating that
an algorithm is necessary does not justify its current location. Check for both
missing boundaries and abstractions that introduce needless indirection.

Read and assess the evidence behind another reviewer's conclusion. Agreement,
model choice, confidence language, and repeated review passes are not validation.
When the user challenges a criterion, reconsider the reasoning on its merits;
do not defend the previous verdict or manufacture agreement by changing labels.
Keep one current, coherent assessment and explicitly supersede a mistaken verdict.

Report architectural findings, demonstrated behavior, verification results, and
unresolved choices distinctly. Green CI establishes the checks it ran, not good
design. “No findings in the reviewed surface” is supportable; blanket guarantees
that the system contains no unnecessary complexity are not.

## Carry the judgment into the work

A review request calls for concrete findings and recommendations. An authorized
implementation calls for applying the settled design through its agreed delivery
and verification. Do not turn every refactor into an approval ritual, expand the
assignment into a speculative redesign, or dismiss a finding by deciding the
user's priorities for them. Keep consequential open choices visible.

Follow the repository's testing guidance. Preserve consequential public behavior
with an independent oracle and one proof owner per risk. Move coverage with the
contract when ownership changes; remove private-helper tests and duplicate proofs.
Do not introduce exports, mocks, or a new test harness solely to accommodate an
implementation-shaped test. Verification should establish the preserved behavior,
not merely confirm the new code's structure.

Finish with what changed in the system's concepts or responsibilities, the evidence
for that improvement, and any remaining design decisions. Avoid scoring the result
by how many helpers, files, tests, or lines were added or removed.
