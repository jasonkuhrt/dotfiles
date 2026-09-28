local source = debug.getinfo(1, "S").source:sub(2)
local tests_dir = vim.fn.fnamemodify(source, ":p:h")
local plugin_root = vim.fn.fnamemodify(tests_dir, ":h")
local local_plugins_dir = vim.fn.fnamemodify(plugin_root, ":h")
local kit_root = local_plugins_dir .. "/kit"
local penlight_root = vim.fn.expand("~/.local/share/nvim/lazy/penlight")
local penlight_rocks_root = vim.fn.expand("~/.local/share/nvim/lazy-rocks/penlight")

vim.opt.runtimepath:prepend(penlight_root)
vim.opt.runtimepath:prepend(kit_root)
vim.opt.runtimepath:prepend(plugin_root)
package.path = table.concat({
  tests_dir .. "/?.lua",
  penlight_root .. "/lua/?.lua",
  penlight_root .. "/lua/?/init.lua",
  package.path,
}, ";")
package.cpath = table.concat({
  penlight_rocks_root .. "/lib/lua/5.1/?.so",
  package.cpath,
}, ";")

-- Git run by the specs reads no user or system config and can reach only local repositories.
vim.env.GIT_CONFIG_GLOBAL = "/dev/null"
vim.env.GIT_CONFIG_NOSYSTEM = "1"
vim.env.GIT_ALLOW_PROTOCOL = "file:ext"
