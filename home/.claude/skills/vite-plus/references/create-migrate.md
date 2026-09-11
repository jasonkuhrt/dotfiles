# `vp create` And `vp migrate`

Installed docs: `node_modules/vite-plus/docs/guide/create.md`,
`config/create.md`, `guide/migrate.md`, `guide/migrate-rules.md`.

## `vp create`

```bash
vp create --list                                   # built-in and recognized templates
vp create <template> --directory <dir> -- <template-options>
vp create <template> --no-interactive --no-agent --no-editor --no-hooks --no-git
```

Template sources:

- Built-ins: `vite:monorepo`, `vite:application`, `vite:library`,
  `vite:generator` (inside a monorepo only).
- Shorthands such as `vite`, `@tanstack/start`, `svelte`, `next-app`, `nuxt`,
  `react-router` and `vue`, or full package names such as `create-vite`.
- Remote templates: `github:user/repo` or a GitHub URL.
- Local generators registered in `create.templates`.
- Organization catalogs: `vp create @org` resolves `@org/create` and opens the
  picker for its `createConfig.templates` manifest; `vp create @org:<name>`
  selects one entry.

Resolution order: the CLI argument, then `create.defaultTemplate`, then the
built-in picker. An org picker still offers the built-ins.

## Local Generators

- `vp create vite:generator` scaffolds a generator package (a Bingo template
  with a Zod options schema and a `produce()` function) and adds it to
  `create.templates` idempotently, keeping `defaultTemplate`.
- Only `create.templates` entries appear in the picker. An entry whose
  `template` matches no workspace package, or resolves to a package without a
  `bin`, is an error.
- `create.defaultTemplate` may name a local entry so bare `vp create` opens it.

## Choosing A Scaffolding Surface

| Goal                                          | Surface                               |
| --------------------------------------------- | ------------------------------------- |
| Stock Vite+ shape                             | built-in `vite:*`                     |
| Framework-owned starter                       | shorthand or `create-*` package       |
| Copy a static template repository             | remote Git template                   |
| Repository conventions                        | local generator in `create.templates` |
| Versioned catalog shared across repositories  | `@org/create` manifest                |

For a mature monorepo, put the real package shape in a generator: manifest
fields and dependency style, exports, tsconfig references, Vite+ config
registration, and generated fixtures or docs.

## `vp migrate`

`vp migrate [PATH]` converts standalone Vite, Vitest, Oxlint, Oxfmt and
Prettier setups to Vite+. `--full` also runs the full setup for a project
already on Vite+. `vp migrate --help` ends with a prompt to hand an agent that
drives the migration.

`vp create` and `vp migrate` can write agent instruction files, editor config
and hooks (`--agent <name>`, `--editor <name>`, `--hooks`; `vp create` also
`--git`). In a repository with its own rules, pass the matching `--no-*` flags
or review the diff. `vp migrate` also rewrites `voidzero-dev/setup-vp@v1`
references to an exact release.

After migrating, check that:

- config imports come from `vite-plus`, and test APIs from `vite-plus/test`;
- `vitest.config.ts`, `.oxlintrc.json`, `.oxfmtrc.json` and `tsdown.config.ts`
  have moved into `vite.config.ts` blocks;
- scripts call `vp` commands, not the raw tools;
- Vite is 8 or newer and Vitest 4.1 or newer (`vp toolchain` shows versions).
