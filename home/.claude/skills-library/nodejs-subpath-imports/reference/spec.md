# Subpath Imports Spec Reference

## Syntax

Source: [Node.js Packages - Subpath imports](https://nodejs.org/api/packages.html#subpath-imports)

### Keys Must Start with `#`

```json
{ "imports": { "#dep": "./dep.js", "#internal/*": "./src/internal/*.js" } }
```

> **Future**: Node.js v26+ allows `#/` prefix ([PR #60864](https://github.com/nodejs/node/pull/60864)).

### Targets: Strings, Objects, or Patterns

```json
{
  "imports": {
    "#string": "./path/to/file.js",
    "#object": { "node": "pkg", "default": "./polyfill.js" },
    "#pattern/*": "./src/*.js"
  }
}
```

### Relative Targets Must Start with `./`

```json
{ "imports": { "#good": "./src/file.js", "#bad": "src/file.js" } }
```

External packages (bare specifiers) don't need `./`.

### External Packages Allowed

```json
{
  "imports": {
    "#dep": { "node": "dep-node-native", "default": "./dep-polyfill.js" }
  },
  "dependencies": { "dep-node-native": "^1.0.0" }
}
```

---

## Resolution Algorithm

Source: [Node.js ESM - Resolution Algorithm](https://nodejs.org/api/esm.html#resolution-algorithm-specification)

1. Import specifier must start with `#`
2. Find matching key in nearest `package.json` `imports` field
3. If value is object -> apply condition matching (first match wins)
4. If key contains `*` -> perform string substitution on target
5. Resolve resulting path/specifier

### Pattern Substitution

`*` is **literal string replacement**, not glob:

```json
{ "imports": { "#internal/*.js": "./src/internal/*.js" } }
```

```typescript
import z from "#internal/z.js"; // -> ./src/internal/z.js
import deep from "#internal/nested/x.js"; // -> ./src/internal/nested/x.js
```

---

## Restrictions

Source: [Node.js Packages - Subpath patterns](https://nodejs.org/api/packages.html#subpath-patterns)

### Forbidden Path Segments

After `./`, these are **disallowed**:

| Segment        | Why            |
| -------------- | -------------- |
| `..`           | Path traversal |
| `.`            | Ambiguous      |
| `node_modules` | Injection      |

### Invalid Examples

```json
{
  "imports": {
    "#bad1": "../outside/file.js",
    "#bad2": "./dist/../dist/file.js",
    "#bad3": "././file.js",
    "#bad4": "./node_modules/pkg/file.js"
  }
}
```

---

## Scope

Source: [Node.js Packages - Subpath imports](https://nodejs.org/api/packages.html#subpath-imports)

- **Private to package** - only code within the package can use `#` imports
- **Cannot be consumed externally** - `import x from 'pkg/#internal'` is invalid
- **Isolated mappings** - no inheritance between packages
