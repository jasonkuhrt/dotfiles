---
name: ast-grep
description: Search or rewrite code by its syntax with ast-grep instead of by text with rg or sd, without being asked. Use before changing a code shape across several files (renaming a function and its calls, changing a call's arguments, moving an import, migrating a library API), when a text search would also hit comments, strings or look-alike names, and to prove a codemod left no matches. Not for prose, config values, filenames or a one-off edit in one file.
---

# ast-grep

`ast-grep` (also installed as `sg`) matches code by its syntax tree. A pattern
is code with metavariables: `$A` matches one node, `$$$ARGS` matches zero or
more.

## When it beats rg

| Job | rg or sd | ast-grep |
|---|---|---|
| Find every call of `loadYaml` | Also hits comments, strings and `myLoadYaml` | `-p 'loadYaml($$$A)'` hits calls only |
| Change a call shape across files | A regex that breaks on wrapped lines | `-p 'old($A, $B)' -r 'neu({ a: $A, b: $B })'` |
| Prove a migration is finished | Counts text | The old pattern returns no matches |

rg stays the tool for text: messages, config keys, prose, filenames, and
anything that isn't code.

## Commands

```sh
ast-grep run -l ts -p 'Effect.gen(function* () { $$$ })' lib scripts
ast-grep run -l ts -p 'loadYaml($A)' --json=compact . | jq length
ast-grep run -l ts -p 'old($A)' -r 'neu($A)' .
ast-grep run -l ts -p 'old($A)' -r 'neu($A)' -U .
```

- The first finds, the second counts, the third previews a rewrite as a diff,
  and the fourth (`-U`) applies it to every match.
- `-l` names the language: `ts`, `tsx`, `js`, `rust`, `go`, `lua`, `python`,
  `bash`, `json`, `yaml`. A `.tsx` file needs `-l tsx`.
- It skips what `.gitignore` ignores, like rg.
- A pattern must parse as code on its own. When one doesn't match,
  `--debug-query=ast` shows how ast-grep reads it. What a pattern can't say
  (inside a given function, not followed by a call) takes a YAML rule with
  `kind`, `has` or `inside`; see
  [references/rule-reference.md](references/rule-reference.md).
- After `-U`, run the repository's type check: ast-grep rewrites syntax, not
  types.

## Rules kept in a repository

A repository gets an `sgconfig.yml` and a `rules/` folder, checked with
`ast-grep scan`, only when a pattern recurs as a lint, such as an API nobody
may call. A one-off search or codemod never adds them.
