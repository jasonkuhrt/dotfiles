---
paths: "**/.claude/**, **/claude-*-marketplace/**"
---

# Developing Claude Skills

- Directory name = skill name (kebab-case): `.claude/skills/querying-dev-database/`
- Opening title = titleized skill name: `# Querying Dev Database`

## Heading purposes

| Heading             | Required? | Purpose                                                                    |
| ------------------- | --------- | -------------------------------------------------------------------------- |
| `## CRITICAL`       | opt       | Safety-critical rules that MUST be followed. Place at top of skill body.   |
| ↳ `### <topic>`     |           | Individual critical topics as subheadings                                  |
| `## Use Cases`      | opt       | Refine when skill applies (complements frontmatter description)            |
| `## Requirements`   | opt       | All deps (libs, env vars, files) + how to handle absence                   |
| `## Credentials`    | opt       | Info about credentials for tool use. Credentials files go in /credentials. |
| `## Steps`          | opt       | Sequential steps                                                           |
| `## Operations`     | opt       | Menu of actions when skill does multiple things                            |
| `## Examples`       | opt       | User prompt → Claude action                                                |
| `## Reference`      | opt       | Internal script/tool docs                                                  |
| `## Notes`          | opt       | Gotchas, tips                                                              |
| `## Appendix`       | opt       | How things work, implementation details, architecture overview             |
| ↳ `### Attribution` | opt       | Credits for synthesized/derived skills                                     |
