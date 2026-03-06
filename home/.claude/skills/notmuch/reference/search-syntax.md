# notmuch Search Syntax

## Prefixes

| Prefix | Type | Description |
|--------|------|-------------|
| `from:` | Probabilistic | Sender address or name |
| `to:` | Probabilistic | Recipient address or name |
| `subject:` | Probabilistic | Subject line |
| `body:` | Probabilistic | Message body |
| `attachment:` | Probabilistic | Attachment filename |
| `mimetype:` | Probabilistic | MIME type |
| `tag:` | Boolean | Message tag |
| `id:` | Boolean | Message-ID |
| `thread:` | Boolean | Thread ID |
| `folder:` | Boolean | Maildir folder |
| `path:` | Boolean | File path |
| `date:` | Special | Date/time range |
| `lastmod:` | Special | Database modification |

## Boolean Operators

```bash
# AND (implicit with space, or explicit)
notmuch search from:alice subject:meeting
notmuch search from:alice and subject:meeting

# OR
notmuch search from:alice or from:bob

# NOT
notmuch search from:alice and not tag:spam

# XOR
notmuch search from:alice xor from:bob

# Grouping
notmuch search '(from:alice or from:bob) and tag:unread'
```

## Date Queries

```bash
# Relative dates
notmuch search date:today
notmuch search date:yesterday
notmuch search date:last_week
notmuch search date:this_month
notmuch search date:7_days_ago..today

# Absolute dates
notmuch search date:2024-01-01..2024-01-31
notmuch search date:2024-01-01..

# Timestamps
notmuch search date:@1234567890..@1234567900
```

## Regex Support (Xapian 1.4+)

```bash
# Regex on from/subject
notmuch search 'from:/.*@amazon\./'
notmuch search 'subject:/order.*shipped/'
```

## Thread Queries

```bash
# By thread ID
notmuch search thread:00000000000001dd

# Indirect: threads containing messages matching query
notmuch search 'thread:{from:alice}' and 'thread:{subject:crypto}'
```
