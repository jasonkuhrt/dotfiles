# Prefer managed tools over older system or manual installations. ~/.local/shims comes
# first so plain `claude` picks the account (docs/claude-account.md).
typeset -U path
path=("$HOME/.local/shims" "$HOME/.local/bin" /opt/homebrew/bin /opt/homebrew/sbin $path)

# Vite+ bin (https://viteplus.dev)
. "$HOME/.vite-plus/env"
