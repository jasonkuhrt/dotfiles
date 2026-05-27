---
name: writing-vite-plugins
description: Use when authoring, debugging, reviewing, or extending a Vite plugin — or a Rollup/Rolldown plugin used with Vite. Covers the plugin object, hook selection (resolveId/load/transform, config/configResolved/configureServer/transformIndexHtml/handleHotUpdate), virtual modules, dev-server vs build behavior, plugin ordering, apply/enforce, and packaging a plugin.
---

# Writing Vite Plugins

## Overview

A Vite plugin is a **superset of a Rollup/Rolldown plugin** — the same plugin object, plus a few Vite-only hooks. Write it once and it works in both dev (the unbundled dev server) and build (the bundler). Vite ≤7 is Rollup-powered; Vite 8+ is Rolldown-powered — the plugin contract is the same across both.

**Core principle:** a plugin is a *factory function* returning a plain, declarative plugin object. Do real work inside hooks, never at module/factory load time.

## When to Use

- Authoring a new Vite/Rollup/Rolldown plugin — inline in `vite.config` or as a package.
- Choosing the right hook for a transform, a dev-server middleware, an HTML injection, or HMR handling.
- Debugging why a plugin fires (or doesn't) in dev vs build.
- Reviewing a plugin for correctness — ordering, virtual-module hygiene, dev/build guards.

Not for: general Vite *config* (see Vite's config docs); app code.

## The Plugin Object

```js
// A plugin is a factory function. Options let users customize it.
export function myPlugin(options = {}) {
  return {
    name: 'vite-plugin-my-thing', // REQUIRED — appears in errors, warnings, inspect
    enforce: 'pre',               // optional: 'pre' | 'post' — ordering
    apply: 'serve',               // optional: 'serve' | 'build' | (config, env) => boolean
    // ...hooks
  }
}
```

- `name` is required. Prefix `vite-plugin-` for Vite-only plugins; `rollup-plugin-` if it uses no Vite-specific hooks (then it also works in plain Rollup/Rolldown). Framework-specific: `vite-plugin-react-*`, `vite-plugin-vue-*`, etc.
- A factory may return an **array** of plugins — Vite flattens it. Use this for multi-plugin presets.
- Falsy entries in the `plugins` array are ignored — `command === 'serve' && myPlugin()` is the idiomatic conditional. Statically importing a plugin and conditionally placing it in the array is normal and expected.

## Hooks

### Universal (Rollup/Rolldown) hooks — run in dev and build

| Hook | When | Use for |
|---|---|---|
| `options`, `buildStart` | once, on dev-server / build start | setup |
| `resolveId(source, importer, opts)` | per module resolution | virtual modules, redirecting imports |
| `load(id)` | per module load | virtual-module contents, custom loaders |
| `transform(code, id)` | per module, after load | code transformation |
| `buildEnd`, `closeBundle` | on server close / build end | teardown |

`moduleParsed` and the output-generation hooks (`renderChunk`, `generateBundle`, …) do **not** run in dev. Full signatures: Rolldown/Rollup plugin docs (see Reading List).

### Vite-specific hooks — ignored by Rollup

| Hook | When | Use for |
|---|---|---|
| `config(config, env)` | before config resolves | return a partial config to deep-merge |
| `configResolved(config)` | after config resolves | stash the final config; read `command` |
| `configureServer(server)` | dev only | add dev-server middleware; stash `server` |
| `configurePreviewServer(server)` | preview only | same, for `vite preview` |
| `transformIndexHtml(html, ctx)` | HTML entry processing | inject tags/scripts into `index.html` |
| `handleHotUpdate(ctx)` | a watched file changes | custom HMR |

`configureServer` is **not** called during build — any hook depending on the dev server must guard for its absence.

## Virtual Modules

Pass build-time data to source code via a normal `import`:

```js
const id = 'virtual:my-plugin/data'
const resolved = '\0' + id   // \0: marks it synthetic — other plugins skip it, node-resolution skips it

return {
  name: 'vite-plugin-my-plugin',
  resolveId(source) { if (source === id) return resolved },
  load(thisId)      { if (thisId === resolved) return `export const data = ${JSON.stringify(payload)}` },
}
```

- User-facing id: `virtual:` prefix, namespaced by plugin name (`virtual:my-plugin/...`) to avoid collisions.
- Internal id: `\0`-prefix in `resolveId`'s return — skips node resolution, marks it synthetic for sourcemaps.
- The `load` hook returns a **string of client source** — that string is the only thing that reaches the browser. The hook itself runs in Node and may do anything (read files, call back-end code); only its returned string ships.

## Dev vs Build — and where plugin code runs

- A Vite plugin runs in the **Vite Node process**, never the client bundle. It may import Node/back-end code freely — that has zero bearing on what ships to the browser.
- `apply: 'serve' | 'build'`, or `apply(config, { command }) => boolean` — register a plugin only where it makes sense.
- `command` is `'serve'` in dev (`vite`, `vite dev`, `vite serve`) and `'build'` in build. Read it from `config`/`configResolved`/`apply`.
- Dev-only plugin: `plugins: [ command === 'serve' && devOnlyPlugin() ]`.

## Ordering

`enforce: 'pre' | 'post'` adjusts placement. Resolution order: alias → `pre` user plugins → Vite core → normal user plugins → Vite build plugins → `post` user plugins → Vite post-build. Per-hook `order: 'pre' | 'post'` is a separate, finer control.

## Quick Reference — Patterns & Pitfalls

| Want | Do |
|---|---|
| Transform a file type | `transform` with `filter: { id: regex }` |
| Inject a `<script>`/tag into `index.html` | `transformIndexHtml` (`order: 'pre'` if the script must run through the plugin pipeline) |
| Add a dev-server route | `configureServer(server)` → `server.middlewares.use(...)` |
| Expose build-time data to the app | virtual module |
| Run only in dev | `apply: 'serve'`, or `command === 'serve' && plugin()` |
| Talk to the browser | `server.ws.send` / `import.meta.hot.on` — always prefix event names |

Pitfalls:

- Forgetting `\0` on a virtual module's resolved id → other plugins mangle it.
- Heavy/slow work at factory-call time → defer it lazily into a hook.
- Not guarding `configureServer`/`server` absence in build.
- Comparing un-normalized paths against resolved ids — use `normalizePath` from `vite`.
- Un-namespaced virtual ids or `ws` event names → collisions with other plugins.

## What an Ideal Plugin Looks Like

- A factory function with a typed options interface and sensible defaults.
- Declarative plugin object; work happens in hooks; expensive setup deferred.
- `src/index.ts` entry. If it has a browser runtime, split `src/node` (plugin) from `src/client` (shipped code) — see `vite-plugin-inspect`.
- Built with `tsdown`; tested with `vitest` plus a `playground/` exercised by Playwright.
- `name` + `keywords` (`vite-plugin`, `rollup-plugin`) set in `package.json`.
- While developing, run **`vite-plugin-inspect`** — it shows every module's transform stack.

## Reference Repos (cloned under `~/repo-references/`)

- `vite/` — Vite core + the docs source. Start at `docs/guide/api-plugin.md`; read internal plugins under `packages/vite/src/node/plugins/`.
- `rollup/` — the base plugin API. `docs/plugin-development/index.md` is the exhaustive hook reference.
- `vite-plugin-react/` — official `@vitejs/plugin-react`, `-react-swc`, and `plugin-rsc` (React Server Components). `packages/plugin-rsc/src/` is a model of a large, well-structured plugin.
- `hi-ogawa-vite-plugins/` — Hiroshi Ogawa's (Vite/Vitest core) monorepo of focused plugins — `error-overlay`, `ssr-css`, `vite-plugin-simple-hmr`, the RSC packages. Many small, readable plugins.
- `vite-plugin-inspect/` — Anthony Fu's plugin; also the tool for inspecting plugin transforms. Clean `src/node` + `src/client` layout.
- `unplugin/` — the cross-bundler abstraction (`unjs/unplugin`): write one plugin for Vite, Rollup, webpack, esbuild, and Rolldown.

## Reading List

- Vite — Plugin API guide: <https://vite.dev/guide/api-plugin>
- Vite — Environment API (advanced, multi-environment plugins): <https://vite.dev/guide/api-environment>
- Rolldown — plugin API (Vite 8+ base): <https://rolldown.rs/apis/plugin-api>
- Rollup — plugin development (Vite ≤7 base): <https://rollupjs.org/plugin-development/>
- `awesome-vite` — community plugin examples: <https://github.com/vitejs/awesome-vite#plugins>
- `vite-plugin-inspect` — debugging/authoring aid: <https://github.com/antfu-collective/vite-plugin-inspect>
