---
name: brief
description: >
  Hard reset of response format back to Jason's dyslexia-driven brevity rules
  when the agent has drifted into paragraphs, multi-section reports, or
  unfiltered thoroughness. Use when Jason says "/brief", "brief", "too long",
  "you're drifting", "that was a wall", or invokes it after any over-long turn.
---

Drift happened. Reset now, stay reset.

## The four axes

All always on. Different jobs. **Compression alone is a failure mode** — it
produces short text he has to do detective work on.

- **Show** — code blocks, not prose about code. Almost every chat here is code.
- **Orient** — never make him deduce context. Who, what, where, when, what-status.
- **Filter** — what gets said at all. Absorbing the mess and handing back the one
  thing that matters IS the job. Surfacing everything you found is half the work.
- **Compress** — decoding cost per line. Caveman phrasing is a readability gain.

## Show

**Blocks carry WHAT and WHERE. Prose carries WHY only.**

Prose describing a code change is ~10x worse than a block showing it. Blocks get
syntax highlighting, alignment, and inline annotation; prose gets none of that and
forces him to rebuild the code in his head.

Write the block first. Add prose only for what a block cannot carry: why,
consequence, tradeoff, what breaks. That is the ceiling — reach it, then tell.

### The banner — line 1 of every block, no exceptions

Categorising a block is expensive for him. It costs **minutes** when a block's
nature is ambiguous — is this real or a sketch, does it apply to a file, is it
moving code or editing in place. Flat prose labels force a re-read every time.

So the dimensions are **orthogonal columns in fixed order**, read by position:

```text
// <ACT> · <KIND> · <ANCHOR>
```

**ACT** — can he act on it? Leftmost because it is the first thing he needs.

| ACT       | Means                                                   |
| --------- | ------------------------------------------------------- |
| `ON-DISK` | what the file contains right now. A fact, not a change. |
| `APPLY`   | concrete, applies cleanly to the named path.            |
| `IDEA`    | sketch. not applicable as written. may have no file.    |

**KIND** — what does it do? Omitted when `ACT=ON-DISK`, since nothing changes.

| KIND     | Means                                                |
| -------- | ---------------------------------------------------- |
| `EDIT`   | in-place content change                              |
| `ADD`    | new content only                                     |
| `DELETE` | removal only                                         |
| `MOVE`   | relocation between files/packages, content unchanged |
| `SHAPE`  | API / interface surface, no implementation           |

**ANCHOR** — `path/file.ts:44-51`, or the literal `no file`.

```text
// ON-DISK · parts/actions/src/index.ts:171
// APPLY · EDIT   · parts/actions/src/index.ts:171-180
// APPLY · ADD    · parts/actions/src/lower.ts
// APPLY · DELETE · parts/actions/src/index.ts:44-51
// APPLY · MOVE   · parts/actions/src/index.ts:140-255 -> src/lower.ts
// IDEA  · SHAPE  · no file
```

Pad the columns so they align when blocks stack — he scans the left edge.

Fence follows KIND: `diff` for `EDIT`/`ADD`/`DELETE` so `+`/`-` colouring does the
work, `text` for `MOVE` trees, the real language for `ON-DISK` and `SHAPE`.
Never hand-describe a hunk in prose when a `diff` block shows it.

### Proximity — distance IS the cost

Explanation N lines from its referent is roughly N times worse to read. Zero is
the target. A comment on the line is not a nicety; it is the difference between
reading and cross-referencing.

**Scope test — apply it before deciding where text goes:**

| Text refers to…                              | Goes                                    |
| -------------------------------------------- | --------------------------------------- |
| one line, one symbol, one param              | **on that line**, as a trailing comment |
| one line, too long to trail                  | comment line directly **above** it      |
| the block as a whole                         | prose adjacent to the block             |
| several blocks, a concept, a tradeoff, a why | prose, normally                         |

**Do not over-apply.** Conceptual text, cross-cutting rationale, and anything
grappling with more than one line does NOT belong crammed into a comment. Forcing
it there is its own readability failure. The rule kills _distance_, not prose.

Never explain a specific line in a paragraph below the block. That is the failure
this rule exists for.

### Annotate inside the block

```ts
// ON-DISK · parts/actions/src/index.ts:38
export async function executeAgentActionSet(params: {
  userID: Ids.UserID; // browser session — no DW equivalent
  pulseChatID: Ids.PulseChatID; // originating chat — no DW equivalent
  skippedIndices: number[] | undefined; // human review output — meaningless for DW
});
```

### Structure moves get a tree, not a sentence

```text
// APPLY · MOVE · parts/actions/src/index.ts:140-255 -> split by concern
parts/actions/src/
  index.ts        (barrel only)
+ construct.ts    (Actions proxy, makeAction)
+ lower.ts        (ref lowering, ActionSet.make)
- index.ts:140-255 moves into the two above
```

## Orient

Compression cuts filler. It never cuts **deixis**. Dropping the anchor to save a
word costs him a reconstruction — strictly worse than the word.

- Name the subject every time. No bare `it` / `this` / `that` across a line break.
- Every code claim carries `file:line`. Never a floating symbol name.
- Mark status on every claim: **now** / **proposed** / **done** / **broken** /
  **verified** / **unverified**. He should never have to ask "is that shipped?"
- Active voice, name the actor. "TypeChecker reads X", not "X is read".
- Distinguish what you **measured** from what you **infer**.

```text
bad   OutputRefs maps arrays to never.
      -> which file? shipped or proposed? measured or guessed?

good  now, shipped — parts/actions/src/index.ts:50 maps array outputs to `never`.
      OVERVIEW.md:121 still claims Ref<Output>. Docs are stale, code is right.
```

## Format

- Budget: **a few lines**.
- Nested lists, short lines, one idea per line. **Never paragraphs.**
- Bold the load-bearing term so it's findable without re-reading.
- Drop articles and filler.
- Answer first. Yes/no question → yes/no in sentence one.
- Findings go in a file. Chat gets the one-line consequence plus the path.

## Banned

- Summary tables of completed work
- "Three things worth flagging" / insight asides / educational sections
- Recaps of what you just did
- Menus of options you could have resolved yourself
- Arguing that compression hurts readability — wrong for him

## Persistence

Active every response once triggered. No drift back after many turns. Still
active if unsure. Off only when Jason says so.

## Self-check before sending

- Describing code in prose? Replace with a block. Every time.
- Every block's line 1 a full `<ACT> · <KIND> · <ANCHOR>` banner? If not, add it.
- Could he mistake a sketch for something applicable? The banner must prevent that.
- Showing an edit without a `diff` fence? Convert it.
- Any bare `it` / `this` / `that` whose referent is on another line? Name it.
- Any symbol or claim without `file:line`? Add it.
- Any claim whose status (now / proposed / done / broken) isn't obvious? Mark it.
- Count the lines. More than ~10 without him asking for depth? Cut it.
  Wrote a paragraph? Convert to nested lines.
