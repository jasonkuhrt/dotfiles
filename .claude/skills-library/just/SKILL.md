---
name: just
description: Use when working with just command runner - creating justfiles, running recipes, onboarding to just, or troubleshooting. Triggers on "just", "justfile", "command runner", "task runner".
---

# just

`just` is a command runner. Not a build system -- no file-dependency tracking, no `.PHONY`. Write named recipes in a `justfile`, run them with `just <recipe>`.

> **Docs:** https://just.systems/man/en/

## When to Use just

| Use just | Use something else |
|----------|-------------------|
| Project-level command orchestration | Single npm/pnpm script (`package.json`) |
| Multi-tool pipelines (lint + typecheck + test) | Language-specific build (use native tooling) |
| Commands that span languages/tools | CI-only logic (use workflow YAML) |
| Discoverable project entry points | One-off shell commands |

## Operations

| Operation | File | Purpose |
|-----------|------|---------|
| **Onboard** | `operations/onboard.md` | Walk through just fundamentals |
| **Setup** | `operations/setup.md` | Install just, verify environment |
| **Doctor** | `operations/doctor.md` | Diagnose just issues |
| **Scaffold** | `operations/scaffold.md` | Generate justfile for current project |

## Reference

- `reference/syntax.md` -- variables, settings, recipes, args, dependencies, shebang, modules, built-in functions

## Links

- https://just.systems/man/en/ -- full manual
- https://github.com/casey/just -- source repo
- https://just.systems/man/en/chapter_21.html -- quick start
