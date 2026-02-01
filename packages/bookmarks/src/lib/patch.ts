/**
 * Domain-specific bookmark patch types and generation.
 *
 * Patches are the intermediate representation between "what changed"
 * and "apply the change." URL is the identity key.
 */

import type { Effect } from "effect"
import type * as SchemaModule from "./schema.js"

// -- Patch types --

export type BookmarkPatch =
  | { readonly op: "add"; readonly url: string; readonly name: string; readonly path: string; readonly date: string }
  | { readonly op: "remove"; readonly url: string; readonly path: string }
  | { readonly op: "rename"; readonly url: string; readonly oldName: string; readonly newName: string }
  | { readonly op: "move"; readonly url: string; readonly fromPath: string; readonly toPath: string }

// -- Patch generation --

/** Generate patches by diffing last-sync state against current state. */
export declare const generatePatches: (
  lastSync: SchemaModule.BookmarkTree,
  current: SchemaModule.BookmarkTree,
  source: string,
) => Effect.Effect<readonly BookmarkPatch[], Error>
