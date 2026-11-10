---
name: code-in-replies
description: Use before writing any code block in a reply (source, a command, a query, a diff, a schema). Sets its title, how it is explained, its annotations and state, its layout and line length, and when a drawing replaces the fence.
---

# Code in replies

## Code or a drawing

- A code block holds code: source, a command, a query, a diff, a schema, under a language tag the app colors (`ts`, `sh`, `sql`, `diff`). The rest of this skill applies to those blocks.
- A mechanism, a flow or a set of states that isn't code is drawn: a sequence diagram for actors over time, an inline widget for many items with states or for options to switch between. A reply that is mostly fences of something that isn't code fails, however well annotated.
- A term the reader hasn't met is defined, in plain words, before the drawing that uses it.
- Bad: "The four directions, as the agent meets them": one `text` fence of four places, each a note annotation over the same `vp exec vpp pr run` line, plus faked terminal output and doc prose re-wrapped into fences.
- Good: a widget with the suite's 118 test cases colored by what happens to each, a switch between the three ways to prove a commit, and what CI, the undraft gate and develop conclude under each; then a sequence diagram of the pick.

## Modes

Every code block in a reply takes exactly one of three modes:

- **Mode 1, note annotations:** the code's only explanations are note and pointer annotations inside the block, and nothing below the block explains it.
- **Mode 2, bare code, then prose:** the code has no explanatory comments, and prose under the block explains it.
- **Mode 3, commented code alone:** the code carries ordinary comments, and there's no prose about it before or after.

All three modes keep state and place annotations, and spacer annotations where the layout puts them.

Say each fact once. A note and prose, or a comment and prose, never say the same thing. Bad: a block whose comment says "the type leaves it out", followed by a bullet saying "the first read takes its type from the Code case's internal schema".

## Annotations

The noun for every comment these rules put in a code block is **annotation**.

- A state annotation touches the divider and place annotation under it.
- Explanations live inside the block, not in numbered points below it. A pointer carries its own text; a note never trails its code line. A note above code has empty lines before and after, no arrow icon, and its text aligns to the place annotation's `@` column.
- A state annotation has no rule; a divider sits above every place annotation, and a note under a place annotation joins it through a spacer annotation.

The block below shows the format.

```ts
// ── CURRENT
// ─────────────────────────────────────────────────────────
// ── @ libs/shop/cart.ts
//
//    Every caller filters the cart for stock by hand.

cart.items.filter((item) => item.inStock);

// ─────────────────────────────────────────────────────────
// ── @ apps/shop/checkout.ts

const ready = cart.items.filter((item) => item.inStock);
//            ^^^^^^^^^^^^^^^^^ the same filter again

//
//
//
//
// ── IDEA
// ─────────────────────────────────────────────────────────
// ── @ libs/shop/cart.ts
//
//    The cart owns the stock filter, and callers name it.

cart.inStock();
```

There are six kinds. The state and place annotations start with `// ── `; the divider is `// ` and its rule; the note, pointer and spacer annotations start with `//` alone.

- **State annotation:** `// ── CURRENT` for code as it is on develop, `// ── IDEA` for code that doesn't exist yet, with nothing after the word.
- **Divider annotation:** `// ` and a rule of 57 `─`, so it ends at column 60, the longest any line in a block can be. It sits directly above every place annotation in a block that has a state (see State modes).
- **Place annotation:** `// ── @ <where>`. It names where the code below it lives: a file path, or the context when there is no file (a terminal, a generated client, a type at hover).
- **Note annotation:** `//`, four spaces, then the note, so its text starts in the column of the place annotation's `@`. A note too long for one line wraps onto more lines at the same indent. It explains the whole lines under it, on its own lines above them. It carries no marker, arrow or number.

  ```ts
  //    Every caller filters the cart for stock by hand,
  //    so the predicate is written once per caller.
  ```

- **Pointer annotation:** a line directly under a code line: `//`, then spaces so that `^` characters sit exactly under the columns that matter, then a space and the note. It explains part of a line; a note annotation explains whole lines.

  ```ts
      where: { archived: false },
  //         ^^^^^^^^^^^^^^^^^^^ archived rows stay out
  ```

- **Spacer annotation:** `//` alone. It gives space where an empty line can't: more than one line of it, since formatters keep one empty line and collapse more, and space inside a header, which has no empty lines.

## State modes

A block of the codebase's code is in exactly one of three state modes, never two and never another:

- **State mode 1, current:** the block leads with the `CURRENT` state annotation, and all of it is code as it is on develop.
- **State mode 2, current then idea:** the block leads with the `CURRENT` state annotation, then all the current code. One `IDEA` state annotation follows, and everything after it is code that doesn't exist yet.
- **State mode 3, idea:** the block leads with the `IDEA` state annotation, and all of it is code that doesn't exist yet. It is the mode for code that changes nothing the reader needs to see as it is now, such as a sketch, pseudo code, designs compared with each other, and every block of a design still above the code.

Each state annotation appears once, and a `CURRENT` after `IDEA` is invalid. A `CURRENT` part that is there only to fill the frame fails: that block is idea alone.

- Bad: each design block opens on `// ── CURRENT` with two develop lines that neither design changes, then the four-spacer `IDEA` frame, then the design.
- Good: each design block opens on `// ── IDEA`, its divider and its place annotation, `// ── @ a sequence run as one Inngest workflow`, with note annotations above the lines that matter.

- In state mode 2, the `IDEA` part changes what the `CURRENT` part shows, in the same place and with the same names. An idea that lives somewhere else gets a `CURRENT` part showing that place as it is now.
  - Bad: `CURRENT` shows the app's `FolderWithDocuments`, and `IDEA` shows a test in `libs/prisma-scope` over that suite's own models, with nothing linking the two.
  - Good: `CURRENT` shows the prisma-scope test file as it is, and `IDEA` shows the test added to it.

A block that shows no code of the codebase has no state, so it has no state annotation and no divider: its place annotation opens it. Examples are a deploy request's schema diff, a terminal's output, a query's rows, a payload on the wire, and a program an agent writes in a tool's sandbox.

- Bad: `-- ── CURRENT`, the divider, then `-- ── @ heartbeat-main deploy request #365, new table SequenceVersion`, then the diff.
- Good: `-- ── @ SequenceVersion`, then the diff, under a line that links the deploy request in the PlanetScale dashboard (see Titles).

`CURRENT` and `IDEA` say only whether code is on develop. Two products, two setups or two ways to call a tool are never a current and an idea, even when one side is what runs today and the other is the recommendation: each side is its own block, opened by a place annotation that names it.

- Bad: `// ── CURRENT` over `// ── @ Amp code_exec, Security Logs Review`, calling Axiom through Executor, then the four spacers and `// ── IDEA` over `// ── @ Amp code_exec, Axiom connected directly in Amp`.
- Good: `**Axiom through Executor, in Amp**` over a block opening on `// ── @ Amp code_exec, Axiom through Executor`, then `**Axiom connected directly, in Amp**` over a block opening on `// ── @ Amp code_exec, Axiom connected directly`, neither with a state annotation or divider.

## Titles

Every code block in a reply has a title: one bold line directly above its fence, saying what the block shows.

- Bad: a sentence of prose, then the fence of the for-loop sketch.
- Good: `**Mayhul's for loop, run when the person enters**`, then the fence.

A deploy request's schema diff is the one exception: its blocks have no title. One line above them links the request in the PlanetScale dashboard, and each block's place annotation names only its table, so it already says what a title would.

- Bad: `**New table SequenceVersion**`, then a block opening on `-- ── @ heartbeat-main deploy request #365, new table SequenceVersion`.
- Good: `[The deploy request that adds SequenceVersion](https://app.planetscale.com/heartbeat/heartbeat-main/deploy-requests/365)` once, then each table's block opening on `-- ── @ SequenceVersion`.

## Layout

- Each place opens with a header: one run of comment lines with no empty line inside it. In order, it holds the state annotation (only where a part starts) and the divider, both only in a block that has a state, then the place annotation, and, when a note explains the code right under the header, a spacer annotation and that note. One empty line separates the header from the code under it.
- Every change of place opens a new header, with one empty line between it and the code above.
- A note annotation further down, below a code line rather than under a header, has one empty line above it and one below.
- A pointer annotation touches the code line above it.
- An `IDEA` state annotation after current code has four spacer annotations touching it from above, and one empty line separates them from the code above.
- A state annotation on a block's first line, `CURRENT` or a leading `IDEA`, gets no spacer annotations.

## Line length

Every line in a code block is at most 60 characters long, annotations included.

- A note annotation is broken by hand before it passes 60, and each further line keeps the note's indent.
- A pointer annotation's text that doesn't fit continues on the lines below it, each starting in the column where its text started.

  ```ts
  e2e           skipped until /pr e2e run
  //                          ^^^^^^^^^^^ local E2E doesn't
  //                                      count; CI runs it
  ```

- A code line longer than 60 is broken where a formatter set to a width of 60 would break it.
- A place annotation that doesn't fit continues on the next line: `//` and six spaces, so the rest of the path starts under the path's first character.

  ```ts
  // ── @ parts/backend-services/src/cells/Page/
  //       models.iso/Version.model.ts
  ```
