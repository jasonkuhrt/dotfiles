# React 19 + React Compiler Era

Anchored facts for the React ecosystem as of 2026. Do NOT web-search to
re-derive these; they are stable releases with permanent dates.

## Release anchors

- **React 19.0 stable**: December 5, 2024.
- **React 19.1**: Q1 2025 (incremental).
- **React Compiler stable / production-ready**: October 7, 2025 (React blog).

## Manual memoization is mostly obsolete under React Compiler

React Compiler automatically applies the equivalent of `React.memo`,
`useMemo`, and `useCallback` to compiled components. It memoizes
intermediate values and expensive computations across the component tree —
strictly more comprehensive than hand-rolled memo at component boundaries.

**Default position for RC-enabled code:** do not write `React.memo`,
`useMemo`, or `useCallback` by hand. Let the compiler optimize.

**Manual memo is still warranted in these cases only:**

1. **Third-party / legacy code** that hasn't been processed by the
   compiler — uncompiled subtrees don't get auto-memoization.
2. **Unstable references from external hooks/libraries** that propagate
   into your tree. RC can't reach into a library to stabilize its return
   identity.
3. **Class-heavy renders** where instance identity matters. RC's
   memoization is less precise around class instances; manual control
   may be necessary.

If a manual memo doesn't match one of those three, it's pre-RC habit —
remove it.

## `React.memo` named-function-expression pattern

The canonical pattern for setting React DevTools displayName when manual
`React.memo` is used:

```ts
const PulseAvatar = React.memo(function PulseAvatar(props: Props) { ... });
```

Without the named function expression, DevTools shows `Memo(Anonymous)`,
which destroys debuggability. Arrow functions cannot satisfy this — they
have no `name` property bound from the expression site, only inferred
from the const binding in some bundler configurations (unreliable).

**Lifecycle implication:** this pattern is only relevant *while manual
memo is in use*. Once a file moves into the React Compiler scope and the
`React.memo` wrapper is dropped, the named function expression goes with
it — the inner function becomes the component itself, with its const-binding
name. So named-fn-in-memo is the canonical pattern *for that intermediate
state*, not forever.

## `forwardRef` is deprecated in React 19

React 19 lets function components accept `ref` as a regular prop. The
canonical 2026 pattern:

```ts
function MyComponent({ ref, ...props }: Props & { ref: Ref<HTMLDivElement> }) {
  ...
}
```

`forwardRef` still functions for backward compatibility but will be
phased out. Existing `forwardRef(function Name(props, ref) { ... })`
call sites should migrate. The migration eliminates both the deprecated
wrapper AND the named-function-expression that was preserving displayName
for it — net simplification.

Note: ref-as-prop does NOT work on class components (class `ref` still
references the instance). Function components only.

## Identifying RC scope in a codebase

A repository may roll out RC incrementally. Signals that RC is enabled
for a given file:

- Bundler config includes `babel-plugin-react-compiler` (Vite / webpack /
  Next.js) with a scope/include pattern.
- Lint rules from `eslint-plugin-react-no-manual-memo`
  (`react-no-manual-memo/no-component-memo`,
  `react-no-manual-memo/no-hook-memo`) are enabled for that file in
  oxlint/eslint config. Their presence implies the codebase enforces
  "no manual memo" specifically because RC is doing the work.
- A `// eslint-disable-next-line react-compiler/...` or similar bailout
  comment near the file.

If a manual `React.memo` exists in a file OUTSIDE the RC scope, it's
pre-RC code awaiting migration. If it exists INSIDE the RC scope, it
should already have been removed by `no-component-memo` enforcement —
investigate why it's still there.

## How to use this

Before recommending a memoization pattern, a forwardRef migration, or a
named-function-expression carve-out:

1. Check the React version (`grep '"react"' package.json`).
2. If React 19+, check whether the file is inside the RC scope using the
   signals above.
3. If RC-scoped, the default answer is "no manual memo, no forwardRef".
4. If pre-RC scope on React 19, the named-fn-in-memo pattern is
   canonical for now but ephemeral — call it out as a "removes when this
   file enters RC scope" lifecycle item rather than asserting it as
   forever-best-practice.

## Sources

- [React v19 release notes](https://react.dev/blog/2024/12/05/react-19)
- [React Compiler stable announcement (Oct 7, 2025)](https://react.dev/blog)
- [memo – React](https://react.dev/reference/react/memo)
- [forwardRef – React](https://react.dev/reference/react/forwardRef)
- [eslint-plugin-react-no-manual-memo](https://www.npmjs.com/package/eslint-plugin-react-no-manual-memo)
