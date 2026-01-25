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

## Not Comparable

GitHub Issues, Linear, Jira solve a **different problem**: team collaboration, stakeholder visibility, web UIs. They're not alternatives to beads/CC Tasks for agent memory across sessions.
