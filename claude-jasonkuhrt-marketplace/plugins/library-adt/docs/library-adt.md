# Library Conventions: ADT Extension

Extends [Namespace Module Pattern](./namespace-module.md) with patterns specific to Algebraic Data Types (ADTs)
and discriminated unions.

## Library: Union ADT (Algebraic Data Type) Pattern

* About
  * Pattern for discriminated unions with multiple member types
  * Provides type-safe access to union members and constructors
  * Library name should match the ADT name (e.g., `lifecycle-event` lib for `LifecycleEvent` ADT)
* Rules
  1. Library directory name matches the ADT name in kebab-case
  2. Union definition imports members directly (not via Barrel Export)
  3. Barrel Export exports members as namespaces
  4. Structure:
  ```
  /lib/lifecycle-event/
    ├── $.ts                    // export * as LifecycleEvent from './$$.js'
    ├── $$.ts                   // exports member namespaces
    ├── lifecycle-event.ts      // union definition
    ├── added.ts               // member
    └── removed.ts             // member
  ```
  * Implementation (example with Effect Schema):
    ```typescript
    // lifecycle-event.ts
    import { Added } from './added.js' // direct import, not from $$.ts
    import { Removed } from './removed.js'
    export const LifecycleEvent = Schema.Union(Added, Removed)

    // $$.ts
    export * as Added from './added.js'
    export * from './lifecycle-event.js'
    export * as Removed from './removed.js'
    ```

## ADT Unions - Comprehensive Guide

### Overview

ADT (Algebraic Data Type) Unions are discriminated unions with multiple member types that provide type-safe access to
union members and constructors. This is a specialized pattern commonly used with schema libraries (like Effect Schema,
Zod, etc.) for complex data modeling.

### Core Principles

* __ADT Level__
  * Choose a name using pascal case
  * Create a module:
    * named as `<self>.ts` using kebab case
    * Each member should be a file (NOT a directory) in the same directory
    * Each member should be re-exported as namespace from $$.ts using `export * as <MemberName> from './<member>.js'`
    * The union schema itself is exported from the main module file
    * Imports all members and exports a union schema of them
    * example (with Effect Schema): `export const Catalog = Schema.Union(Versioned,Unversioned)` in `catalog.ts` under
      `catalog/` directory

* __Member Level__
  * Use tagged/discriminated structures to define members (e.g., `Schema.TaggedStruct` in Effect)
  * Each member is a single file (e.g., `versioned.ts`, `unversioned.ts`)
    * tag name: `<adt name><member name>` pascal case
    * naming of export schema in module: `<member name>` pascal case
    * example: `export const Versioned = TaggedStruct('CatalogVersioned', ...` in `versioned.ts` under `catalog/`
      directory

### ADT Union Directory Structure

```
src/lib/catalog/
├── $.ts          # export * as Catalog from './$$.js'  <-- ALWAYS points to $$.js when it exists
├── $$.ts         # export * as Versioned from './versioned.js'
│                 # export * as Unversioned from './unversioned.js'
│                 # export * from './catalog.js'
├── catalog.ts    # import { Versioned } from './versioned.js'
│                 # import { Unversioned } from './unversioned.js'
│                 # export const Catalog = createUnion(Versioned, Unversioned)
├── versioned.ts  # export const Versioned = createTaggedType('CatalogVersioned', { ... })
└── unversioned.ts # export const Unversioned = createTaggedType('CatalogUnversioned', { ... })
```

### ADT Import Patterns

__CRITICAL RULE__: For ADT unions, ALWAYS import ONLY from $.js (namespace), NEVER from $$.js (barrel)

```typescript
// ✅ CORRECT: Import ONLY from namespace
import { LifecycleEvent } from './lifecycle-event/$.js'
import { Lifecycle } from './lifecycle/$.js'

// ❌ WRONG: NEVER do this
import { Added, LifecycleEvent, Removed } from './lifecycle-event/$$.js'
import { ObjectType, InterfaceType, Lifecycle } from './lifecycle/$$.js'

// To access members, use the namespace pattern:
const added: LifecycleEvent.Added.Added = LifecycleEvent.Added.make({...})
const objectType: Lifecycle.ObjectType.ObjectType = Lifecycle.ObjectType.make({...})
```

### Correct ADT imports in consuming code

```typescript
// Import the union type from $.ts
import { LifecycleEvent } from './lifecycle-event/$.js'

// Import member namespaces from $$.ts
import { Added, Removed } from './lifecycle-event/$$.js'

// Use member types via namespace
const addedEvent: Added.Added = Added.make({ ... })
const removedEvent: Removed.Removed = Removed.make({ ... })
```

### ADT Factory Pattern

For discriminated unions, use the factory pattern to create members:

```typescript
// Define union (example with Effect Schema)
const MyUnion = Schema.Union(MemberA, MemberB)

// Create factory using your library's union utilities
const make = createUnionFactory(MyUnion) // Library-specific implementation

// Use with full type safety - tag determines fields and return type
const instanceA = make('MemberATag', {/* fields specific to MemberA */})
const instanceB = make('MemberBTag', {/* fields specific to MemberB */})
```

__Benefits:__

* Type-safe tag selection with autocomplete
* Automatic field inference based on tag
* No manual conditionals needed
* Single source of truth for union member creation

__Example with LifecycleEvent:__

```typescript
// Before: verbose manual approach
const createEvent = (type: 'Added' | 'Removed') => {
  const baseEvent = { schema, revision }
  return type === 'Added'
    ? LifecycleEvent.Added.make(baseEvent)
    : LifecycleEvent.Removed.make(baseEvent)
}

// After: clean factory approach (library-specific implementation)
const createEvent = createUnionFactory(LifecycleEvent.LifecycleEvent)
const added = createEvent('LifecycleEventAdded', { schema, revision })
const removed = createEvent('LifecycleEventRemoved', { schema, revision })
```

## Effect Schema Class Conventions

When using Effect Schema classes (S.Class, S.TaggedClass), follow these conventions:

### Class Definition

* Always include `static is = S.is(ClassName)` inside the class body
* Never use empty `{}` body
* __Class name__ = member name (the short, local name you use when importing)
* __Tag name__ = fully qualified name for discriminated unions

```typescript
// ✅ CORRECT - Class name matches member name, tag is fully qualified
export class Versioned extends S.TaggedClass<Versioned>('DocumentVersioned')('DocumentVersioned', {
  // ... fields
}) {
  static is = S.is(Versioned)
}

// ❌ WRONG - Class name uses fully qualified name
export class DocumentVersioned
  extends S.TaggedClass<DocumentVersioned>('DocumentVersioned')('DocumentVersioned', {
    // ... fields
  })
{
  static is = S.is(DocumentVersioned)
}

// ✅ CORRECT - Simple class
export class Revision extends S.Class<Revision>('Revision')({
  date: S.String,
  hash: S.String,
}) {
  static is = S.is(Revision)
}

// ❌ WRONG - empty body
export class Revision extends S.Class<Revision>('Revision')({
  date: S.String,
  hash: S.String,
}) {}
```

### Type Derivation from Effect Schemas

__Use `.Type` property, NOT `S.Schema.Type<typeof>` helper.__

```typescript
// ✅ CORRECT
export const MediaType = S.Literal('image', 'video')
export type MediaType = typeof MediaType.Type

// ❌ WRONG
export type MediaType = S.Schema.Type<typeof MediaType>
```

__Rules:__

* __Non-class schemas__ (Literal, Struct, Union, Array): `typeof SchemaName.Type`
* __Class schemas__ (S.Class, S.TaggedClass): No type declaration needed, class IS the type
* __Transformations__: `typeof Schema.Type` (decoded), `typeof Schema.Encoded` (input), `typeof Schema.Context` (deps)

### Barrel Exports for Effect Schema Classes

* Export classes directly, not as namespace exports
* The class itself serves as the namespace

```typescript
// In $.ts
// ✅ CORRECT - direct export for simple classes
export { Document } from './document.js'
export { Revision } from './revision.js'

// ❌ WRONG - namespace export for simple classes
export * as Revision from './revision.js'
```

### Simple ADT Pattern (Alternative to Full ADT Structure)

For simpler ADTs where you don't need the full `$$.ts` barrel structure, you can use a simplified pattern:

```typescript
// version-coverage.ts - union definition file
import { One } from './one.js'
import { Set } from './set.js'
import { Unversioned } from './unversioned.js'

// Direct class exports (not namespace exports)
export { One } from './one.js'
export { Set } from './set.js'
export { Unversioned } from './unversioned.js'

// Union definition
export const VersionCoverage = S.Union(One, Set, Unversioned)

// Domain logic functions...
```

This pattern is appropriate when:

* The ADT is relatively simple with few members
* You don't need the additional namespace organization
* Members are Effect Schema classes (S.Class or S.TaggedClass)

Key rules for simple ADT pattern:

* Use direct class exports (`export { ClassName }`)
* No `$$.ts` file needed
* `$.ts` exports namespace from main union file
* Each member is still a separate file

### Codec Conventions

* Simple classes (S.Class, S.TaggedClass): Don't pre-define codec exports
* Consumers should use `S.decode(ClassName)` directly
* Transformation schemas (transformOrFail): Must export codecs since they're not classes

```typescript
// Simple class - no codec exports needed
export class User extends S.Class<User>('User')({
  name: S.String,
  age: S.Number
}) {
  static is = S.is(User)
}
// Consumer uses: S.decode(User)

// Transformation schema - needs codec exports
export const Version = S.transformOrFail(S.String, VersionUnion, { ... })
export const decode = S.decode(Version)
export const decodeSync = S.decodeSync(Version)
```

### When Traditional Namespace Pattern Still Applies

The original namespace export pattern (`export * as Name`) remains valid for:

* ADT unions with multiple member classes that need grouping
* Transformation schemas that aren't classes themselves
* Complex modules with multiple related exports

```typescript
// ADT Union - namespace pattern is appropriate
// In $$.ts
export * as Added from './added.js'
export * from './lifecycle-event.js'
export * as Removed from './removed.js'

// In $.ts
export * as LifecycleEvent from './$$.js'
```

### Critical: Schema Make Constructor

__ALWAYS__ use the schema's `make` constructor when manually constructing values:

```typescript
// ✅ CORRECT - Use schema.make
const revision = Revision.make({ date: '2024-01-15', version: '1.0.0' })

// ❌ WRONG - Manual object construction
const revision = { _tag: 'Revision', date: '2024-01-15', version: '1.0.0' }

// The make constructor ensures:
// - Type safety and validation
// - Proper tag assignment
// - Default values are applied
// - Transformations are executed
```

__Note__: S.TaggedClass automatically provides the `.make()` method, no need to define it manually.

### ADT Library Rules Summary

1. __Library directory name__ matches the ADT name in kebab-case
2. __Union definition__ imports members directly (not via Barrel Export)
3. __Barrel Export__ exports members as namespaces
4. __Namespace import pattern__ for external consumers
5. __Factory pattern__ for type-safe member creation
6. __Schema.make constructors__ for all value creation

This comprehensive ADT pattern ensures type safety, maintainability, and consistent API design across complex
discriminated union types.
