---
name: karabiner
description: Manage Karabiner-Elements remaps on macOS. Use when users ask to map or unmap keys (Caps Lock, Fn/Globe, Hyper), when remaps stop applying, when Karabiner service or permission health needs diagnosis, or when Karabiner config should be synced through dotfiles/chezmoi.
---

# Karabiner Management

## Resolve Paths First

```bash
LIVE_CONFIG="$HOME/.config/karabiner/karabiner.json"
SOURCE_CONFIG="$(chezmoi source-path "$LIVE_CONFIG" 2>/dev/null || true)"
```

- Prefer editing `SOURCE_CONFIG` when it exists.
- Apply into `LIVE_CONFIG` with chezmoi after edits.

## Baseline Diagnostics

```bash
karabiner_cli --show-current-profile-name
karabiner_cli --list-connected-devices
jq '.profiles[] | select(.selected==true) | {name, simple_modifications, complex_modifications}' "$LIVE_CONFIG"
```

If `karabiner_cli` reports `core_service_client connect_failed`:

```bash
open -ga "Karabiner-Elements"
sleep 1
karabiner_cli --show-current-profile-name
```

## Add or Replace Simple Mapping

Upsert a mapping in the selected profile:

```bash
FILE="${SOURCE_CONFIG:-$LIVE_CONFIG}"
FROM_KEY="caps_lock"
TO_KEY="left_control"
TMP="$(mktemp)"

jq --arg from "$FROM_KEY" --arg to "$TO_KEY" '
  (.profiles[] | select(.selected == true) | .simple_modifications) |=
    ((. // [])
    | map(select((.from.key_code? // "") != $from))
    + [{"from":{"key_code":$from},"to":[{"key_code":$to}]}])
' "$FILE" > "$TMP" && mv "$TMP" "$FILE"
```

Apply and reload:

```bash
if [ -n "${SOURCE_CONFIG:-}" ]; then
  chezmoi apply "$LIVE_CONFIG"
fi
karabiner_cli --select-profile "$(karabiner_cli --show-current-profile-name)"
```

## Remove Simple Mapping

```bash
FILE="${SOURCE_CONFIG:-$LIVE_CONFIG}"
FROM_KEY="caps_lock"
TMP="$(mktemp)"

jq --arg from "$FROM_KEY" '
  (.profiles[] | select(.selected == true) | .simple_modifications) |=
    ((. // []) | map(select((.from.key_code? // "") != $from)))
' "$FILE" > "$TMP" && mv "$TMP" "$FILE"

if [ -n "${SOURCE_CONFIG:-}" ]; then
  chezmoi apply "$LIVE_CONFIG"
fi
karabiner_cli --select-profile "$(karabiner_cli --show-current-profile-name)"
```

## Verify Outcome

```bash
jq '.profiles[] | select(.selected==true) | .simple_modifications' "$LIVE_CONFIG"
karabiner_cli --list-connected-devices | rg -n "is_keyboard|product|manufacturer"
```

## Guardrails

- Keep one source of truth. Do not diverge `SOURCE_CONFIG` and `LIVE_CONFIG`.
- Avoid stacking equivalent macOS modifier remaps and Karabiner remaps unless explicitly requested.
- Preserve unrelated existing mappings and profile settings.
