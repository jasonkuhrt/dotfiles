// @ts-check
import { errorMessage, listPresets } from "./presets.js";
import { refreshIfUpdated } from "./updates.js";

/** @template {HTMLElement} T @param {string} id @returns {T} */
function element(id) {
  const result = document.getElementById(id);
  if (!result) throw new Error(`Missing element: ${id}`);
  return /** @type {T} */ (result);
}

const saveForm = /** @type {HTMLFormElement} */ (element("save-form"));
const nameInput = /** @type {HTMLInputElement} */ (element("preset-name"));
const list = element("presets");
const status = element("status");
const dialog = /** @type {HTMLDialogElement} */ (element("edit-dialog"));
const editForm = /** @type {HTMLFormElement} */ (element("edit-form"));
const newName = /** @type {HTMLInputElement} */ (element("new-name"));
const confirm = /** @type {HTMLButtonElement} */ (element("confirm"));
/** @type {{ id: string, action: "rename" | "update" | "delete" } | undefined} */
let edit;
/** @type {number | undefined} */
let sourceWindow;
let busy = false;
let libraryWarning = "";

/** @param {string} message @param {boolean} [error] */
function inform(message, error = false) {
  status.textContent = [message, libraryWarning].filter(Boolean).join(" ");
  status.dataset.error = String(error || Boolean(libraryWarning));
}

/** @param {boolean} value */
function setBusy(value) {
  busy = value;
  document.querySelectorAll("button").forEach((button) => { button.disabled = value; });
  nameInput.disabled = value;
  newName.disabled = value || edit?.action !== "rename";
  saveForm.setAttribute("aria-busy", String(value));
  editForm.setAttribute("aria-busy", String(value));
}

function windowId() {
  if (sourceWindow === undefined) throw new Error("Reopen Tab Presets in the window you want to save.");
  return sourceWindow;
}

/** @param {import("./worker.js").Command} command */
async function send(command) {
  /** @type {import("./worker.js").Response} */
  const result = await chrome.runtime.sendMessage(command);
  if (!result?.ok) throw new Error(result?.error || "Chrome could not complete the action.");
  return result.notice;
}

/** @param {import("./worker.js").Notice} notice */
async function refreshAfterWrite(notice) {
  try { await render(); }
  catch { notice = { text: `${notice.text} Reopen the popup to refresh the list.`, error: true }; }
  inform(notice.text, notice.error);
}

/** @param {string} label @param {() => void} onClick */
function button(label, onClick) {
  const item = document.createElement("button");
  item.type = "button";
  item.textContent = label;
  item.addEventListener("click", onClick);
  return item;
}

async function render() {
  const { presets, invalid } = await listPresets();
  libraryWarning = invalid ? `${invalid} unreadable preset${invalid === 1 ? " is" : "s are"} hidden. The saved data has been kept.` : "";
  list.replaceChildren();
  element("empty").hidden = presets.length !== 0;
  for (const preset of presets) {
    const item = document.createElement("li");
    item.className = "preset";
    const top = document.createElement("div");
    top.className = "preset-top";
    const info = document.createElement("div");
    info.className = "preset-info";
    const title = document.createElement("h2");
    title.textContent = preset.name;
    const count = document.createElement("p");
    const pins = preset.tabs.filter((tab) => tab.pinned).length;
    count.textContent = `${preset.tabs.length} tab${preset.tabs.length === 1 ? "" : "s"} · ${pins} pinned`;
    info.append(title, count);
    const open = button("Open", () => { void openPreset(preset.id); });
    open.title = `Open ${preset.name} in a new window`;
    top.append(info, open);
    const actions = document.createElement("div");
    actions.className = "actions";
    for (const action of /** @type {const} */ (["rename", "update", "delete"])) {
      const label = action === "update" ? "Update from this window" : action[0].toUpperCase() + action.slice(1);
      actions.append(button(label, () => showEdit(preset, action)));
    }
    item.append(top, actions);
    list.append(item);
  }
  setBusy(busy);
}

/** @param {import("./presets.js").Preset} preset @param {"rename" | "update" | "delete"} action */
function showEdit(preset, action) {
  edit = { id: preset.id, action };
  element("dialog-error").textContent = "";
  const rename = action === "rename";
  element("dialog-title").textContent = { rename: "Rename preset", update: "Update preset?", delete: "Delete preset?" }[action];
  element("dialog-description").textContent = action === "update"
    ? `Replace the saved tabs in “${preset.name}” with this window's current tabs and pins?`
    : action === "delete" ? `Delete “${preset.name}”? Your open tabs will stay as they are.` : "";
  newName.hidden = !rename;
  newName.required = rename;
  newName.disabled = !rename;
  element("rename-label").hidden = !rename;
  newName.value = preset.name;
  confirm.textContent = { rename: "Save name", update: "Update", delete: "Delete" }[action];
  confirm.classList.toggle("danger", action === "delete");
  dialog.showModal();
  if (rename) { newName.focus(); newName.select(); }
}

/** @param {string} id */
async function openPreset(id) {
  if (busy) return;
  setBusy(true);
  inform("Opening your tabs…");
  try {
    await send({ type: "restore", id });
    window.close();
  } catch (error) {
    inform(errorMessage(error), true);
  } finally {
    setBusy(false);
  }
}

saveForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (busy) return;
  setBusy(true);
  void (async () => {
    try {
      const notice = await send({ type: "save", name: nameInput.value, windowId: windowId() });
      nameInput.value = "";
      await refreshAfterWrite(notice);
    } catch (error) { inform(errorMessage(error), true); }
    finally { setBusy(false); }
  })();
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (busy || !edit) return;
  const { id, action } = edit;
  setBusy(true);
  void (async () => {
    try {
      const notice = await send(action === "rename" ? { type: action, id, name: newName.value }
        : action === "update" ? { type: action, id, windowId: windowId() } : { type: action, id });
      dialog.close();
      await refreshAfterWrite(notice);
    } catch (error) { element("dialog-error").textContent = errorMessage(error); }
    finally { setBusy(false); if (!dialog.open) nameInput.focus(); }
  })();
});

// Prevent Escape from dismissing a confirmation while its write is in progress.
dialog.addEventListener("cancel", (event) => { if (busy) event.preventDefault(); });

void (async () => {
  setBusy(true);
  try {
    const current = await chrome.windows.getCurrent();
    if (current.incognito || current.type !== "normal") throw new Error("Open Tab Presets in a regular Chrome window.");
    sourceWindow = current.id;
    if (await refreshIfUpdated(windowId())) return;
    await render();
    const { notice } = await chrome.storage.session.get("notice");
    if (notice && typeof notice.text === "string") {
      inform(notice.text, notice.error === true);
      await chrome.storage.session.remove("notice");
      await chrome.action.setBadgeText({ text: "" });
    } else inform("");
  } catch (error) { inform(errorMessage(error), true); }
  finally { setBusy(false); }
})();
