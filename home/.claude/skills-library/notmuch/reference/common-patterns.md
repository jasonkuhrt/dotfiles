# notmuch Common Patterns

## Auto-tagging in post-new hook

```bash
#!/bin/bash
# Tag newsletters
notmuch tag +newsletter -inbox -- \
  '(from:*@substack.com or from:*@buttondown.email) and tag:new'

# Tag receipts
notmuch tag +receipt -- \
  'subject:receipt or subject:invoice and tag:new'

# Clear new tag
notmuch tag -new -- tag:new
```

## Export thread as mbox

```bash
notmuch show --format=mbox thread:xxx > thread.mbox
```

## Find large threads

```bash
# No direct way - must iterate
notmuch search '*' | while read -r line; do
  thread_id=$(echo "$line" | cut -d' ' -f1)
  count=$(notmuch count "thread:$thread_id")
  echo "$count $thread_id"
done | sort -rn | head -10
```

## Backup tags

```bash
notmuch dump > tags-backup.txt
notmuch restore < tags-backup.txt
```
