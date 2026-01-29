---
name: cc:teacher-core
description: Use when asking how Claude Code works internally, investigating CC behavior or architecture, managing tasks (TaskCreate/TaskUpdate/TaskList/TaskGet), searching or analyzing session history, understanding CC data storage or file locations, debugging Chrome extension issues, forking parallel agents, or diagnosing any CC internal mechanism.
---

## Topics

### Internals
How Claude Code organizes data: session storage, /rename scope, project path encoding, file locations, and internal data structures.
- [Overview](reference/internals/overview.md)

### Tasks
Claude Code's task system (TaskCreate/TaskUpdate/TaskList/TaskGet), dependencies, cross-session persistence, and observed behavior.
- [Overview](reference/tasks/overview.md)
- [Details: lifecycle, schema, filesystem](reference/tasks/details.md)
- [References: sources and links](reference/tasks/references.md)

### Session Search
Search and analyze Claude Code conversation history. Find past discussions, extract timelines, generate continuation prompts.
- [Overview](reference/session-search/overview.md)

### Chrome Debugging
Diagnose and fix Claude in Chrome extension issues: zombie MCP processes, CDP conflicts, action failures.
- [Overview](reference/chrome-debugging/overview.md)

### Fork
Fork tasks to independent Claude Code sessions in separate Ghostty fullscreen spaces.
- [Overview](reference/fork/overview.md)
- [Fork script](scripts/fork.sh)
