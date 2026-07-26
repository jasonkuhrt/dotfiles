---
name: planetscale
description: PlanetScale work of any kind — Vitess or Postgres. Use for schema changes, migrations, deploy requests, branches, Insights and query performance, SQLCommenter query tags, Traffic Control budgets, webhooks and alerting, roles and credentials, backups/PITR, private connectivity, pscale CLI automation, safety/best-practice reviews, and read-only inventory or audit reports. Also use whenever driving the planetscale MCP tools or asked whether a database change is safe to run. Routes to the right sub-procedure — read this first, then load only the reference you need.
---

# PlanetScale

Router. **Load only the reference(s) the task needs** — do not read all fifteen.

## Pick by task

| You are doing | Read |
|---|---|
| **Full safe assessment, end to end** | `references/safe-orchestrator.md` — master flow; calls the others in order |
| Gathering evidence before any judgement | `references/readonly-inventory.md` |
| Deciding which recommendations even apply | `references/best-practices-matrix.md` |
| Writing up the final findings | `references/customer-report-template.md` |

### Engine-specific review

| Engine | Read |
|---|---|
| Postgres | `references/postgres-safety-review.md` |
| Vitess / MySQL | `references/vitess-safety-review.md` |

### Performance and attribution

| Topic | Read |
|---|---|
| Insights, slow/risky queries, load attribution | `references/query-insights-and-tags.md` |
| Adding query tags to an app repo | `references/codebase-sqlcommenter-instrumentation.md` |
| Traffic Control budgets and rules (Postgres) | `references/traffic-control-recommendations.md` |

### Change execution

| Topic | Read |
|---|---|
| Schema recommendations → branches / migrations / issues | `references/schema-recommendations-agent-loop.md` |
| Driving `pscale` headlessly (`--format json`, auth, `--force`) | `references/pscale-cli-automation.md` |
| Webhook subscriptions and alert automation | `references/webhook-automation-recommendations.md` |

### Safety envelope — read before any mutation

| Topic | Read |
|---|---|
| Approval gates for any DB / repo / credential / network change | `references/change-gates-and-approval-contract.md` |
| Agent behaviour around MCP, no autonomous prod mutation | `references/mcp-agent-operating-model.md` |
| Running approved changes without per-step approval | `references/autonomous-execution-mode.md` — **only** after explicit risk acknowledgement |

## Defaults

- **Read-only until told otherwise.** Inventory and review first; propose, then mutate.
- Driving `pscale` directly → load `pscale-cli-automation.md` **before** other references.
- Any mutation → `change-gates-and-approval-contract.md` applies, always.
