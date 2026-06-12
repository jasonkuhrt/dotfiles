#!/usr/bin/env bun

import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { randomUUID } from "node:crypto"

type Command = "activate" | "status" | "cancel"

type LoopActivation = {
  version: 1
  sessionId: string
  escape: {
    kind: "assistant_message_includes"
    token: string
  }
  continue: {
    prompt: string
    systemMessage: string
    stopReason?: string
  }
  createdAt: string
  updatedAt: string
}

const ACTIVE_DIR = join(process.env.HOME ?? "", ".codex", "loops", "active")

const usage = (): never => {
  console.error(
    [
      "Usage:",
      "  bun ~/.codex/skills/loop/scripts/loop.ts activate [--session-id <id>] [--continue-prompt <text>] [--system-message <text>] [--stop-reason <text>] [--token <text>]",
      "  bun ~/.codex/skills/loop/scripts/loop.ts status [--session-id <id>]",
      "  bun ~/.codex/skills/loop/scripts/loop.ts cancel [--session-id <id>]",
    ].join("\n"),
  )
  process.exit(1)
}

const resolveSessionId = (explicit: string | null): string | null =>
  explicit ??
  process.env.CODEX_THREAD_ID ??
  process.env.CODEX_SESSION_ID ??
  null

const activationPath = (sessionId: string): string =>
  join(ACTIVE_DIR, `${sessionId}.json`)

const decodeActivation = (value: unknown): LoopActivation | null => {
  if (typeof value !== "object" || value === null) return null

  const record = value as Record<string, unknown>
  const escape = record.escape
  const continuation = record.continue

  if (record.version !== 1) return null
  if (typeof record.sessionId !== "string" || record.sessionId.length === 0) return null
  if (typeof record.createdAt !== "string" || record.createdAt.length === 0) return null
  if (typeof record.updatedAt !== "string" || record.updatedAt.length === 0) return null
  if (typeof escape !== "object" || escape === null) return null
  if (typeof continuation !== "object" || continuation === null) return null

  const escapeRecord = escape as Record<string, unknown>
  const continueRecord = continuation as Record<string, unknown>
  const stopReason = continueRecord.stopReason

  if (escapeRecord.kind !== "assistant_message_includes") return null
  if (typeof escapeRecord.token !== "string" || escapeRecord.token.length === 0) return null
  if (typeof continueRecord.prompt !== "string" || continueRecord.prompt.length === 0) return null
  if (
    typeof continueRecord.systemMessage !== "string" ||
    continueRecord.systemMessage.length === 0
  ) {
    return null
  }
  if (stopReason !== undefined && typeof stopReason !== "string") return null

  return {
    version: 1,
    sessionId: record.sessionId,
    escape: {
      kind: "assistant_message_includes",
      token: escapeRecord.token,
    },
    continue: {
      prompt: continueRecord.prompt,
      systemMessage: continueRecord.systemMessage,
      ...(stopReason === undefined ? {} : { stopReason }),
    },
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  }
}

const readActivation = async (sessionId: string): Promise<LoopActivation | null> => {
  try {
    const raw = await readFile(activationPath(sessionId), "utf8")
    return decodeActivation(JSON.parse(raw) as unknown)
  } catch {
    return null
  }
}

const parseArgs = (
  argv: string[],
): {
  command: Command
  options: Record<string, string>
} => {
  const [commandRaw, ...rest] = argv
  if (
    commandRaw !== "activate" &&
    commandRaw !== "status" &&
    commandRaw !== "cancel"
  ) {
    usage()
  }

  const options: Record<string, string> = {}
  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index]
    if (!arg?.startsWith("--")) usage()

    const key = arg.slice(2)
    const value = rest[index + 1]
    if (!value || value.startsWith("--")) usage()

    options[key] = value
    index += 1
  }

  return {
    command: commandRaw,
    options,
  }
}

const nowIso = (): string => new Date().toISOString()

const defaultContinuePrompt = (token: string): string =>
  [
    "Loop active for this session. Continue working now.",
    `Only stop after intentionally emitting the exact token ${token}.`,
  ].join(" ")

const defaultSystemMessage = (token: string): string =>
  `Loop active. Emit ${token} when you intentionally want this session to stop.`

const main = async (): Promise<void> => {
  const { command, options } = parseArgs(process.argv.slice(2))
  const sessionId = resolveSessionId(options["session-id"] ?? null)

  if (sessionId === null) {
    console.error(
      JSON.stringify({
        ok: false,
        error:
          "No Codex session id found. Pass --session-id explicitly or run inside a Codex shell with CODEX_THREAD_ID.",
      }),
    )
    process.exit(1)
  }

  await mkdir(ACTIVE_DIR, { recursive: true })

  if (command === "status") {
    const activation = await readActivation(sessionId)
    console.log(
      JSON.stringify({
        ok: true,
        active: activation !== null,
        sessionId,
        ...(activation === null
          ? {}
          : {
              activationPath: activationPath(sessionId),
              escapeToken: activation.escape.token,
              continue: activation.continue,
              createdAt: activation.createdAt,
              updatedAt: activation.updatedAt,
            }),
      }),
    )
    return
  }

  if (command === "cancel") {
    const path = activationPath(sessionId)
    const existed = (await readActivation(sessionId)) !== null
    await rm(path, { force: true })
    console.log(
      JSON.stringify({
        ok: true,
        active: false,
        sessionId,
        removed: existed,
        activationPath: path,
      }),
    )
    return
  }

  const path = activationPath(sessionId)
  const existing = await readActivation(sessionId)
  const createdAt = existing?.createdAt ?? nowIso()
  const token = options.token ?? existing?.escape.token ?? `<codex-loop-escape:${randomUUID()}/>`
  const activation: LoopActivation = {
    version: 1,
    sessionId,
    escape: {
      kind: "assistant_message_includes",
      token,
    },
    continue: {
      prompt: options["continue-prompt"] ?? existing?.continue.prompt ?? defaultContinuePrompt(token),
      systemMessage:
        options["system-message"] ?? existing?.continue.systemMessage ?? defaultSystemMessage(token),
      ...(options["stop-reason"] !== undefined
        ? { stopReason: options["stop-reason"] }
        : existing?.continue.stopReason === undefined
          ? {}
          : { stopReason: existing.continue.stopReason }),
    },
    createdAt,
    updatedAt: nowIso(),
  }

  await writeFile(path, `${JSON.stringify(activation, null, 2)}\n`, "utf8")

  console.log(
    JSON.stringify({
      ok: true,
      active: true,
      sessionId,
      activationPath: path,
      escapeToken: activation.escape.token,
      continue: activation.continue,
      createdAt: activation.createdAt,
      updatedAt: activation.updatedAt,
    }),
  )
}

await main()
