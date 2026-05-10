# Monkey-Patch Discipline

When extending a third-party module that you `require`/`import` at runtime,
you must read the third-party module's source first. This applies to ANY
language where attribute access can be intercepted (Lua metatables, JS
Proxy, Python `__getattr__`, Ruby `method_missing`).

## The trap

Modules with proxy-style attribute access don't behave like plain tables
or objects. Reading or writing fields you don't already know about can
silently invoke RPC machinery, emit error notifications, register fake
handlers, or throw. The contract isn't "this object has fields X, Y, Z" —
the contract is "this object has explicit fields X, Y, Z, and ANYTHING
ELSE goes through `<intercept>`."

## Real example — vscode-neovim's `vscode` lua module

```lua
return setmetatable(vscode, {
  __index = function(_, key)
    vscode.notify('The "vscode.' .. key .. '" is missing. ...', vim.log.levels.ERROR)
    return setmetatable({}, { __call = function() end })
  end,
})
```

Glimpse's lua patch did `M.__keyBinderGlimpsePatched = true` for
idempotency. That single field write triggered the metatable's `__index`
on every read of the same field, producing a user-visible error toast on
every activation. The bug was invisible to TypeScript (lua-as-string),
invisible to bun:test (lua never executed in tests), invisible to vscode
mocks (mocks don't have the metatable). It was also avoidable: 60 seconds
of reading `runtime/lua/vscode.lua` would have shown the trap.

## Rules

1. Before `M.foo = bar` against any `M = require('third-party')`:
   - Read the source. Find the file the module exports from.
   - Look for `setmetatable`, `Proxy`, `__getattr__`, `method_missing`,
     `defineProperty`, or any other attribute-access interception.
   - If the module uses ANY of these, you cannot safely add new fields.
2. Only REPLACE existing methods (which the source confirms exist as
   real fields), never ADD new ones.
3. Owned state (sentinels, flags, caches you need to attach) lives on a
   table you control — `_G.<my_namespace>`, a separate module, a
   Map/WeakMap keyed by the third-party object.
4. Tests for monkey-patching code must execute the patch against a mock
   that mirrors the third-party module's interception shape, not just
   its public surface. A mock that satisfies the public API but lacks
   the metatable will pass tests that production breaks.

## When unsure

If you can't confidently say what happens when you write
`M.<unknown_field> = X`, you don't know enough to write the patch yet.
Read the source.
