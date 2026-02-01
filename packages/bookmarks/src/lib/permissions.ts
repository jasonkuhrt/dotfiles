/**
 * Permissions checking.
 *
 * Safari's Bookmarks.plist requires Full Disk Access.
 * This module detects whether the permission is granted and
 * provides a helpful error message with instructions if not.
 */

import type { Effect } from "effect"

/** Check if Full Disk Access is granted. Returns true if accessible. */
export declare const checkFullDiskAccess: () => Effect.Effect<boolean, Error>

/** Assert Full Disk Access, failing with an instructional error if not granted. */
export declare const requireFullDiskAccess: () => Effect.Effect<void, Error>
