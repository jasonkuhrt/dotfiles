-- Dump nvim's keymap registry per mode as JSON to stdout.
-- Sibling of `build-glimpse-menus.lua`, but unprocessed — the codemod
-- consumer wants the RAW keymap dicts, not glimpse's per-prefix shape.
--
-- Run via:
--   KEYMAP_DUMP_OUT=/tmp/keymap-dump.json \
--     nvim --headless -c "lua dofile('scripts/dump-keymaps.lua')" 2>/dev/null
--
-- Writes to KEYMAP_DUMP_OUT (env var). Falls back to ./keymap-dump.json
-- if the env var isn't set. Writing to a file (not stdout) avoids
-- nvim's pre-quit flush quirks.

-- Same vscode-mode loading dance as build-glimpse-menus.lua — set the
-- flag + stub the vscode module so vscode_keymaps.lua's chord scheme
-- registers in headless mode.
package.preload['vscode'] = function()
  return setmetatable({}, {
    __index = function() return function() end end,
  })
end
vim.g.vscode = true

-- Force keymaps to load now (LazyVim normally loads them on VeryLazy,
-- which doesn't fire reliably under -l/-c).
require('config.keymaps')

-- Sanitize each keymap entry: replace function-valued fields (callback,
-- desc when it's a function) with a marker. nvim_get_keymap returns
-- callback-based mappings with `callback = <function>` which vim.json
-- can't serialize. The marker tells the migrator "this is a Lua callback;
-- we can't extract the rhs from the dump alone — must parse the source."
local function sanitize(km_list)
  local out = {}
  for _, km in ipairs(km_list) do
    local clean = {}
    for k, v in pairs(km) do
      if type(v) == 'function' then
        clean[k] = '<lua-callback>'
      else
        clean[k] = v
      end
    end
    table.insert(out, clean)
  end
  return out
end

local result = {
  normal   = sanitize(vim.api.nvim_get_keymap('n')),
  visual   = sanitize(vim.api.nvim_get_keymap('v')),
  operator = sanitize(vim.api.nvim_get_keymap('o')),
  insert   = sanitize(vim.api.nvim_get_keymap('i')),
  command  = sanitize(vim.api.nvim_get_keymap('c')),
  terminal = sanitize(vim.api.nvim_get_keymap('t')),
}

local out_path = os.getenv('KEYMAP_DUMP_OUT') or 'keymap-dump.json'
local f, err = io.open(out_path, 'w')
if not f then
  io.stderr:write('Failed to open ' .. out_path .. ': ' .. tostring(err) .. '\n')
  vim.cmd('cquit 1')
  return
end
f:write(vim.json.encode(result))
f:close()
io.stdout:write('Wrote ' .. out_path .. '\n')
vim.cmd('qa!')
