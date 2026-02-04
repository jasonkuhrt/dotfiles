# Ref Skill Design

## Ref vs Context7

*Updated Jan 2026 -- Context7 pricing has changed significantly.*

| Aspect | Ref | Context7 |
|--------|-----|----------|
| **Free tier** | 200 credits (never expire) | 1,000 calls/month |
| **Paid tier** | $9/mo = 1,000 credits | $10/seat/mo = 5,000 calls |
| **Overage** | $9 per 1,000 | $10 per 1,000 |
| **Search model** | Iterative (search -> read) | Batch (resolve-library-id -> get-docs) |
| **Content** | Any (prose, warnings, code) | Code snippets only |
| **Private repos** | Included | $10/seat + $15/1M tokens parsing |
| **PDF upload** | Yes | No |
| **Tokens/query** | Adaptive 500-5k | Fixed ~3k |

**When Ref wins:**
- Private repos without parsing fees
- PDF/file uploads
- Iterative search (more agentic, flexible)
- Source-of-truth access (not just snippets)

**When Context7 wins:**
- Higher volume needs (5,000 calls vs 1,000 for similar price)
- Public docs only workflows
- "use context7" prompt UX in Cursor

**Bottom line:** For typical individual usage, the model differences matter more than volume. Ref's iterative approach and private repo simplicity are worth the lower volume cap.

## Decision Guide: Local Docs vs Ref Upload

When you have docs that aren't in Ref's public index (e.g., man pages):

| Factor | Local `man-pages/` dir | Upload to Ref |
|--------|------------------------|---------------|
| **Setup** | Script + grep | One-time upload |
| **Search** | Grep (exact match) | Semantic search |
| **Offline** | Works | Needs internet |
| **Human browsing** | Files in repo | Web UI only |
| **CC access** | Grep local files | `ref_src=private` query |
| **Maintenance** | Re-run script on updates | Re-upload on updates |

**Recommendation:**
- **Keep local** if: humans browse the docs, offline access matters, or docs change rarely
- **Upload to Ref** if: semantic search valuable, docs are large, or you want unified search

**Both is fine:** Local for humans, Ref for CC. They serve different access patterns.
