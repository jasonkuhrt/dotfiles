---
name: loom-transcript-get
description: Use when encountering Loom video URLs (loom.com/share/...) in Linear issues, Slack, or documents and needing to read the video content as text
---

# Loom Transcript Get

Extract transcripts from public Loom video URLs.

## Operations

### Get Transcript

```bash
~/.claude/skills/loom-transcript-get/get-transcript.sh "https://www.loom.com/share/VIDEO_ID"
```

Returns plain text transcript, one phrase per line.

## Notes

- Only works with **public** Loom videos that have transcripts enabled
- No MCP server or API key required - uses signed URLs from page data
- Requires `curl` and `jq`
