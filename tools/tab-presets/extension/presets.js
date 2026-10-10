// @ts-check

/** @typedef {{ url: string, title: string, pinned: boolean, active: boolean }} SavedTab */
/** @typedef {{ version: 1, id: string, name: string, tabs: SavedTab[] }} Preset */

/** @param {string | undefined} value */
export function restorableUrl(value) {
  if (!value) return null;
  if (value === "about:blank" || value === "chrome://newtab/") return value;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

/** @param {string} value */
export function presetName(value) {
  const name = value.trim();
  if (!name || name.length > 80) throw new Error("Give your preset a name (up to 80 characters).");
  return name;
}

/** @param {chrome.tabs.Tab[]} source */
export function snapshot(source) {
  /** @type {SavedTab[]} */
  const tabs = [];
  for (const tab of [...source].sort((a, b) => a.index - b.index)) {
    const url = restorableUrl(tab.pendingUrl ?? tab.url);
    if (url) tabs.push({ url, title: tab.title || url, pinned: tab.pinned, active: tab.active });
  }
  if (!tabs.length) throw new Error("There are no web tabs to save in this window.");
  // Pins are always leftmost in Chrome; retain order within each section.
  tabs.sort((a, b) => Number(b.pinned) - Number(a.pinned));
  if (!tabs.some((tab) => tab.active)) tabs[0].active = true;
  return { tabs, skipped: source.length - tabs.length };
}

/** @param {unknown} value @returns {value is Preset} */
export function isPreset(value) {
  if (!value || typeof value !== "object") return false;
  const record = /** @type {Record<string, unknown>} */ (value);
  if (record.version !== 1 || typeof record.id !== "string" || typeof record.name !== "string") return false;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(record.id)) return false;
  if (!record.name.trim() || record.name.length > 80 || !Array.isArray(record.tabs) || !record.tabs.length) return false;
  let unpinned = false;
  let active = 0;
  for (const tab of record.tabs) {
    if (!tab || typeof tab.url !== "string" || !restorableUrl(tab.url) || typeof tab.title !== "string"
      || typeof tab.pinned !== "boolean" || typeof tab.active !== "boolean") return false;
    if (unpinned && tab.pinned) return false;
    unpinned ||= !tab.pinned;
    active += Number(tab.active);
  }
  return active === 1;
}

/** @param {string} id */
export function presetKey(id) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) throw new Error("Invalid preset ID.");
  return `preset:${id}`;
}

/** @returns {Promise<{ presets: Preset[], invalid: number }>} */
export async function listPresets() {
  const items = await chrome.storage.local.get(null);
  const presets = [];
  let invalid = 0;
  for (const [key, value] of Object.entries(items)) {
    if (!key.startsWith("preset:")) continue;
    if (!isPreset(value) || key !== presetKey(value.id)) {
      invalid++;
      continue;
    }
    presets.push(value);
  }
  return { presets: presets.sort((a, b) => a.name.localeCompare(b.name)), invalid };
}

/** @param {string} id @returns {Promise<Preset>} */
export async function readPreset(id) {
  const key = presetKey(id);
  const data = await chrome.storage.local.get(key);
  const preset = data[key];
  if (!isPreset(preset) || preset.id !== id) throw new Error("This preset is no longer available.");
  return preset;
}

/** @param {Preset} preset */
export async function writePreset(preset) {
  if (!isPreset(preset)) throw new Error("The preset could not be saved. Your previous data has been kept.");
  await chrome.storage.local.set({ [presetKey(preset.id)]: preset });
}

/** @param {unknown} error */
export function errorMessage(error) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
