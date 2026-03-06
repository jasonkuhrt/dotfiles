---@diagnostic disable: undefined-field, undefined-global

local function plugin_root()
  local source = debug.getinfo(1, "S").source:sub(2)
  return vim.fn.fnamemodify(source, ":p:h:h:h")
end

local function run_blink_smoke(key)
  local root = plugin_root()
  local stdlib_root = vim.fn.fnamemodify(root, ":h") .. "/stdlib"
  local penlight_root = vim.fn.expand("~/.local/share/nvim/lazy/penlight")
  local penlight_rocks_root = vim.fn.expand("~/.local/share/nvim/lazy-rocks/penlight")
  local blink_root = vim.fn.expand("~/.local/share/nvim/lazy/blink.cmp")
  local script_path = vim.fn.tempname() .. ".lua"

  local script = ([[local plugin_root = %q
local stdlib_root = %q
local penlight_root = %q
local penlight_rocks_root = %q
local blink_root = %q

local function termcodes(keys)
  return vim.api.nvim_replace_termcodes(keys, true, false, true)
end

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

vim.opt.runtimepath:prepend(penlight_root)
vim.opt.runtimepath:prepend(stdlib_root)
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
    keymap = {
      ["<CR>"] = {
        function(cmp)
          return require("cmd_ux").handle_enter(cmp)
        end,
        "fallback",
      },
      ["<Tab>"] = {
        function(cmp)
          return require("cmd_ux").handle_tab(cmp)
        end,
        "fallback",
      },
      ["<Space>"] = {
        function(cmp)
          return require("cmd_ux").handle_space(cmp)
        end,
        "fallback",
      },
    },
    completion = {
      menu = { auto_show = false },
    },
    sources = function()
      return { "cmdline" }
    end,
  },
})

vim.schedule(function()
  vim.api.nvim_input(":")
  vim.defer_fn(function()
    vim.api.nvim_input("Config")
    vim.defer_fn(function()
      blink.show({ initial_selected_item_idx = 1 })
      vim.defer_fn(function()
        vim.api.nvim_input(termcodes(%q))
        vim.defer_fn(function()
          local current_labels = labels(blink)
          local ok = vim.fn.getcmdline():find("^Config%%s") ~= nil
            and blink.is_menu_visible()
            and has(current_labels, "reload")
            and has(current_labels, "help")

          if ok then
            io.stdout:write("CMDUX_OK\\n")
            vim.api.nvim_input(termcodes("<C-c>"))
            vim.defer_fn(function()
              vim.cmd("qa!")
            end, 50)
          else
            io.stderr:write(
              ("CMDUX_FAIL line=%%s visible=%%s items=%%s\\n"):format(
                vim.fn.getcmdline(),
                tostring(blink.is_menu_visible()),
                vim.inspect(current_labels)
              )
            )
            vim.cmd("cquit 1")
          end
        end, 500)
      end, 300)
    end, 150)
  end, 100)
end)
]]):format(root, stdlib_root, penlight_root, penlight_rocks_root, blink_root, key)

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

  return result
end

describe("cmd_ux live blink cmdline integration", function()
  for _, key in ipairs({ "<CR>", "<Tab>", "<Space>" }) do
    local label = key == "<CR>" and "enter" or key == "<Tab>" and "tab" or "space"

    it("reopens Config subcommands on " .. label, function()
      local result = run_blink_smoke(key)

      assert.are.equal(0, result.code, result.stderr)
      assert.is_truthy((result.stdout or ""):find("CMDUX_OK", 1, true))
    end)
  end
end)
