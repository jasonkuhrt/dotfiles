# Linear Workspace Pull

Downloads workspace-specific data from Linear and caches it locally. Other Linear scripts use this cache for validation instead of guessing UUIDs or state names.

**Prerequisite:** `LINEAR_API_TOKEN` environment variable must be set. See the core topic for auth setup.

## Why This Exists

Linear skills must NEVER invent workspace-specific data. This skill provides a downloaded, cached copy of:

- Teams (with their workflow states and labels)
- Users (for mention mapping)
- Organization metadata

## Usage

```bash
# Initialize or refresh the workspace cache
bun ~/.claude/skills/linear/scripts/pull.ts
```

Run this:
- When setting up a new project
- When team states, labels, or users change
- Whenever a linear skill reports missing cache data

The script is idempotent - safe to run multiple times.

## Cache Location

Per `cc_skills-tmp-dir` convention:

```
.claude/tmp/linear/workspace.yaml   # READ-ONLY cache pulled from Linear API
```

## Cache Format

```yaml
workspace: heartbeat-chat
organization:
  id: uuid
  name: Heartbeat
teams:
  - id: uuid
    key: HEA
    name: Engineering
    states:
      - id: uuid
        name: "In Dev"
        type: started
        position: 1
      # ...
    labels:
      - id: uuid
        name: bug
      # ...
users:
  - id: uuid
    name: "Jason Kuhrt"
    displayName: jason
    email: jason@example.com
pulledAt: 2026-01-28T12:00:00Z
```

## How Other Skills Use This

1. Skill needs workspace data (state UUID, user lookup, etc.)
2. Check for `.claude/tmp/linear/workspace.yaml`
3. If missing → invoke workspace-pull → wait → continue
4. Use cached data for validation/mapping

### Human Name -> Mention Mapping

When writing content with human names:
1. Look up name in cached `users` list
2. **Match found** -> convert to `https://linear.app/{workspace}/profiles/{displayName}`
3. **No match** -> keep as plaintext, notify user:
   ```
   Warning: Could not match "Bob Smith" to a Linear workspace member. Left as plaintext.
   ```

## Output

The script writes the cache file and outputs a summary:

```
Pulled workspace data for heartbeat-chat
  Teams: 3 (Engineering, Platform, Design)
  Users: 12
  Total states: 18
  Total labels: 15
Written to .claude/tmp/linear/workspace.yaml
```
