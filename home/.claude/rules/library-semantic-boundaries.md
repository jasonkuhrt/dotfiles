# Library Semantic Boundaries

Library code has a semantic meaning that includes being decoupled by design. Physical colocation in a monorepo is an incidental fact about deployment, not a signal about the code's contract.

## Rules

- Always treat library/design-system code as if it ships to external consumers, even when it lives in the same monorepo
- Never use knowledge of current consumers to dismiss concerns, skip work, or justify incomplete APIs ("not a real concern for this codebase's usage patterns" is invalid reasoning)
- Never use file proximity or "same repo" as justification for skipping documentation, tests, stories, or API completeness
- Fixes belong at the library level when the behavior is a general concern, not patched at call sites
- When reviewing library code, every concern about the public contract stands on its own merits — "unlikely in practice" is not a rebuttal when you're reasoning from consumer knowledge you shouldn't have
