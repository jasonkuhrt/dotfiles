# Token Budget Discipline

## Explore Tool Gate

**Before launching an Explore subagent (or any broad codebase search), you MUST be 100% certain it is the optimal approach.** If there is any doubt, ask the user first:

> "I'm considering using Explore to [reason]. This will consume significant tokens. Should I proceed, or is there a more targeted approach?"

Indicators that Explore is **wrong**:
- The user showed a screenshot or named a specific tool/config — the scope is already bounded
- You can name the exact file(s) to check — use Read/Glob directly
- The question is about a single config, setting, or error — targeted search, not exploration

Indicators that Explore is **right**:
- "How does X work across the codebase?"
- "Where is Y used?" with no obvious starting point
- Genuine architectural understanding needed

## Unbounded Token Cost Gate

Before taking **any action with unbounded token cost** (Explore agents, large file reads, multi-file searches, web fetches of unknown size), confirm it's the right move. If uncertain, ask the user with your proposed approach before executing.

## Token Spike Transparency

When a single action consumes **≥20k tokens**, immediately tell the user:

```
⚠️ ~<N>k tokens just consumed
Reason: <one-line explanation>
```

Do not bury this in other output. State it first, then continue.
