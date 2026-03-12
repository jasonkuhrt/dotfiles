local M = {}

---@alias CmuxNavDirection "left"|"down"|"up"|"right"

local move_commands = {
  left = "wincmd h",
  down = "wincmd j",
  up = "wincmd k",
  right = "wincmd l",
}

local resize_commands = {
  left = "vertical resize -5",
  down = "resize +2",
  up = "resize -2",
  right = "vertical resize +5",
}

local helper_actions = {
  left = {
    focus = "focus-left",
    resize = "resize-left",
  },
  down = {
    focus = "focus-down",
    resize = "resize-down",
  },
  up = {
    focus = "focus-up",
    resize = "resize-up",
  },
  right = {
    focus = "focus-right",
    resize = "resize-right",
  },
}

---@return string
local function helper_path()
  return vim.env.CMUX_NAV_HELPER or vim.fn.expand("~/.local/libexec/cmux/cmux-mode")
end

---@return boolean
function M.in_cmux()
  return vim.env.CMUX_WORKSPACE_ID ~= nil and vim.env.CMUX_WORKSPACE_ID ~= "" and vim.fn.executable("cmux") == 1
end

---@param direction CmuxNavDirection
---@return boolean
local function has_local_neighbor(direction)
  local target
  if direction == "left" then
    target = vim.fn.winnr("h")
  elseif direction == "down" then
    target = vim.fn.winnr("j")
  elseif direction == "up" then
    target = vim.fn.winnr("k")
  else
    target = vim.fn.winnr("l")
  end

  return target ~= vim.fn.winnr()
end

---@param args string[]
---@return boolean
local function run_helper(args)
  local helper = helper_path()
  if vim.fn.executable(helper) ~= 1 then
    return false
  end

  local command = { helper }
  vim.list_extend(command, args)
  local result = vim.system(command, { text = true }):wait()
  return result.code == 0
end

---@param direction CmuxNavDirection
local function move(direction)
  local current = vim.api.nvim_get_current_win()
  vim.cmd(move_commands[direction])

  if vim.api.nvim_get_current_win() ~= current then
    return
  end

  if not M.in_cmux() then
    return
  end

  run_helper({ "action", helper_actions[direction].focus })
end

---@param direction CmuxNavDirection
local function resize(direction)
  if has_local_neighbor(direction) then
    vim.cmd(resize_commands[direction])
    return
  end

  if not M.in_cmux() then
    vim.cmd(resize_commands[direction])
    return
  end

  if not run_helper({ "action", helper_actions[direction].resize }) then
    vim.cmd(resize_commands[direction])
  end
end

function M.move_left()
  move("left")
end

function M.move_down()
  move("down")
end

function M.move_up()
  move("up")
end

function M.move_right()
  move("right")
end

function M.resize_left()
  resize("left")
end

function M.resize_down()
  resize("down")
end

function M.resize_up()
  resize("up")
end

function M.resize_right()
  resize("right")
end

return M
