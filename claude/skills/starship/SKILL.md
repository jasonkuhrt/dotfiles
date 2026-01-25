---
name: starship
description: Use when configuring Starship prompt - modules, styling, context-specific configs, or troubleshooting prompt issues
---

# Starship Prompt

Cross-shell prompt with modules for git, languages, cloud, and more.

> **Docs:** https://starship.rs/config/
> **Presets:** https://starship.rs/presets/

## Config Location

| Path | Purpose |
|------|---------|
| `~/.config/starship.toml` | Default config |
| `~/.config/starship-tmux.toml` | Minimal config for tmux sessions |
| `STARSHIP_CONFIG` env var | Override config path |

## Context-Specific Configs

**Current setup:** Fish detects tmux and switches config:

```fish
# In config.fish
if set -q TMUX
    set -gx STARSHIP_CONFIG ~/.config/starship-tmux.toml
end
starship init fish | source
```

**When to use multiple configs:**
- tmux (git info in status bar) → minimal prompt
- SSH sessions → show hostname
- Work vs personal → different themes

## Module System

### Disabling Modules

```toml
[nodejs]
disabled = true
```

### Module Detection

Modules auto-activate based on context:

| Option | Example |
|--------|---------|
| `detect_extensions` | `['js', 'ts']` |
| `detect_files` | `['package.json']` |
| `detect_folders` | `['node_modules']` |
| `detect_env_vars` | `['NODE_ENV']` |

Prefix with `!` for negative matching: `['!VIRTUAL_ENV']`

### Conditional Format Strings

Parentheses make content conditional:

```toml
format = '(@$region)'  # Shows nothing if $region is empty
```

## Styling

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

## Quick Reference

| Task | Command |
|------|---------|
| Test config | `starship print-config` |
| Explain module | `starship explain git_status` |
| Time prompt | `starship timings` |
| List presets | `starship preset --list` |
| Apply preset | `starship preset bracketed-segments -o ~/.config/starship.toml` |

## Custom Modules

For arbitrary commands in prompt:

```toml
[custom.my_module]
command = 'echo hello'
when = 'test -f .my-marker'  # Only show when condition passes
shell = ['bash', '--noprofile', '--norc']
format = '[$output]($style) '
style = 'green bold'
```

## TransientPrompt (Fish)

Replaces previous prompts with minimal version (cleaner scrollback):

```fish
# In config.fish after starship init
enable_transience

# Optional: customize transient prompt
function starship_transient_prompt_func
    starship module character
end
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Slow prompt | Run `starship timings` to find slow modules |
| Module not showing | Check `detect_*` conditions, run `starship explain module_name` |
| Colors wrong | Verify terminal supports true color: `echo $TERM` |
| Changes not applying | Config is read on shell start; open new terminal |

## Theme

Current: **Tokyo Night**

```toml
# Palette reference
# blue: #7aa2f7    cyan: #7dcfff    green: #9ece6a
# magenta: #bb9af7 red: #f7768e     yellow: #e0af68
```

## Files

| File | Purpose |
|------|---------|
| `starship/starship.toml` | Full config (outside tmux) |
| `starship/starship-tmux.toml` | Minimal config (in tmux) |
