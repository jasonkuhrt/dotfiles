# Programmatic macOS Shortcuts

Research into controlling Apple Shortcuts without the GUI.

## The Problem

Apple Shortcuts is powerful but:
- GUI is slow and clicky
- No version control (stored in SQLite + iCloud)
- No CLI for creating/editing shortcuts
- Actions stored as binary plist blobs

## What Claude Code Can Do

| Action | Possible? | Method |
|--------|-----------|--------|
| List shortcuts | ✅ | `shortcuts list` |
| Run shortcuts | ✅ | `shortcuts run "Name"` |
| Run with input | ✅ | URL scheme (see below) |
| Read structure | ⚠️ | Extract blob from SQLite, decode plist |
| Edit shortcuts | ❌ | Binary format, signed, iCloud conflicts |
| Create shortcuts | ❌ | No API (but see Cherri below) |

## Approaches

### 1. URL Schemes (Running Existing Shortcuts)

Trigger shortcuts from CLI or other apps:

```
shortcuts://run-shortcut?name=[name]&input=[input]&text=[text]
```

Parameters:
- `name`: Shortcut name to run
- `input`: Optional - `text` or `clipboard`
- `text`: Actual string to pass as input

Usage from CLI:
```bash
open "shortcuts://run-shortcut?name=My%20Shortcut&input=text&text=Hello"
```

### 2. JavaScript in Shortcuts (Limited)

Shortcuts has "Run JavaScript on Webpage" action:
- Only works in Safari on current page
- Can manipulate DOM, extract data
- Not for general system automation

### 3. Cherri - Shortcuts Programming Language ✨

**The solution for version-controlled shortcuts.**

- **Repo:** https://github.com/electrikmilk/cherri
- **Stars:** 423 (as of Jan 2025)
- **Language:** Go
- **Updated:** Actively maintained

#### Installation

```bash
# Via Homebrew (recommended)
brew tap electrikmilk/cherri
brew install electrikmilk/cherri/cherri

# Or via Nix
nix profile install github:electrikmilk/cherri

# Or build from source
git clone https://github.com/electrikmilk/cherri
cd cherri
go build
```

#### Editor Support

- **VSCode:** [Cherri Extension](https://marketplace.visualstudio.com/items?itemName=electrikmilk.cherri-vscode-extension)
- **Zed:** [zed-cherri](https://github.com/videah/zed-cherri) - add `"cherri": true` to `auto_install_extensions`

#### Syntax

Variables and alerts:
```cherri
@name = prompt("What's your name?")
alert("Hello, {name}!", "Greeting")
```

Menus:
```cherri
menu "Choose:" {
    item "Option 1":
        alert("You chose 1")
    item "Option 2":
        alert("You chose 2")
}
```

Loops:
```cherri
repeat 3 {
    alert("Count: {RepeatIndex}")
}
```

#### Compilation

```bash
./cherri my_shortcut.cherri --skip-sign
```

The `--skip-sign` flag skips cryptographic signing for faster dev builds.

#### Benefits

- Text-based → git version control ✅
- Proper syntax highlighting
- Variables, control flow, code reuse
- Can live in dotfiles
- Claude Code can generate/modify

### 4. Other Tools

- **ScPL:** Older DSL that generates shortcut XML
- **Hammerspoon:** Lua-based macOS automation (alternative to Shortcuts entirely)
- **AppleScript/JXA:** Native text-based scripting

## Storage Details

```
Location: ~/Library/Shortcuts/Shortcuts.sqlite
Tables:   ZSHORTCUT (metadata), ZSHORTCUTACTIONS (binary plist blobs)
Sync:     iCloud (conflicts if modified directly)
```

## Recommendation

For dotfile-driven, version-controlled shortcuts:

1. **Use Cherri** for creating shortcuts as code
2. **Use URL schemes** or `shortcuts run` for triggering
3. **Store `.cherri` files in dotfiles**
4. **Compile on each machine** during dotfiles setup

## Third-Party Action Packs

Apps that extend Shortcuts with additional actions.

### Recommended Stack

| App | Price | Platform | Purpose | App Store ID |
|-----|-------|----------|---------|--------------|
| **[Toolbox Pro](https://toolboxpro.app)** | ~$6 | iOS + Mac (M1+)* | Global variables, menus, OCR, ML | `1476205977` |
| **[Actions](https://sindresorhus.com/actions)** | Free | iOS + macOS | 180+ extra actions | `1586435171` |
| **[Data Jar](https://datajar.app)** | Free | iOS + macOS | Persistent key-value storage | `1453273600` |
| **[Scriptable](https://scriptable.app)** | Free | iOS | JavaScript automation, widgets | `1405459188` |
| **[Logger](https://shortcutslogger.dev)** | $9.99 | iOS + macOS | Debug console for Shortcuts | `1611554653` |
| **[Menu Box](https://menubox.app)** | Paid | iOS | Beautiful custom menus with icons | - |
| **[FocusCuts](https://focuscuts.com)** | Paid | macOS | Shortcuts per Focus Mode in menu bar | - |
| **[Pushcut](https://www.pushcut.io)** | Sub | iOS | Background triggers, automation server | `1450936447` |

### Key Features by App

**Toolbox Pro:**
- Global Variables - Persist data between shortcuts AND devices (iCloud sync)
- Menu creator for complex UIs
- OCR, document scanner, ML image recognition
- Device info (orientation, dark mode, audio status)
- *Maintained by Snailed It after original dev Alex Hay passed away*

**Actions (Sindre Sorhus):**
- File icon get/set (macOS)
- Color picker
- URL shortcut file creation
- Cross-platform (iOS/macOS/visionOS)
- Actively maintained, regularly updated

**Data Jar:**
- Key-value store with iCloud sync
- Supports text, numbers, booleans, lists, dictionaries, files
- Files stored in iCloud Drive (accessible from Files app)
- Free with tip jar

**Scriptable:**
- Full JavaScript IDE on iOS
- Bridges to native iOS APIs (files, calendars, reminders, contacts, photos)
- Create Home Screen widgets
- Run scripts from Siri Shortcuts
- Pass values back to Shortcuts via `Script.setShortcutOutput()`

**Logger:**
- Real-time console for debugging Shortcuts
- Log levels: info, success, warning, error
- Filter by device, tag, date, category
- Auto-formats dictionaries and JSON
- Embed images in logs
- Export to plain text or markdown
- CGP Grey: "one of the most critical apps" on their system

**Menu Box:**
- Beautiful custom menus beyond native Shortcuts
- Icon options: emojis, SF Symbols, app icons, custom images
- Attach custom data to menu items
- Full programmatic creation via Shortcuts
- Enhanced Action Button support

**FocusCuts:** *(Snailed It - same dev as Logger, Toolbox Pro maintainer)*
- Menu bar app showing shortcuts per Focus Mode
- Different shortcuts for Work vs Personal vs custom modes
- Actions to detect/manage Focus Modes
- Auto-discover shortcuts from folders
- macOS Monterey+ only

**Pushcut:**
- Run Shortcuts 100% in background
- Triggers: location, iBeacon, schedule, webhooks
- Requires dedicated iOS device as "Automation Server"
- Integrates with IFTTT, Zapier, HomeKit

### Installation

**macOS (via mas CLI):**
```bash
mas install 1586435171  # Actions
mas install 1453273600  # Data Jar
mas install 1611554653  # Logger
```

**Wrapped iOS apps (manual install):**

These run on Mac via Apple Silicon's "Designed for iPhone/iPad" but can't be installed via `mas`:
- Toolbox Pro (`1476205977`) - Manual App Store install required
- Scriptable - iOS only
- Pushcut - iOS only

*Note: Wrapped iOS apps appear in `/Applications` with a `WrappedBundle` structure pointing to the iOS `.app`*

### Using Third-Party Actions in Cherri

For actions from these apps, check if Cherri has built-in support first.
Otherwise, use raw action syntax with the action identifier from `analyze-shortcuts-actions.fish`.

## Sources

- [Cherri Blog Post](https://blog.laurentcharignon.com/post/2025-12-14-cherri-programming-apple-shortcuts/)
- [Cherri GitHub](https://github.com/electrikmilk/cherri)
- [Apple URL Scheme Docs](https://support.apple.com/guide/shortcuts/run-a-shortcut-from-a-url-apd624386f42/ios)
- [Toolbox Pro - MacStories Review](https://www.macstories.net/reviews/toolbox-pro-review-a-must-have-companion-utility-for-shortcuts-power-users/)
- [Actions - Sindre Sorhus](https://sindresorhus.com/actions)
- [Data Jar](https://datajar.app)
- [Scriptable](https://scriptable.app)
- [Logger](https://shortcutslogger.dev)
- [Menu Box](https://menubox.app)
- [FocusCuts](https://focuscuts.com)
- [Pushcut](https://www.pushcut.io)
