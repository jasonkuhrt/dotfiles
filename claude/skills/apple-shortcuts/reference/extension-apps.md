# Extension Apps

Apps that add actions to Shortcuts:

| App | Platform | Purpose |
|-----|----------|---------|
| **Toolbox Pro** | iOS + Mac (M1+)* | Global variables, OCR, device info |
| **Actions** | iOS + macOS | 180+ extra actions (Sindre Sorhus) |
| **Menu Box** | iOS + macOS | Beautiful menus with SF Symbols, colors, hidden data |
| **Logger** | iOS + macOS | Debug console with log levels, tags, iCloud sync |
| **FocusCuts** | macOS only | Status bar menu for Focus Mode-aware shortcuts |
| **Charty** | iOS + macOS | Generate charts (bar, line, pie, scatter, etc.) |

*Wrapped iOS app -- runs on Apple Silicon via "Designed for iPhone/iPad"

## Installing Extension Apps

```bash
# Native macOS apps (via mas)
mas install 1586435171  # Actions
```

Wrapped iOS apps (Toolbox Pro) require manual App Store install -- `mas` can't install them.

## After Installing New Apps

1. Open Shortcuts app (triggers ToolKit database refresh)
2. Discover actions: `./analyze-shortcuts-actions.fish actions <appname>`
3. Get parameters: `./analyze-shortcuts-actions.fish params <action>`
4. Use in Cherri with `rawAction()` syntax
