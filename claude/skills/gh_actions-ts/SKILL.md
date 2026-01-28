---
name: gh:actions-ts
description: Use when writing TypeScript scripts for GitHub Actions workflows. Covers actions/github-script@v8, Node 24 native TS, ESM modules, and type setup.
---

# Writing GitHub Action Scripts

Writing TypeScript scripts for GitHub Actions using `actions/github-script@v8` and Node 24's native TypeScript support.

## Requirements

- **Dev dependencies** for types (runtime provided by GitHub):

  ```bash
  npm install --save-dev @actions/github @actions/core
  ```

  - Without these: Script runs but no type checking/autocomplete in editor

## Steps

1. **Create script** at `.github/scripts/<name>.mts`
2. **Use ESM** with dynamic import in workflow
3. **Pass context** via environment variables (safe escaping)

## Reference

### Workflow Pattern

```yaml
- name: Run script
  uses: actions/github-script@v8
  env:
    MY_INPUT: ${{ steps.previous.outputs.value }}
  with:
    script: |
      const { default: fn } = await import('./.github/scripts/my-script.mts');
      await fn({ github, context, core });
```

### Script Template

```typescript
// .github/scripts/my-script.mts
import type { GitHub } from "@actions/github/lib/utils.js";
import type { Context } from "@actions/github/lib/context.js";
import type * as core from "@actions/core";

interface ScriptArgs {
  github: InstanceType<typeof GitHub>;
  context: Context;
  core: typeof core;
}

export default async function main({
  github,
  context,
  core,
}: ScriptArgs): Promise<void> {
  const myInput = process.env.MY_INPUT!;

  // Use github.rest.* for API calls
  // Use core.info() for logging
  // Use context.repo for owner/repo
}
```

### Version Matrix

| github-script | Node | Native TS |
| ------------- | ---- | --------- |
| v7            | 20   | No        |
| v8            | 24   | Yes       |

### Node 24 TS Limitations

- No enums (use `as const` objects)
- No decorators
- No `tsconfig.json` paths/baseUrl
- No JSX
- Types stripped at runtime, no type checking

### Safe Value Passing

Pass values via `env:` block, not inline interpolation:

```yaml
# GOOD - safe escaping
env:
  LOGS: ${{ steps.logs.outputs.logs }}
with:
  script: |
    const logs = process.env.LOGS;

# BAD - breaks if logs contain backticks or ${}
with:
  script: |
    const logs = `${{ steps.logs.outputs.logs }}`;
```

## Notes

- `.mts` = ES modules (use `import`/`export`)
- `.cts` = CommonJS (use `require`/`module.exports`)
- Checkout step required before script can be imported
