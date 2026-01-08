# Development Workflow

## After Changes

* Run type checks: `pnpm check:types`
* Run tests: `pnpm test [path] --run` (ALWAYS use --run flag to avoid watch mode)
* Format code: `pnpm fix:format`
* State what type checking was done

## Project Structure

* Learn from: DEVELOPMENT.md, CONTRIBUTING.md, README.md, and project-specific docs/conventions/\*.md files

## Error Handling

* Don't suppress logs as a "solution"
* Use Result/Either for expected errors
* Never swallow errors silently
* Don't hide errors with spreading or optional chaining

## Common Pitfalls

* Don't create files without explicit request
* Don't assume file paths exist

## Temporary Directories

* When creating temporary test projects or demos, always use local directories within the current project (e.g., `test-*`, `tmp/*`, `demo-*`)
* Never attempt to use OS-level `/tmp` directory as Claude Code cannot cd outside the original working directory
* Clean up temporary directories after use unless they contain valuable reference material
