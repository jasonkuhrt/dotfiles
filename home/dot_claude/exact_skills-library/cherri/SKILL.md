---
name: cherri
description: Use when writing Apple Shortcuts as code using Cherri language.
---

# Cherri - Apple Shortcuts Programming Language

Cherri compiles to `.shortcut` files for iOS/macOS. Store `.cherri` files in dotfiles for version-controlled Shortcuts.

REQUIRED SUB-SKILL: apple-shortcuts — for discovering actions, persistent config, and extension apps.

## Compilation

```bash
scut build file.cherri              # Compile + sign via macOS/AppleID
scut build file.cherri --hubsign    # Sign via RoutineHub (fallback)
scut build file.cherri --skip-sign  # Unsigned (won't import on macOS)
scut run file.cherri                # Compile, sign, and run
```

Override compiler: `SCUT_CHERRI=/path/to/fork scut build file.cherri`

## Action Discovery

```bash
scut search "music library"         # Find actions by keyword
scut params AddMusicToLibrary       # Show parameters + knowledge
scut cherri AddMusicToLibrary       # Generate rawAction() snippet
scut identifier "Global Variables"  # Display name → action ID
scut try <identifier> --param k=v   # Quick-test an action
```

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

### Raw Actions (for third-party / unsupported actions)

```cherri
// Use scut cherri <action> to generate these snippets
rawAction("com.alexhay.ToolboxProForShortcuts.GlobalVariablesIntent", {
    "mode": "set",
    "setVariableKey": "myVariable",
    "setVariableValue": "myValue"
})
```

**Important:** Cherri's `rawAction` crashes with empty `{}`. Always include at least one parameter.

## Common Mistakes

| Wrong | Correct | Why |
|-------|---------|-----|
| `alert(title, message)` | `alert(message, title)` | Message first, title second |
| `var = value` | `@var = value` | Variables need `@` prefix |
| `askText("prompt")` | `prompt("prompt")` | Action is `prompt`, not `askText` |
| `menu { item "X" { ... } }` | `menu { item "X": ... }` | Colon after item, not braces |

## Example Templates

In `shortcuts/examples/`:
- `menu-driven.cherri` — Menu Box with SF Symbols
- `focus-aware.cherri` — FocusCuts conditional logic
- `with-logging.cherri` — Logger debugging workflow

## SF Symbols

See `reference/sf-symbols.md` for Apple's icon library naming conventions.

## Resources

- **Docs:** https://cherrilang.org/language/
- **GitHub:** https://github.com/electrikmilk/cherri
- **Glyph Search:** https://glyphs.cherrilang.org/
