#!/bin/bash
# Set terminal tab title when /rename is used
# Emits both OSC 0 (Ghostty, iTerm2, xterm) and OSC 2 (Zed) for broad compatibility

input=$(cat)
prompt=$(echo "$input" | grep -o '"prompt":"[^"]*"' | head -1 | sed 's/"prompt":"//;s/"$//')

if [[ "$prompt" == /rename* ]]; then
  name="${prompt#/rename }"
  name="${name# }"
  if [[ -n "$name" ]]; then
    printf '\033]0;%s\007' "$name" > /dev/tty 2>/dev/null
    printf '\033]2;%s\007' "$name" > /dev/tty 2>/dev/null
  fi
fi
