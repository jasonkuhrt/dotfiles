import { test } from "node:test";
import assert from "node:assert/strict";
import { isPreset, restorableUrl, snapshot } from "./extension/presets.js";

// Data fixtures for pure capture logic; Chrome APIs are not mocked.
function tab(index, url, pinned = false, active = false) {
  return { index, url, title: `Tab ${index}`, pinned, active };
}

test("capture retains repeated URLs, pin order, and the active tab even if the query is unordered", () => {
  const captured = snapshot([
    tab(3, "https://example.com/", false, true),
    tab(1, "https://example.com/inbox", true),
    tab(2, "https://example.com/"),
    tab(0, "https://example.com/calendar", true),
  ]);
  assert.deepEqual(captured.tabs.map(({ title, pinned, active }) => ({ title, pinned, active })), [
    { title: "Tab 0", pinned: true, active: false },
    { title: "Tab 1", pinned: true, active: false },
    { title: "Tab 2", pinned: false, active: false },
    { title: "Tab 3", pinned: false, active: true },
  ]);
  assert.equal(captured.tabs[2].url, captured.tabs[3].url);
  assert.equal(captured.skipped, 0);
});

test("capture uses pending navigation and reports skipped pages, choosing a new active tab when needed", () => {
  const captured = snapshot([
    tab(0, "chrome://settings/", false, true),
    { ...tab(1, "https://example.com/old"), pendingUrl: "https://example.com/new" },
    tab(2, "chrome://newtab/"),
  ]);
  assert.equal(captured.skipped, 1);
  assert.deepEqual(captured.tabs.map(({ url, active }) => ({ url, active })), [
    { url: "https://example.com/new", active: true },
    { url: "chrome://newtab/", active: false },
  ]);
});

test("empty or unrestorable captures fail instead of overwriting a usable preset", () => {
  assert.throws(() => snapshot([]), /no web tabs/);
  assert.throws(() => snapshot([tab(0, "blob:https://example.com/gone")]), /no web tabs/);
  for (const url of ["javascript:alert(1)", "file:///tmp/a", "chrome-extension://other/private.html", "data:text/html,a", "invalid"]) {
    assert.equal(restorableUrl(url), null);
  }
});

test("stored presets reject unsupported versions, broken tabs and impossible pin/active layouts", () => {
  const preset = {
    version: 1, id: "12345678-1234-1234-1234-123456789abc", name: "Daily",
    tabs: snapshot([tab(0, "https://example.com/", true, true), tab(1, "about:blank")]).tabs,
  };
  assert.equal(isPreset(preset), true);
  assert.equal(isPreset({ ...preset, version: 2 }), false);
  assert.equal(isPreset({ ...preset, tabs: [] }), false);
  assert.equal(isPreset({ ...preset, tabs: [null] }), false);
  assert.equal(isPreset({ ...preset, tabs: [...preset.tabs].reverse() }), false);
  assert.equal(isPreset({ ...preset, tabs: preset.tabs.map((item) => ({ ...item, active: true })) }), false);
  assert.equal(isPreset({ ...preset, tabs: preset.tabs.map((item) => ({ ...item, url: "javascript:alert(1)" })) }), false);
});
