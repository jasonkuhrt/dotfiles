# Managed by Clef local package bin for sb
function __clef_sb_bin_find_dir
  set -l dir $PWD

  while true
    if test -x "$dir/node_modules/.bin/sb"
      printf '%s/node_modules/.bin\n' "$dir"
      return 0
    end

    set -l parent (dirname "$dir")
    if test "$parent" = "$dir"
      return 1
    end

    set dir $parent
  end
end

function __clef_sb_bin_refresh_path --on-variable PWD
  if set -q CLEF_SB_BIN_PATH
    set -l filtered
    for segment in $PATH
      if test "$segment" != "$CLEF_SB_BIN_PATH"
        set filtered $filtered $segment
      end
    end
    set -gx PATH $filtered
    set -e CLEF_SB_BIN_PATH
  end

  set -l next_path (__clef_sb_bin_find_dir)
  if test -n "$next_path"
    set -gx PATH $next_path $PATH
    set -gx CLEF_SB_BIN_PATH $next_path
  end
end

__clef_sb_bin_refresh_path
