---
name: spelunking
description: Use when a tool, library, or framework doesn't support what you need and official docs don't cover it — finding solutions off the happy path. Triggers on "how do I make X do Y", "X doesn't support Y", undocumented behavior, bleeding-edge tool limitations, workarounds for missing features, or when the mainstream answer is "you can't do that"
---

# Spelunking

Find solutions when tools don't officially support what you need.

## When to Use

- Official docs say nothing about your use case
- The mainstream answer is "not supported" or "restart required"
- You're on a bleeding-edge version where docs lag behind reality
- You need to understand tool internals to find a workaround
- The feature exists but is undocumented, half-built, or broken

## Source Hierarchy

Check in this order. Stop when you find a definitive answer.

1. **Local source code** — `node_modules/`, installed binaries, `~/.local/`, brew cellar. The code is the truth.
2. **GitHub issues/PRs/discussions** — search the tool's repo. Recent closed issues often document workarounds. Open issues confirm known limitations.
3. **Ref MCP / official docs** — check for recently added features the docs mention but tutorials haven't caught up to.
4. **Changelog / release notes** — version-specific. A feature may have landed 2 releases ago with zero fanfare.
5. **Web search** — community posts, Discord archives, blog posts. Filter by date — 2024 answers are often wrong for 2026 tools.
6. **Empirical testing** — build a probe. The fastest way to answer "does X work?" is to try X.

## The Probe Pattern

When documentation is ambiguous, **build a minimal probe and test empirically.**

```
1. Identify the exact claim to test ("CC detects new skill files mid-session")
2. Create the smallest possible artifact that would confirm/deny (a test skill file)
3. Execute the probe
4. Observe actual behavior
5. Clean up the probe
```

Probes beat speculation. 5 minutes of testing saves 30 minutes of reading conflicting docs.

## Parallel Investigation

When the search space is large (multiple repos, multiple possible mechanisms), launch parallel agents:

- **Source reader** — reads actual implementation code
- **Issue searcher** — searches GitHub issues/PRs/discussions
- **Web researcher** — broader community search

For small search spaces (single CLI flag, one config file), stay sequential.

## Common Patterns in Off-Path Solutions

| Pattern | Example |
|---------|---------|
| **Feature exists, undocumented** | CC skill hot-reload works but no docs mention it |
| **Half-shipped** | `/reload-plugins` rebuilds model context but not command parser |
| **Config over code** | Env var or flag that changes behavior, buried in source |
| **Dual system** | Two registration paths where only one reloads |
| **Version-gated** | Works in v2.1.84 but not v2.1.60 |
| **Workaround via adjacent feature** | Can't reload skills? CLAUDE.md is re-read every turn |

## Documenting Findings

After a spelunking session, save results to `~/.claude/research/` via the research skill. Include:

- What works, what doesn't, what's half-broken
- Version numbers (findings are version-specific)
- Relevant issue numbers for tracking upstream fixes
- The probe methodology so future-you can re-verify after upgrades
