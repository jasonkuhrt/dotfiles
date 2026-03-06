import { afterEach, describe, expect, test } from "bun:test"
import { homedir } from "node:os"
import { join } from "node:path"
import * as Paths from "./paths.js"

const ENV_KEYS = [
  "BOOKMARKS_DIR",
  "BOOKMARKS_YAML_PATH",
  "BOOKMARKS_SCHEMA_PATH",
  "BOOKMARKS_BACKUP_DIR",
] as const

const ORIGINAL_ENV = Object.fromEntries(
  ENV_KEYS.map((key) => [key, process.env[key]]),
) as Record<(typeof ENV_KEYS)[number], string | undefined>

afterEach(() => {
  for (const key of ENV_KEYS) {
    const value = ORIGINAL_ENV[key]
    if (value === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = value
    }
  }
})

describe("paths", () => {
  test("defaults to ~/.bookmarks", () => {
    for (const key of ENV_KEYS) delete process.env[key]

    expect(Paths.defaultBookmarksDir()).toBe(join(homedir(), ".bookmarks"))
    expect(Paths.defaultYamlPath()).toBe(join(homedir(), ".bookmarks", "bookmarks.yaml"))
    expect(Paths.defaultSchemaPath()).toBe(join(homedir(), ".bookmarks", "bookmarks.schema.json"))
    expect(Paths.defaultBackupDir()).toBe(join(homedir(), ".bookmarks", "backups"))
  })

  test("explicit env vars override derived paths", () => {
    process.env["BOOKMARKS_DIR"] = "/tmp/bookmarks"
    process.env["BOOKMARKS_YAML_PATH"] = "/tmp/custom.yaml"
    process.env["BOOKMARKS_SCHEMA_PATH"] = "/tmp/custom.schema.json"
    process.env["BOOKMARKS_BACKUP_DIR"] = "/tmp/custom-backups"

    expect(Paths.defaultBookmarksDir()).toBe("/tmp/bookmarks")
    expect(Paths.defaultYamlPath()).toBe("/tmp/custom.yaml")
    expect(Paths.defaultSchemaPath()).toBe("/tmp/custom.schema.json")
    expect(Paths.defaultBackupDir()).toBe("/tmp/custom-backups")
  })
})
