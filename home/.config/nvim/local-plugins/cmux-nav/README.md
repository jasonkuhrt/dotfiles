# cmux-nav

Repo-owned Neovim bridge for crossing split boundaries into cmux.

## Scope

- `<C-hjkl>` prefers local Neovim window movement and falls through to cmux at the edge
- `<A-hjkl>` prefers local Neovim resize and falls through to cmux at the edge
- no Kitty dependency
- no multiplexer abstraction layer

## Runtime contract

- inside cmux, the plugin dispatches host actions through `~/.local/libexec/cmux/cmux-mode`
- outside cmux, the plugin behaves like plain Neovim split navigation and resize

## Hidden action surface

The host-side actions are implemented by hidden Ghostty/cmux bindings with the
Hyper modifier (`Ctrl+Cmd+Opt+Shift`):

- `h/j/k/l` = focus split
- `u/i/o/p` = resize split
- `n/m/,/.` = create split
- `z` = zoom
- `x` = close surface

These bindings are private implementation detail bindings. User-facing cmux
driving stays on the explicit `Ctrl+0` Karabiner mode.
