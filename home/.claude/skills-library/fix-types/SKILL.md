---
name: fix-types
description: Fix TypeScript errors in a target path until the scoped typecheck is clean. Use when the user explicitly asks for a focused type-fixing pass.
argument-hint: "[path]"
disable-model-invocation: true
---

# Fix Types

Fix TypeScript errors in `$ARGUMENTS`. If `$ARGUMENTS` is empty, default to `src/`.

## Requirements

- Use the project's `tsconfig.json`.
- Continue until the scoped `tsgo --noEmit` run reports zero errors.
- Do not use `@ts-ignore` or `@ts-expect-error`.
- Ask before design-significant refactors or public API changes.

## Steps

1. Resolve the target path.
   - If `$ARGUMENTS` is empty, use `src/`.
   - Validate the target exists and stays inside the project.
2. Scope the typecheck.
   - If the target is the whole project, use `tsconfig.json`.
   - Otherwise create `tsconfig.fix-types.json` extending `./tsconfig.json` with:

```json
{
  "extends": "./tsconfig.json",
  "include": ["<target>/**/*"]
}
```

3. Run `tsgo --project <config-file> --noEmit` and fix errors systematically.
   - Work file by file.
   - Keep public contracts properly typed.
   - If internal type safety gets too contorted, simplify the implementation types instead of weakening the public API.
4. If a fix requires significant refactoring or a public API change, stop and present the error, possible solutions, and tradeoffs before continuing.
5. Re-run `tsgo --project <config-file> --noEmit` after each batch. Do not stop until it reports zero errors.
6. Delete `tsconfig.fix-types.json` if you created it.
7. Only claim success after showing the final scoped `tsgo --noEmit` run with zero errors.
