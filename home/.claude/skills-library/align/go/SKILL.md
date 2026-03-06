---
name: align:go
description: Exit alignment mode — resume normal editing. Use when user says /align:go after being in align mode.
disable-model-invocation: true
---

# Align — Go

**Alignment mode is over.** Resume normal editing behavior.

If the user included a message after `/align:go`, treat it as direction for what to do next.

If no message was given, it means "looks good, keep going" — proceed with whatever was previewed during alignment.
