# Complete Examples

## Full Package Setup

```json
{
  "name": "my-app",
  "type": "module",
  "imports": {
    "#db": "./src/database/index.js",
    "#db/*": "./src/database/*.js",
    "#utils/*": "./src/utils/*.js",
    "#platform": {
      "node": "./src/platform/node.js",
      "browser": "./src/platform/browser.js",
      "react-native": "./src/platform/native.js",
      "default": "./src/platform/node.js"
    }
  }
}
```

```typescript
import { connect } from "#db"; // exact match -> ./src/database/index.js
import { query } from "#db/queries.js"; // pattern -> ./src/database/queries.js
import platform from "#platform"; // condition-based
```

## Monorepo Note

Subpath imports **cannot reference outside the package** - `./` requirement and `..` prohibition are fundamental.

Alternatives for shared code:

1. **Workspace dependencies** - proper package
2. **Symlinks** - link into package
3. **tsconfig paths** - build-time fallback
