# dprint Plugins

Plugins are WASM files loaded via URL in `dprint.json`:

```json
{
  "plugins": [
    "https://plugins.dprint.dev/typescript-0.95.13.wasm",
    "https://plugins.dprint.dev/json-0.21.1.wasm",
    "https://plugins.dprint.dev/markdown-0.20.0.wasm"
  ]
}
```

## Common Plugins

- `typescript` - TS/JS/JSX/TSX
- `json` - JSON/JSONC
- `markdown` - Markdown
- `toml` - TOML
- `g-plane/pretty_yaml` - YAML
- `g-plane/malva` - CSS/SCSS/Less
- `g-plane/pretty_graphql` - GraphQL

## Plugin Config

Top-level keys match plugin name:

```json
{
  "typescript": { "quoteStyle": "preferSingle", "semiColons": "asi" },
  "markdown": { "lineWidth": 100, "textWrap": "maintain" }
}
```

## Updating Plugins

Check https://plugins.dprint.dev for latest versions, or run:

```bash
dprint config update
```
