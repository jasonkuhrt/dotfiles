---
name: just
description: Use when working with just command runner - creating justfiles, running recipes, onboarding to just, or troubleshooting. Triggers on "just", "justfile", "command runner", "task runner".
---

# just

`just` is a command runner. Not a build system — no file-dependency tracking, no `.PHONY`. Write named recipes in a `justfile`, run them with `just <recipe>`.

> **Docs:** https://just.systems/man/en/

## When to Use just

| Use just | Use something else |
|----------|-------------------|
| Project-level command orchestration | Single npm/pnpm script (`package.json`) |
| Multi-tool pipelines (lint + typecheck + test) | Language-specific build (use native tooling) |
| Commands that span languages/tools | CI-only logic (use workflow YAML) |
| Discoverable project entry points | One-off shell commands |

## Operations

### Onboard

Teach the user just fundamentals. Cover these topics in order, with examples:

1. **What it is** — command runner, not build system. Every recipe always runs (no staleness).
2. **Justfile basics** — recipes, comments-as-docs, the `@` quiet prefix
3. **Arguments** — positional, default values, variadic (`*args`, `+args`)
4. **Variables** — assignment (`:=`), env vars, `.env` loading (`set dotenv-load`)
5. **Dependencies** — `recipe: dep1 dep2`, dependency arguments
6. **Shebang recipes** — write in any language (python, node, etc.)
7. **Modules** — `mod name` for splitting large justfiles
8. **Key CLI** — `just --list`, `just --choose` (fzf), `just --fmt`, `just --evaluate`

Use real-world examples. Don't be abstract.

### Setup

Install just and verify environment. Idempotent — skip what's present.

1. **just CLI**
   ```bash
   command -v just && just --version || brew install just
   ```

2. **Fish completions**
   ```bash
   ls /opt/homebrew/share/fish/vendor_completions.d/just.fish 2>/dev/null && echo "fish completions: OK" || echo "fish completions: MISSING (reinstall just via brew)"
   ```

3. **Verify**
   ```bash
   echo -e 'test:\n\t@echo "just works"' | just --justfile /dev/stdin test 2>/dev/null && echo "just execution: OK" || echo "just execution: FAILED"
   ```

4. **Report status table:**

| Component | Status |
|-----------|--------|
| just CLI | vX.X.X / missing |
| Fish completions | OK / missing |
| Execution | OK / failed |

### Doctor

Diagnose just issues in the current project.

1. **Check installation**
   ```bash
   just --version
   ```

2. **Find justfile**
   ```bash
   just --summary 2>&1
   ```
   If no justfile found, report and suggest `just init` or scaffold operation.

3. **Validate syntax**
   ```bash
   just --fmt --check 2>&1
   ```
   If formatting issues found, offer to run `just --fmt --unstable`.

4. **Check for common issues:**
   - Tabs vs spaces (just requires tabs for recipe bodies, like make)
   - Missing shebangs on multi-line recipes
   - Circular dependencies (`just` catches these — report the error clearly)

5. **Report status table:**

| Check | Status |
|-------|--------|
| just installed | vX.X.X / missing |
| Justfile found | path / not found |
| Syntax valid | OK / errors |
| Formatting | OK / needs fmt |

### Scaffold

Create a justfile for the current project. Detect project type and generate appropriate recipes.

**Detection order:**
1. Check for existing `justfile` or `.justfile` — warn and abort if present
2. Detect project type from files present:

| Signal | Project Type | Suggested Recipes |
|--------|-------------|-------------------|
| `package.json` + `tsconfig.json` | TypeScript/Node | dev, build, test, check, lint, ci |
| `package.json` | Node.js | dev, build, test, lint, ci |
| `Cargo.toml` | Rust | build, test, check, clippy, ci |
| `go.mod` | Go | build, test, vet, ci |
| `pyproject.toml` / `setup.py` | Python | dev, test, lint, ci |
| `deno.json` | Deno | dev, test, check, ci |
| (none) | Generic | default (list), hello |

**Template principles:**
- First recipe is `default` showing `@just --list`
- Add `set quiet` at top (suppress command echo — most projects want clean output)
- Recipe comments become `--list` descriptions — always include them
- Use project's actual package manager (pnpm, npm, yarn, bun — check lockfile)
- `ci` recipe chains lint + check + test for local CI parity

**Example scaffold (TypeScript/pnpm):**
```just
set quiet

# List available recipes
default:
    just --list

# Start dev server
dev:
    pnpm dev

# Build for production
build:
    pnpm build

# Run tests
test *args:
    pnpm vitest {{args}}

# Type check
check:
    pnpm tsc --noEmit

# Lint
lint:
    pnpm eslint .

# Run all checks (local CI)
ci: lint check test build
```

## Quick Reference

### Syntax

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

### CLI

```bash
just                    # run default recipe
just recipe             # run specific recipe
just recipe arg1 arg2   # pass arguments
just --list             # show all recipes with descriptions
just --choose           # interactive picker (fzf)
just --fmt              # auto-format justfile
just --fmt --check      # check formatting without changing
just --evaluate         # show variable values
just --summary          # one-line recipe names
just --dump             # show processed justfile
just -n recipe          # dry run (print commands, don't execute)
```

### Built-in Functions

| Function | Returns | Example |
|----------|---------|---------|
| `os()` | `"macos"`, `"linux"`, `"windows"` | Platform branching |
| `arch()` | `"aarch64"`, `"x86_64"` | Architecture detection |
| `env("VAR")` | Env var value (error if unset) | `env("HOME")` |
| `env("VAR", "default")` | Env var with fallback | Config with defaults |
| `invocation_directory()` | Where `just` was called from | Relative path ops |
| `justfile_directory()` | Where justfile lives | Repo root reference |

## Links

- https://just.systems/man/en/ — full manual
- https://github.com/casey/just — source repo
- https://just.systems/man/en/chapter_21.html — quick start
