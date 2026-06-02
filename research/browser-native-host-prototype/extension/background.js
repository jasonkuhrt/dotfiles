const HOST_URL = "ws://127.0.0.1:17361";
const RECONNECT_DELAY_MS = 1_000;
const TEXT_LIMIT = 20_000;

let socket = null;
let reconnectTimer = null;

function connect() {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    return;
  }

  socket = new WebSocket(HOST_URL);

  socket.addEventListener("open", () => {
    socket.send(JSON.stringify({
      type: "hello",
      role: "extension",
      version: chrome.runtime.getManifest().version,
    }));
  });

  socket.addEventListener("message", async (event) => {
    const message = parseJson(event.data);
    if (!message || message.type !== "command") return;

    const response = await handleCommand(message).catch((error) => ({
      ok: false,
      error: serializeError(error),
    }));

    send({
      type: "response",
      id: message.id,
      ...response,
    });
  });

  socket.addEventListener("close", scheduleReconnect);
  socket.addEventListener("error", scheduleReconnect);
}

function scheduleReconnect() {
  if (reconnectTimer) return;
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connect();
  }, RECONNECT_DELAY_MS);
}

function send(message) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify(message));
}

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

async function handleCommand(message) {
  switch (message.command) {
    case "snapshotActiveTab":
      return { ok: true, result: await snapshotActiveTab() };
    case "locate":
      return { ok: true, result: await locate(message.args?.selector) };
    case "navigate":
      return { ok: true, result: await navigate(message.args?.url) };
    case "click":
      return { ok: true, result: await click(message.args?.selector) };
    case "fill":
      return { ok: true, result: await fill(message.args?.selector, message.args?.text) };
    default:
      return {
        ok: false,
        error: {
          code: "unknown_command",
          message: `Unknown command: ${message.command}`,
        },
      };
  }
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    throw typedError("no_active_tab", "No active tab in the current Chrome window.");
  }
  return tab;
}

async function snapshotActiveTab() {
  const tab = await getActiveTab();
  const [inPage] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (limit) => {
      const text = document.body?.innerText ?? "";
      return {
        href: location.href,
        title: document.title,
        text: text.slice(0, limit),
        textLength: text.length,
        readyState: document.readyState,
        webdriver: navigator.webdriver === true,
      };
    },
    args: [TEXT_LIMIT],
  });

  return {
    tabId: tab.id,
    windowId: tab.windowId,
    url: tab.url ?? inPage.result?.href ?? null,
    title: tab.title ?? inPage.result?.title ?? null,
    ...inPage.result,
  };
}

async function navigate(url) {
  if (typeof url !== "string" || url.length === 0) {
    throw typedError("invalid_url", "navigate requires args.url.");
  }

  const tab = await getActiveTab();
  await chrome.tabs.update(tab.id, { url });
  return { tabId: tab.id, url };
}

async function locate(selector) {
  if (typeof selector !== "string" || selector.length === 0) {
    throw typedError("invalid_selector", "locate requires args.selector.");
  }

  const tab = await getActiveTab();
  const windowInfo = await chrome.windows.get(tab.windowId);
  const [result] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (selectorValue) => {
      const element = document.querySelector(selectorValue);
      if (!element) {
        return { ok: false, error: { code: "element_not_found", message: selectorValue } };
      }

      element.scrollIntoView({ block: "center", inline: "center" });
      const rect = element.getBoundingClientRect();
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      const leftInset = Math.max(0, (window.outerWidth - window.innerWidth) / 2);
      const topInset = Math.max(0, window.outerHeight - window.innerHeight - leftInset);

      return {
        ok: true,
        selector: selectorValue,
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
        },
        viewportPoint: center,
        desktopPoint: {
          x: Math.round(window.screenX + leftInset + center.x),
          y: Math.round(window.screenY + topInset + center.y),
        },
        viewport: {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          outerWidth: window.outerWidth,
          outerHeight: window.outerHeight,
          screenX: window.screenX,
          screenY: window.screenY,
          devicePixelRatio: window.devicePixelRatio,
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        },
      };
    },
    args: [selector],
  });

  if (!result.result?.ok) {
    throw typedError(result.result?.error?.code ?? "locate_failed", result.result?.error?.message ?? selector);
  }

  return {
    tabId: tab.id,
    windowId: tab.windowId,
    browserWindow: {
      id: windowInfo.id,
      left: windowInfo.left,
      top: windowInfo.top,
      width: windowInfo.width,
      height: windowInfo.height,
      focused: windowInfo.focused,
      state: windowInfo.state,
    },
    ...result.result,
  };
}

async function click(selector) {
  if (typeof selector !== "string" || selector.length === 0) {
    throw typedError("invalid_selector", "click requires args.selector.");
  }

  const tab = await getActiveTab();
  const [result] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (selectorValue) => {
      const element = document.querySelector(selectorValue);
      if (!element) {
        return { ok: false, error: { code: "element_not_found", message: selectorValue } };
      }

      const rect = element.getBoundingClientRect();
      element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
      element.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window }));
      element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));

      return {
        ok: true,
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        },
      };
    },
    args: [selector],
  });

  if (!result.result?.ok) {
    throw typedError(result.result?.error?.code ?? "click_failed", result.result?.error?.message ?? selector);
  }

  return { tabId: tab.id, selector, rect: result.result.rect };
}

async function fill(selector, text) {
  if (typeof selector !== "string" || selector.length === 0) {
    throw typedError("invalid_selector", "fill requires args.selector.");
  }
  if (typeof text !== "string") {
    throw typedError("invalid_text", "fill requires args.text.");
  }

  const tab = await getActiveTab();
  const [result] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (selectorValue, textValue) => {
      const element = document.querySelector(selectorValue);
      if (!element) {
        return { ok: false, error: { code: "element_not_found", message: selectorValue } };
      }

      element.focus();
      element.value = textValue;
      element.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: textValue }));
      element.dispatchEvent(new Event("change", { bubbles: true }));

      return { ok: true };
    },
    args: [selector, text],
  });

  if (!result.result?.ok) {
    throw typedError(result.result?.error?.code ?? "fill_failed", result.result?.error?.message ?? selector);
  }

  return { tabId: tab.id, selector };
}

function typedError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function serializeError(error) {
  return {
    code: error?.code ?? "extension_error",
    message: error?.message ?? String(error),
  };
}

connect();
