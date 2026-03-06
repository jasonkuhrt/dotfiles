# notmuch Man Pages Reference

Cached from https://notmuchmail.org/doc/latest/ on 2026-01-11.

## notmuch-search(1)

Search for messages and display threads.

### Synopsis

```
notmuch search [options] <search-term>...
```

### Output Modes (--output)

| Mode | Description |
|------|-------------|
| `summary` | Thread overview: ID, date, counts, participants, subject (default) |
| `threads` | Thread IDs only |
| `messages` | Message IDs matching the search |
| `files` | Filenames of matching messages |
| `tags` | All tags on matching messages |

### Output Formats (--format)

| Format | Description |
|--------|-------------|
| `json` | Structured JSON |
| `sexp` | S-Expression (Lisp) |
| `text` | Newline-separated (default) |
| `text0` | Null-character separated (for xargs -0) |

### Options

| Option | Description |
|--------|-------------|
| `--sort=newest-first\|oldest-first` | Result ordering (default: newest-first) |
| `--offset=N` | Skip first N results |
| `--limit=N` | Return at most N results |
| `--exclude=true\|false\|all\|flag` | Handle excluded tags |
| `--duplicate=N` | For files output, show Nth filename per message |
| `--format-version=N` | Specify format version for programmatic use |

### Exit Codes

- 0: Success
- 20: Requested format version too old
- 21: Requested format version too new

---

## notmuch-show(1)

Display messages matching search terms.

### Synopsis

```
notmuch show [options] <search-term>...
```

### Output Formats (--format)

| Format | Description |
|--------|-------------|
| `text` | Plain-text with MIME parts decoded, Control-L delimited (default) |
| `json` | Nested JSON reflecting MIME structure |
| `sexp` | S-Expression format |
| `mbox` | Traditional Unix mbox format |
| `raw` | Raw bytes, for extracting attachments |

### Options

| Option | Description |
|--------|-------------|
| `--entire-thread=true\|false` | Include all thread messages |
| `--part=N` | Extract specific MIME part (depth-first numbering) |
| `--sort=newest-first\|oldest-first` | Result ordering |
| `--limit=N` | Limit results |
| `--offset=N` | Skip results |
| `--verify` | Check cryptographic signatures |
| `--decrypt=auto\|true\|false\|stash` | Handle encrypted content |
| `--body=true\|false` | Include/omit message bodies |
| `--include-html` | Include text/html parts |

---

## notmuch-tag(1)

Add or remove tags from messages.

### Synopsis

```
notmuch tag [options] +<tag>|-<tag> [--] <search-term>...
```

### Basic Syntax

- `+tag`: Add tag
- `-tag`: Remove tag
- Changes applied in command-line order

### Options

| Option | Description |
|--------|-------------|
| `--remove-all` | Clear all existing tags before applying new ones |
| `--batch` | Process operations from stdin |
| `--input=<file>` | Read batch operations from file |

### Batch Format

```
+<tag>|-<tag> [...] [--] <query>
```

Rules:
- Spaces delimit elements
- Use `%20` for spaces within tags
- Special chars encoded as `%NN` (hex)
- Lines starting with `#` are comments
- Empty lines ignored

### Examples

```bash
# Add tag to all messages
notmuch tag +newsletter -- from:*@substack.com

# Remove tag
notmuch tag -inbox -- tag:archived

# Multiple operations
notmuch tag +archived -inbox -unread -- date:..2023-01-01

# Tag entire thread
notmuch tag +project-x -- thread:0000000000006bcd
```

---

## notmuch-hooks(5)

Hooks are executable scripts triggered by notmuch commands.

### Hook Location

Stored in `<hook_dir>/` as configured in notmuch config.

Default: `~/.config/notmuch/default/hooks/` or `$NOTMUCH_CONFIG/../hooks/`

### Hook Types

| Hook | Trigger | Use Case |
|------|---------|----------|
| `pre-new` | Before `notmuch new` scans | Fetch/deliver new mail |
| `post-new` | After `notmuch new` completes | Query-based tagging |
| `post-insert` | After `notmuch insert` succeeds | Tagging inserted messages |

### Behavior

- **pre-new**: Non-zero exit halts further processing
- **post-new**: Only runs if scan succeeded
- **post-insert**: Only runs if insertion succeeded

### Example post-new Hook

```bash
#!/bin/bash

# Tag newsletters
notmuch tag +newsletter -inbox -- \
  '(from:*@substack.com or from:*@buttondown.email) and tag:new'

# Tag receipts
notmuch tag +receipt -- \
  '(subject:receipt or subject:invoice) and tag:new'

# Tag school emails
notmuch tag +school -- \
  'from:*@sainteanne.ca and tag:new'

# Clear the new tag
notmuch tag -new -- tag:new
```

---

## notmuch-search-terms(7)

Query syntax for searching messages.

> **Quick reference:** See `reference/search-syntax.md` for an operational summary of prefixes, operators, dates, and thread queries.

The following covers man-page-specific details not in the quick reference.

### Quoting

- Double quotes protect spaces: `subject:"meeting notes"`
- Escape quotes by doubling: `tag:"""quoted tag"""`
- Regex requires quotes: `from:"/.*@example\.com/"`

### Stemming

Xapian reduces words to stems. `search`, `searches`, `searching` match same results.

Disable with:
- Capitalization: `Search`
- Phrase quotes: `"search"`

### Wildcards

Trailing `*` for prefix matching:
```
subject:meet*     # meeting, meetings, meet
from:alice*       # alice, alice.smith
```

---

## notmuch-config(1)

Get and set configuration values.

### Synopsis

```
notmuch config get <key>
notmuch config set <key> [value...]
notmuch config list
```

### Key Configuration Items

#### Database

| Key | Description | Default |
|-----|-------------|---------|
| `database.path` | Database location | `$MAILDIR` or `~/mail` |
| `database.mail_root` | Mail directory root | Same as database.path |
| `database.hook_dir` | Hooks directory | `<database.path>/.notmuch/hooks` |
| `database.autocommit` | Commit frequency | 8000 |
| `database.backup_dir` | Backup location for upgrades | |

#### User

| Key | Description |
|-----|-------------|
| `user.name` | Your full name |
| `user.primary_email` | Primary email address |
| `user.other_email` | Additional email addresses (list) |

#### Indexing

| Key | Description |
|-----|-------------|
| `index.decrypt` | Encryption policy: `false`, `auto`, `nostash`, `true` |
| `index.as_text` | MIME types to index as text (regex list) |
| `index.header.<prefix>` | Custom query prefix from header |

#### Search

| Key | Description | Default |
|-----|-------------|---------|
| `search.exclude_tags` | Tags excluded from search | |
| `search.authors_separator` | Author separator | `, ` |
| `search.authors_matched_separator` | Matched/unmatched separator | `\| ` |

#### New Messages

| Key | Description | Default |
|-----|-------------|---------|
| `new.tags` | Tags for new messages | `unread;inbox` |
| `new.ignore` | Files/dirs to ignore | |

#### Maildir

| Key | Description | Default |
|-----|-------------|---------|
| `maildir.synchronize_flags` | Sync maildir flags with tags | `true` |

#### Saved Queries

| Key | Description |
|-----|-------------|
| `query.<name>` | Named query expansion |
| `squery.<name>` | S-expression query |

### Examples

```bash
# Get database path
notmuch config get database.path

# Set user info
notmuch config set user.name "Jason Kuhrt"
notmuch config set user.primary_email "jasonkuhrt@me.com"

# Set new message tags
notmuch config set new.tags "unread;inbox;new"

# Add files to ignore
notmuch config set new.ignore ".mbsyncstate" ".DS_Store"

# Enable maildir sync
notmuch config set maildir.synchronize_flags true

# List all config
notmuch config list
```

---

## Sources

- https://notmuchmail.org/doc/latest/man1/notmuch-search.html
- https://notmuchmail.org/doc/latest/man1/notmuch-show.html
- https://notmuchmail.org/doc/latest/man1/notmuch-tag.html
- https://notmuchmail.org/doc/latest/man1/notmuch-config.html
- https://notmuchmail.org/doc/latest/man5/notmuch-hooks.html
- https://notmuchmail.org/doc/latest/man7/notmuch-search-terms.html
