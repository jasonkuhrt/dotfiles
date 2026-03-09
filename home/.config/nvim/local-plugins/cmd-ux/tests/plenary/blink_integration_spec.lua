---@diagnostic disable: undefined-field, undefined-global

local function plugin_root()
  local source = debug.getinfo(1, "S").source:sub(2)
  return vim.fn.fnamemodify(source, ":p:h:h:h")
end

describe("cmd_ux live blink cmdline integration", function()
  it("auto-advances exact namespace roots while typing", function()
    local root = plugin_root()
    local kit_root = vim.fn.fnamemodify(root, ":h") .. "/kit"
    local penlight_root = vim.fn.expand("~/.local/share/nvim/lazy/penlight")
    local penlight_rocks_root = vim.fn.expand("~/.local/share/nvim/lazy-rocks/penlight")
    local blink_root = vim.fn.expand("~/.local/share/nvim/lazy/blink.cmp")
    local script_path = vim.fn.tempname() .. ".lua"

    local script = ([[local plugin_root = %q
local kit_root = %q
local penlight_root = %q
local penlight_rocks_root = %q
local blink_root = %q
local max_attempts = 25

local function labels(blink)
  local result = {}
  for _, item in ipairs(blink.get_items() or {}) do
    result[#result + 1] = item.label
  end
  return result
end

local function has(items, expected)
  for _, item in ipairs(items) do
    if item == expected then
      return true
    end
  end
  return false
end

local function fail(blink)
  io.stderr:write(
    ("CMDUX_FAIL line=%%s visible=%%s items=%%s\\n"):format(
      vim.fn.getcmdline(),
      tostring(blink.is_menu_visible()),
      vim.inspect(labels(blink))
    )
  )
  vim.cmd("cquit 1")
end

local function succeed()
  io.stdout:write("CMDUX_OK\\n")
  vim.api.nvim_input(vim.api.nvim_replace_termcodes("<C-c>", true, false, true))
  vim.defer_fn(function()
    vim.cmd("qa!")
  end, 50)
end

vim.opt.runtimepath:prepend(penlight_root)
vim.opt.runtimepath:prepend(kit_root)
vim.opt.runtimepath:prepend(plugin_root)
vim.opt.runtimepath:prepend(blink_root)
package.path = table.concat({
  plugin_root .. "/lua/?.lua",
  penlight_root .. "/lua/?.lua",
  penlight_root .. "/lua/?/init.lua",
  package.path,
}, ";")
package.cpath = table.concat({
  penlight_rocks_root .. "/lib/lua/5.1/?.so",
  package.cpath,
}, ";")
vim.g.cmd_ux_disable_blocklist_live_validation = true

require("cmd_ux").setup()
local blink = require("blink.cmp")
blink.setup({
  keymap = { preset = "none" },
  completion = {
    menu = { auto_show = false },
  },
  cmdline = {
    enabled = true,
    keymap = {},
    completion = {
      menu = { auto_show = false },
    },
    sources = function()
      return { "cmdline" }
    end,
  },
})

local function await_namespace(attempt)
  local current_labels = labels(blink)
  local ok = vim.fn.getcmdline():find("^Tab%%s") ~= nil
    and blink.is_menu_visible()
    and has(current_labels, "goto")
    and has(current_labels, "next")

  if ok then
    succeed()
    return
  end

  if attempt >= max_attempts then
    fail(blink)
    return
  end

  vim.defer_fn(function()
    await_namespace(attempt + 1)
  end, 80)
end

vim.schedule(function()
  vim.api.nvim_input(":")
  vim.defer_fn(function()
    vim.api.nvim_input("Tab")
    await_namespace(1)
  end, 120)
end)
]]):format(root, kit_root, penlight_root, penlight_rocks_root, blink_root)

    vim.fn.writefile(vim.split(script, "\n", { plain = true }), script_path)

    local result = vim
      .system({
        "nvim",
        "--headless",
        "-u",
        "NONE",
        "-S",
        script_path,
      }, {
        env = {
          XDG_CONFIG_HOME = vim.fn.getcwd() .. "/home/.config",
          CMD_UX_TEST = "1",
        },
        text = true,
      })
      :wait()

    vim.fn.delete(script_path)

    assert.are.equal(0, result.code, result.stderr)
    assert.is_truthy((result.stdout or ""):find("CMDUX_OK", 1, true))
  end)
end)
