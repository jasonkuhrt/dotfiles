# Restore managed-tool precedence after macOS login PATH setup: /etc/zprofile's
# path_helper reorders PATH after ~/.zshenv. Keep this list the same as ~/.zshenv's.
typeset -U path
path=("$HOME/.local/shims" "$HOME/.local/bin" /opt/homebrew/bin /opt/homebrew/sbin $path)
. "$HOME/.vite-plus/env"
