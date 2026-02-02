---
paths:
  - "**/*.{ts,tsx}"
---

# TypeScript

- **ALWAYS** use ESM modules, never CJS
- **ALWAYS** verify type checks before running code
- Prefer function expressions over declarations (except overloaded functions)
- Don't use TS enums
- Prefer `unknown` over `any`
- **Never destructure ESM namespace imports** - Use qualified access instead:

  ```typescript
  // GOOD - Use namespace, access via qualified names
  import * as Flo from './__.js'
  Flo.Viz.TerminalRenderer.make(...)
  Flo.ActivityStarted.make(...)

  // BAD - Destructuring from namespace
  import * as Flo from './__.js'
  const { TerminalRenderer } = Flo.Viz  // Don't do this
  const { ActivityStarted } = Flo       // Don't do this
  ```

- **Domain modules use namespace imports matching filename** — a domain module's name represents a domain concept. The namespace prefix adds semantic meaning at call sites:

  ```typescript
  // GOOD - "Patch" carries domain meaning
  import * as Patch from "./patch.js"
  Patch.generatePatches(...)
  Patch.$match(patch, { Add: ..., Remove: ... })

  // GOOD - alias matches filename
  import * as AudioRecorder from "./AudioRecorder.js"

  // BAD - alias doesn't match filename
  import * as Recorder from "./AudioRecorder.js"
  ```

- **Grouping directories use named imports** — a directory that groups files by a non-domain criterion (implementation tool, file type, convention) is housekeeping, not a domain concept. Its barrel re-exports named exports; consumers import those directly:

  ```typescript
  // GOOD - "schema/" groups Schema-defined classes, not a domain concept
  import { BookmarkLeaf, BookmarkTree } from "./schema/__.js"

  // BAD - namespace import on a housekeeping directory
  import * as Schema from "./schema/__.js"
  Schema.BookmarkLeaf  // "Schema" describes the tool, not the domain
  ```

- **No term mappings** - Use the same term everywhere for the same concept:

  ```typescript
  // BAD - "voice" vs "voiceNote" are different terms
  voiceRecorder: VoiceNoteRecorder.VoiceNoteRecorder;

  // GOOD - same term throughout
  voiceNoteRecorder: VoiceNoteRecorder.VoiceNoteRecorder;
  ```

- **Casting rules for conditional types**:
  - **NEVER cast inputs/parameters** - errors reveal real bugs, fix the root cause
  - **DO cast outputs** when implementing complex conditional return types
  - Use simple `as any`, NOT `as unknown as ComplexType<T>` chains
  - Example:

    ```typescript
    // WRONG - casting input hides missing runtime layers
    Ef.runPromise(effect as Ef.Effect<A, never, never>);

    // WRONG - overcomplicated output casting
    return Ef.gen(
      () => input as Generator<any, any, any>,
    ) as unknown as NormalizeResult<T>;

    // RIGHT - simple internal casting for output
    return Ef.gen(() => input as any) as any;
    ```

## Code Style

- Long conditional types: align on `?` and `:` with `//dprint-ignore`. See `formatting-conditional-types` skill for detailed patterns.
- In JSDoc, use `{@link identifier}` syntax for references. See `writing-jsdoc` skill for full guidance.
- **Type-Level Transformations**: Use conditional types over function overloads for type mappings
  - Define type-level utilities (e.g., `type Abs<T>`) that map input types to output types
  - Use these in function signatures: `abs<T>(value: T): Abs<T>`
  - Benefits: Cleaner API, better type inference, no overload resolution issues
  - Example: `type Sign<T> = T extends Positive ? 1 : T extends Negative ? -1 : ...`
- **Module Organization - KNUTH LITERAL Style**: Organize code from most abstract to least abstract
  - Present main concepts and public exports first
  - Implementation details and helper utilities belong at the bottom
  - Creates a top-down reading experience where the API is immediately visible
  - Implementation details are available when needed but don't clutter the main interface
  - **Example**:

    ```typescript
    // Public exports and main types first (most abstract)
    export type MainAPI = ...
    export interface PublicInterface = ...

    // Implementation types
    type ImplementationType = ...

    // Helpers and utilities last (least abstract)
    type HelperType = ...
    const helperFunction = ...
    ```

## Script Execution

- Always use tsx to execute TypeScript files
- Always use `tsconfig.json` when running tsc to ensure correct configuration
- Always use `.js` extension on relative imports (ESM requirement with nodenext module resolution)

## Other

- Never use child process exec to execute a script when you could ESM import it instead
- Never use ESM dynamic import when you could ESM statically import it instead
- Prefer zx package for scripts over bash
