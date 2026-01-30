# Criteria File Format

Project and issue criteria files use markdown with YAML frontmatter.

## Frontmatter

```yaml
---
mode: extend        # extend (default) | replace
tiers:
  gate: true        # on by default
  quality: true     # on by default
  polish: false     # off — skip this tier entirely
---
```

| Field | Type | Default | Purpose |
|-------|------|---------|---------|
| `mode` | `extend` \| `replace` | `extend` | How this file merges with lower levels |
| `tiers` | map of tier → boolean | all `true` | Enable/disable entire tiers |

- **`extend`**: Checks add to matching group/tier. New groups and tiers append.
- **`replace`**: Lower levels discarded. This file is the sole criteria source.
- **Tier toggles**: If any level disables a tier, it stays off in the merged result.

## Body

Markdown with `## tier` → `### group` → bullet checks:

```markdown
## quality

### consistency

- **Terminology** — project-specific naming rules
  - Every component filename follows `ComponentName` convention
  - Model names match terminology doc

### architecture

- All API procedures use permission guard
- Service architecture uses consistent grouping pattern
```

Groups and checks merge into matching tiers from lower levels. New groups append.

## Findings Output

Findings mirror the criteria structure. Only items with findings appear:

```markdown
# QA Findings — Pass {N}

Branch: `{branch}`. Date: {date}. Tier: `{tier}`.
Sources: lib + project + issue (or whichever were found).

---

## {Tier Name}

- **{GROUP NAME}**
  - **{Sub-group}** — {original criterion text}
    - {criterion item}
      - FINDING: {observation, with file:line references}
```

- Preserve original criteria text verbatim
- Prefix findings with `FINDING:`
- Include `file:line` references
- Omit criteria/groups/tiers with zero findings

<!-- FUTURE IDEAS (parked):
  - `include`/`exclude` fields for path scoping
  - `pre` field for setup commands before mechanical checks
  - `disable` field for per-check ID suppression
  - Smart source root detection from tsconfig.json
  - Gitignore integration
-->
