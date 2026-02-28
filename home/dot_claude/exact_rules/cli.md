# Bash CLIs

All bash CLIs in this repo use [argc](https://github.com/sigoden/argc) for argument parsing, help generation, and completions.

## Discovery

Run `<cli> --help` to discover capabilities. Don't read the source to understand usage — the help text is authoritative.

## Conventions

- Every CLI ends with `eval "$(argc --argc-eval "$0" "$@")"`
- Functions are the commands: `upload()` → `cli upload`
- Nested commands use `::`: `volume::up()` → `cli volume up`
- Flat hyphenated commands use `_`: `format_links()` → `cli format-links`
- Aliases: `# @alias v,vol` above the function
- Parameters accessed via `$argc_<name>` variables

## Annotation Cheat-Sheet

```bash
# @describe CLI description (top-level, before any function)
# @meta version 1.0.0
# @flag --project              Boolean flag
# @option --format [json|yaml] Named option with choices
# @env API_KEY!                Required env var

# @cmd Do something            Subcommand
# @alias d                     Alias for the subcommand
# @arg target! <FILE>          Required positional arg
# @arg items*                  Zero-or-more positional
# @arg things+                 One-or-more positional (required)
# @meta default-subcommand     Make this the default when no subcommand given
do_something() {
  echo "$argc_target"
}

# @cmd Nested child            Nested under do_something → `cli do-something child`
do_something::child() {
  echo "nested"
}
```

## Why argc

Descriptions are bash comments — zero tokens loaded into context. Only `--help` stdout costs tokens when an agent runs it. Go all-in on `@describe`/`@cmd` descriptions.
