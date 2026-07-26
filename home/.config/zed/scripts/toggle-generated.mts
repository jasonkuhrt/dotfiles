#!/usr/bin/env -S node --no-warnings --experimental-strip-types
/**
 * Toggle `__generated__` visibility in Zed.
 *
 * Flips the `** / __generated__` glob in `file_scan_exclusions` of
 * ~/.config/zed/settings.json:
 *   - present -> removed -> generated dirs VISIBLE (tree + cmd-P + search + git gutter)
 *   - absent  -> added   -> generated dirs HIDDEN from all four
 *
 * `file_scan_exclusions` is Zed's ONLY exclusion lever and it is unified — it is
 * the only way to keep generated files out of cmd-P and project search, at the
 * cost of also removing them from the tree and git gutter while hidden. This
 * toggle exists to flip that on demand (hide while searching, show while browsing).
 *
 * Line-based, NOT JSON.parse, so the file's JSONC comments survive. The entry is
 * inserted as the FIRST element of the array, so it is always comma-terminated and
 * never the trailing element — sidesteps trailing-comma fragility.
 *
 * NOTE: unlike the sibling `hide_gitignore` toggle (panel-only, instant), this
 * drives a filesystem re-scan; if the tree/search don't update, reload the window.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const settingsPath = join(homedir(), '.config', 'zed', 'settings.json');
const glob = '**/__generated__';

const lines = readFileSync(settingsPath, 'utf8').split('\n');
const entryIndex = lines.findIndex((line) => line.includes(`"${glob}"`));

if (entryIndex !== -1) {
  lines.splice(entryIndex, 1);
  console.log('✓ __generated__ now VISIBLE (exclusion removed)');
} else {
  const openIndex = lines.findIndex(
    (line) => line.includes('"file_scan_exclusions"') && line.includes('['),
  );
  if (openIndex === -1) {
    console.error('⚠ file_scan_exclusions array not found in settings.json');
    process.exit(1);
  }
  lines.splice(openIndex + 1, 0, `    "${glob}",`);
  console.log('✓ __generated__ now HIDDEN (exclusion added)');
}

writeFileSync(settingsPath, lines.join('\n'));
