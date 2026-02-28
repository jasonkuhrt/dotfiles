-- Tokyonight-night palette (c.* keys available in on_highlights)
-- Source: ~/.local/share/nvim/lazy/tokyonight.nvim/lua/tokyonight/colors/
--         night.lua inherits storm.lua, overriding bg/bg_dark/bg_dark1
--
-- Color tuning tools:
--   oklch-color-picker.nvim  — inline OKLCH picker right in nvim (lightness/chroma/hue)
--                               https://github.com/eero-lehtinen/oklch-color-picker.nvim
--   atmos.style              — palette builder w/ OKLCH, easing curves, contrast checking
--                               https://atmos.style/playground (sign up to save palettes)
--   oklch.com                — quick single-color OKLCH explorer
--                               https://oklch.com
--
-- Backgrounds (dark → light)
--   bg_dark1   #0C0E14  darkest bg (night only)
--   bg_dark    #16161e  sidebar/float bg
--   bg         #1a1b26  editor bg
--   bg_highlight #292e42  cursorline, visual selection
--
-- Foregrounds (dark → light)
--   fg_gutter  #3b4261  line numbers, indent guides — faintest named color
--   terminal_black #414868  terminal ANSI black
--   dark3      #545c7e  gitignored files, muted UI
--   comment    #565f89  code comments
--   dark5      #737aa2  brighter muted text
--   fg_dark    #a9b1d6  secondary text
--   fg         #c0caf5  primary text
--
-- Accents
--   blue0      #3d59a1  muted blue (selections, borders)
--   blue7      #394b70  very muted blue
--   blue       #7aa2f7  primary blue (functions, links)
--   blue1      #2ac3de  cyan-blue
--   cyan       #7dcfff  bright cyan
--   blue5      #89ddff  pale cyan
--   teal       #1abc9c  teal
--   green2     #41a6b5  dark teal-green
--   green1     #73daca  aqua-green
--   green      #9ece6a  primary green (strings)
--   yellow     #e0af68  warnings, parameters
--   orange     #ff9e64  constants, operators
--   red        #f7768e  errors, deletions
--   red1       #db4b4b  darker red
--   magenta    #bb9af7  keywords, tags
--   magenta2   #ff007c  hot pink (rare accents)
--   purple     #9d7cd8  types, decorators

return {
  {
    "folke/tokyonight.nvim",
    opts = {
      style = "night",
      on_highlights = function(hl, c)
        -- Dim trail dots: 75% toward fg_gutter from bg
        hl.Whitespace = { fg = "#333852" }
      end,
    },
  },
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "tokyonight-night",
    },
  },
}
