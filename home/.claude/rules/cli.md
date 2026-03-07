# Bash CLIs

All bash CLIs use [argc](https://github.com/sigoden/argc). Run `<cli> --help` — help text is authoritative, don't read source for usage.

## Conventions

- Every CLI ends with `eval "$(argc --argc-eval "$0" "$@")"`
- Functions are commands: `upload()` → `cli upload`
- Nested: `volume::up()` → `cli volume up`
- Flat hyphenated: `format_links()` → `cli format-links`
- Params via `$argc_<name>` variables

## Annotations

```bash
# @describe CLI description
# @flag --project              Boolean flag
# @option --format [json|yaml] Named option with choices
# @env API_KEY!                Required env var
# @cmd Do something            Subcommand
# @alias d                     Alias
# @arg target! <FILE>          Required positional
# @arg items*                  Zero-or-more positional
# @meta default-subcommand     Default when no subcommand given
```
