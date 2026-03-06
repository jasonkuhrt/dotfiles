# notmuch API & Bindings

## C Library (libnotmuch)

Core functions:
- `notmuch_database_open` / `notmuch_database_create`
- `notmuch_query_create` / `notmuch_query_search_messages`
- `notmuch_message_get_tags` / `notmuch_message_add_tag`

## Python Bindings

```python
# Modern (notmuch2 - CFFI based)
import notmuch2

with notmuch2.Database() as db:
    for msg in db.messages('tag:unread'):
        print(msg.header('Subject'))

# Legacy (deprecated, removed in 0.39)
import notmuch  # Don't use
```

## Other Bindings

- Emacs: Full MUA built-in
- Vim: notmuch-vim plugin
- Go: go-notmuch
- Ruby: notmuch gem
