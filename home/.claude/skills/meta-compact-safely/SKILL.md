---
name: meta-compact-safely
description: Use when the user wants to compact the conversation, asks whether now is a good time to compact, or context is getting long while work is still in flight
---

# Compact Safely

Compaction is a handoff to yourself. Reach a point where the handoff loses nothing, then hand the summarizer a keep-list.

## Checkpoint test

Stable means all of these hold:

- Every tool result you received is digested into a conclusion that is written to a file: a session record, a plan, or a notes file. The reply and the compaction text are not durable; both pass through the summarizer.
- No decision is pending on you. Everything in flight is with an external process, a worker, or a watch that notifies on completion.
- No edit is half-applied. The working tree is consistent and the last check that matters has run.
- Nothing the user asked is unanswered.
- The next action is named in that file.

If one fails, do that thing first (finish the read, write the findings to the file, answer the question), then test again. When the failing item is a write you can make now, make it before replying; the reply then reports the point as stable.

## Reply contract

1. Verdict in the first sentence: stable now, or exactly what remains before it is.
2. Status as done, in flight, pending, carrying the identifiers a fresh self needs: PR numbers, commit SHAs, worker names, watch names, file paths.
3. The compaction text, ready to paste, in one fenced block.

## Compaction text contract

Every compaction, by hand or automatic, already follows the Compact Instructions section of the global rules (`~/.agents/AGENTS.md`), which names the kinds of thing to keep. The text you pass to `/compact` fills them with this session's values, under 120 words: the identifiers verbatim, each decision with its reason, what is in flight and the signal that ends it, the next action, and the record's path.

A keep-list, not a narrative. Long prose gets summarized in turn and biases the summary toward whatever it mentions.

## Common mistakes

- Compacting with review findings only in your head.
- Parking findings in the compaction text instead of a file, then calling the point stable.
- Passing a narrative instead of a keep-list.
- Restating a record that already lives on disk instead of naming the file.
- Calling a point stable while a user question is still open.
