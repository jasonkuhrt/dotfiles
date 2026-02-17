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
- tmux (git info in status bar) -> minimal prompt
- SSH sessions -> show hostname
- Work vs personal -> different themes

## Quick Reference

| Task | Command |
|------|---------|
| Test config | `starship print-config` |
| Explain module | `starship explain git_status` |
| Time prompt | `starship timings` |
| List presets | `starship preset --list` |
| Apply preset | `starship preset bracketed-segments -o ~/.config/starship.toml` |

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

Current: **Tokyo Night** (colors defined in config files).

## Files

| File | Purpose |
|------|---------|
| `starship/starship.toml` | Full config (outside tmux) |
| `starship/starship-tmux.toml` | Minimal config (in tmux) |

## Reference

- `reference/modules.md` -- module detection, disabling, conditional formats, custom modules
- `reference/styling.md` -- style strings, colors, modifiers, prompt format, Tokyo Night palette
