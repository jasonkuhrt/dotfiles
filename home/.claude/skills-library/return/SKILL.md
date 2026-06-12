---
name: return
description: >-
  Reset a long or messy conversation back to one coherent current view. Use
  when the user says "/return", "return to the main thread", "where are we",
  "what are we actually doing", "level set", "reset me", "current truth", or
  otherwise needs the thread collapsed into what is done, what is not done,
  what matters now, and the next move.
---

# Return

Reset the thread to one clear current view.

## Purpose

Use this when the problem is not missing information.
Use it when the thread has sprawled and the human needs one clean picture of:
- what we are doing
- what is already done
- what is not done
- what matters now
- what happens next

This is not a summarizer.
This is not a rewriter.
This is a thread state reset.

## Source

Default to the whole current thread, not just the last assistant message.

Pull together:
- the user's latest intent
- any corrections the user made
- any earlier assistant mistakes that changed the frame
- what has actually been done in code
- what is still only discussion
- the next concrete move

If earlier assistant answers conflict, replace them with one fresh answer.
Do not preserve the old framing.

## Framing Priority

Before writing the return, decide what the main thread actually is.

Use this order:
- the user's latest durable goal for the work
- any explicit correction from the user about scope or priority
- the concrete code/task state that exists now
- delegated side work only if it changes the main path

Treat these as secondary unless the user explicitly promoted them:
- sub-agent handoffs
- profiling or diagnostics side quests
- broad checks
- assistant-proposed follow-up options
- process chatter about who owns what

## Output Contract

Start with one sentence:
`Current thread: ...`

Then use exactly these sections:
- `Done`
- `Not Done`
- `Open`
- `Next`

## Rules

- Keep it to 12 lines or fewer unless the user asks for more
- Use short sentences
- Use plain words
- Say what is true now, not what used to be true
- Distinguish code that exists from plans that do not
- Name the real feature or system immediately
- If the assistant caused confusion, say the corrected frame plainly
- Make `Current thread` name the primary workstream, not the latest side quest
- Put delegated or side work under `Open` only when it materially affects the main thread
- End with one concrete next move on the main thread, not a menu of options

## Never Do This

- Do not answer only the latest sub-question
- Do not summarize the last assistant message in isolation
- Do not dump every detail for completeness
- Do not leave the human to infer what changed
- Do not blur implemented, designed, and discussed
- Do not let handoffs, profiling detours, or assistant-offered branches become the main thread by accident
- Do not end with “or give me the next task” style branching when the point is to re-anchor the thread

## Example Shape

Current thread: page-template is adopting a tree domain model above the flat DB rows.

Done
- Base tree lib first pass exists
- Review feedback was sent to the worker

Not Done
- No page-template migration code exists yet
- No tRPC or client tree adoption has landed

Open
- Final tree core shape
- Shared page-template tree types

Next
- Finish the tree lib second pass, then define `PageTemplateVersionTree`
