## no-namespace-destructuring

Never destructure ESM namespace imports. Qualified access preserves the semantic meaning of the namespace and enables better tree-shaking.

### Correct

```typescript
import * as Flo from './__.js'
Flo.Viz.TerminalRenderer.make(...)
Flo.ActivityStarted.make(...)
```

### Incorrect

```typescript
import * as Flo from './__.js'
const { TerminalRenderer } = Flo.Viz
const { ActivityStarted } = Flo
```

## namespace-alias-matches-filename

Domain module namespace imports must use an alias that matches the filename. The namespace prefix carries domain meaning at call sites — a mismatched alias breaks the mental model.

### Correct

```typescript
import * as Patch from "./patch.js"
Patch.generatePatches(...)

import * as AudioRecorder from "./AudioRecorder.js"
```

### Incorrect

```typescript
import * as Recorder from './AudioRecorder.js'
import * as P from './patch.js'
```

## esm-only-no-cjs

Always use ESM modules. CJS (`require`, `module.exports`) is forbidden.

### Correct

```typescript
import { readFile } from 'fs/promises'
export const helper = () => { ... }
```

### Incorrect

```typescript
const { readFile } = require('fs/promises')
module.exports = { helper }
```

## js-extension-on-imports

Relative imports must include the `.js` extension. This is required by ESM with `nodenext` module resolution.

### Correct

```typescript
import * as Schema from './schema/__.js'
import { helper } from './utils.js'
```

### Incorrect

```typescript
import * as Schema from './schema/__'
import { helper } from './utils'
```

## function-expressions-preferred

Prefer function expressions over function declarations at module scope.

### Correct

```typescript
export const processItems = (items: Item[]) => {
  return items.filter(isValid)
}
```

### Incorrect

```typescript
export function processItems(items: Item[]) {
  return items.filter(isValid)
}
```
