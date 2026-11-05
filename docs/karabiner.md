# Keyboard settings without Karabiner

The two retained keyboard behaviors use their native owners:

| Behavior | Setting |
| --- | --- |
| Caps Lock acts as Control | macOS System Settings → Keyboard → Keyboard Shortcuts → Modifier Keys → Caps Lock → Control |
| Ctrl+J/K moves down/up in Raycast lists | Raycast Settings → Keyboard → Navigation Bindings → Vim Motions |

The Caps Lock setting belongs to the selected physical keyboard. Select each
keyboard that should use the remap.

Fn/Globe does nothing on its own, and F1–F12 are standard function keys. These
remain macOS defaults managed by `scripts/setup/after/08-macos-defaults.sh`.
Sticky Fn is no longer used.

## Retained configuration

`home/.config/karabiner/karabiner.json` remains as a rollback copy, deployed at
`~/.config/karabiner/karabiner.json`. It has no effect while Karabiner is stopped.
It contains the former Caps Lock and Raycast mappings plus a disabled sticky Fn
rule. Launching Karabiner again would reactivate its enabled mappings.

The Brewfile no longer installs Karabiner. Setup does not launch it, and the
Karabiner health, reload, log, and rule-check recipes have been removed.
