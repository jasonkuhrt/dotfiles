---
name: naming
description: Use before choosing, proposing or reviewing a name in code, a schema or a design (a model, a field, a column, a function, a procedure, a file, a module, a domain term), and when the user questions whether a name fits. Derives the name from a plain sentence of what the thing is, judges it where it is read, and never weighs its length.
---

# Naming

## Scope

- The rules for the surface being named come first: a Linear title
  (`linear-issue`), a PR title's scope, Heartbeat's casing and plural rules
  (`AGENTS.md`, App Conventions), a settled term in a
  `UBIQUITOUS_LANGUAGE.md`. This skill chooses the wording those rules leave
  open.
- A new domain term goes into its context's glossary as that repository
  says. This skill derives the term; the glossary owns it once it is settled.
- An example name the user floats is a candidate (`pattern-not-example`).

## Rules

1. **The name comes from a sentence.** Before naming, write one plain sentence
   that says what the thing is, in the domain's own nouns (in Heartbeat, the
   cell's `UBIQUITOUS_LANGUAGE.md`). Build the name from that sentence. The
   name answers every question a reader would ask of it (what is counted or
   held, in what state, on what condition, as of when), never a comment
   beside it. A label in the UI is copy for customers, never the source.
   - Bad: `waiting` on a Sequence Stats `Message`, from no sentence, then
     `runsWaiting`, chosen to name runs and match the UI's "Waiting" label.
     Neither says which runs count or that the value is a count.
   - Good: "the number of active runs whose next due message is this
     message", then `activeRunCountWithThisMessageDueNext`.

2. **Length is never a consideration.** A name is never shortened, and a
   candidate is never rejected or ranked lower, for being long. A word goes
   only when the use site already says what it says.
   - Bad: `activeRunCountWithThisMessageDueNext` cut to `runsWaiting` to
     read shorter.
   - Good: `activeRunCountWithThisMessageDueNext` kept, since each word
     defines what the field counts.

3. **Judge it at the use site.** Write the name where it is read (the
   property access, the call, the column in a query, the import) and judge
   that line, never the declaration alone.
   - Bad: `waiting`, judged in the model's field list under a heading about
     runs. At `message.waiting` it reads as a flag that the message waits.
   - Good: `message.activeRunCountWithThisMessageDueNext`, read as a phrase.

4. **The name says whose fact it is.** When a value about one thing is kept
   on another, the name names the thing the fact is about.
   - Bad: `message.waiting`, a count of runs that names no runs.
   - Good: `message.activeRunCountWithThisMessageDueNext`.

## Showing candidates

When Jason asks for naming options, give the count he names. Show each
candidate at the same use site, all with the same meaning, and mark the pick
with its reason. Asking him to decide follows "Before a question to Jason".
