# Config Schema

Linear skills resolve config from two YAML files in the project's `.claude/` directory.

## File Locations

```
.claude/
  linear.yaml          # Shared config (checked into git)
  linear.local.yaml    # Personal overrides (gitignored)
```

## Merge Behavior

1. Load `.claude/linear.yaml` (or empty object if missing)
2. Load `.claude/linear.local.yaml` (or empty object if missing)
3. Deep-merge local on top of shared (local wins at every key level)

Missing files are not errors. A project with no config files uses all defaults.

## Schema

```yaml
# .claude/linear.yaml

# The Linear organization slug (used in URLs and mentions)
workspace: heartbeat-chat

# Default team key for issue creation
team: ENG

# Team registry - maps keys to UUIDs for GraphQL mutations
teams:
  ENG:
    id: "80c5a37f-25f5-4cdd-bdbd-b7b618d42834"
    name: Engineering

# Default workflow states for common operations
states:
  todo: Backlog
  in_progress: In Progress
  done: Done
  canceled: Canceled

# Default priority for new issues (0-4)
default_priority: 3
```

```yaml
# .claude/linear.local.yaml

# Override default assignee (your Linear user ID)
assignee_id: "7584ae6a-e855-485a-bd7d-1557b90771d1"

# Override default team for this machine
team: PLATFORM

# Additional teams only relevant locally
teams:
  PLATFORM:
    id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
    name: Platform
```

## Resolution in Scripts

Config resolution is the responsibility of each script that needs it. The pattern:

```typescript
import * as Fs from 'node:fs/promises'
import * as Yaml from 'yaml'
import * as Path from 'node:path'

const loadConfig = async (projectRoot: string) => {
  const shared = await loadYaml(Path.join(projectRoot, '.claude', 'linear.yaml'))
  const local = await loadYaml(Path.join(projectRoot, '.claude', 'linear.local.yaml'))
  return deepMerge(shared, local)
}

const loadYaml = async (path: string) => {
  try {
    const content = await Fs.readFile(path, 'utf-8')
    return Yaml.parse(content) ?? {}
  } catch {
    return {}
  }
}
```

## Notes

- The `workspace` field is critical for mention URLs: `https://linear.app/{workspace}/profiles/{displayName}`
- Team UUIDs in the `teams` registry are needed for GraphQL mutations (`issueCreate`, etc.)
- Team keys (like `ENG`) are short identifiers used in Linear URLs and issue prefixes
- The config system is intentionally simple: no validation schema, no required fields, no defaults file. Each skill documents what keys it reads.
