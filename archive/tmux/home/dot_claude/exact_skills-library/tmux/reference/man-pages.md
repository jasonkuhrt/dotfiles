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

See [man-pages/INDEX.md](../man-pages/INDEX.md#search-tips) for search tips.
