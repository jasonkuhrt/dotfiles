---
description: Open current session in new Ghostty window
---

# Ghostty

Open a new Ghostty terminal window continuing this Claude Code session.

## Steps

1. Extract the session ID from the SessionStart hook context (look for "Resume this session: claude --resume <uuid>")
2. Run: `ghostty -e claude --resume <session-id>`

The new window will connect to this same session, allowing you to continue work there.
