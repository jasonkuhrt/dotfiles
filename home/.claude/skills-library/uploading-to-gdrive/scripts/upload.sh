#!/bin/bash
# Upload a file to Google Drive and return a shareable link
# Usage: ./upload.sh <file_path> [folder_id]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"
CREDS_FILE="$SKILL_DIR/credentials/client.json"
TOKENS_FILE="$SKILL_DIR/credentials/tokens.json"

FILE_PATH="$1"
FOLDER_ID="${2:-}"

if [ -z "$FILE_PATH" ]; then
  echo "Error: No file path provided"
  echo "Usage: $0 <file_path> [folder_id]"
  exit 1
fi

if [ ! -f "$FILE_PATH" ]; then
  echo "Error: File not found: $FILE_PATH"
  exit 1
fi

if [ ! -f "$CREDS_FILE" ]; then
  echo "Error: Credentials not found at $CREDS_FILE"
  exit 1
fi

if [ ! -f "$TOKENS_FILE" ]; then
  echo "Error: Tokens not found at $TOKENS_FILE"
  echo "Run the initial setup first - see SKILL.md"
  exit 1
fi

# Read credentials
CLIENT_ID=$(jq -r '.installed.client_id' "$CREDS_FILE")
CLIENT_SECRET=$(jq -r '.installed.client_secret' "$CREDS_FILE")
REFRESH_TOKEN=$(jq -r '.refresh_token' "$TOKENS_FILE")

# Get fresh access token
TOKEN_RESPONSE=$(curl -s -X POST https://oauth2.googleapis.com/token \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "refresh_token=$REFRESH_TOKEN" \
  -d "grant_type=refresh_token")

ACCESS_TOKEN=$(echo "$TOKEN_RESPONSE" | jq -r '.access_token')

if [ "$ACCESS_TOKEN" = "null" ] || [ -z "$ACCESS_TOKEN" ]; then
  echo "Error: Failed to refresh access token"
  echo "$TOKEN_RESPONSE"
  exit 1
fi

# Get file info
FILENAME=$(basename "$FILE_PATH")
MIME_TYPE=$(file --mime-type -b "$FILE_PATH")

# Build metadata
if [ -n "$FOLDER_ID" ]; then
  METADATA="{\"name\": \"$FILENAME\", \"parents\": [\"$FOLDER_ID\"]}"
else
  METADATA="{\"name\": \"$FILENAME\"}"
fi

# Upload file
echo "Uploading: $FILENAME"
UPLOAD_RESPONSE=$(curl -s -X POST \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -F "metadata=$METADATA;type=application/json;charset=UTF-8" \
  -F "file=@$FILE_PATH;type=$MIME_TYPE" \
  "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink")

FILE_ID=$(echo "$UPLOAD_RESPONSE" | jq -r '.id')

if [ "$FILE_ID" = "null" ] || [ -z "$FILE_ID" ]; then
  echo "Error: Upload failed"
  echo "$UPLOAD_RESPONSE"
  exit 1
fi

# Make file shareable (anyone with link can view)
curl -s -X POST \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role": "reader", "type": "anyone"}' \
  "https://www.googleapis.com/drive/v3/files/$FILE_ID/permissions" > /dev/null

# Generate links
VIEW_LINK="https://drive.google.com/file/d/$FILE_ID/view?usp=drivesdk"
EMBED_LINK="https://drive.google.com/thumbnail?id=$FILE_ID&sz=w1000"

echo "Uploaded: $FILENAME"
echo "File ID: $FILE_ID"
echo "View: $VIEW_LINK"
echo "Embed: $EMBED_LINK"
echo ""
echo "Markdown: ![${FILENAME}](${EMBED_LINK})"
