---
name: notmuch
description: Use when searching emails, managing tags, understanding notmuch queries, or integrating with notmuch for local Maildir.
---

# notmuch

notmuch is a system for indexing, searching, reading, and tagging large collections of email messages in Maildir format. It uses Xapian for fast full-text search.

## CRITICAL

- notmuch is **local only** - indexes your local Maildir, not IMAP directly
- Thread IDs are **internal to notmuch** - not portable across systems
- Tags are **per-message**, not per-thread
- Use with mbsync: `mbsync -a && notmuch new`

## Documentation

**Local reference:** See `references/man-pages.md` for cached man pages.

| Resource | URL |
|----------|-----|
| Official Docs | https://notmuchmail.org/doc/latest/ |
| Man Pages | https://notmuchmail.org/manpages/ |
| Search Terms | https://notmuchmail.org/doc/latest/man7/notmuch-search-terms.html |
| FAQ | https://notmuchmail.org/faq/ |
| News/Releases | https://notmuchmail.org/news/ |
| ArchWiki | https://wiki.archlinux.org/title/Notmuch |

## Core Concepts

### Data Model

```
Maildir (files)
    │
    ▼
notmuch index (Xapian database)
    │
    ├── Messages (indexed content + metadata)
    │       └── Tags (flat strings per message)
    │
    └── Threads (groupings derived from headers)
```

- **Message**: Indexed email file with full-text content
- **Thread**: Logical grouping reconstructed from In-Reply-To and References headers
- **Tag**: String label attached to individual messages (not threads)

### Threading

notmuch reconstructs threads from email headers:
- `In-Reply-To`: Direct parent message
- `References`: Chain of ancestor Message-IDs

Thread IDs are opaque internal identifiers (e.g., `thread:00000000000001dd`).

**Note:** Threading is heuristic. notmuch considers all references, not just the heuristically chosen parent.

## Commands

### Basic Operations

```bash
# Index new mail
notmuch new

# Search (returns threads)
notmuch search <query>

# Search (returns messages)
notmuch search --output=messages <query>

# Show message content
notmuch show <query>
notmuch show --format=json <query>

# Count matches
notmuch count <query>

# Tag messages
notmuch tag +inbox +unread -- <query>
notmuch tag -unread -- <query>

# List all tags
notmuch search --output=tags '*'
```

### Output Formats

```bash
# Thread list (default)
notmuch search tag:unread

# Message IDs only
notmuch search --output=messages tag:unread

# File paths only
notmuch search --output=files tag:unread

# JSON format
notmuch search --format=json tag:unread
notmuch show --format=json tag:unread

# S-expressions
notmuch search --format=sexp tag:unread
```

## Integration with Other Tools

### mbsync

```bash
# Sync then index
mbsync -a && notmuch new
```

### himalaya

himalaya can use notmuch as a backend for search.

### aerc

Terminal MUA with native notmuch support.

### Emacs

notmuch ships with a full Emacs interface.

## Version Requirements

- Xapian 1.4.0+ (for regex support)
- GMime 3.0.3+
- Python 3.x for notmuch2 bindings

## References

| Topic | File |
|-------|------|
| Search Syntax | `reference/search-syntax.md` |
| Tags | `reference/tags.md` |
| Configuration | `reference/configuration.md` |
| Hooks | `reference/hooks.md` |
| API & Bindings | `reference/api-bindings.md` |
| Common Patterns | `reference/common-patterns.md` |
| Man Pages | `references/man-pages.md` |
