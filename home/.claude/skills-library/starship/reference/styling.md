# Starship Styling Reference

## Style Strings

Style strings are space-separated words:

```toml
style = 'bold fg:#7aa2f7 bg:black'
```

| Element | Options |
|---------|---------|
| Colors | `red`, `#ff0000`, `0-255` |
| Modifiers | `bold`, `italic`, `underline`, `dimmed`, `inverted`, `blink` |
| Reset | `none` |
| Foreground | `fg:color` |
| Background | `bg:color` |

## Prompt Format

The `format` key controls module order:

```toml
format = """
$directory\
$git_branch\
$git_status\
$character"""
```

- `\` continues to next line (no newline in output)
- `$module_name` inserts module
- Literal text appears as-is

## Tokyo Night Palette

```toml
# blue: #7aa2f7    cyan: #7dcfff    green: #9ece6a
# magenta: #bb9af7 red: #f7768e     yellow: #e0af68
```
