# dprint Editor Integration

## Zed

```json
{
  "formatter": {
    "external": {
      "command": "dprint",
      "arguments": ["fmt", "--stdin", "{buffer_path}"]
    }
  }
}
```

## VS Code

Install "dprint" extension. It uses dprint LSP automatically.

## Neovim

Use `null-ls` or `conform.nvim` with dprint as formatter.
