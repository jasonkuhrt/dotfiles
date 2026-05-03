# Surface Discovered Issues

When working on a task, if you discover adjacent bugs, wrong assertions, stale comments, broken tests, or incorrect behavior — you MUST either fix them or explicitly surface them to the user with file:line references and a clear description.

## What counts as "discovering"

- A test you ran has a wrong assertion (passes but checks the wrong thing)
- A comment contradicts the code it describes
- A function you read has an obvious bug unrelated to your task
- A performance budget doesn't match its documented rationale
- An API is used incorrectly (wrong args, deprecated pattern, silent data loss)
- A test passes because its assertion is too weak to catch anything

## Invalid reasons to stay silent

- "Pre-existing" — if it's on your branch, it's your problem
- "Out of scope" — scope constrains architecture, not honesty
- "Not from this PR" — irrelevant; you found it, you report it
- "Acceptable for now" — that's the user's call, not yours
- "Known limitation" — only valid if the user explicitly said so in this conversation
- "Separate PR" — banned per CLAUDE.md

## What to do

1. If the fix is small and safe: fix it, mention what you fixed and why
2. If the fix is large or architectural: surface it to the user with file:line, what's wrong, and what the fix would involve
3. Never: stay silent and hope nobody notices
