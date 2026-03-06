import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

export const readJsonFile = <T>(filePath: string): T => JSON.parse(readFileSync(filePath, "utf8")) as T

export const writeJsonFile = (filePath: string, value: unknown): void => {
  mkdirSync(path.dirname(filePath), { recursive: true })
  writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8")
}
