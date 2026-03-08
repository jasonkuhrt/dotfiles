---
name: writing-redux-selectors
description: This skill should be used when the user asks to "document our Redux system", "create Redux docs", "explain Redux architecture", or when working with Redux selectors, useSelector memoization, selector re-renders, createSelector, Redux performance, derived data, or selector caching. Covers the three Redux layers (core Redux, Redux Toolkit, React-Redux) and provides patterns for efficient state derivation, memoization, and architecture documentation.
---

# Writing Redux Documentation & Selectors

Guidance for documenting Redux architecture and writing performant selectors.

## Architecture

See `/docs frontend-redux` for ecosystem layers, slice organization, middleware pipeline, backend-linked actions, and data fetching patterns.

## Operations

### Document Redux System

When asked to "document our Redux system" or similar:

**Output location**: `docs/redux/` (or user-specified)

**Templates**: Located in `templates/`. Each has `[placeholder]` values to replace with codebase analysis.

#### 1. concepts.md (static)

Copy `templates/docs-concepts-template.md` verbatim. No analysis needed.

#### 2. middleware.md (populate)

Use `templates/docs-middleware-template.md`. Find middleware array in store config, list in order.

#### 3. slices.md (populate)

Use `templates/docs-slices-template.md`. FS tree viz of all slices:

- Slice name = domain concept (`post`, `user`), not filename
- Path to file on right (relative, cmd-clickable: `../../libs/...`)
- Actions/selectors nested under each slice with brief descriptions
- Standalone actions at top level

#### 4. backend-linked-actions.md (populate)

Use `templates/docs-backend-linked-actions-template.md`. Mermaid sequence diagrams for actions meeting criteria:

- Action affects multiple slices AND involves server round-trip
- Skip synchronous reducers (no backend involvement)

### Codebase Analysis

```bash
# Find store configuration
rg "configureStore|createStore" --type ts

# Find all slices
rg "createSlice" --type ts -l

# Find middleware
rg "middleware.*=|applyMiddleware" --type ts

# Find actions in a slice (look for slice.actions exports)
rg "actions" path/to/slice.ts
```

## Writing Selectors

Selector conventions are enforced by `redux-selectors.quality.md` via the `/review` system.

## References

### External

- [Redux: Deriving Data with Selectors](https://redux.js.org/usage/deriving-data-selectors)
- [Redux Fundamentals: Standard Patterns](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns#memoized-selectors)
- [Reselect Documentation](https://github.com/reduxjs/reselect)

### Skill Resources

- `references/concepts.md` - Redux concepts, flow, terminology (generated output)
- `references/middleware.md` - Middleware pipeline and execution order (generated output)
- `references/slices.md` - All slices with actions/selectors (generated output)
- `references/backend-linked-actions.md` - Cross-slice server action diagrams (generated output)
- `templates/docs-concepts-template.md` - Static concepts doc (emit as-is)
- `templates/docs-middleware-template.md` - Middleware pipeline (populate from store config)
- `templates/docs-slices-template.md` - Slices FS tree (populate from codebase)
- `templates/docs-backend-linked-actions-template.md` - Cross-slice server actions (populate from codebase)
