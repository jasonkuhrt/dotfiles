# Batch README Operations

Handles multi-package README operations with queued subagent dispatch.

## Scoping Strategies

### All packages

Discover every package in the workspace:

```bash
# Bun/pnpm/npm workspace — find all package.json under packages/
find packages/ -maxdepth 2 -name package.json -exec dirname {} \;

# Or parse workspace config
cat package.json | jq -r '.workspaces[]' 2>/dev/null
```

Filter to packages that actually have (or should have) a README:
- Include if: has `src/` directory, has exports in package.json, is not a fixture/test-only package
- Exclude if: name starts with `test-` or `fixture-`, has `"private": true` without exports

### Git-scoped packages

Determine which packages were affected by the git reference the user described:

```bash
# Get the base (adapt to the user's reference — branch, time range, PR)
BASE=$(git merge-base HEAD main 2>/dev/null || git merge-base HEAD develop 2>/dev/null)

# Get changed files
git diff --name-only "$BASE"...HEAD

# Map files to packages
# e.g. packages/core/src/foo.ts → packages/core
```

Extract unique package directories from the changed file paths. Only include packages where substantive code changed — ignore changes that are only to test files, config files, or the README itself.

### Instruction pass-through

The user's original instruction (minus the batch scope words) passes through to each subagent. Examples:

- `/readme refresh all` → each agent gets: "refresh this package's README"
- `/readme audit all affected by this pr` → each agent gets: "audit this package's README"
- `/readme rewrite all from scratch` → each agent gets: "rewrite this package's README from scratch"

## Queue Protocol

Do NOT spawn all subagents at once. Use a bounded queue.

### Constants

- `MAX_CONCURRENT = 5` — maximum subagents running simultaneously
- Report progress after each agent completes

### Execution

1. **Discover** the package list (all or git-scoped)
2. **Create a task** per package using TaskCreate
3. **Report** the plan to the user: "Found N packages. Processing in batches of 5."
4. **Dispatch batch 1** (first 5 packages) as background agents. Wait for ALL 5 to complete.
5. **Dispatch batch 2** (next 5). Wait for all to complete. Repeat until done.
6. **Track results**: success, failure, or skipped per package
7. **Report** the final summary when all batches are done

Fixed batches, not a mutable queue. Stateless between batches — no tracking which individual agent finished first.

### Subagent prompt template

Determine the operation ONCE (create/update/review) based on the user's instruction. Read the operation's file, `~/.claude/skills/readme/core.md`, AND the file-specific protocol (`~/.claude/skills/readme/core-readme.md` or `~/.claude/skills/readme/core-contributing.md`). Paste all three into each subagent prompt.

Each subagent receives this prompt:

```
You are processing a README for the package at: {PACKAGE_PATH}

Operation: {OPERATION}
Focus: {FOCUS}
Instruction: {PASS_THROUGH_INSTRUCTION}

{FULL_CONTENT_OF_OPERATION_MD}

{FULL_CONTENT_OF_CORE_MD}

{FULL_CONTENT_OF_CORE_TYPE_MD}

Work only within {PACKAGE_PATH}. Do not modify files outside this directory.
```

The explicit `Operation:` and `Focus:` fields prevent each subagent from independently guessing. Detection happens once in the batch orchestrator.

### Subagent configuration

- Use `run_in_background: true`
- Give each agent a descriptive `name`: `readme-{package-name}`
- Use `team_name` per the user's agent team rules
- Set `mode: "bypassPermissions"` so agents can write without prompts

### Error handling

- If a subagent fails, log the failure and continue with the queue
- Do not retry automatically — report failures for manual review
- A single failure does not block other packages

## Progress Reporting

After each agent completes, update the user:

```
[3/12] @kitz/core — refreshed (concepts, usage sections updated)
[4/12] @kitz/test — skipped (no README, no exports)
[5/12] @kitz/fs — failed (could not determine term dependency graph)
```

Final summary:

```
README batch complete: 12 packages
  9 refreshed
  1 created
  1 skipped
  1 failed (@kitz/fs — see error above)
```

## Root README

If the project has a root README.md (monorepo overview), process it LAST, after all package READMEs are done. The root README may reference package descriptions that were just updated.
