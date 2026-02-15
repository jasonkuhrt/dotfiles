# Onboard

Walk through just fundamentals using real-world examples.

## Topics (cover in order)

1. **Command runner, not build system** -- every recipe always runs (no staleness)
2. **Justfile basics** -- recipes, comments-as-docs, `@` quiet prefix
3. **Arguments** -- positional, defaults, variadic (`*args`, `+args`)
4. **Variables** -- `:=` assignment, env vars, `.env` loading (`set dotenv-load`)
5. **Dependencies** -- `recipe: dep1 dep2`, dependency arguments
6. **Shebang recipes** -- write in any language
7. **Modules** -- `mod name` for splitting large justfiles
8. **Key CLI** -- `just --list`, `just --choose`, `just --fmt`, `just --evaluate`
