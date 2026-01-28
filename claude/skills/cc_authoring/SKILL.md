---
name: cc:authoring
description: Use when creating or troubleshooting Claude Code skills, hooks, rules, markers, or AskUserQuestion calls. Covers platform gotchas, frontmatter config, progressive disclosure patterns, and known limitations.
---

## Topics

### Writing Skills
Platform gotchas and limitations for skill authoring.
- [Overview](reference/writing-skills/overview.md)
- [Frontmatter fields](reference/writing-skills/config-frontmatter.md)
- [allowed-tools](reference/writing-skills/config-allowed-tools.md)
- [context: fork](reference/writing-skills/config-context-fork.md)
- [Hooks in skills](reference/writing-skills/config-hooks.md)
- [Status line](reference/writing-skills/feature-status-line.md)
- [Output collapse limitation](reference/writing-skills/limitation-output-collapse.md)
- [Code examples pattern](reference/writing-skills/pattern-code-examples.md)
- [Progressive disclosure](reference/writing-skills/pattern-progressive-disclosure.md)
- [Script bundling](reference/writing-skills/pattern-script-bundling.md)
- [AskUserQuestion in skills](reference/writing-skills/tool-ask-user-question.md)
- [TodoWrite in skills](reference/writing-skills/tool-todo-write.md)

### Writing Hooks
Hook debugging and known bugs for user hooks in settings.json.
- [Overview](reference/writing-hooks/overview.md)

### Writing Rules
Project rule creation and file-scoped rules with paths frontmatter.
- [Overview](reference/writing-rules/overview.md)

### Markers
Inline @claude/@c code comments for communicating with Claude.
- [Overview](reference/markers/overview.md)
- [CI grep pattern](assets/markers-grep-pattern.txt)

### AskUserQuestion
Schema constraints, effectiveness patterns, and known issues for AskUserQuestion tool calls.
- [Overview](reference/ask-user-question/overview.md)

### Skills Tmp Dir
Convention for skills writing temporary/local files via `<tmp>/` paths.
- [Overview](reference/skills-tmp-dir/overview.md)
