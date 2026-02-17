# nodejs-subpath-imports Design

## What This Enables

**Runtime aliases** - unlike `tsconfig.json` paths (compile-time only), subpath imports resolve at runtime:

```typescript
import { helper } from "#utils/helper.js"; // Works in Node, Deno, Bun natively
```

**Cross-platform code** - same import, different implementation per environment:

```json
{
  "imports": {
    "#fetch": {
      "node": "node-fetch",
      "browser": "./fetch-browser.js",
      "default": "./fetch-polyfill.js"
    }
  }
}
```
