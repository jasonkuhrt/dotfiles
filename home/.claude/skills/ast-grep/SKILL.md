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

For that text search, line numbers are `rg -n`, never `rg -rn`: `-r` replaces
matched text in the output. An empty pattern or stray `r` flag is a typo to
remove before running. Use `-r` only deliberately with `-o` for capture
extraction, and `--no-filename` when several inputs must yield bare matches.
Before declaring a path or script broken from search output, read the actual
file; transformed output is not source evidence.

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

## Verify the match set

A bulk rewrite is applied only after its preview identifies the intended files
and syntax nodes. Check the actual workspace roots and the producer package
itself; a search over remembered directory names can omit consumers. Resolve
each import's binding in its own file, including type-only imports and renamed
bindings in code that has not yet adopted a no-alias convention.

An empty search or successful command over zero files proves nothing. Test a
known match in the same scope before accepting a negative, inspect the tool's
processed-file count where available, and retain its output. Pass file lists as
arrays or null-delimited arguments, never as one space-separated variable.

Compare the applied diff with the preview: changed files, matched nodes and edit
magnitude must agree. A reverse pattern is not an undo: the target shape may
have existed before the rewrite. Undo only the exact edits owned by this run.

- Bad (2026-07-22): reversing every `MutableType<Models.X>` changed 27 existing
  aliases as well as the 17 owned edits.
- Good: preview and retain the exact target set, then restore only those edits.

## Rules kept in a repository

A repository gets an `sgconfig.yml` and a `rules/` folder, checked with
`ast-grep scan`, only when a pattern recurs as a lint, such as an API nobody
may call. A one-off search or codemod never adds them.
