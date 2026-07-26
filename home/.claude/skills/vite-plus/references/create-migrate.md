# Vite+ Create And Migrate

## Contents

- `vp create` model
- Template sources
- Local registered templates
- Org manifests
- Choosing scaffolding surfaces
- `vp migrate`

## `vp create` Model

`vp create` is a template dispatcher, not a single starter command.

General command shape:

```bash
vp create <template> --directory <target> -- <template-specific-args>
```

`--directory` is owned by `vp create`. Tokens after `--` are passed to the
selected template or delegated create package.

Inspect:

```bash
vp create --help
vp create --list
```

For create semantics, the canonical docs are:

- <https://viteplus.dev/guide/create>
- <https://viteplus.dev/config/create>

Read those before giving create/setup advice. If local installed docs disagree
or omit `create.templates`, treat the installed docs as stale and verify against
the official docs/source:

```bash
sed -n '1,260p' node_modules/vite-plus/docs/guide/create.md
sed -n '1,120p' node_modules/vite-plus/docs/config/create.md
rg -n "create\\.templates|defaultTemplate" node_modules/vite-plus
```

## Template Sources

Built-in Vite+ templates:

```bash
vp create vite:monorepo
vp create vite:application
vp create vite:library
vp create vite:generator
```

Use built-ins for stock Vite+ shapes or as comparison material. Do not assume a
stock built-in matches an existing organization's internal monorepo package
shape.

Ecosystem create packages and shorthands:

```bash
vp create vite
vp create create-vite
vp create next-app
vp create create-next-app
vp create @tanstack/start
vp create vite -- --template react-ts
```

Use these when the desired shape is owned by that ecosystem.

Remote Git templates:

```bash
vp create github:user/repo
vp create https://github.com/user/template-repo
```

Remote Git templates are copy/clone template sources, not logic-rich project
generators.

Local template specs and generator packages can be passed directly:

```bash
vp create ./tools/create-ui-component
vp create @company/generator-foo
vp create vite:generator --directory tools/create-company-lib
```

Use `vite:generator` to scaffold a Vite+ generator package when the project
needs logic, prompts/options, file generation, scripts, or suggestions rather
than a static copied directory. The installed starter uses Bingo templates with
Zod option schemas and a `produce` function.

## Local Registered Templates

For monorepo-local generators, `vite.config.ts` is the source of truth. Declare
generators under `create.templates`; only registered entries appear in the
`vp create` picker, and `vp create <name>` resolves by entry `name`.

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  create: {
    templates: [
      {
        name: 'lib',
        description: 'Generic library package.',
        template: 'lib',
      },
    ],
  },
});
```

Fields:

- `name`: picker entry and `vp create <name>` selector. Must be unique. The
  `vite:` prefix is reserved for Vite+ built-ins.
- `description`: one-line picker description.
- `template`: workspace package name, relative `./path` from the workspace
  root, `vite:*` built-in, GitHub URL, or full npm package name. It is run as
  written, not shorthand-expanded.

`create.defaultTemplate` can name a local `create.templates` entry when a repo
intentionally wants bare `vp create` to open that generator directly. If a repo
sets `defaultTemplate: 'lib'`, make sure `create.templates` contains a
`name: 'lib'` entry. Do not treat a missing local registration as an
org-manifest problem.

Do not infer local templates from package names, package keywords, or workspace
membership. A local generator package must be registered in `create.templates`
and must have a runnable `bin`.

`vp create vite:generator` registers the scaffolded generator idempotently,
preserving any existing `create.defaultTemplate`. You can also add entries by
hand.

## Org Manifests

```bash
vp create @your-org
vp create @your-org:web
vp create @your-org:web@next
vp create @your-org --no-interactive
```

`@your-org` resolves to `@your-org/create`. If that package has a
`package.json#createConfig.templates` manifest, `vp create @your-org` opens a
picker and `vp create @your-org:name` selects an entry. If no manifest exists,
Vite+ falls back to running the package normally.

Do not propose `@your-org/create` to fix a monorepo-local generator unless the
user explicitly wants a published org catalog. `vp create @scope` is the org
manifest path; `vp create <local-name>` is the local `create.templates` path.

Manifest entries require `name`, `description`, and `template`; `monorepo` is
optional. `template` can be a package specifier, GitHub URL, `vite:*` built-in,
local workspace package name, or relative `./templates/foo` path inside the
`@org/create` package.

Bundled org templates are static copied directories. Relative paths resolve
against the `@org/create` package root, not the caller's cwd. Vite+ renames a
small set of underscore scaffold files such as `_gitignore`, `_npmrc`, and
`_yarnrc.yml` to dotfiles.

Set `create.defaultTemplate` in `vite.config.ts` when bare `vp create`
should use the org picker, a Vite+ built-in, or a local registered template:

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  create: {
    defaultTemplate: '@your-org',
  },
});
```

Precedence is CLI template argument, then `create.defaultTemplate`, then the
standard built-in picker.

## Choosing The Scaffolding Surface

Use this decision rule:

- Built-in `vite:*`: stock Vite+ monorepo/application/library/generator shape.
- Ecosystem create package: framework-owned starter.
- Remote Git template: copy an existing static template repository.
- Local registered generator: encode repo-specific logic close to the repo and
  register it in root `vite.config.ts` under `create.templates`.
- Org manifest: publish and version a curated internal template catalog.

For mature internal monorepos, the ideal target is usually an org or repo-owned
generator/catalog, not repeated manual scaffolding and not a stock
`vite:library` template. Encode the real internal shape:

- `package.json` fields and workspace/catalog dependency style.
- source, exports, and package-entry conventions.
- Vite+ domain scripts only where a stable workflow entrypoint is needed.
- development and production tsconfig references.
- root references/workspace registration when required.
- Vite+ config registration or overrides when required.
- generated fixtures/docs/tests expected by the repo.
- post-generation suggestions or scripts.

## `vp migrate`

`vp migrate` migrates existing Vite, Vitest, Oxlint, Oxfmt, and Prettier
projects to the Vite+ surface:

```bash
vp migrate --help
vp migrate
vp migrate <path>
vp migrate --no-interactive
vp migrate --agent codex --editor vscode --hooks
vp migrate --no-agent --no-editor --no-hooks
```

Use it before hand-editing split tool configs unless the task is deliberately a
manual migration audit. It can write agent instructions, editor config, and
pre-commit hooks, so inspect flags before running it in a repo with existing
local rules.

Installed migration help defines the mapping agents must preserve:

- `vp run <script>` is the package-script execution surface.
- `vp test` is the built-in test command; `vp run test` is the manifest script.
- `vp install`, `vp add`, and `vp remove` delegate through the declared package
  manager.
- `vp dev`, `vp build`, `vp preview`, `vp lint`, `vp fmt`, `vp check`, and
  `vp pack` replace corresponding standalone tools.

Before migration, verify the project is on the Vite/Vitest versions required by
the installed `vp` version. After migration, check:

- `vite` imports that should become `vite-plus`.
- `vitest` imports that should become `vite-plus/test`.
- package-manager `vite` / `vitest` aliases or overrides that keep workspace dependencies
  on Vite+ packages.
- remaining tool-specific config files that should move into `vite.config.ts`.
- validation commands chosen from Vite+ domain surfaces, not raw tools.
