# notmuch Skill Design

## Strengths (Don't Replicate)

| Capability | Why It's Good |
|------------|---------------|
| **Full-text search** | Xapian is battle-tested, handles 100k+ messages |
| **Threading** | Correct reconstruction from headers |
| **Maildir integration** | Direct file access, no sync issues |
| **Fast tagging** | Immediate, lightweight |
| **Incremental indexing** | `notmuch new` only indexes new messages |
| **Stable** | Mature, reliable, used by power users for years |

## Limitations

| Limitation | Impact |
|------------|--------|
| **No relational queries** | Can't join sender info with thread analysis |
| **Tags are flat strings** | No hierarchy, metadata, or relations |
| **No structured data** | Can't store "tracking_number = X" |
| **No computed properties** | Thread participant count needs manual query |
| **Thread ID is opaque** | Can't query thread properties directly |
| **Local only** | Thread IDs not portable across machines |
| **Per-message tags** | Tagging a "thread" means tagging all messages |
