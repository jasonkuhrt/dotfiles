# Managed by Clef local package bin for sb
__clef_sb_bin_find_dir() {
  local dir="$PWD"
  local candidate=""
  # Declared once, outside the loop: zsh prints `parent=<value>` each time `local` meets a
  # name already set in the function, and the caller captures that output as the bin dir.
  local parent=""

  while true; do
    candidate="$dir/node_modules/.bin/sb"
    if [ -x "$candidate" ]; then
      printf '%s/node_modules/.bin\n' "$dir"
      return 0
    fi

    parent="$(dirname "$dir")"
    if [ "$parent" = "$dir" ]; then
      return 1
    fi

    dir="$parent"
  done
}

__clef_sb_bin_strip_path() {
  local target="$1"

  if [ -z "$target" ]; then
    return 0
  fi

  local current=":$PATH:"
  while [[ "$current" == *":$target:"* ]]; do
    current="${current//:$target:/:}"
  done

  current="${current#:}"
  current="${current%:}"
  PATH="$current"
}

__clef_sb_bin_refresh_path() {
  if [ -n "${CLEF_SB_BIN_PATH:-}" ]; then
    __clef_sb_bin_strip_path "$CLEF_SB_BIN_PATH"
  fi

  local next_path=""
  next_path="$(__clef_sb_bin_find_dir 2>/dev/null || true)"

  if [ -n "$next_path" ]; then
    PATH="$next_path${PATH:+:$PATH}"
    export CLEF_SB_BIN_PATH="$next_path"
  else
    unset CLEF_SB_BIN_PATH
  fi

  export PATH
}
