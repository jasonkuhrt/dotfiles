# just Syntax Reference

> For full CLI options: `just --help`. Full manual: https://just.systems/man/en/

## Syntax

```just
# Variable assignment
name := "value"
name := env("VAR", "default")      # env var with fallback

# Settings (top of file)
set quiet                           # suppress command echo
set dotenv-load                     # load .env file
set positional-arguments            # $1, $2 in shell
set shell := ["fish", "-c"]         # change shell (default: sh)

# Recipe with args
recipe arg1 arg2="default" *rest:
    echo {{arg1}} {{arg2}} {{rest}}

# Dependencies
recipe: dep1 dep2
recipe: (dep-with-args "value")

# Conditional
recipe:
    {{ if os() == "macos" { "open" } else { "xdg-open" } }} .

# Shebang (any language)
recipe:
    #!/usr/bin/env python3
    print("hello from python")

# Modules
mod deploy                          # loads deploy.just or deploy/justfile

# Private (hidden from --list)
_helper:
    echo "internal"
```

## Built-in Functions

| Function | Returns | Example |
|----------|---------|---------|
| `os()` | `"macos"`, `"linux"`, `"windows"` | Platform branching |
| `arch()` | `"aarch64"`, `"x86_64"` | Architecture detection |
| `env("VAR")` | Env var value (error if unset) | `env("HOME")` |
| `env("VAR", "default")` | Env var with fallback | Config with defaults |
| `invocation_directory()` | Where `just` was called from | Relative path ops |
| `justfile_directory()` | Where justfile lives | Repo root reference |
