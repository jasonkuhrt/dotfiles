-- Build keybinder-glimpse menus.json by walking nvim's keymap registry per mode.
-- Run via the `just glimpse-build` recipe (or directly: nvim --headless -l <this>).
--
-- Output: ${XDG_CONFIG_HOME:-$HOME/.config}/keybinder-glimpse/menus.json
--
-- Why this lives in dotfiles, not in the extension: the menus reflect the
-- user's personal chord scheme, which lives in nvim config. The extension
-- is a generic consumer of menus.json. Build = extract from nvim once;
-- runtime = extension reads JSON. No nvim dependency at VS Code runtime.

-- Stub vscode-neovim's Lua module so vscode-mode keymaps can load under
-- headless nvim. The real `vscode` module lives in vscode-neovim's runtime
-- and is only present when nvim is embedded by VS Code. Here we provide a
-- no-op shim so `require('vscode')` succeeds and `vscode.action(...)` etc.
-- are callable but do nothing — we only care about REGISTERING the keymaps,
-- not dispatching them.
package.preload['vscode'] = function()
  return setmetatable({}, {
    __index = function() return function() end end,
  })
end

-- Force vscode-mode config branches to load. keymaps.lua sees this flag on
-- VeryLazy and loads vscode_keymaps.lua, which registers the chord scheme.
vim.g.vscode = true

-- ─────────────────────────── helpers ───────────────────────────────

-- Split a chord LHS into vim-notation tokens. Multi-char specials
-- (`<leader>`, `<C-w>`, `<Space>`, `<Esc>`, `<F1>`-`<F12>`) stay grouped;
-- everything else is single-character.
local function tokenize(lhs)
  local tokens = {}
  local i = 1
  while i <= #lhs do
    local c = lhs:sub(i, i)
    if c == '<' then
      local j = lhs:find('>', i + 1)
      if j then
        table.insert(tokens, lhs:sub(i, j))
        i = j + 1
      else
        table.insert(tokens, c)
        i = i + 1
      end
    else
      table.insert(tokens, c)
      i = i + 1
    end
  end
  return tokens
end

local function should_include(km)
  if not km.desc or km.desc == '' then return false end
  if km.desc:find('which-key-trigger', 1, true) then return false end
  return true
end

local PREFIX_TITLES = {
  ['g']        = 'go-to',
  ['q']        = 'git',
  ['m']        = 'match',
  ['t']        = 'toggle/panel',
  [',']        = 'config',
  ['<leader>'] = 'leader',
  ['<Space>']  = 'leader',
  ['d']        = 'delete + motion',
  ['c']        = 'change + motion',
  ['y']        = 'yank + motion',
  ['z']        = 'fold/scroll',
  ['[']        = 'prev',
  [']']        = 'next',
}

-- Group keymaps by first token. Keys 2..n become the menu's item key.
local function build_mode_menus(mode)
  local menus = {}
  for _, km in ipairs(vim.api.nvim_get_keymap(mode)) do
    if should_include(km) then
      local tokens = tokenize(km.lhs)
      if #tokens >= 2 then
        local prefix = tokens[1]
        -- Normalize leader-equivalent prefixes. nvim_get_keymap returns
        -- the leader as the literal character (' ' for space-leader);
        -- collapse those plus the explicit notations into one bucket.
        if prefix == '<Space>' or prefix == ' ' then prefix = '<leader>' end

        local rest_tokens = {}
        for k = 2, #tokens do rest_tokens[#rest_tokens + 1] = tokens[k] end
        local rest = table.concat(rest_tokens, '')

        if not menus[prefix] then
          menus[prefix] = {
            title = PREFIX_TITLES[prefix] or prefix,
            items = vim.empty_dict(),
          }
        end
        menus[prefix].items[rest] = {
          type = 'execution',
          keystroke = km.lhs,
          description = km.desc,
        }
      end
    end
  end
  return menus
end

-- ────────────────────────── export ────────────────────────────────

local function write_export()
  local result = {
    version = 1,
    normal   = build_mode_menus('n'),
    visual   = build_mode_menus('v'),
    operator = build_mode_menus('o'),
  }

  -- Empty dicts must serialize as `{}` not `[]`. Lua's vim.json detects this
  -- via the `vim.empty_dict()` sentinel applied above.
  if vim.tbl_count(result.normal)   == 0 then result.normal   = vim.empty_dict() end
  if vim.tbl_count(result.visual)   == 0 then result.visual   = vim.empty_dict() end
  if vim.tbl_count(result.operator) == 0 then result.operator = vim.empty_dict() end

  local home = os.getenv('HOME') or vim.fn.expand('~')
  local xdg = os.getenv('XDG_CONFIG_HOME') or (home .. '/.config')
  local out_dir = xdg .. '/keybinder-glimpse'
  local out_path = out_dir .. '/menus.json'
  vim.fn.mkdir(out_dir, 'p')

  local f, open_err = io.open(out_path, 'w')
  if not f then
    io.stderr:write('Failed to open ' .. out_path .. ' for writing: ' .. tostring(open_err) .. '\n')
    vim.cmd('cquit 1')
    return
  end
  f:write(vim.json.encode(result))
  f:close()

  -- Human-readable summary
  local count = 0
  for _, mm in pairs({ result.normal, result.visual, result.operator }) do
    if type(mm) == 'table' then
      for _, menu in pairs(mm) do
        if type(menu) == 'table' and menu.items then
          for _ in pairs(menu.items) do count = count + 1 end
        end
      end
    end
  end
  local prefixes =
    (type(result.normal)   == 'table' and vim.tbl_count(result.normal)   or 0)
    + (type(result.visual)   == 'table' and vim.tbl_count(result.visual)   or 0)
    + (type(result.operator) == 'table' and vim.tbl_count(result.operator) or 0)
  io.stdout:write(string.format(
    'Wrote %s (%d chords across %d prefix groups)\n',
    out_path, count, prefixes
  ))
end

-- VeryLazy doesn't reliably fire under `nvim --headless`, so we load
-- keymaps.lua directly. It's pure `vim.keymap.set` calls — no plugin
-- runtime dependencies beyond the `vscode` module stubbed above. This
-- registers every chord in the keymap registry, which nvim_get_keymap
-- will then return.
require('config.keymaps')

write_export()
vim.cmd('qa!')
