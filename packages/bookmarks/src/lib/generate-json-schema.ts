#!/usr/bin/env bun
/**
 * Generate bookmarks.schema.json from the Effect Schema definitions.
 *
 * Usage: bun src/lib/generate-json-schema.ts
 *
 * Writes bookmarks.schema.json co-located with schema.ts.
 * Referenced by bookmarks.yaml via yaml-language-server $schema modeline.
 */

import { JSONSchema } from "effect"
import * as path from "node:path"
import * as fs from "node:fs/promises"
import * as Schema from "./schema/__.js"

const jsonSchema = JSONSchema.make(Schema.BookmarksConfig)

const outPath = path.resolve(import.meta.dirname, "bookmarks.schema.json")
const content = JSON.stringify(jsonSchema, null, 2) + "\n"

await fs.writeFile(outPath, content, "utf-8")
console.log(`Wrote ${outPath}`)
