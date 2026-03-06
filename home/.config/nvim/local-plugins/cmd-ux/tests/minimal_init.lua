local source = debug.getinfo(1, "S").source:sub(2)
local tests_dir = vim.fn.fnamemodify(source, ":p:h")
local plugin_root = vim.fn.fnamemodify(tests_dir, ":h")
local local_plugins_dir = vim.fn.fnamemodify(plugin_root, ":h")
local stdlib_root = local_plugins_dir .. "/stdlib"

vim.g.cmd_ux_disable_blocklist_live_validation = true
vim.opt.runtimepath:prepend(stdlib_root)
vim.opt.runtimepath:prepend(plugin_root)
package.path = table.concat({
  plugin_root .. "/?.lua",
  package.path,
}, ";")
