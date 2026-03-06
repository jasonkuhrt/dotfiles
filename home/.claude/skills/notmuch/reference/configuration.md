# notmuch Configuration

```bash
# Show config
notmuch config list

# Set config
notmuch config set user.name "Your Name"
notmuch config set user.primary_email "you@example.com"

# Database path
notmuch config set database.path "/path/to/mail"
```

## Config File Location

- `~/.notmuch-config` (legacy)
- `$XDG_CONFIG_HOME/notmuch/default/config` (modern)
- `$NOTMUCH_CONFIG` environment variable

## New Mail Tags

```ini
[new]
tags=unread;inbox
ignore=.mbsyncstate;.strstrignore
```
