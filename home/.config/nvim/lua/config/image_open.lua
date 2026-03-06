local M = {}

local image_patterns = {
  "*.png",
  "*.jpg",
  "*.jpeg",
  "*.gif",
  "*.webp",
  "*.avif",
  "*.bmp",
  "*.svg",
}

local function get_terminal_viewer(abs_path)
  if vim.fn.executable("viu") == 1 then
    return {
      argv = { "viu", "--static", abs_path },
      shell = "clear && viu --static " .. vim.fn.shellescape(abs_path),
    }
  end

  if vim.fn.executable("chafa") == 1 then
    return {
      argv = { "chafa", "--animate=off", abs_path },
      shell = "clear && chafa --animate=off " .. vim.fn.shellescape(abs_path),
    }
  end

  return nil
end

local function in_cmux()
  return vim.env.CMUX_WORKSPACE_ID ~= nil and vim.env.CMUX_WORKSPACE_ID ~= "" and vim.fn.executable("cmux") == 1
end

local function open_in_cmux(abs_path)
  local viewer = get_terminal_viewer(abs_path)
  if not viewer then
    return false
  end

  local create = vim
    .system({
      "cmux",
      "--json",
      "new-pane",
      "--type",
      "terminal",
      "--direction",
      "right",
    }, { text = true })
    :wait()

  if create.code ~= 0 then
    return false
  end

  local ok, payload = pcall(vim.json.decode, create.stdout or "")
  if not ok or type(payload) ~= "table" then
    return false
  end

  local surface = payload.surface_ref or payload.surface_id
  if surface == nil or surface == vim.NIL or surface == "" then
    return false
  end

  local send = vim
    .system({
      "cmux",
      "send",
      "--surface",
      surface,
      viewer.shell .. "\n",
    }, { text = true })
    :wait()

  return send.code == 0
end

local function open_in_nvim_terminal(abs_path)
  local viewer = get_terminal_viewer(abs_path)
  if not viewer then
    return false
  end

  vim.cmd("botright vsplit")
  vim.cmd("enew")

  local job_id = vim.fn.termopen(viewer.argv, {
    cwd = vim.fn.fnamemodify(abs_path, ":h"),
  })

  if job_id <= 0 then
    vim.cmd("close")
    return false
  end

  vim.bo.buflisted = false
  vim.bo.bufhidden = "wipe"

  return true
end

local function open_in_preview(abs_path)
  if vim.fn.executable("open") == 1 then
    vim.system({ "open", "-a", "Preview", abs_path }, { detach = true })
    return true
  end

  return false
end

function M.open_image(path)
  local abs_path = vim.fn.fnamemodify(path, ":p")

  if in_cmux() and open_in_cmux(abs_path) then
    return true
  end

  if open_in_nvim_terminal(abs_path) then
    return true
  end

  return open_in_preview(abs_path)
end

function M.setup()
  local group = vim.api.nvim_create_augroup("external_image_open", { clear = true })

  vim.api.nvim_create_autocmd("BufReadCmd", {
    group = group,
    pattern = image_patterns,
    callback = function(args)
      local opened = M.open_image(args.match)
      if not opened then
        vim.notify("Could not open image: " .. args.match, vim.log.levels.ERROR)
      end

      vim.schedule(function()
        if vim.api.nvim_buf_is_valid(args.buf) then
          vim.api.nvim_buf_delete(args.buf, { force = true })
        end
      end)
    end,
  })
end

return M
