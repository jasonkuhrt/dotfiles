// @ts-check
import { reopenAfterUpdate } from "./updates.js";
import {
  errorMessage,
  listPresets,
  presetKey,
  presetName,
  readPreset,
  snapshot,
  writePreset,
} from "./presets.js";

reopenAfterUpdate();

/**
 * @typedef {
 *   | { type: "save", name: string, windowId: number }
 *   | { type: "rename", id: string, name: string }
 *   | { type: "update", id: string, windowId: number }
 *   | { type: "delete", id: string }
 *   | { type: "restore", id: string }
 * } Command
 */
/** @typedef {{ text: string, error: boolean }} Notice */
/** @typedef {{ ok: true, notice: Notice } | { ok: false, error: string }} Response */

/** @param {unknown} value @returns {value is Record<string, unknown>} */
function isRecord(value) {
  return value !== null && typeof value === "object";
}

/** @param {unknown} value */
function isPresetId(value) {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value)
  );
}

/** @param {unknown} value @returns {value is Command} */
function isCommand(value) {
  if (!isRecord(value) || typeof value.type !== "string") return false;
  switch (value.type) {
    case "save":
      return (
        typeof value.name === "string" &&
        typeof value.windowId === "number" &&
        Number.isInteger(value.windowId) &&
        value.windowId >= 0
      );
    case "rename":
      return isPresetId(value.id) && typeof value.name === "string";
    case "update":
      return (
        isPresetId(value.id) &&
        typeof value.windowId === "number" &&
        Number.isInteger(value.windowId) &&
        value.windowId >= 0
      );
    case "delete":
    case "restore":
      return isPresetId(value.id);
    default:
      return false;
  }
}

/** @param {Notice} notice */
async function rememberNotice(notice) {
  try {
    await chrome.storage.session.set({ notice });
    if (notice.error) {
      await chrome.action.setBadgeBackgroundColor({ color: "#b34722" });
      await chrome.action.setBadgeText({ text: "!" });
    } else {
      await chrome.action.setBadgeText({ text: "" });
    }
  } catch {
    // Notification state must never change the result of a completed command.
  }
}

/** @param {string} verb @param {number} skipped */
function savedNotice(verb, skipped) {
  return {
    text: skipped
      ? `${verb}. ${skipped} special tab${skipped === 1 ? " was" : "s were"} skipped; web tabs and new tabs are supported.`
      : `${verb}.`,
    error: false,
  };
}

/** @param {number} windowId */
async function captureWindow(windowId) {
  let source;
  try {
    source = await chrome.windows.get(windowId);
  } catch {
    throw new Error("The window you wanted to save is no longer open.");
  }
  if (source.incognito || source.type !== "normal") {
    throw new Error("Open Tab Presets in a regular Chrome window.");
  }
  return snapshot(await chrome.tabs.query({ windowId }));
}

/** @param {string} value @param {string} [exceptId] */
async function uniqueName(value, exceptId) {
  const name = presetName(value);
  const normalized = name.toLocaleLowerCase();
  const { presets } = await listPresets();
  if (presets.some((preset) => preset.id !== exceptId && preset.name.trim().toLocaleLowerCase() === normalized)) {
    throw new Error(`A preset named “${name}” already exists. Update that preset or choose another name.`);
  }
  return name;
}

/** @param {string} name @param {number} windowId @returns {Promise<Notice>} */
async function save(name, windowId) {
  const checkedName = await uniqueName(name);
  const captured = await captureWindow(windowId);
  await writePreset({ version: 1, id: crypto.randomUUID(), name: checkedName, tabs: captured.tabs });
  return savedNotice(`Saved “${checkedName}”`, captured.skipped);
}

/** @param {string} id @param {string} name @returns {Promise<Notice>} */
async function rename(id, name) {
  const preset = await readPreset(id);
  const checkedName = await uniqueName(name, id);
  await writePreset({ ...preset, name: checkedName });
  return { text: `Renamed to “${checkedName}”.`, error: false };
}

/** @param {string} id @param {number} windowId @returns {Promise<Notice>} */
async function update(id, windowId) {
  const preset = await readPreset(id);
  const captured = await captureWindow(windowId);
  await writePreset({ ...preset, tabs: captured.tabs });
  return savedNotice(`Updated “${preset.name}”`, captured.skipped);
}

/** @param {string} id @returns {Promise<Notice>} */
async function remove(id) {
  const preset = await readPreset(id);
  await chrome.storage.local.remove(presetKey(id));
  return { text: `Deleted “${preset.name}”.`, error: false };
}

/** @param {string} id @returns {Promise<Notice>} */
async function restore(id) {
  const preset = await readPreset(id);
  const window = await chrome.windows.create({ url: "about:blank", focused: false, type: "normal" });
  const windowId = window?.id;
  const placeholder = window?.tabs?.[0]?.id;
  if (windowId === undefined || placeholder === undefined) {
    throw new Error("Chrome could not create a window. Please try again.");
  }

  /** @type {number[]} */
  const opened = [];
  /** @type {number | undefined} */
  let activeId;
  let failed = 0;
  for (const tab of preset.tabs) {
    try {
      const created = await chrome.tabs.create({
        windowId, url: tab.url, pinned: tab.pinned, index: opened.length, active: false,
      });
      if (created.id === undefined) throw new Error("Chrome did not return a tab.");
      opened.push(created.id);
      if (tab.active) activeId = created.id;
    } catch {
      failed++;
    }
  }
  if (opened.length) {
    await chrome.tabs.update(activeId ?? opened[0], { active: true });
    await chrome.tabs.remove(placeholder);
  }

  /** @type {Notice} */
  const notice = failed
    ? {
        text: `“${preset.name}”: ${opened.length} of ${preset.tabs.length} tabs opened. The preset is unchanged; you can try again.`,
        error: true,
      }
    : { text: `Opened “${preset.name}”.`, error: false };

  // Save feedback before focusing the new window dismisses the popup.
  await rememberNotice(notice);
  await chrome.windows.update(windowId, { focused: true });
  return notice;
}

/** @param {Command} command @returns {Promise<Notice>} */
async function execute(command) {
  switch (command.type) {
    case "save": return save(command.name, command.windowId);
    case "rename": return rename(command.id, command.name);
    case "update": return update(command.id, command.windowId);
    case "delete": return remove(command.id);
    case "restore": return restore(command.id);
  }
}

/** @param {Command} command @returns {Promise<Response>} */
async function run(command) {
  return navigator.locks.request("tab-presets", async () => {
    try {
      const notice = await execute(command);
      await rememberNotice(notice);
      return /** @type {Response} */ ({ ok: true, notice });
    } catch (error) {
      const text = errorMessage(error);
      await rememberNotice({ text, error: true });
      return /** @type {Response} */ ({ ok: false, error: text });
    }
  });
}

// Worker ownership lets commands finish after the action popup is dismissed.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id) return;
  if (!isCommand(message)) {
    sendResponse(/** @type {Response} */ ({ ok: false, error: "Invalid Tab Presets command." }));
    return;
  }
  void (async () => {
    try {
      sendResponse(await run(message));
    } catch (error) {
      const text = errorMessage(error);
      await rememberNotice({ text, error: true });
      sendResponse(/** @type {Response} */ ({ ok: false, error: text }));
    }
  })();
  return true;
});
