#!/bin/bash
# Get transcript from a public Loom video URL
# Usage: ./get-transcript.sh https://www.loom.com/share/VIDEO_ID

set -euo pipefail

LOOM_URL="${1:-}"

if [[ -z "$LOOM_URL" ]]; then
  echo "Usage: $0 <loom-url>" >&2
  exit 1
fi

# Extract video ID from URL
VIDEO_ID=$(echo "$LOOM_URL" | grep -oE '[a-f0-9]{32}')

if [[ -z "$VIDEO_ID" ]]; then
  echo "Error: Could not extract video ID from URL" >&2
  exit 1
fi

# Fetch page and extract signed transcript URL
TRANSCRIPT_URL=$(curl -s "$LOOM_URL" | grep -oE 'https://cdn\.loom\.com/mediametadata/transcription/[^"]*')

if [[ -z "$TRANSCRIPT_URL" ]]; then
  echo "Error: Could not find transcript URL (video may be private or have no transcript)" >&2
  exit 1
fi

# Fetch transcript and extract text
curl -s "$TRANSCRIPT_URL" | jq -r '.phrases[].value' 2>/dev/null

if [[ ${PIPESTATUS[1]} -ne 0 ]]; then
  echo "Error: Could not parse transcript JSON" >&2
  exit 1
fi
