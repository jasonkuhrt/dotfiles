# Interactive zsh. Installers append their blocks here (bun, wt, clef, Vite+): keep
# them, and delete a block one appends a second time.

# bun completions
[ -s "/Users/jasonkuhrt/.bun/_bun" ] && source "/Users/jasonkuhrt/.bun/_bun"

if command -v wt >/dev/null 2>&1; then eval "$(command wt config shell init zsh)"; fi

# >>> clef sb path >>>
if [ -f "/Users/jasonkuhrt/.config/clef/sb-path.sh" ]; then
  . "/Users/jasonkuhrt/.config/clef/sb-path.sh"
  if [ -z "${CLEF_SB_ZSH_HOOK_INSTALLED:-}" ]; then
    autoload -Uz add-zsh-hook
    add-zsh-hook chpwd __clef_sb_bin_refresh_path
    add-zsh-hook precmd __clef_sb_bin_refresh_path
    export CLEF_SB_ZSH_HOOK_INSTALLED=1
  fi
  __clef_sb_bin_refresh_path
fi
# <<< clef sb path <<<

# Vite+ bin (https://viteplus.dev)
. "$HOME/.vite-plus/env"
