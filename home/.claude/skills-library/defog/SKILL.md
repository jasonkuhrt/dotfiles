---
name: defog
description: >-
  Use when the user says "$defog", "/defog", "plain English", "too dense",
  "translate that", "what does that actually mean", "human version", "less
  jargon", "give me the TLDR", "anti-slop funnel", or otherwise asks to turn a
  wall of agent text into something clear, short, and easy to read.
---

# Defog

Turn dense agent output into plain English for a tired human.

## Purpose

Use this skill when the problem is not missing information. The problem is that
the information is buried in sludge.

Assume the human is often context-switching across many features, agents, and
threads. They are checking in from above the weeds, not living inside this one.

Your job is to reduce cognitive load fast:

- shorter
- clearer
- more concrete
- less abstract
- less jargon

Your second job is to preserve decision-making signal:

- what this is about
- why the human should care
- whether action is needed now
- what can be safely ignored

## Source

Default to the most recent assistant output unless the user points at a
different blob of text.

Do not ask a clarification question unless you genuinely cannot tell what text
to defog.

## Output Contract

Start with a one-sentence gist.

Then use one of these shapes:

- For explanations: `What it means`, `Why it matters`, `What to do`
- For reviews/findings: `Problem`, `Impact`, `Fix`
- For choices: `Best option`, `Why`, `Tradeoff`

Rules:

- Max 10 lines unless the user explicitly asks for more
- Re-orient the human fast: name the feature, system, or decision this belongs to
- Absolute zero fragmentation: give one consolidated answer, not scattered partial frames
- Materialize the whole state of the conversation: pull together all still-relevant open threads, corrections, and caveats into one clear current view
- If earlier assistant answers conflict, supersede them explicitly with one fresh answer instead of layering another fragment on top
- Do not answer the latest sub-question in isolation if the real human need is a full-frame reset
- Short sentences
- No nested bullets
- No hedging throat-clearing
- No repeating the same idea in new words
- No unexplained jargon
- If you must use a technical term, define it in 3-7 plain words
- Prefer concrete nouns and verbs over abstractions
- Say what is true, what is broken, and what happens next
- Say whether this is action, risk, or background

## Context Gap

Assume the agent holds far more local context than the human does.

That means:

- do not make the human reconstruct hidden context from prior turns
- do not make the human stitch together five prior answers to discover the current truth
- pull forward the missing orientation in one short line
- translate local weeds into managerial signal
- if something only matters inside the implementation, say so
- if something changes a decision, lead with that
- when the thread has sprawled, collapse it into one materialized view of:
  current state, resolved points, unresolved points, and the next move

## Translation Rules

Rewrite for a human with low bandwidth:

- Replace category words with specific things
- Replace passive voice with who-does-what
- Replace long chains of caveats with the main point
- Replace "semantics", "surface area", "abstraction", "orchestration", and similar fog words with plain language unless they are truly necessary
- Collapse four weak points into one strong point when they mean the same thing

Bad:

- "This exposes a semantic limitation in the driver abstraction."

Good:

- "This driver cannot pause inside an activity. That feature does not work yet."

## Never Do This

- Do not preserve the original structure if the structure is the problem
- Do not mirror the agent's tone if the tone is bloated
- Do not dump every detail "for completeness"
- Do not turn clarity into a taxonomy
- Do not answer in fragments that force the human to merge old and new answers in their head
- Do not introduce a new list that silently changes the frame without reconciling the old one

## If The User Sounds Fried

Optimize for relief.

That means:

- lead with the answer
- tell them what bucket this belongs in: act now, watch, or ignore
- cut to the real point
- tell them what to ignore
- if there are multiple dangling threads, close them into one coherent picture first
- end with the next concrete move
