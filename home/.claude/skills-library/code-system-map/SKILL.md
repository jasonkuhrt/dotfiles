---
name: code-system-map
description: >-
  Use when the user asks "what is this", "explain this", "why/how/when does
  this code run", "help me understand this block", or points at suspicious or
  wrong-looking code and needs a fast system-level map for refactor decisions.
  Produces before/after reference-site reports with code evidence and plain
  English bullets, not local-only explanations.
---

# Code System Map

Explain code by mapping the system around it.

The user is not asking for a glossary. They need to decide whether a block is
wrong and what must move with it if they refactor.

## Trigger

Use this skill when the user points at code, a file path, a symbol, or a block
and asks for explanation, system understanding, "what is this", "why", "how",
"when", or refactor context.

If the code cannot be located in the workspace, explain that the system map
cannot be proven and ask for a file path or symbol.

## Workflow

1. Resolve the anchor.
   - If given a path and line/block, read that exact area.
   - If given pasted code, search exact distinctive strings with `rg`.
   - If multiple matches remain, show the concrete candidates and ask which one.
   - If the anchor is a cluster of constants/helpers, explain the cluster as one
     boundary and then call out any member with a different system path.

2. Trace both sides.
   - **Before sites**: callers, entrypoints, schemas, types, builders, config,
     database fields, dependency services, and transformations that feed the
     block.
   - **After sites**: return values, persistence writes, emitted events,
     adapters, projections, UI/API consumers, tests, docs, or generated output
     that consume what the block creates.

3. Select layers by decision value.
   - Prefer the smallest set of layers that explains the system path.
   - Include the anchor layer, at least one before layer, and at least one after
     layer when the repo makes that possible.
   - Do not dump every reference. Pick representative reference sites that
     reveal ownership, contract, or refactor blast radius.

4. Explain from evidence.
   - Every layer gets one short code block with file and line comment.
   - Every layer gets plain-English bullets.
   - Say "inferred" when connecting behavior that is not directly visible.
   - Say "not found" when a before/after side was searched but absent.

## Output Contract

Start with a one-sentence gist.

Then use this shape:

````markdown
## Anchor

```ts
// path/to/file.ts:12
const suspiciousThing = ...
```

- What this block is doing.
- Why this block exists in this system.
- What looks wrong or worth questioning.

## Before: <layer name>

```ts
// path/to/upstream.ts:34
callerOrInput(...)
```

- What feeds the anchor.
- When this path runs.
- What contract the anchor receives from this layer.

## After: <layer name>

```ts
// path/to/downstream.ts:56
consumer(anchorOutput)
```

- What consumes the anchor's output.
- What would break or need to move in a refactor.
- What invariant this downstream layer assumes.

## Refactor Decision Notes

- Keep/move/delete/split candidate, stated plainly.
- Files or contracts that must change together.
- Unknowns that still need proof before editing.
```
````

Use more `Before`, `Anchor`, or `After` sections only when there are genuinely
distinct layers, for example transport -> schema -> handler -> persistence ->
projector -> UI.

## Rules

- Do not answer with a local line-by-line tour only.
- Do not explain basic language syntax unless it changes the decision.
- Do not ask the user for discoverable facts; inspect the repo first.
- Do not claim runtime behavior without a source-backed reference.
- Keep code blocks tight: normally 5-20 lines.
- Prefer exact `file:line` references and clickable local file links in prose.
- Use point form. Short bullets. Plain English.
- End with the refactor decision signal, not a summary of what you searched.

## Reference Search Hints

Use `rg` first:

```bash
rg -n "SymbolName|distinctive string" .
rg -n "operationName\\(|fieldName:" path/to/relevant/area
```

For TypeScript:

- Check exported types and schemas before call sites when the block defines a
  contract.
- Check call sites and adapters before internals when the block is executable
  behavior.
- Check tests when the system expectation is unclear, but do not treat weak
  tests as truth.
