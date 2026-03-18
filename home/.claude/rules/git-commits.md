# Git Commits

Include the agent session ID as a `Session-Id` trailer in every commit message.

Format:
```
<commit message>

Session-Id: <session-id>
```

The session ID is visible in `SessionStart:resume` hook output or the conversation's resume URL (`claude --resume <id>`).
