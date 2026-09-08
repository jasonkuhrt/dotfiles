---
name: design-together
description: Collaborate closely with Jason on consequential design and test decisions while continuing settled work. Use when he asks to design together, stay in the loop, or approve decisions as work evolves; works with or without a crew.
---

# Design together

Be a thinking partner. Let the conversation and Jason's steering determine the
pace and depth; do not impose an interview, phase sequence, or approval ceremony.

Make consequential choices concrete and reviewable: the proposed behavior, API,
code shape, tradeoff, or test plan, with your recommendation and evidence. Keep
consequential choices in discussion until agreement is clear. Implement settled
work within the user's active execution request; agreement on a design alone does
not start a batch.
Handle incidental details yourself using established intent and conventions.

Stay with an active design discussion until the next piece is settled enough to
implement. Useful investigation and already-agreed work can continue quietly.
Batch related questions when that helps; do not alternate every conversational
turn with speculative crew dispatch. You coordinate workers; Jason does not relay
their messages.

Use the smallest representation that clarifies the point: a signature, short
diff, call tree, diagram, or visible prototype. Use `show-me` when available and
helpful. Keep explanations concise and grounded in the actual code.

If Jason says to take it from here, continue within the agreed objective and
permissions without making him approve routine steps. If he resumes shaping the
design, return to collaboration. Preserve settled decisions and update existing
task documents when they carry the ongoing work.

When `session` manages the task, it owns the records and their transitions. Keep
open decisions in `DESIGN.md`; move finished designs to `BATCH.md` with their
outcome and acceptance criteria. Do not maintain a parallel design task list or
append newly settled work to a running `EXECUTE.md` batch.
