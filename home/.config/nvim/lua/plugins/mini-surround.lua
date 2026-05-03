-- Helix-style m-prefix for surround operations (Decision #2.c).
-- Replaces vim's mark-set defaults on letters s/d/f/F/h/r/n.
-- mini.surround is whitelisted in LazyVim's vscode extras, so these chords
-- work in both terminal nvim AND VS Code (operate on text via nvim's mechanism).

return {
  "echasnovski/mini.surround",
  opts = {
    mappings = {
      add = "ms",
      delete = "md",
      find = "mf",
      find_left = "mF",
      highlight = "mh",
      replace = "mr",
      update_n_lines = "mn",
    },
  },
}
