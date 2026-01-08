---
paths: "**/package.json, **/pnpm-workspace.yaml, **/pnpm-lock.yaml"
---

# Node.js & Package Management

- Use pnpm (not npm)
- Use `pnpm env` (not nvm)
- **CRITICAL**: To run multiple scripts in parallel: use `pnpm run '/pattern/'` (pattern matching WITHOUT --parallel flag)
  - Example: `pnpm run '/docs:dev:.*/'` runs all scripts matching pattern
  - **NEVER use `--parallel` flag** - it's only for workspace packages, not for running multiple scripts
  - Pattern matching runs scripts concurrently by default for long-running processes
- Use `node:` prefix for built-ins
