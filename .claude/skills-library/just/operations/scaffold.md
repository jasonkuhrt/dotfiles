# Scaffold

Create a justfile for the current project. Detect project type and generate appropriate recipes.

## Detection order

1. Check for existing `justfile` or `.justfile` -- warn and abort if present
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

## Template principles

- First recipe is `default` showing `@just --list`
- Add `set quiet` at top (suppress command echo -- most projects want clean output)
- Recipe comments become `--list` descriptions -- always include them
- Use project's actual package manager (pnpm, npm, yarn, bun -- check lockfile)
- `ci` recipe chains lint + check + test for local CI parity

## Example scaffold (TypeScript/pnpm)

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
