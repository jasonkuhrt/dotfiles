# tmux Man Pages (Local Database)

This skill maintains a local, searchable copy of `man tmux` split into semantic files.

## Location

```
claude/skills/tmux/
├── man-pages/
│   ├── 1-concepts/     → "How does tmux work?"
│   │   ├── 1-overview.txt
│   │   ├── 2-parsing.txt
│   │   └── 3-examples.txt
│   ├── 2-config/       → "How do I set things up?"
│   │   ├── options.txt
│   │   ├── keybindings.txt
│   │   └── ...
│   ├── 3-commands/     → "How do I do X?"
│   │   ├── 1-commands.txt
│   │   ├── windows-panes.txt
│   │   └── ...
│   ├── 4-syntax/       → "What's the syntax for X?"
│   │   └── formats.txt
│   ├── 5-internals/    → Deep dives
│   └── INDEX.md
└── man-pages-refresh.sh
```

## Refreshing

After tmux updates:

```sh
./claude/skills/tmux/man-pages-refresh.sh
```

## Searching

```sh
cd claude/skills/tmux/man-pages

# Find an option
grep -ri "mouse" 2-config/

# Find a command
grep -rl "split-window" 3-commands/

# Find a format variable
grep "#{" 4-syntax/formats.txt | grep -i pane

# Find anything
grep -ri "escape" .
```

## Structure Rationale

**Directory numbers** encode progression: concepts → config → commands

**File numbers** (where present) encode reading order within a directory.

Unnumbered files are peers—pick what you need.

## Why Local Copy?

- **Grep-able**: `grep -ri mouse 2-config/` vs scrolling 4000 lines
- **Focused**: Open just `hooks.txt` when you need hooks
- **Editor-friendly**: Jump to files, use editor search
- **Categorized**: Directory structure tells you where to look
