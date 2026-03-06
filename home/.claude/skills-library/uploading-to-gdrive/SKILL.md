---
name: uploading-to-gdrive
description: Use when uploading files to Google Drive, getting shareable Drive links, or sharing screenshots and recordings for embedding in Linear, GitHub, or other services.
---

# Uploading To GDrive

Upload files to Google Drive and get shareable/embeddable links.

```bash
~/.claude/skills/uploading-to-gdrive/scripts/upload.sh <file_path> [folder_id]
```

**Example:**

```bash
~/.claude/skills/uploading-to-gdrive/scripts/upload.sh /path/to/screenshot.png
# Output:
# Uploaded: screenshot.png
# File ID: 1abc...xyz
# View: https://drive.google.com/file/d/1abc...xyz/view?usp=drivesdk
# Embed: https://drive.google.com/thumbnail?id=1abc...xyz&sz=w1000
#
# Markdown: ![screenshot.png](https://drive.google.com/thumbnail?id=1abc...xyz&sz=w1000)
```

## Appendix

Uses OAuth 2.0 via shell scripts (no SDK needed). Lightweight option for low-risk file hosting (screenshots, demo videos).

### How It Works

1. `upload.sh` reads OAuth credentials from `credentials/client.json`
2. Uses refresh token from `credentials/tokens.json` to get access token
3. Uploads file via Google Drive API
4. Sets "anyone with link can view" permission
5. Returns embeddable links

## Credentials

Stored in `~/.claude/skills/uploading-to-gdrive/credentials/`.

- **`client.json`** — OAuth client ID for GCP project [`claude-skill-uploads`](https://console.cloud.google.com/auth/clients/47133061228-90prs84gh95rq5umfei1jtq8rsrob9q5.apps.googleusercontent.com?project=claude-skill-uploads). Identifies the app to Google.
- **`tokens.json`** — User tokens. Scope is [`drive.file`](https://developers.google.com/workspace/drive/api/guides/api-specific-auth) so can only access files the app creates, nothing else in Drive.
