# Token Budget Discipline

## Explore Tool Gate

Before launching Explore (or any broad search), confirm it's optimal. If the user named specific files/tools/configs, use Read/Glob directly. Only Explore for genuine cross-codebase questions with no obvious starting point.

## Unbounded Cost Gate

Before any action with unbounded token cost (Explore agents, large file reads, multi-file searches, unknown-size web fetches), confirm it's the right move. If uncertain, ask the user first.

## Token Spike Transparency

When a single action consumes ≥20k tokens: `⚠️ ~<N>k tokens just consumed — <reason>`. State it first, then continue.
