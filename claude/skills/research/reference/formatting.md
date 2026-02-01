# Formatting

Apply formatting to research files. Never lossy -- only restructures and enriches.

## Use Cases

- Standardizing research file formatting
- Enriching GitHub issue references with dates
- Applying compact formatting (via `markdown` skill, operation 3)

Triggers: "format research", "enrich research links"

## Scope

| Request                    | CLI Target          |
| -------------------------- | ------------------- |
| "format research"          | `all`               |
| "format current/latest"    | `current`           |
| "format dirty/changed"     | `diff`              |
| "format these docs" + list | `<file>...`         |
| "format all including old" | `all-including-old` |

**Default: `all` (recent only)** -- avoids accidentally processing large archives.

## Steps

1. **Enrich GitHub links** (issues, PRs, discussions)

   ```bash
   ~/.claude/skills/research/research.sh format-gh-links <target>
   # Targets: current, all, diff, all-including-old, <file>...
   ```

   **Output formats:**
   - Issues/PRs open: `[org/repo#N (2025-03-05)](url)`
   - Issues/PRs closed: `[org/repo#N (2025-03-05 -> 09)](url)` -- smart abbreviation
   - Discussions: `[org/repo#dN (date)](url)` -- `#d` prefix (separate namespace)

2. **Apply `markdown` skill operation 3** (compact mode) for structure/layout
