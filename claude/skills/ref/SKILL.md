---
name: ref
description: Use when setting up Ref MCP server, managing API keys, or troubleshooting Ref documentation lookup issues. Also for dashboard operations (adding repos, uploading files), understanding pricing/credits, or deciding Ref vs alternatives. NOT for actually searching docs—just use ref_search_documentation directly.
---

# Ref

Documentation search MCP server. This skill covers **meta work** (setup, config, decisions) -- not mainline doc searching.

> **To search docs:** Just call `ref_search_documentation` and `ref_read_url` directly. Don't invoke this skill.

## How Ref Works

### Search Philosophy

Ref uses **agentic search**: `search()` returns result overviews, then you selectively `read()` relevant pages. This matches how humans search -- iterate and refine rather than batch retrieve.

### What Gets Indexed

| Source | What's Indexed |
|--------|----------------|
| Public GitHub repos | Small repos (<2k files): everything. Large repos: docs only |
| Your private repos | Same rules, synced every 5 minutes |
| Uploaded files | PDF and Markdown, chunked automatically |

**NOT indexed:** Man pages, system docs, CLI `--help` output.

### Freshness & Sync

- **GitHub repos:** Synced on 5-minute cron, incremental (compares commits)
- **Uploaded files:** Indexed immediately on upload
- **Public index:** Maintained by Ref team; request additions via [form](https://tally.so/r/nrvBY2)

### Library Versions

Ref indexes the **default branch** (usually `main`). For specific versions:
- Check if the repo tags releases with docs
- Upload version-specific docs manually if needed
- Use `ref_read_url` on a specific commit/tag URL if available

## Usage Reference

| Tool | Credits | Purpose |
|------|---------|---------|
| `ref_search_documentation` | 1 | Search docs (full sentence query) |
| `ref_read_url` | 1 | Read content from search result URL |

**Search patterns:**
- Include library name: `"Effect Schema decode unknown data validation"`
- Private docs: include `ref_src=private` in query

## Key URLs

| URL | Purpose |
|-----|---------|
| https://ref.tools/signup | Create account |
| https://ref.tools/install | Pre-populated install command |
| https://ref.tools/keys | Manage API keys |
| https://ref.tools/resources | Your Resources (private docs) |
| https://ref.tools/activity | View usage/credits |
| https://docs.ref.tools | Documentation |
| https://docs.ref.tools/changelog | Monthly updates |
| https://docs.ref.tools/comparison/context7 | Ref vs Context7 |
| https://docs.ref.tools/usage/credits | Credit costs |
| https://docs.ref.tools/llms.txt | Full docs index |

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "not correctly configured" | API key invalid - get fresh key at ref.tools/keys |
| Tools not available | Restart Claude Code |
| Search returns nothing | Try different query terms, or content may not be indexed |
| Need specific library version | Check repo tags or upload version-specific docs |
| Docs not fresh enough | Private repos sync every 5 min; public index managed by Ref |

## Support

help@ref.tools

## References

| Topic | File |
|-------|------|
| Doctor (setup/repair) | `reference/doctor.md` |
| Dashboard Operations | `reference/dashboard.md` |
| Pricing & Credits | `reference/pricing.md` |
