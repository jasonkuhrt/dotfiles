#!/usr/bin/env bun
/**
 * Generate bookmarks.schema.json from the Effect Schema definitions.
 *
 * Usage: bun src/lib/generate-json-schema.ts
 *
 * Writes bookmarks.schema.json to both the package source and the managed
 * ~/.bookmarks true-dir so YAML schema lookup works from the live path too.
 */

import { JSONSchema } from "effect"
import * as path from "node:path"
import * as fs from "node:fs/promises"
import { BookmarksConfig } from "./schema/__.js"

const jsonSchema = JSONSchema.make(BookmarksConfig)

const content = JSON.stringify(jsonSchema, null, 2) + "\n"
const outPaths = [
  path.resolve(import.meta.dirname, "bookmarks.schema.json"),
  path.resolve(import.meta.dirname, "../../../../symlink-roots/bookmarks/bookmarks.schema.json"),
]

for (const outPath of outPaths) {
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, content, "utf-8")
  console.log(`Wrote ${outPath}`)
}
