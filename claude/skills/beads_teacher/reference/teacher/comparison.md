# Beads vs CC Tasks

Both solve **agent memory across sessions**. Different tradeoffs.

## Quick Decision

| Need | Use |
|------|-----|
| Large initiative spanning many sessions | Beads |
| Issues travel with code (in-repo) | Beads |
| Team collaboration via git | Beads |
| Working across machines | Beads |
| Git history/audit trail | Beads |
| Claude manages autonomously, you observe | CC Tasks |
| Single-machine, quick coordination | CC Tasks |
| Zero setup | CC Tasks |

## Key Differences

| | Beads | CC Tasks |
|---|-------|----------|
| **Operator** | You (agent assists) | Agent (you observe) |
| **Storage** | In-repo (`.beads/`) | Local (`~/.claude/tasks`) |
| **Cross-machine** | ✅ (git) | ❌ |
| **Team sharing** | ✅ (git push/pull) | ❌ |
| **Audit trail** | ✅ (git log) | ❌ |
| **Setup** | `bd init` + `bd setup claude` | None |

## Visual Interfaces for Beads

Community-built UIs for browsing/managing beads outside CC. See [COMMUNITY_TOOLS.md](https://github.com/steveyegge/beads/blob/main/docs/COMMUNITY_TOOLS.md) for the full list, and [Discussion #276](https://github.com/steveyegge/beads/discussions/276) for ongoing development.

### Terminal UIs

| Tool | Language | Highlights |
|------|----------|------------|
| [lazybeads](https://github.com/codegangsta/lazybeads) | Go (Bubble Tea) | Lightweight, polished — from author of Martini/Negroni |
| [perles](https://github.com/zjrosen/perles) | Go | Own query language (BQL), dependency viz, kanban |
| [bsv](https://github.com/bglenden/bsv) | Rust | Markdown rendering, mouse support, tree navigation |
| [bdui](https://github.com/assimelha/bdui) | Node.js | Real-time, dependency graph, vim-style nav |
| [beads_viewer](https://github.com/Dicklesworthstone/beads_viewer) | Go | Keyboard-driven, tree navigation |
| [abacus](https://github.com/ChrisEdwards/abacus) | — | Issue visualization and navigation |

### Web UIs

| Tool | Install | Highlights |
|------|---------|------------|
| [beads-ui](https://github.com/mantoni/beads-ui) | `npx beads-ui start` | Zero-install, live updates, kanban |
| [beads-kanban-ui](https://github.com/AvivK5498/Beads-Kanban-UI) | `npm install -g beads-kanban-ui` | Epic/subtask management, design doc viewer, activity timeline |
| [beads-dashboard](https://github.com/rhydlewis/beads-dashboard) | — | Metrics: lead time, throughput, filterable table |
| [Monitor WebUI](https://github.com/steveyegge/beads/tree/main/examples/monitor-webui) | — | Real-time dashboard (from beads core team) |

### Editor Extensions

| Tool | Editor |
|------|--------|
| [vscode-beads](https://marketplace.visualstudio.com/items?itemName=planet57.vscode-beads) | VS Code — issues panel + daemon |
| [nvim-beads](https://github.com/joeblubaugh/nvim-beads) | Neovim |
| [beads.el](https://codeberg.org/ctietze/beads.el) | Emacs |

### Built-in CLI

```bash
bd graph dotfiles-i83           # ASCII dependency graph
bd graph --all                  # All open issues, layered by deps
bd graph dotfiles-i83 --compact # Tree format, one line per issue
```

## Not Comparable

GitHub Issues, Linear, Jira solve a **different problem**: team collaboration, stakeholder visibility, web UIs. They're not alternatives to beads/CC Tasks for agent memory across sessions.

## Recommended Reading

* https://ianbull.com/posts/beads/ — Deep beads reference: workflow patterns (prompt-first vs issue-first vs hybrid), "land the plane" session protocol, context rot management, task granularity (>2 min = separate issue), agent orchestration, dependency types, daemon architecture.
* https://paddo.dev/blog/from-beads-to-tasks/ — Best take on the beads/tasks layering: tasks = session-level, beads = project-level. Complementary, not competing.
