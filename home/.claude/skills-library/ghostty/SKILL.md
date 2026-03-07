---
name: ghostty
description: Open the current Claude Code session in a new Ghostty window. Use when the user explicitly asks to continue this session in Ghostty.
disable-model-invocation: true
---

# Ghostty

Open a new Ghostty window that resumes the current Claude Code session.

## Steps

1. Extract the session ID from the SessionStart context. Look for `claude --resume <uuid>`.
2. If no session ID is available, stop and say so clearly.
3. Run:

```bash
ghostty -e claude --resume <session-id>
```

## Notes

- This resumes the same session in a new Ghostty window.
- It does not create a new Claude session.
