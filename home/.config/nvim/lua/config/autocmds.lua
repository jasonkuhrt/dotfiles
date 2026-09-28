-- Autocmds are automatically loaded on the VeryLazy event
-- Default autocmds: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua

-- Auto-save on focus lost.
-- Ordinary file buffers only: claudecode.nvim and octo.nvim use acwrite buffers,
-- where a write accepts the proposed diff or publishes to GitHub.
vim.api.nvim_create_autocmd("FocusLost", {
  group = vim.api.nvim_create_augroup("autosave_focus", { clear = true }),
  callback = function()
    for _, buf in ipairs(vim.api.nvim_list_bufs()) do
      local bo = vim.bo[buf]
      local name = vim.api.nvim_buf_get_name(buf)
      if vim.api.nvim_buf_is_loaded(buf) and bo.buftype == "" and bo.modified and not bo.readonly and name ~= "" then
        local ok, err = pcall(vim.api.nvim_buf_call, buf, function()
          vim.cmd("silent update")
        end)
        if not ok then
          vim.notify(("Autosave failed for %s\n%s"):format(name, err), vim.log.levels.ERROR)
        end
      end
    end
  end,
})

-- Disable spellcheck in text-like filetypes (LazyVim enables this by default).
vim.api.nvim_create_autocmd("FileType", {
  group = vim.api.nvim_create_augroup("disable_spellcheck", { clear = true }),
  pattern = { "text", "plaintex", "typst", "gitcommit", "markdown" },
  callback = function()
    vim.opt_local.spell = false
  end,
})

-- Auto-enter insert mode when focusing a terminal buffer
-- (terminal-nvim only; VS Code's terminal isn't an nvim term buffer)
if not vim.g.vscode then
  vim.api.nvim_create_autocmd({ "TermOpen", "BufEnter", "WinEnter" }, {
    group = vim.api.nvim_create_augroup("terminal_insert", { clear = true }),
    pattern = "term://*",
    callback = function()
      if vim.bo.buftype == "terminal" then
        vim.cmd("startinsert")
      end
    end,
  })

  require("config.image_open").setup()
end
