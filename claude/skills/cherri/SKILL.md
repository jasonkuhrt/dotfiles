---
name: cherri
description: Use when writing Apple Shortcuts as code using Cherri language.
---

# Cherri - Apple Shortcuts Programming Language

Cherri compiles to `.shortcut` files for iOS/macOS. Store `.cherri` files in dotfiles for version-controlled Shortcuts.

REQUIRED SUB-SKILL: apple-shortcuts -- for discovering actions (ToolKit database), persistent config (JSON in iCloud), and extension app installation.

## Installation

```bash
brew tap electrikmilk/cherri
brew install electrikmilk/cherri/cherri
```

## Compilation

```bash
cherri file.cherri              # Compile + sign via macOS/AppleID
cherri file.cherri --hubsign    # Sign via RoutineHub (fallback)
cherri file.cherri --skip-sign  # Unsigned (won't import on macOS)
cherri file.cherri --debug      # Debug output
```

Output: `Shortcut Name.shortcut` (name from `#define name` or filename)

**Note:** macOS requires signed shortcuts. Use `--skip-sign` only for syntax checks.

## Syntax Reference

See `reference/syntax.md` for the full syntax reference (defines, variables, actions, control flow, menus, lists, custom actions, includes).

## Common Patterns

### Hello World

```cherri
#define name Hello World
#define color green
#define glyph star

alert("Hello World!", "Greeting")
```

### User Input Flow

```cherri
#define name Greeter

@name = prompt("What's your name?")
@age = askNumber("What's your age?")
alert("Hello {name}, you are {age} years old!", "Welcome")
```

### Menu-Driven Shortcut

```cherri
#define name Color Picker
#define color blue
#define glyph paintbrush

menu "Pick a color:" {
    item "Red":
        @color = "red"
    item "Green":
        @color = "green"
    item "Blue":
        @color = "blue"
}

alert("You picked: {color}", "Result")
```

## Common Mistakes

| Wrong | Correct | Why |
|-------|---------|-----|
| `alert(title, message)` | `alert(message, title)` | Message first, title second |
| `var = value` | `@var = value` | Variables need `@` prefix |
| `askText("prompt")` | `prompt("prompt")` | Action is `prompt`, not `askText` |
| `menu { item "X" { ... } }` | `menu { item "X": ... }` | Colon after item, not braces |

## CLI Reference

```bash
cherri --help                     # All options
cherri --action=alert             # Search action definitions
cherri --glyph=star               # Search glyphs
cherri --docs=scripting           # Action documentation by category
```

## Extension Apps

See `reference/extension-apps.md` for rawAction() patterns for installed apps (Toolbox Pro, Menu Box, FocusCuts, Logger, Actions, Charty).

## SF Symbols

See `reference/sf-symbols.md` for Apple's icon library naming conventions and common symbols.

## Development Workflow

Use the `shortcuts-dev` fish function for quick iteration:

```bash
shortcuts-dev compile myshortcut.cherri  # Compile and sign
shortcuts-dev run myshortcut.cherri      # Compile, sign, and open
shortcuts-dev check myshortcut.cherri    # Syntax check only (fast)

shortcuts-dev params GlobalVariablesIntent  # Discover action params
shortcuts-dev actions toolbox               # List app's actions
shortcuts-dev vendors                       # List all apps

shortcuts-dev examples                      # List example templates
```

**Example templates** in `shortcuts/examples/`:
- `menu-driven.cherri` - Menu Box with SF Symbols
- `focus-aware.cherri` - FocusCuts conditional logic
- `with-logging.cherri` - Logger debugging workflow

## Resources

- **Docs:** https://cherrilang.org/language/
- **Playground:** https://playground.cherrilang.org/
- **GitHub:** https://github.com/electrikmilk/cherri
- **Glyph Search:** https://glyphs.cherrilang.org/
- **Zed Extension:** https://github.com/videah/zed-cherri
