#!/bin/sh
# Claude Code status line: git branch + model + effort + context usage.
#
#   hea-5029-react-email-editor-prototype  Opus 5 (1M context)  high  7%
#
# Reads Claude Code's status JSON on stdin. Fields used (per the CLI's own
# statusLine schema): .workspace.current_dir, .model.display_name,
# .effort.level (absent when the model has no reasoning effort),
# .context_window.used_percentage (null before the first response).
#
# Colors match ~/.config/starship.toml (Tokyo Night):
#   branch #bb9af7 · model #7aa2f7 · effort #e0af68 · percentage #565f89

input=$(cat)

{
  IFS= read -r dir
  IFS= read -r model
  IFS= read -r effort
  IFS= read -r pct
} <<JSON
$(printf '%s' "$input" | jq -r '
  (.workspace.current_dir // ""),
  (.model.display_name // ""),
  (.effort.level // ""),
  (.context_window.used_percentage // "")
')
JSON

[ -n "$dir" ] && cd "$dir" 2>/dev/null

branch=$(git symbolic-ref --quiet --short HEAD 2>/dev/null) ||
  branch=$(git rev-parse --short HEAD 2>/dev/null)

out=''
add() { # $1 = ANSI attrs, $2 = text
  [ -n "$2" ] || return 0
  [ -n "$out" ] && out="${out}  "
  out="${out}\033[${1}m${2}\033[0m"
}

add '1;38;2;187;154;247' "$branch"
add '38;2;122;162;247' "$model"
add '38;2;224;175;104' "$effort"
add '38;2;86;95;137' "${pct:+${pct%.*}%}"

printf '%b' "$out"
