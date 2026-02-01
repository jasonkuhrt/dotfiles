#!/usr/bin/env bun
/**
 * Generate bookmarks.schema.json from the Effect Schema definitions.
 *
 * Usage: bun src/lib/generate-json-schema.ts
 *
 * Writes to ../../bookmarks/bookmarks.schema.json (the YAML source directory)
 * so the yaml-language-server $schema directive picks it up.
 */

import { JSONSchema } from "effect"
import * as path from "node:path"
import * as fs from "node:fs/promises"
import { BookmarksConfig } from "./schema.js"

const jsonSchema = JSONSchema.make(BookmarksConfig)

const outPath = path.resolve(import.meta.dirname, "../../../..", "bookmarks/bookmarks.schema.json")
const content = JSON.stringify(jsonSchema, null, 2) + "\n"

await fs.writeFile(outPath, content, "utf-8")
console.log(`Wrote ${outPath}`)
