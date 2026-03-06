# notmuch Tags

## Built-in Tags

| Tag | Description | Maildir Sync |
|-----|-------------|--------------|
| `inbox` | Default for new messages | No |
| `unread` | Not yet read | Syncs to Maildir flag |
| `draft` | Draft message | Syncs to Maildir flag |
| `flagged` | Starred/important | Syncs to Maildir flag |
| `replied` | Replied to | Syncs to Maildir flag |
| `passed` | Forwarded | Syncs to Maildir flag |

## Tag Operations

```bash
# Add tags
notmuch tag +important +work -- from:boss@company.com

# Remove tags
notmuch tag -inbox -unread -- tag:archived

# Multiple operations
notmuch tag +archived -inbox -- date:..2023-01-01

# Tag all messages in a thread
notmuch tag +project-x -- thread:00000000000001dd
```

## Maildir Flag Sync

notmuch can sync certain tags to Maildir flags (visible to other clients):

```ini
# In notmuch config
[maildir]
synchronize_flags=true
```

Mapped tags: draft, flagged, passed, replied, unread (S flag)
