# Vite+ Pack

## Contents

- App build vs package build
- Package-quality flags
- Workspace filtering
- Declaration output caveats
- `--no-write` caveat

## App Build Vs Package Build

Use `vp build` for Vite application builds:

```bash
vp build <root>
vp build <root> --mode production
```

Use `vp pack` for library/standalone package bundling and package-quality
checks:

```bash
vp pack
vp pack --root <dir> --dts
vp pack --root <dir> --dts --publint --attw --unused --exports
vp pack --workspace --filter <config-name-or-regex>
vp pack --fail-on-warn
```

For libraries, reach for `vp pack` before `vp build`.

## Package-Quality Flags

Installed `vp pack --help` exposes these material package-quality flags:

- `--dts`
- `--publint`
- `--attw`
- `--unused`
- `--exports`
- `--fail-on-warn`
- `--no-write`

Use `--publint`, `--attw`, `--unused`, and `--exports` when the goal is package
contract quality rather than just bundling.

## Workspace Filtering

`vp pack --filter` filters pack configs in workspace mode:

```bash
vp pack --workspace --filter <config-name-or-regex>
```

This is not the same selection surface as `vpr <package>#<task>`, which targets
workspace package scripts/tasks.

## Declaration Output Caveats

The generic Vite+ docs show plain `--dts`, but real monorepos may need more
specific tsdown declaration options. Check local package shape and prior repo
rules before using package-quality flags.

For TypeScript project-reference packages, `--dts.build true` may be required
where plain `--dts` fails. Confirm per project and keep it as a project rule, not
a universal Vite+ claim.

## `--no-write` Caveat

`--no-write` disables writing files. Do not combine it with `--publint`,
`--attw`, or `--exports` when those checks need real emitted package files
unless intentionally testing parser-only behavior. Package-quality validation
usually needs real output so exports and declaration paths point at files that
exist.
