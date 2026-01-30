---
name: nodejs-subpath-imports
description: Use when debugging subpath import errors (ERR_PACKAGE_IMPORT_NOT_DEFINED, "only allows ./"), configuring package.json imports field, migrating from tsconfig paths, or building cross-platform code with conditions.
---

# Node.js Subpath Imports

## CRITICAL

### Path Restrictions Are Node.js Spec, Not Bundler Limitations

When you see errors about path formats in `imports` field:

| Error pattern       | This is...   | NOT...             |
| ------------------- | ------------ | ------------------ |
| "only allows ./"    | Node.js spec | Metro limitation   |
| "rejects ../ paths" | Node.js spec | Webpack limitation |
| "must be relative"  | Node.js spec | Bundler bug        |

**Every compliant resolver enforces these rules.** See `reference/spec.md` for full spec details.

---

## Operations

### Debug Subpath Import Errors

1. Check error message for pattern (see CRITICAL table above)
2. Verify targets start with `./` (required for local files)
3. Check for forbidden segments: `..`, `.`, `node_modules`
4. Verify extensions are explicit (no auto-resolution)
5. Check condition order (first match wins)

Common errors:

- `ERR_PACKAGE_PATH_NOT_EXPORTED` -> subpath not in exports
- `ERR_PACKAGE_IMPORT_NOT_DEFINED` -> key not in imports
- `MODULE_NOT_FOUND` -> missing extension or wrong path

### Debug Project Config

1. Check `moduleResolution` in tsconfig (`bundler`, `node16`, `nodenext`)
2. Verify `resolvePackageJsonImports: true` (default with above modes)
3. Check bundler's condition configuration matches your targets
4. Verify `type: "module"` if using ESM

### Migrate from tsconfig Paths

**Before** (compile-time only):

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": { "@utils/*": ["./src/utils/*"] }
  }
}
```

**After** (runtime + compile-time):

```json
// package.json
{
  "imports": {
    "#utils/*": "./src/utils/*.js"
  }
}
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "resolvePackageJsonImports": true
  }
}
```

Key changes:

- `@` prefix -> `#` prefix (required by spec)
- Add explicit `.js` extensions
- Works at runtime without bundler

### Build Cross-Platform Code

See [reference/cross-platform.md](reference/cross-platform.md) for complete guide with conditions, platform abstraction patterns, and bundler configuration.

---

## Edge Cases & Gotchas

See [reference/edge-cases.md](reference/edge-cases.md) for full details with sources.

| Gotcha                    | Summary                                        |
| ------------------------- | ---------------------------------------------- |
| PATTERN_KEY_COMPARE       | Longer base index wins, then total length      |
| No extension guessing     | Must use explicit `.js` in CJS and ESM         |
| Arrays as fallbacks       | Only for validation errors, NOT file-not-found |
| Trailing slash (DEP0155)  | Use `#lib/*` pattern instead of `#lib/`        |
| Pattern keys need one `*` | Multiple `*` = exact match only                |
| Exact before patterns     | Non-pattern keys checked first                 |

---

## Tool Support

All major runtimes and bundlers support subpath imports. See [reference/tool-support.md](reference/tool-support.md) for versions, conditions config, and examples.

**Runtimes:** Node.js v14.6+, Deno v1.25+, Bun v1.0+

**Bundlers:** esbuild, Webpack 5+, Rspack, Rollup, Rolldown, Metro v0.82+

**Frameworks:** Vite, Next.js, Astro, Expo

---

## Reference

- `reference/spec.md` -- syntax, resolution algorithm, restrictions, scope
- `reference/cross-platform.md` -- conditions, platform abstraction, bundler config
- `reference/edge-cases.md` -- gotchas with sources
- `reference/tool-support.md` -- runtime/bundler/framework version matrix
- `reference/examples.md` -- complete package setup, monorepo notes
