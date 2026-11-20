---
name: code-in-replies
description: Use before writing any code block in a reply (source, a command, a query, a diff, a schema). Sets its title, how it labels code as it is or proposed, how it is explained, its annotations and line length, and when a drawing replaces the fence.
---

# Code in replies

## Code or a drawing

- A code block holds code: source, a command, a query, a diff, a schema, under a language tag the app colors (`ts`, `sh`, `sql`, `diff`). The rest of this skill applies to those blocks.
- A mechanism, a flow or a set of states that isn't code is drawn: a sequence diagram for actors over time, an inline widget for many items with states or for options to switch between. A reply that is mostly fences of something that isn't code fails, however well annotated.
- A term the reader hasn't met is defined, in plain words, before the drawing that uses it.
- Bad: "The four directions, as the agent meets them": one `text` fence of four places, each a note annotation over the same `vp exec vpp pr run` line, plus faked terminal output and doc prose re-wrapped into fences.
- Good: a widget with the suite's 118 test cases colored by what happens to each, a switch between the three ways to prove a commit, and what CI, the undraft gate and develop conclude under each; then a sequence diagram of the pick.

## Titles

Every code block in a reply has a title: one bold line directly above its fence, saying what the block shows.

- Bad: a sentence of prose, then the fence of the for-loop sketch.
- Good: `**Mayhul's for loop, run when the person enters**`, then the fence.

A deploy request's schema diff is the one exception: its blocks have no title. One line above them links the request in the PlanetScale dashboard, and each block's place annotation names only its table.

- Bad: `**New table SequenceVersion**`, then a block opening on `-- @ heartbeat-main deploy request #365, new table SequenceVersion`.
- Good: `[The deploy request that adds SequenceVersion](https://app.planetscale.com/heartbeat/heartbeat-main/deploy-requests/365)` once, then each table's block opening on `-- @ SequenceVersion`.

## As it is, or proposed

When the code's source or status matters, say it in the title. Name the branch, commit or working tree the excerpt comes from, or say the code is proposed. Keep status labels out of the code comments.

When the reader needs both versions, show the change in one `diff` or in two titled blocks with the existing code first. Show a proposal on its own when it stands on its own.

- Bad: one block with `CURRENT` and `IDEA` comment frames around the Messages panel models.
- Good: one block titled **MessageStats (on develop)** and another titled **Message (proposed)**.

## Explanation modes

Every code block in a reply takes exactly one of three modes:

- **Mode 1, note annotations:** the code's only explanations are note and pointer annotations inside the block, and nothing below the block explains it.
- **Mode 2, bare code, then prose:** the code has no explanatory comments, and prose under the block explains it.
- **Mode 3, commented code alone:** the code carries ordinary comments, and there's no prose about it before or after.

All three keep place annotations. In an applicable patch, the file headers serve that purpose. Say each fact once: a note and prose, or a comment and prose, never say the same thing.

- Bad: a block whose comment says "the type leaves it out", followed by a bullet saying "the first read takes its type from the Code case's internal schema".
- Good: the comment alone, or the bullet under a block with no comment.

## Annotations

Annotations are the comments these rules put in a block, in the language's line comment (`//`, `#`, `--`). There are three kinds:

- **Place:** `// @ <where>`, opening each place's code: a file path, or the context when there is no file (a terminal, a generated client, a type at hover). One empty line separates a place's code from the next place annotation.
- **Note:** `// ` and the note, on its own lines above the whole lines it explains, with no marker, arrow or number. Right under a place annotation it touches it; anywhere else it has one empty line above and one below.
- **Pointer:** a line directly under a code line: `//`, spaces so that `^` characters sit under the columns that matter, a space and the note. It explains part of a line.

**Every caller filters the cart (on develop)**

```ts
// @ libs/shop/cart.ts
// Every caller filters the cart for stock by hand.

cart.items.filter((item) => item.inStock);

// @ apps/shop/checkout.ts

const ready = cart.items.filter((item) => item.inStock);
//            ^^^^^^^^^^^^^^^^^ the same filter again
```

- Bad: `cart.inStock(); // callers name it`, a note trailing its line, or numbered points under the block.
- Good: `// Callers name the filter.` on its own line above `cart.inStock();`.

## Line length

Keep the original lines of a patch the reader will apply. In other blocks, each line is at most 60 characters, annotations included.

- A code line longer than 60 is broken where a formatter set to a width of 60 would break it.
- A note is broken by hand before it passes 60, and each further line starts with `// ` again.
- A pointer's text that doesn't fit continues on the lines below it, each starting in the column where its text started.

  ```ts
  e2e           skipped until /pr e2e run
  //                          ^^^^^^^^^^^ local E2E doesn't
  //                                      count; CI runs it
  ```

- A place annotation that doesn't fit continues on the next line: `//` and three spaces, so the rest of the path starts under its first character.

  ```ts
  // @ parts/backend-services/src/cells/Page/
  //   models.iso/Version.model.ts
  ```

- Bad: a 90-character `findMany` call the reader scrolls sideways to finish.
- Good: the same call broken over lines, each within 60.
