# `vp pack`

Installed docs: `node_modules/vite-plus/docs/guide/pack.md`, `config/pack.md`,
and the tsdown docs they link.

## Build Or Pack

- `vp build` builds Vite applications.
- `vp pack` builds libraries and standalone executables with tsdown.
- Configure it in the `pack` block of `vite.config.ts`; the docs advise
  against `tsdown.config.ts`.

## Targeting

```bash
vp -C packages/ui pack               # as if run from the package directory
vp pack src/index.ts --dts           # explicit entry
vp pack --workspace --filter /ui$/   # workspace mode, filtered by config cwd or name
```

- `--root <dir>` sets the root directory of the input files. It does not
  select a package; use `-C`.
- At the workspace root with no target, `vp pack` runs the single packable
  package, opens a picker, or exits 1 in a non-interactive shell.

## Package Quality

```bash
vp -C packages/ui pack --dts --publint --attw --unused --exports
```

- `--publint`, `--attw` and `--unused` are off by default. `--exports`
  (experimental) generates export metadata for `package.json`.
- `--fail-on-warn` is on by default.
- `--no-write` disables writing files; do not pair it with checks that must
  validate emitted files.
- For TypeScript project-reference packages, check tsdown's `dts` options
  before assuming plain `--dts` works, and record what works as a project rule.

## Executables

`exe: true` in the `pack` block (or `--exe`) builds a Node.js single executable
application. It needs Node.js 25.7.0 or later (`vp env use 26`).
