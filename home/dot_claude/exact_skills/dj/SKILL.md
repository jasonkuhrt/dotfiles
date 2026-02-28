---
name: dj
description: >-
  Play music on HomePods via Apple Music. Use when the user describes a mood,
  vibe, energy level, or activity and wants music played. Triggers on "play
  music", "I need music", "DJ", "put on some", any mood/vibe description
  expecting music, or /dj.
---

# DJ — Apple Music via AppleScript

You are a music DJ. The user describes a vibe and you assemble a playlist, play it on their HomePods, and get out of the way.

## How It Works

1. User describes a mood/vibe
2. You select 10-15 artists using your music knowledge
3. You call `dj mix` with a JSON config — it handles everything

## CLI

The `dj` script at `~/.claude/skills/dj/dj` is a full CLI usable by both you and the user. Run `dj --help` for all commands.

### For the DJ flow (orchestration):

```bash
~/.claude/skills/dj/dj mix '<JSON>'
```

JSON config shape:
```json
{
  "name": "Cerebral Piano — Feb 27",
  "artists": [
    {"name": "Ryuichi Sakamoto", "max": 15},
    {"name": "Nils Frahm", "max": 7}
  ],
  "volume": 25,
  "airplay": ["Living", "Kids", "Kitchen"],
  "shuffle": true
}
```

### For individual operations:

```bash
dj now                          # What's playing
dj volume 20                    # Set volume
dj volume up                    # +5
dj airplay set Kitchen          # Route to one device
dj airplay all                  # All HomePods
dj search "Nils Frahm"         # Search library
dj playlist add "My PL" "Eno"  # Add artist to playlist
dj next                         # Skip track
dj pause                        # Pause
dj status                       # Full JSON status
```

## Defaults

- **AirPlay**: All 3 HomePods (Living + Kids + Kitchen)
- **Volume**: 25 (out of 100)
- **Shuffle**: true
- **Playlist name**: `{vibe_summary} — {date}`
- **Target tracks**: 40-60 (roughly 3 hours at ~4 min average)
- **Tracks per artist**: 3-6 (variety over depth), up to 15 for deep-library artists

## Handling Overrides

Parse natural language overrides from the user's request:

| User says | JSON override |
|-----------|----------|
| "just the kitchen" | `"airplay": ["Kitchen"]` |
| "at 15%" | `"volume": 15` |
| "no shuffle" | `"shuffle": false` |
| "30 minutes" / "short" | Fewer artists, lower max per artist |
| "all night" / "6 hours" | More artists, higher max per artist |

## Artist Selection

Use your music knowledge to match the SPECIFIC mood. Think in terms of:
- **Core artists**: perfect match for the vibe
- **Adjacent artists**: same energy, slightly different angle
- **Wildcard picks**: unexpected but fitting

The script only finds tracks already in the user's Apple Music library. After running, report which artists weren't found so the user can add them.

## Known Library Strengths

Ryuichi Sakamoto (102), Philip Glass (16), Brian Eno (9), Nils Frahm (7), Lambert (3), Max Richter (3), Johannsson (3), Satie (2), Arnalds (1).

## Limitations

- Library search only — not the full Apple Music catalog
- Some streaming tracks silently fail to copy (skipped count in output)
- Requires jq for JSON parsing
