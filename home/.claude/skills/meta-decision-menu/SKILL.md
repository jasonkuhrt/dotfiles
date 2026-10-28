---
name: meta-decision-menu
description: Use when the user asks to turn a long thread or turn into a decision menu, to state their choices or what is waiting on them ("state my choices", "what do you need from me", "decision menu", "as compactly as possible"), or invokes meta-decision-menu.
---

# Decision menu

The user reads one numbered table and answers by number ("1 yes, 2 no, veto
4"). Everything the reply holds carries a number, so they never have to
describe what they mean.

Jason, 2026-10-28, after three tries at one menu: "collapse choice/do cols its
not differentiated enough", "numbers everywhere, don't make me awkwardly
describe what i am referring to", and "if there is not whynot, its not a q".

## The reply

The reply is these sections, in this order, with nothing before them:

1. **Decisions:** a table with the columns `#`, `Do`, `Why` and `Why not`.
   - `Do` is the action you would take on a yes, as one imperative phrase. It
     is the choice: there's no separate column naming it.
   - `Why` is the checked evidence for doing it.
   - `Why not` is what a yes costs or risks, as a checked fact.
2. **Doing without asking:** a numbered list of what you do with no answer
   from the user. The user can stop one by its number.
3. **Other:** anything else the reply must carry, such as a fact the user
   asked for, also numbered.

Numbers run on across all three sections, never restarting, so each number
names exactly one item in the reply. A section with nothing in it is left out.

## A row needs a why-not

A choice with no real `Why not` isn't a question. It goes under "Doing without
asking", and you do it.

- A why-not is a cost or risk the user would weigh: an outage, money, a
  permission only they can give, work thrown away.
- "It's your call" or "you haven't said yes" isn't one.
- A gap you can close yourself isn't one either. Close it before you send the
  menu: run the missing test or read the source. The row then states what the
  check found.
  - Bad (2026-10-28): "Merge #3079" with "checks green" as its why, while the
    newest E2E journey had never run on the branch. Jason had to ask why there
    was no E2E evidence.
  - Good: run that journey locally first, then put "background-agent journey
    passed locally" in the `Why` column.

## Examples

Bad (2026-10-28), a list of questions with no reasons:

> 1. Merge #3079 and watch its first production deploy?
> 2. Merge #3077?

Bad, a `Choice` column that `Do` repeats, no why-not, and an unnumbered
"doing" list:

> | Choice | Do | Why |
> |---|---|---|
> | Merge #3077 | Merge it | Checks green. |
>
> **Doing without asking:**
> - Fix `gh-ci`.

Good:

> | # | Do | Why | Why not |
> |---|---|---|---|
> | 1 | Merge #3079, then watch the first production deploy | Checks green; new journey passed locally; production's engine speaks the same protocol (8) | First production run of the new runner: if it doesn't register, background agents stop until a revert |
>
> **Doing without asking:**
>
> 2. Merge #3077.
> 3. Fix `gh-ci` so skipped checks stop counting as passing.

## Common mistakes

| Thought | Reality |
| --- | --- |
| "I'll open with a sentence of context." | The table comes first. Context that matters is a numbered item under "Other". |
| "No why-not, but merging is a big step, so I'll ask anyway." | No why-not means it isn't a question. List it under "Doing without asking" and do it. |
| "The doing list is just FYI, it needs no numbers." | Every item carries a number so the user can stop it by one. |
| "Each section gets its own 1, 2, 3." | One sequence across the reply. Two items numbered 1 make the user describe which one. |
