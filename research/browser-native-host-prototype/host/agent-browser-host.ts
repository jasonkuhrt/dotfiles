#!/usr/bin/env bun

type JsonObject = Record<string, unknown>;

const port = Number(Bun.env.AGENT_BROWSER_PROBE_PORT ?? "17361");
const host = Bun.env.AGENT_BROWSER_PROBE_HOST ?? "127.0.0.1";
const endpoint = `ws://${host}:${port}`;
const httpEndpoint = `http://${host}:${port}`;

const args = Bun.argv.slice(2);
const command = args[0] ?? "help";

switch (command) {
  case "serve":
    serve();
    break;
  case "status":
    await printStatus();
    break;
  case "snapshot":
    await requestAndPrint("snapshotActiveTab", {});
    break;
  case "locate":
    await requestAndPrint("locate", { selector: requireArg(args[1], "locate requires a selector.") });
    break;
  case "navigate":
    await requestAndPrint("navigate", { url: requireArg(args[1], "navigate requires a URL.") });
    break;
  case "click":
    await requestAndPrint("click", { selector: requireArg(args[1], "click requires a selector.") });
    break;
  case "fill":
    await requestAndPrint("fill", {
      selector: requireArg(args[1], "fill requires a selector."),
      text: requireArg(args[2], "fill requires text."),
    });
    break;
  case "native-click":
    await nativeClick(requireArg(args[1], "native-click requires a selector."));
    break;
  case "native-type":
    await nativeType(requireArg(args[1], "native-type requires text."));
    break;
  case "help":
  case "--help":
  case "-h":
    printHelp();
    break;
  default:
    fail(`Unknown command: ${command}`);
}

function serve() {
  let extension: ServerSocket | undefined;
  const pending = new Map<string, ServerSocket>();

  const server = Bun.serve<SocketData>({
    hostname: host,
    port,
    fetch(request, serverInstance) {
      const url = new URL(request.url);

      if (url.pathname === "/status") {
        return Response.json({
          ok: true,
          extensionConnected: Boolean(extension),
          pending: pending.size,
          endpoint,
        });
      }

      if (serverInstance.upgrade(request, { data: { role: "unknown" } })) {
        return undefined;
      }

      return Response.json({ ok: false, error: "not_found" }, { status: 404 });
    },
    websocket: {
      open(socket) {
        socket.data.role = "unknown";
      },
      message(socket, raw) {
        const message = parseMessage(raw);

        if (message.type === "hello") {
          if (message.role === "extension") {
            socket.data.role = "extension";
            extension = socket;
            socket.send(JSON.stringify({
              type: "ready",
              ok: true,
              endpoint,
            }));
            return;
          }

          if (message.role === "cli") {
            socket.data.role = "cli";
            return;
          }
        }

        if (socket.data.role === "cli" && message.type === "request") {
          if (!extension) {
            socket.send(JSON.stringify({
              type: "response",
              id: message.id,
              ok: false,
              error: {
                code: "extension_not_connected",
                message: "Start the host, then load the unpacked extension in Chrome.",
              },
            }));
            socket.close();
            return;
          }

          pending.set(String(message.id), socket);
          extension.send(JSON.stringify({
            type: "command",
            id: message.id,
            command: message.command,
            args: message.args ?? {},
          }));
          return;
        }

        if (socket.data.role === "extension" && message.type === "response") {
          const id = String(message.id);
          const cli = pending.get(id);
          pending.delete(id);

          if (cli) {
            cli.send(JSON.stringify(message));
            cli.close();
          }
        }
      },
      close(socket) {
        if (socket === extension) {
          extension = undefined;
        }

        for (const [id, cli] of pending) {
          if (cli === socket) pending.delete(id);
        }
      },
    },
  });

  console.error(`agent-browser-host listening on ${server.url}`);
}

async function printStatus() {
  const response = await fetch(`${httpEndpoint}/status`).catch(() => null);
  if (!response) {
    writeJson({
      ok: false,
      error: {
        code: "host_not_running",
        message: `No host responding at ${httpEndpoint}. Run: just browser-probe-serve`,
      },
    });
    return;
  }

  writeJson(await response.json());
}

async function requestAndPrint(commandName: string, requestArgs: JsonObject) {
  const response = await sendRequest(commandName, requestArgs);
  writeJson(response);
  if (!response.ok) process.exitCode = 1;
}

async function nativeClick(selector: string) {
  const locateResponse = await sendRequest("locate", { selector });
  if (!locateResponse.ok) {
    writeJson(locateResponse);
    process.exitCode = 1;
    return;
  }

  const point = getDesktopPoint(locateResponse);
  if (!point) {
    writeJson({
      ok: false,
      error: {
        code: "missing_desktop_point",
        message: "Extension locate response did not include result.desktopPoint.",
      },
      locateResponse,
    });
    process.exitCode = 1;
    return;
  }

  const commandResult = await runUsecomputer(["click", "-x", String(point.x), "-y", String(point.y)]);
  writeJson({
    ok: commandResult.exitCode === 0,
    selector,
    point,
    locate: locateResponse.result,
    native: commandResult,
  });
  if (commandResult.exitCode !== 0) process.exitCode = commandResult.exitCode;
}

async function nativeType(text: string) {
  const commandResult = await runUsecomputer(["type", text]);
  writeJson({
    ok: commandResult.exitCode === 0,
    native: commandResult,
  });
  if (commandResult.exitCode !== 0) process.exitCode = commandResult.exitCode;
}

async function runUsecomputer(args: string[]) {
  const child = Bun.spawn(["usecomputer", ...args], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const [exitCode, stdout, stderr] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ]);
  return {
    command: ["usecomputer", ...args],
    exitCode,
    stdout: stdout.trim(),
    stderr: stderr.trim(),
  };
}

function getDesktopPoint(response: JsonObject): { x: number; y: number } | null {
  const result = response.result as JsonObject | undefined;
  const point = result?.desktopPoint as JsonObject | undefined;
  const x = Number(point?.x);
  const y = Number(point?.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return { x, y };
}

function sendRequest(commandName: string, requestArgs: JsonObject): Promise<JsonObject> {
  return new Promise((resolve) => {
    const id = crypto.randomUUID();
    const socket = new WebSocket(endpoint);
    const timeout = setTimeout(() => {
      socket.close();
      resolve({
        ok: false,
        error: {
          code: "request_timeout",
          message: `Timed out waiting for ${commandName}.`,
        },
      });
    }, 10_000);

    socket.addEventListener("open", () => {
      socket.send(JSON.stringify({ type: "hello", role: "cli" }));
      socket.send(JSON.stringify({
        type: "request",
        id,
        command: commandName,
        args: requestArgs,
      }));
    });

    socket.addEventListener("message", (event) => {
      clearTimeout(timeout);
      resolve(parseMessage(event.data));
      socket.close();
    });

    socket.addEventListener("error", () => {
      clearTimeout(timeout);
      resolve({
        ok: false,
        error: {
          code: "host_not_running",
          message: `No websocket host responding at ${endpoint}. Run: just browser-probe-serve`,
        },
      });
    });
  });
}

function parseMessage(raw: unknown): JsonObject {
  const text = typeof raw === "string" ? raw : raw instanceof Buffer ? raw.toString("utf8") : String(raw);
  try {
    return JSON.parse(text) as JsonObject;
  } catch {
    return { type: "invalid_json", raw: text };
  }
}

function requireArg(value: string | undefined, message: string): string {
  if (value) return value;
  fail(message);
}

function printHelp() {
  console.log(`agent-browser-host

Commands:
  serve                 Start local websocket host on ${endpoint}
  status                Print host/extension connection status
  snapshot              Snapshot active tab
  locate <selector>     Locate selector and return estimated desktop point
  navigate <url>        Navigate active tab
  click <selector>      Dispatch click on selector in active tab
  fill <selector> <txt> Fill selector in active tab
  native-click <sel>    Locate selector, then click it with usecomputer
  native-type <text>    Type text with usecomputer
`);
}

function writeJson(value: unknown) {
  console.log(JSON.stringify(value, null, 2));
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

type SocketData = {
  role: "unknown" | "extension" | "cli";
};

type ServerSocket = Bun.ServerWebSocket<SocketData>;
