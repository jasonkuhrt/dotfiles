#!/usr/bin/env bun

import { access, readFile, rm, mkdir } from "node:fs/promises"
import { constants } from "node:fs"
import { join } from "node:path"

type StopEvent = {
  cwd?: string
  session_id?: string
  sessionId?: string
  stop_hook_active?: boolean
  last_assistant_message?: string | null
}

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

const LOOP_ACTIVE_DIR = join(
  process.env.HOME ?? "",
  ".codex",
  "loops",
  "active",
)

const readEvent = async (): Promise<StopEvent> => {
  const chunks: string[] = []

  for await (const chunk of Bun.stdin.stream()) {
    chunks.push(Buffer.from(chunk).toString("utf8"))
  }

  if (chunks.length === 0) return {}

  try {
    return JSON.parse(chunks.join("")) as StopEvent
  } catch {
    return {}
  }
}

const pathExists = async (path: string): Promise<boolean> => {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

const resolveSessionId = (event: StopEvent): string | null => {
  const value = event.session_id ?? event.sessionId
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null
}

const getActivationPath = (sessionId: string): string =>
  join(LOOP_ACTIVE_DIR, `${sessionId}.json`)

const decodeLoopActivation = (input: unknown): LoopActivation | null => {
  if (typeof input !== "object" || input === null) return null

  const record = input as Record<string, unknown>
  const version = record.version
  const sessionId = record.sessionId
  const createdAt = record.createdAt
  const updatedAt = record.updatedAt
  const escape = record.escape
  const continuation = record.continue

  if (version !== 1) return null
  if (typeof sessionId !== "string" || sessionId.trim().length === 0) return null
  if (typeof createdAt !== "string" || createdAt.trim().length === 0) return null
  if (typeof updatedAt !== "string" || updatedAt.trim().length === 0) return null
  if (typeof escape !== "object" || escape === null) return null
  if (typeof continuation !== "object" || continuation === null) return null

  const escapeRecord = escape as Record<string, unknown>
  const continueRecord = continuation as Record<string, unknown>
  const kind = escapeRecord.kind
  const token = escapeRecord.token
  const prompt = continueRecord.prompt
  const systemMessage = continueRecord.systemMessage
  const stopReason = continueRecord.stopReason

  if (kind !== "assistant_message_includes") return null
  if (typeof token !== "string" || token.length === 0) return null
  if (typeof prompt !== "string" || prompt.length === 0) return null
  if (typeof systemMessage !== "string" || systemMessage.length === 0) return null
  if (stopReason !== undefined && typeof stopReason !== "string") return null

  return {
    version: 1,
    sessionId,
    escape: {
      kind,
      token,
    },
    continue: {
      prompt,
      systemMessage,
      ...(stopReason === undefined ? {} : { stopReason }),
    },
    createdAt,
    updatedAt,
  }
}

const readLoopActivation = async (
  sessionId: string,
): Promise<{ path: string; activation: LoopActivation } | null> => {
  const path = getActivationPath(sessionId)
  if (!(await pathExists(path))) return null

  try {
    const raw = await readFile(path, "utf8")
    const parsed = JSON.parse(raw) as unknown
    const activation = decodeLoopActivation(parsed)
    if (activation === null) {
      await rm(path, { force: true })
      return null
    }

    if (activation.sessionId !== sessionId) {
      await rm(path, { force: true })
      return null
    }

    return { path, activation }
  } catch {
    await rm(path, { force: true })
    return null
  }
}

const hasEscapeToken = (
  lastAssistantMessage: string | null | undefined,
  token: string,
): boolean => typeof lastAssistantMessage === "string" && lastAssistantMessage.includes(token)

const main = async (): Promise<void> => {
  const event = await readEvent()
  const sessionId = resolveSessionId(event)
  if (sessionId === null) return

  const loop = await readLoopActivation(sessionId)
  if (loop === null) return

  if (hasEscapeToken(event.last_assistant_message, loop.activation.escape.token)) {
    await rm(loop.path, { force: true })
    return
  }

  const payload = {
    decision: "block",
    reason: loop.activation.continue.prompt,
    systemMessage: loop.activation.continue.systemMessage,
    ...(loop.activation.continue.stopReason === undefined
      ? {}
      : { stopReason: loop.activation.continue.stopReason }),
  }

  process.stdout.write(`${JSON.stringify(payload)}\n`)
}

await mkdir(LOOP_ACTIVE_DIR, { recursive: true })
await main()
