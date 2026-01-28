# Beads Teacher Refresh

Meta-check: is `beads-meta` (teacher topic) still accurate with current beads?

> **Note:** For beads installation health, use `bd doctor`. For beads version changes, use `bd upgrade review`. This skill is about checking the teacher skill itself.

## Verify Skill Assumptions

```bash
bd --version                              # Current beads version
bd setup --list                           # Available setup recipes
cat ~/.claude/plugins/cache/beads-marketplace/beads/*/.claude-plugin/plugin.json | jq .hooks
                                          # What hooks does plugin provide?
bd doctor 2>&1 | grep -i claude           # What does doctor check?
```

## Check for Breaking Changes

```bash
bd upgrade review               # Full changelog since last version
```

## Signs the Teacher Skill Needs Updating

- Plugin structure changed (new hooks, removed hooks)
- `bd doctor` checks for different things
- New setup steps in `bd upgrade review`
- Marketplace repo moved

## If Skill is Stale

Update the teacher topic's setup steps and commands to match current beads, then test the onboarding flow on a fresh project.
