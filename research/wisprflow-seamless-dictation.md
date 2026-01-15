# WisprFlow Seamless Dictation Research

## Goal

- voice → text → auto-submit in Claude Code
- ideal: keypress to start → speak → done (no manual Enter)

## Current Findings

- **Hands-free mode**
  - Mac: `Fn + Space` to start, same hotkey or click stop icon to end
  - Windows: `Ctrl + Win + Space` to start, same hotkey or click stop icon to end
  - **no voice command to stop recording** — must use hotkey or click
- **Voice commands during dictation**
  - "press enter" — inserts Enter keypress
  - "new line", "new paragraph" — formatting
  - "wait" — pause in flow
- **No native auto-enter setting** — WisprFlow doesn't have "auto-submit after dictation ends"

## Gap: No True Hands-Free Stop

- your ideal: keypress to start → speak → magic word to stop → auto-enter
- reality: must press hotkey again or click to stop
- this is a **missing feature** in WisprFlow

## Pro Account Path (Voice Shortcuts)

- **Voice Shortcuts** — set cue word/phrase → triggers action or inserts predefined text
- **Command Mode** — hands-free text editing via natural language (Pro/Teams/Enterprise only)
- **Potential workflow**
  1. create voice shortcut with cue like "send it" or "go"
  2. shortcut triggers Enter keypress
  3. speak message → say cue → auto-submits

### Unknown / Needs Testing

- can voice shortcuts trigger keypresses (Enter) or only insert text?
- is there latency between cue recognition and action?
- does it work reliably in terminal/CLI apps?

## Alternative Approaches

- **macOS Shortcuts/Keyboard Maestro**
  - trigger on WisprFlow paste action
  - auto-send Enter after paste detected
  - fragile — depends on detecting paste event
- **Warp terminal integration**
  - WisprFlow + Warp = voice commands execute instantly
  - but: Claude Code runs in any terminal, not just Warp

## Next Steps

1. test voice shortcut creation in WisprFlow Pro settings
2. see if shortcut can emit Enter keypress
3. if not, explore macOS automation fallback
4. consider feature request to WisprFlow if gap confirmed

## Sources

- https://docs.wisprflow.ai/articles/5658545140-use-flow-hands-free (official hands-free docs)
- https://wisprflow.ai/features
- https://wisprflow.ai/post/supercharge-vibe-coding-automations
- https://docs.wisprflow.ai/articles/6817365244-your-first-dictation-on-desktop
- https://wisprflow.ai/use-cases/warp
- https://roadmap.wisprflow.ai (feature requests)
