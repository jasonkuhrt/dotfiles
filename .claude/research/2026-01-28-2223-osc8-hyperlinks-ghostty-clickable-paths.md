# OSC 8 Hyperlinks & Ghostty Clickable File Paths

## Two Models of Clickable Paths in Terminals

- **Terminal-side detection** (iTerm2, Zed terminal pane)
  - Terminal scans visible text for file path patterns, makes them clickable
  - Easy for users; terminal has to guess
- **Application-side tagging** (OSC 8 escape sequences)
  - Program producing output explicitly wraps text in hyperlink escape sequences
  - More reliable; requires each tool to opt in
  - Ghostty favors this approach

## Ghostty (1.2.3) — Current State

- **`link-url`** (default: on) — detects `http://` / `https://` URLs only
- **OSC 8 hyperlinks** — fully supported; anything a program explicitly tags as a link
- **`link`** config option — custom regex patterns for clickable text
  - **Documented but not implemented** — docs say "TODO: This can't currently be set!"
  - Would enable terminal-side file path detection without per-program OSC 8 tags
  - Tracking: [ghostty-org/ghostty#1972](https://github.com/ghostty-org/ghostty/issues/1972), [ghostty-org/ghostty#d4379](https://github.com/ghostty-org/ghostty/discussions/4379)
- **`link-previews`** — controls preview display; accepts `true`, `false`, `"osc8"`

## Claude Code — OSC 8 Support

- **Added in v2.1.2** — emits OSC 8 hyperlinks for file paths in tool output
  - [Changelog announcement](https://x.com/ClaudeCodeLog/status/2009418137729401341)
  - [Feature request: anthropics/claude-code#13008](https://github.com/anthropics/claude-code/issues/13008)
- **Scope**: only tool output (dimmer text showing files read/written) is hyperlinked
  - Prose response text (rendered markdown) is NOT tagged with OSC 8
- **Works in Ghostty** — confirmed cmd-click opens file paths from CC tool output

## Tools with Native OSC 8 Support

- **ripgrep** — `--hyperlink-format=file` (set in `~/.ripgreprc`)
- **eza/ls** — hyperlink flags available
- **fd, bat** — also support OSC 8 natively

## add-osc-8-hyperlink

- [github.com/sentriz/add-osc-8-hyperlink](https://github.com/sentriz/add-osc-8-hyperlink)
- Pipe any command output through it to inject OSC 8 sequences for detected file paths
- Use case: wrap commands that produce file paths but don't emit OSC 8 natively
  ```zsh
  alias tsc='npx tsc --noEmit 2>&1 | add-osc-8-hyperlink'
  alias gst='git -c color.status=always status | add-osc-8-hyperlink'
  ```

## OSC 8 Escape Sequence Format

```
\033]8;;<URI>\033\\<display text>\033]8;;\033\\
```

- Display text can be anything (doesn't need to look like a URL)
- URI is typically `file:///absolute/path`

---
Source: claude -r 800e522a-e1f3-4a8a-ac45-0aa0adeeb015
