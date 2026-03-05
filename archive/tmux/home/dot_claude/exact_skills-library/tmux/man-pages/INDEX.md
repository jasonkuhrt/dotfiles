# tmux Man Pages

Split from `man tmux` for easier searching. Refresh with `../man-pages-refresh.sh`.

## Structure

```
1-concepts/     → "How does tmux work?"
2-config/       → "How do I set things up?"
3-commands/     → "How do I do X?"
4-syntax/       → "What's the syntax for X?"
5-internals/    → Deep dives (rarely needed)
```

## 1-concepts/

Start here to understand tmux. Read in order.

| File | Content |
|------|---------|
| `1-overview.txt` | What tmux is, CLI flags, architecture |
| `2-parsing.txt` | Command syntax, quoting rules |
| `3-examples.txt` | Copy-paste recipes |

## 2-config/

How to set things up.

| File | Content |
|------|---------|
| `options.txt` | All `set` options (big file - search it) |
| `keybindings.txt` | `bind` command syntax |
| `default-keybindings.txt` | What `prefix X` does out of the box |
| `styles.txt` | Colors, attributes |
| `hooks.txt` | Event hooks |
| `mouse.txt` | Mouse bindings |

## 3-commands/

How to do things. Start with intro, then pick what you need.

| File | Content |
|------|---------|
| `1-commands.txt` | Command structure intro |
| `clients-sessions.txt` | Session/client management |
| `windows-panes.txt` | Window/pane commands (big file) |
| `buffers.txt` | Paste buffers |
| `status-line.txt` | Status bar configuration |

## 4-syntax/

Lookup tables.

| File | Content |
|------|---------|
| `formats.txt` | All `#{...}` variables (big file) |
| `names-titles.txt` | Window/pane naming rules |

## 5-internals/

Deep dives - rarely needed.

| File | Content |
|------|---------|
| `control-mode.txt` | Programmatic control |
| `terminfo.txt` | Terminal capability tweaks |
| `environment.txt` | tmux's own env vars |
| `session-environment.txt` | Env var inheritance |
| `misc.txt` | lock, wait, run-shell |
| `exit-messages.txt` | Exit codes |
| `files.txt` | Config file paths |
| `meta.txt` | See also, authors |

## Search Tips

```sh
# Find an option
grep -ri "mouse" 2-config/

# Find a command
grep -rl "split-window" 3-commands/

# Find a format variable
grep "#{" 4-syntax/formats.txt | grep -i pane

# Find anything
grep -ri "escape" .
```
