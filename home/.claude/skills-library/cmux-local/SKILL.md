---
name: cmux-local
description: >-
  This machine's cmux specifics, to use alongside the official cmux skills. Covers
  how windows, workspaces, panes and surfaces relate, where the cmux config lives in
  the dotfiles repo, why agents must be launched in a native cmux surface, and which
  navigation shortcuts this machine uses. Use when working on cmux configuration in
  the dotfiles repo or when a cmux command needs local context the official skills
  do not carry.
---

# cmux on this machine

The official `cmux*` skills document the app and its CLI. This note only records
what is specific to this setup.

## Object model, in one line

Window (macOS window) → Workspace (sidebar entry) → Pane (split) → Surface (the
thing the tab bar shows, and what people call a tab). `new-window` creates an OS
window; `workspace create` creates a sidebar entry. They are different commands.

## Config lives in the dotfiles repo

`~/.config/cmux` is a symlink to `home/.config/cmux` in
`/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles`, so `cmux.json` is tracked and
edits are repo changes. The file keeps every default listed as a commented block;
uncomment an entry under `shortcuts.bindings` to override it. `cmux reload-config`
reloads both `cmux.json` and the Ghostty config without restarting the app.

## Agents must start in a native surface

cmux's fish integration loads only when cmux starts the shell itself. The Ghostty
`command` option would replace that shell and silently disable the integration, so
this machine sets no `command` in `ghostty/config`. Agent session restore depends
on that integration.

Prompts start in insert mode (`fish_vi_key_bindings insert`). cmux restores an
agent session by typing `cmux restore <agent> <id>` into the new shell, and a
normal-mode prompt eats the leading characters — see manaflow-ai/cmux#12772.

## Navigation

cmux's native shortcuts, no custom mode: `Cmd+Opt+arrows` focus a pane, `Cmd+D` and
`Cmd+Shift+D` split right and down, `Cmd+Shift+Enter` zooms, `Cmd+Shift+[`/`]`
switch tabs, `Cmd+Ctrl+[`/`]` switch workspaces. cmux has no resize binding, and
there is no split-left or split-up. Full cross-tool table: `hjkl-navigation.md`.
