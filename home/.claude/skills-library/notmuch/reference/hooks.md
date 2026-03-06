# notmuch Hooks

notmuch supports hooks for automation:

```
~/.config/notmuch/default/hooks/
├── pre-new      # Before indexing
└── post-new     # After indexing
```

Example post-new hook:
```bash
#!/bin/bash
# Auto-tag based on rules
notmuch tag +newsletter -- from:*@substack.com and tag:new
notmuch tag -new -- tag:new
```
