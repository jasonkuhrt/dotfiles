-- Helix-style m-prefix for surround operations (Decision #2.c).
-- Replaces vim's mark-set defaults on letters s/d/f/F/h/r.
-- mini.surround is whitelisted in LazyVim's vscode extras, so these chords
-- work in both terminal nvim AND VS Code (operate on text via nvim's mechanism).

return {
  "nvim-mini/mini.surround",
  opts = {
    mappings = {
      add = "ms",
      delete = "md",
      find = "mf",
      find_left = "mF",
      highlight = "mh",
      replace = "mr",
      -- mini.surround no longer maps this, but LazyVim's extra still turns it
      -- into a lazy-load key (default `gsn`); "" suppresses that dead key.
      update_n_lines = "",
    },
  },
}
