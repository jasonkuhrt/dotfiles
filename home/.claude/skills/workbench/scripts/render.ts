// Renders TypeScript snippets to static twoslash-annotated HTML fragments.
// Usage: bun render.ts <snippet.ts> — writes <snippet>.html next to it.
import { readFileSync, writeFileSync } from 'node:fs'
import { codeToHtml } from 'shiki'
import { transformerTwoslash, rendererRich } from '@shikijs/twoslash'

const file = process.argv[2]
if (!file) throw new Error('usage: bun render.ts <snippet.ts>')
const code = readFileSync(file, 'utf8')

const html = await codeToHtml(code, {
  lang: 'ts',
  theme: 'tokyo-night',
  transformers: [
    transformerTwoslash({
      renderer: rendererRich(),
      twoslashOptions: {
        compilerOptions: {
          strict: true,
          exactOptionalPropertyTypes: true,
          noUncheckedIndexedAccess: true,
        },
      },
    }),
  ],
})

const out = file.replace(/\.ts$/, '.html')
writeFileSync(out, html)
console.log(`${out}: ${html.length} bytes`)
