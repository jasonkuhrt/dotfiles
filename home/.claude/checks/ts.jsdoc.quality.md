## no-jsdoc-type-repetition

TypeScript provides types; JSDoc provides meaning. Never duplicate type information in JSDoc tags.

### Correct

```typescript
/**
 * Validates user meets minimum requirements.
 * @param name - Display name (must be non-empty)
 * @param age - Must be 13 or older
 */
function isValidUser(name: string, age: number): boolean { ... }
```

### Incorrect

```typescript
/**
 * @param {string} name - The user's name
 * @param {number} age - The user's age
 * @returns {boolean} Whether the user is valid
 */
function isValidUser(name: string, age: number): boolean { ... }
```

## jsdoc-forbidden-tags

These JSDoc tags are forbidden in TypeScript projects — TypeScript already handles what they express.

Forbidden: `@type`, `@typedef`, `@callback`, `@param {Type}`, `@returns {Type}`

### Correct

```typescript
/** Parses JSON configuration file. */
function parseConfig(path: string): Config { ... }
```

### Incorrect

```typescript
/** @type {Config} */
const config = parseConfig('config.json')

/** @typedef {Object} Config */

/** @callback ConfigParser */
```

## no-jsdoc-on-barrel-exports

Never add JSDoc to namespace exports (`export * as`), barrel exports (`export *`), or re-exports. JSDoc on these is invisible to consumers — it doesn't appear in hover or autocomplete.

### Correct

```typescript
export * as Utils from './utils.js'
export * from './helpers.js'
export { createUser } from './user.js'
```

### Incorrect

```typescript
/** Utility functions for string manipulation. */
export * as Utils from './utils.js'

/** Helper functions. */
export * from './helpers.js'

/** Creates a new user. */
export { createUser } from './user.js'
```

## no-duplicate-jsdoc-on-implementation

If a const implements an interface that already has JSDoc, don't repeat the JSDoc on the const. The interface documentation is inherited.

### Correct

```typescript
/** Creates a user validator. */
interface UserValidator {
  validate(user: User): boolean
}

// Interface JSDoc is inherited
const validator: UserValidator = { ... }
```

### Incorrect

```typescript
/** Creates a user validator. */
interface UserValidator {
  validate(user: User): boolean
}

/** Creates a user validator. */
const validator: UserValidator = { ... }
```

## deprecated-must-include-migration

`@deprecated` tags must always include a migration path — what to use instead and when removal will happen.

### Correct

```typescript
/**
 * @deprecated Use {@link createUser} instead. Will be removed in v3.0.
 */
function addUser(name: string): User { ... }
```

### Incorrect

```typescript
/**
 * @deprecated
 */
function addUser(name: string): User { ... }
```

## no-jsdoc-on-self-evident

Skip JSDoc entirely for self-evident code, internal helpers, type-only exports, and trivial getters/setters. JSDoc should add meaning TypeScript can't express — not narrate the obvious.

### Correct

```typescript
// Self-evident — no JSDoc needed
const getName = (user: User): string => user.name

// Type-only export — self-documenting
export type Config = { timeout: number; retries: number }

// Internal helper used in one place — no JSDoc needed
const normalizeInput = (raw: string) => raw.trim().toLowerCase()
```

### Incorrect

```typescript
/** Gets the name of the user. */
const getName = (user: User): string => user.name

/** The configuration type. */
export type Config = { timeout: number; retries: number }

/** Normalizes the input string. */
const normalizeInput = (raw: string) => raw.trim().toLowerCase()
```

## typeParam-only-for-explicit

Only use `@typeParam` for type parameters that users explicitly provide. Don't document type parameters that are inferred from arguments.

### Correct

```typescript
// Document — user explicitly provides type
/**
 * Creates a type-safe event emitter.
 * @typeParam Events - Map of event names to payload types
 * @example
 * const emitter = createEmitter<{ click: MouseEvent; key: KeyboardEvent }>()
 */
function createEmitter<
  Events extends Record<string, unknown>,
>(): Emitter<Events>

// Don't document — type is inferred from arguments
/**
 * Returns first element of array.
 */
function first<T>(arr: T[]): T | undefined
```

### Incorrect

```typescript
/**
 * Returns first element of array.
 * @typeParam T - The element type
 */
function first<T>(arr: T[]): T | undefined
```

## jsdoc-link-requires-import

`{@link Identifier}` is only clickable when the identifier is in scope (same file or imported). If it's not in scope, it renders as plain text.

### Correct

```typescript
import type { MuxAsset as _MuxAsset } from '@heartbeat/types'

/**
 * Uploads audio to {@link _MuxAsset | Mux} for transcoding.
 */
export const uploadVoiceNote = async (blob: Blob) => { ... }
```

### Incorrect

```typescript
// MuxAsset not imported — {@link} renders as plain text
/**
 * Uploads audio to {@link MuxAsset | Mux} for transcoding.
 */
export const uploadVoiceNote = async (blob: Blob) => { ... }
```

## jsdoc-only-import-underscore-prefix

When a type is imported solely for use in `{@link}`, use underscore prefix to signal intent and avoid unused-import lint errors.

### Correct

```typescript
import type { MuxAsset as _MuxAsset } from '@heartbeat/types'

/** Uploads audio to {@link _MuxAsset | Mux} for transcoding. */
```

### Incorrect

```typescript
import type { MuxAsset } from '@heartbeat/types'

/** Uploads audio to {@link MuxAsset | Mux} for transcoding. */
// MuxAsset triggers unused-import lint error
```

## namespace-export-jsdoc-workaround

To add JSDoc to `export * as Name`, use `@ts-expect-error` with a duplicate empty namespace. This is the only way to attach documentation to namespace re-exports.

### Correct

```typescript
// @ts-expect-error Duplicate identifier
export * as Utils from './utils.js'
/** Utility functions for string manipulation. */
export namespace Utils {}
```

### Incorrect

```typescript
// JSDoc on the export is invisible to consumers
/** Utility functions for string manipulation. */
export * as Utils from './utils.js'
```

## default-for-optional-properties

Use `@default` on optional interface properties that have runtime defaults. TypeScript shows the type but not the default value — `@default` makes it visible in hover.

### Correct

```typescript
interface Options {
  /** @default 3000 */
  timeout?: number
  /** @default 'warn' */
  logLevel?: 'debug' | 'info' | 'warn' | 'error'
}
```

### Incorrect

```typescript
interface Options {
  timeout?: number
  logLevel?: 'debug' | 'info' | 'warn' | 'error'
}
// Consumers have to read the implementation to discover defaults
```

## throws-for-exceptions

Use `@throws` to document exceptions — TypeScript doesn't track thrown errors. Include the error type and condition.

### Correct

```typescript
/**
 * Parses JSON configuration file.
 * @throws {SyntaxError} If JSON is malformed
 * @throws {Error} If file doesn't exist
 */
function parseConfig(path: string): Config { ... }
```

### Incorrect

```typescript
// No indication this function can throw
function parseConfig(path: string): Config { ... }
```

## no-variable-jsdoc-for-hover

Don't add JSDoc to a variable declaration to make documentation appear on hover. Hovering a variable only shows the type signature, never the type's JSDoc — this is [intentional TypeScript behavior](https://github.com/microsoft/TypeScript/issues/37876), not a bug. Adding JSDoc to the variable duplicates documentation and violates DRY. Instead, rely on hover working correctly on the type name and property access.

### Correct

```typescript
/** Player controls. */
interface AudioPlayer {
  /** Whether currently playing. */
  isPlaying: boolean
}

// No JSDoc on variable — hover on `player.isPlaying` shows "Whether currently playing."
// Hover on `AudioPlayer` shows "Player controls."
const player: AudioPlayer = { isPlaying: false }
```

### Incorrect

```typescript
/** Player controls. */
interface AudioPlayer {
  /** Whether currently playing. */
  isPlaying: boolean
}

// Duplicated to "fix" hover — but variable hover still won't show type JSDoc
/** Player controls. */
const player: AudioPlayer = { isPlaying: false }
```
