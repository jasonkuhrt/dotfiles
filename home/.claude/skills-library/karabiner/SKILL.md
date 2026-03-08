---
name: karabiner
description: Manage Karabiner-Elements remaps on macOS. Use when users ask to map or unmap keys (Caps Lock, Fn/Globe, Hyper), when remaps stop applying, when Karabiner service or permission health needs diagnosis, or when Karabiner config should be synced through dotfiles/chezmoi.
---

# Karabiner Management

## Resolve Paths First

```bash
LIVE_CONFIG="$HOME/.config/karabiner/karabiner.json"
SOURCE_CONFIG="$(chezmoi source-path "$LIVE_CONFIG" 2>/dev/null || true)"
EDIT_FILE="${SOURCE_CONFIG:-$LIVE_CONFIG}"
if [ -L "$LIVE_CONFIG" ] && [ -z "${SOURCE_CONFIG:-}" ]; then
  EDIT_FILE="$(readlink "$LIVE_CONFIG")"
fi
```

- In the current symlink-first setup, `karabiner.json` is normally a file-symlink target.
- Normal content edits are live immediately. No `chezmoi apply` is needed for ordinary edits.
- Do not `mv` a temp file onto `LIVE_CONFIG` directly when it is a symlink. Write to `EDIT_FILE` instead.

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
FROM_KEY="caps_lock"
TO_KEY="left_control"
TMP="$(mktemp)"

jq --arg from "$FROM_KEY" --arg to "$TO_KEY" '
  (.profiles[] | select(.selected == true) | .simple_modifications) |=
    ((. // [])
    | map(select((.from.key_code? // "") != $from))
    + [{"from":{"key_code":$from},"to":[{"key_code":$to}]}])
' "$EDIT_FILE" > "$TMP" && mv "$TMP" "$EDIT_FILE"
```

Reload:

```bash
karabiner_cli --select-profile "$(karabiner_cli --show-current-profile-name)"
```

## Remove Simple Mapping

```bash
FROM_KEY="caps_lock"
TMP="$(mktemp)"

jq --arg from "$FROM_KEY" '
  (.profiles[] | select(.selected == true) | .simple_modifications) |=
    ((. // []) | map(select((.from.key_code? // "") != $from)))
' "$EDIT_FILE" > "$TMP" && mv "$TMP" "$EDIT_FILE"

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
- If a tool has already replaced the live symlink with a regular file, run `just up` after deciding whether to keep that drift.
