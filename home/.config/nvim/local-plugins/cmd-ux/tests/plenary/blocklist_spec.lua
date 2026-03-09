---@diagnostic disable: undefined-field

local stub = require("luassert.stub")

describe("cmd_ux blocklist", function()
  local blocklist

  before_each(function()
    package.loaded["cmd_ux.blocklist"] = nil
    blocklist = require("cmd_ux.blocklist")
    stub(vim.fn, "readfile")
    stub(vim, "notify")
  end)

  after_each(function()
    blocklist.invalidate()
    vim.fn.readfile:revert()
    vim.notify:revert()
    package.loaded["cmd_ux.blocklist"] = nil
  end)

  it("keeps optional exact entries quiet when they are absent in the current session", function()
    vim.fn.readfile.returns({ "DapContinue", "SessionLoad" })

    blocklist.reload()

    assert.is_true(blocklist.is_blocked("DapContinue"))
    assert.is_true(blocklist.is_blocked("SessionLoad"))
    assert.stub(vim.notify).was_not_called()
  end)

  it("still warns on malformed entries", function()
    vim.fn.readfile.returns({ "bad entry" })

    blocklist.reload()

    assert.stub(vim.notify).was_called(1)
    assert.stub(vim.notify).was_called_with(
      'blocklist:1: invalid entry "bad entry" — expected one exact command per line',
      vim.log.levels.WARN,
      { title = "Cmd UX" }
    )
  end)
end)
