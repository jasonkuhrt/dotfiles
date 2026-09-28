return {
  -- Disable lualine (replaced by mini.statusline)
  { "nvim-lualine/lualine.nvim", enabled = false },

  -- mini.statusline: minimal, flat, fast
  -- Colors from tokyonight (built-in highlight group support)
  -- Git/diff info via gitsigns (LazyVim default, auto-detected)
  -- Icons via mini.icons (LazyVim default, auto-detected)
  { "nvim-mini/mini.statusline", opts = {} },
}
