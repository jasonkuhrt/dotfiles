---
name: top-down
description: A mode the user switches on to stay in the loop. Use when the user invokes top-down, says to work top down, or says to stop bottom-up, test-first, check-heavy or review-heavy work. Until the user ends it, write the top of the work as you wish it to be, in short turns he can approve, and do no bottom-up work he has not authorized.
---

# Top down

A mode, not a task. It starts when the user invokes this skill and holds until
the user ends it (`/top-down off`, or words that say so). It survives compaction
and handoffs: carry "top-down mode is on" in whatever you hand yourself.

It gates what agents do by default: explore from the bottom up, write tests
first, check after every edit, review before moving on, and run on their own for
minutes or hours. In this mode none of that happens without the user's word.

Why: the top is the part most likely to be wrong, either because you and the
user understood the work differently, or because the user can only tell once he
sees it whole. Built from the bottom up, the top arrives last, so a wrong one
wastes everything built under it, after the user has waited through all of that
work. Written first, it takes a short turn, arrives as edits small enough to
approve, and costs one more short turn when it is wrong.

The mode is about the shape of the code, not about whether it runs. Running is a
bottom concern by definition. Types are not: they are the shape written
precisely, so a type check sits far above running in the order of things to do.

## What you do

1. **Write the top first, as you wish it worked.** The top is what a consumer
   sees: the calling code, then the public shape under it (names, types,
   schemas, signatures, payloads, a config's keys). You know how you wish it
   worked: write that. Whether the layers below allow it is not a question you
   answer now.
2. **Finish the types and omit the implementations.** Whatever the top needs
   under it gets its whole signature and no body: a placeholder that satisfies
   the type and does nothing.

   ```ts
   const send = (email: Email): Receipt => {
     throw new Error('todo');
   };
   ```

   Any form of that idea will do: a thrown `'todo'`, a value written as
   `undefined as never`, an abstract member. The types are finished work. The
   bodies are not started until the user releases them.
3. **One slice a turn, then stop.** Make the edit, or show the same code in chat
   where the user reviews there first. Say in a line or two what it is and what
   it assumes, and end the turn. The user approves or redirects, and the next
   slice follows. A turn that keeps the user waiting more than a couple of
   minutes is the failure this mode exists to prevent.
4. **Wish, do not prove.** Where the top needs something that may not exist or
   may not work (a library feature, a combination nobody has run), write the top
   as if it does, and name the wish once, where you write it.

## Types before running

The work rises through three levels, and the user raises each one:

1. The top is written, and the user accepts its shape.
2. The types pass: the program type-checks with its bodies still omitted.
3. It runs: implementations, tests, and everything else that needs a running
   program.

Types are not kept passing at every moment. While the top is still moving, a
failing type check is expected and is not yours to chase. The user says when to
raise that bar, with the companion skill `top-down-make-types-pass`.

One rule has no exception: nothing of level 3 starts until level 2 is complete.
No implementation and no test is written while a type error stands.

## What you do not do, unless the user authorizes that piece

- A probe or a feasibility check ("does the library take this?").
- Reading down into a dependency's internals to confirm an approach. Read what
  the top touches, the consumer and the declarations it calls, and stop there.
- An implementation: a body that does the work.
- A test written first, or a test run.
- A type check. The user releases it with `top-down-make-types-pass`.
- Any other check after an edit: lint, generation, a build, a gate set, CI.
  Nothing is verified along the way.
- A review: a review pass of your own, a review agent, a second opinion.
- A worker, a subagent or a workflow that runs without the user watching.

When one of these seems necessary, name it and its reason in one line, and go on
with the top. The user authorizes it or does not.

## What a failure is

Nothing in this mode is verified until the user raises a level. Say so once when
the mode starts, not in every turn. A type error that shows when the types are
raised, or a crash that shows once it runs, is new work, appended to what is
left. It is never a reason to go back and prove the top before writing it, and
never a reason to reshape the top on your own.

## What still holds

The user's own gates: no push, no merge and no destructive act without his word,
and a name he gave is kept. Honest reports: "written, not checked" is what you
say of work in this mode, never "works".

This mode overrides any skill or instruction that asks for tests first,
verification before completion, a review before continuing, or evidence before a
claim about a library. Those run when the user releases them.

## Starting and ending

- **Start:** answer with one line, "Top down: on". If something bottom-up is
  running (a check, a worker, a watch), name it and ask nothing: the user stops
  it or lets it finish. Then name the next slice of top.
- **End** (`/top-down off`, or the user says the mode is over): list what was
  never checked, as the work that is now due, and go back to your defaults.
