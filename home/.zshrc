# Interactive zsh. Installers append their blocks here (bun, wt, Vite+): keep
# them, and delete a block one appends a second time.

# bun completions
[ -s "/Users/jasonkuhrt/.bun/_bun" ] && source "/Users/jasonkuhrt/.bun/_bun"

if command -v wt >/dev/null 2>&1; then eval "$(command wt config shell init zsh)"; fi

# Vite+ bin (https://viteplus.dev)
. "$HOME/.vite-plus/env"
