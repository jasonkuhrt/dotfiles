// @ts-check

const reopenKey = "reopenAfterUpdate";

/** Reload an installed local extension after a prepared version change.
 * @param {number} windowId
 */
export async function refreshIfUpdated(windowId) {
  // Use the same lock as saves/restores; never interrupt an in-flight command.
  return navigator.locks.request("tab-presets", async () => {
    const response = await fetch(chrome.runtime.getURL("manifest.json"), { cache: "no-store" });
    if (!response.ok) throw new Error("Could not read Tab Presets. Please reopen the popup.");
    const disk = await response.json();
    const loaded = chrome.runtime.getManifest();
    if (disk.version === loaded.version) return false;
    if (typeof disk.version !== "string" || !/^\d+(?:\.\d+){0,3}$/.test(disk.version)) {
      throw new Error("The prepared Tab Presets update has an invalid version.");
    }
    // storage.session is cleared by extension reload; this one-shot handoff must
    // survive it. Presets and the extension ID stay unchanged.
    const { reopenAfterUpdate } = await chrome.storage.local.get(reopenKey);
    if (reopenAfterUpdate?.version === disk.version) {
      throw new Error("The update could not finish. Please restart Chrome and open Tab Presets again.");
    }
    await chrome.storage.local.set({ [reopenKey]: { version: disk.version, windowId } });
    chrome.runtime.reload();
    return true;
  });
}

/** Register from the service worker, synchronously at module evaluation. */
export function reopenAfterUpdate() {
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason !== "update") return;
    void (async () => {
      try {
        const data = await chrome.storage.local.get(reopenKey);
        const pending = data[reopenKey];
        if (!pending) return;
        await chrome.storage.local.remove(reopenKey);
        if (pending.version !== chrome.runtime.getManifest().version || !Number.isInteger(pending.windowId)) return;
        const source = await chrome.windows.get(pending.windowId);
        // If the user moved on, finish the update quietly without stealing focus.
        if (source.focused) await chrome.action.openPopup({ windowId: pending.windowId });
      } catch {
        // Reload succeeded even if the original window was closed or lost focus.
      }
    })();
  });
}
