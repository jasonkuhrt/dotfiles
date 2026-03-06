#!/usr/bin/env node
/**
 * Render mermaid diagrams in markdown to PNG while preserving source blocks.
 *
 * Usage:
 *   node render-mermaid.mjs <file.md> [file2.md ...]
 *   node render-mermaid.mjs <directory>
 *   node render-mermaid.mjs <file.md> --watch
 *
 * Options:
 *   --output-dir <dir>  Put images in a subdirectory
 *   --watch             Watch file(s) for changes and re-render automatically
 *
 * Features:
 *   - Generates PNGs adjacent to the markdown file (or in --output-dir)
 *   - Inserts ![name](path.png) · [Mermaid Live](url) <!-- mermaid:hash --> above each block
 *   - Re-renders when mermaid content changes (hash-based detection)
 *   - Preserves original mermaid source
 *   - Uses accTitle directive for image naming (mermaid's native accessibility title)
 */

import { readFileSync, writeFileSync, mkdirSync, watch, readdirSync, statSync } from 'fs';
import { execSync } from 'child_process';
import { basename, dirname, join, extname } from 'path';
import { tmpdir } from 'os';
import { deflate } from 'zlib';
import { promisify } from 'util';
import { createHash } from 'crypto';

const deflateAsync = promisify(deflate);

// Parse arguments
const args = process.argv.slice(2);
const outputDirIdx = args.indexOf('--output-dir');
const outputDir = outputDirIdx !== -1 ? args[outputDirIdx + 1] : null;
const watchMode = args.includes('--watch');
const showHelp = args.includes('--help') || args.includes('-h');

// Get input paths (everything that's not a flag or flag value)
const inputPaths = args.filter((a, i) => {
  if (a.startsWith('--') || a === '-h') return false;
  if (i > 0 && args[i - 1] === '--output-dir') return false;
  return true;
});

if (showHelp || inputPaths.length === 0) {
  console.log(`
render-mermaid.mjs - Render mermaid diagrams in markdown to PNG

Usage:
  render-mermaid.mjs <file.md> [file2.md ...]    Process specific files
  render-mermaid.mjs <directory>                  Process all .md files recursively
  render-mermaid.mjs <file.md> --watch            Watch and re-render on changes

Options:
  --output-dir <dir>  Put images in a subdirectory (relative to each file)
  --watch             Watch file(s) for changes and re-render automatically
  --help, -h          Show this help

Features:
  - Renders mermaid blocks to PNG (transparent background)
  - Inserts ![name](path.png) · [Mermaid Live](url) <!-- mermaid:hash --> above each block
  - Re-renders only when mermaid content changes (hash-based detection)
  - Uses accTitle directive for image naming (falls back to diagram-N)
  - Preserves original mermaid source

Examples:
  render-mermaid.mjs docs/architecture.md
  render-mermaid.mjs docs/                        # All .md files in docs/
  render-mermaid.mjs README.md CONTRIBUTING.md
  render-mermaid.mjs docs/ --watch &
`);
  process.exit(inputPaths.length === 0 ? 1 : 0);
}

/**
 * Recursively find all .md files in a directory
 */
function findMarkdownFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      // Skip node_modules and hidden directories
      if (!entry.startsWith('.') && entry !== 'node_modules') {
        files.push(...findMarkdownFiles(fullPath));
      }
    } else if (extname(entry) === '.md') {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Resolve input paths to list of markdown files
 */
function resolveInputFiles(paths) {
  const files = [];
  for (const p of paths) {
    try {
      const stat = statSync(p);
      if (stat.isDirectory()) {
        files.push(...findMarkdownFiles(p));
      } else if (extname(p) === '.md') {
        files.push(p);
      }
    } catch {
      console.error(`⚠️ Path not found: ${p}`);
    }
  }
  return [...new Set(files)]; // dedupe
}

/**
 * Compute short hash of content for change detection
 */
function contentHash(content) {
  return createHash('sha256').update(content).digest('hex').slice(0, 12);
}

/**
 * Generate mermaid.live edit URL for a diagram
 */
async function generateLiveUrl(mermaidContent) {
  const state = {
    code: mermaidContent,
    mermaid: { theme: 'default' },
    autoSync: true,
    updateDiagram: true,
  };
  const json = JSON.stringify(state);
  const compressed = await deflateAsync(json, { level: 9 });
  const base64 = Buffer.from(compressed).toString('base64url');
  return `https://mermaid.live/edit#pako:${base64}`;
}

/**
 * Process a markdown file: find mermaid blocks, render to PNG, insert/update links
 * Returns true if any changes were made
 */
async function processFile(filePath, imageOutputDir) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const docBasename = basename(filePath, '.md');
  const docDir = dirname(filePath);
  const imageDir = imageOutputDir ? join(docDir, imageOutputDir) : docDir;

  // Ensure output directory exists
  if (imageOutputDir) {
    mkdirSync(imageDir, { recursive: true });
  }

  // Regex patterns
  const mermaidBlockRegex = /^```mermaid\s*$/;
  const codeBlockEndRegex = /^```\s*$/;
  const imageLinkRegex = /^!\[.+\]\(.+\.png\).*<!-- mermaid:([a-f0-9]+) -->$/;

  const blocks = [];
  let i = 0;
  let diagramIndex = 0;

  while (i < lines.length) {
    if (mermaidBlockRegex.test(lines[i])) {
      const startLine = i;

      // Check if there's already an image link with hash above (skip blank lines)
      let checkLine = i - 1;
      while (checkLine >= 0 && lines[checkLine].trim() === '') {
        checkLine--;
      }
      const hashMatch = checkLine >= 0 ? lines[checkLine].match(imageLinkRegex) : null;
      const existingHash = hashMatch ? hashMatch[1] : null;
      const existingLinkLine = hashMatch ? checkLine : null;

      i++;
      const contentStart = i;

      // Find end of block
      while (i < lines.length && !codeBlockEndRegex.test(lines[i])) {
        i++;
      }
      const contentEnd = i;

      // Extract mermaid content
      const mermaidContent = lines.slice(contentStart, contentEnd).join('\n');
      const currentHash = contentHash(mermaidContent);

      // Check for accTitle directive (mermaid's native accessibility title)
      const nameMatch = mermaidContent.match(/^accTitle:\s*(.+)$/m);
      const name = nameMatch ? nameMatch[1].trim() : `diagram-${++diagramIndex}`;

      // Only process if no hash or hash differs (content changed)
      if (existingHash !== currentHash) {
        blocks.push({
          startLine,
          content: mermaidContent,
          name,
          hash: currentHash,
          existingLinkLine, // line to replace, or null to insert
        });
      }
    }
    i++;
  }

  if (blocks.length === 0) {
    return false;
  }

  console.log(`📄 ${filePath}: ${blocks.length} block(s) to render`);

  // Track line modifications: { line, markdown, isReplace }
  const modifications = [];

  for (const block of blocks) {
    const imageName = `${docBasename}.${block.name}.png`;
    const imagePath = join(imageDir, imageName);
    const relativeImagePath = imageOutputDir
      ? `./${imageOutputDir}/${imageName}`
      : `./${imageName}`;

    // Write temp mermaid file
    const tempFile = join(
      tmpdir(),
      `mermaid-${Date.now()}-${Math.random().toString(36).slice(2)}.mmd`
    );
    writeFileSync(tempFile, block.content);

    // Run mmdc
    try {
      execSync(
        `npx -y @mermaid-js/mermaid-cli -i "${tempFile}" -o "${imagePath}" -b transparent`,
        {
          stdio: 'pipe',
        }
      );
      console.log(`  ✅ ${block.name}`);

      // Generate live URL
      const liveUrl = await generateLiveUrl(block.content);
      const markdown = `![${block.name}](${relativeImagePath}) · [Mermaid Live](${liveUrl}) <!-- mermaid:${block.hash} -->`;

      if (block.existingLinkLine !== null) {
        // Replace existing line
        modifications.push({
          line: block.existingLinkLine,
          markdown,
          isReplace: true,
        });
      } else {
        // Insert new line
        modifications.push({
          line: block.startLine,
          markdown,
          isReplace: false,
        });
      }
    } catch (err) {
      console.error(`  ❌ ${block.name}: ${err.message}`);
    }
  }

  if (modifications.length === 0) {
    return false;
  }

  // Apply modifications in reverse order to preserve line numbers
  // First, separate replacements and insertions
  const replacements = modifications.filter((m) => m.isReplace);
  const insertions = modifications.filter((m) => !m.isReplace);

  // Apply replacements first (they don't change line count)
  for (const mod of replacements) {
    lines[mod.line] = mod.markdown;
  }

  // Apply insertions in reverse order
  insertions.sort((a, b) => b.line - a.line);
  for (const ins of insertions) {
    lines.splice(ins.line, 0, ins.markdown, '');
  }

  // Write updated markdown
  writeFileSync(filePath, lines.join('\n'));
  return true;
}

/**
 * Process all files
 */
async function processAll(files, imageOutputDir) {
  let updatedCount = 0;
  for (const file of files) {
    try {
      const updated = await processFile(file, imageOutputDir);
      if (updated) updatedCount++;
    } catch (err) {
      console.error(`❌ ${file}: ${err.message}`);
    }
  }
  return updatedCount;
}

// Main execution
const inputFiles = resolveInputFiles(inputPaths);

if (inputFiles.length === 0) {
  console.error('No markdown files found.');
  process.exit(1);
}

console.log(`Found ${inputFiles.length} markdown file(s)\n`);

if (watchMode) {
  console.log(`👀 Watching for changes... (Ctrl+C to stop)\n`);

  // Initial render
  await processAll(inputFiles, outputDir);

  // Watch each file
  const debounceTimers = new Map();
  for (const file of inputFiles) {
    watch(file, (eventType) => {
      if (eventType === 'change') {
        // Debounce per file
        clearTimeout(debounceTimers.get(file));
        debounceTimers.set(
          file,
          setTimeout(async () => {
            console.log(`\n📝 Changed: ${file}`);
            try {
              await processFile(file, outputDir);
            } catch (err) {
              console.error(`❌ Error: ${err.message}`);
            }
          }, 500)
        );
      }
    });
  }

  // Also watch directories for new files (if input was a directory)
  for (const p of inputPaths) {
    try {
      if (statSync(p).isDirectory()) {
        watch(p, { recursive: true }, (_eventType, filename) => {
          if (filename && extname(filename) === '.md') {
            const fullPath = join(p, filename);
            // Debounce
            clearTimeout(debounceTimers.get(fullPath));
            debounceTimers.set(
              fullPath,
              setTimeout(async () => {
                try {
                  if (statSync(fullPath).isFile()) {
                    console.log(`\n📝 Changed: ${fullPath}`);
                    await processFile(fullPath, outputDir);
                  }
                } catch {
                  // File may have been deleted
                }
              }, 500)
            );
          }
        });
      }
    } catch {
      // Not a directory
    }
  }
} else {
  const updated = await processAll(inputFiles, outputDir);
  console.log(`\n✅ Done. ${updated} file(s) updated.`);
}
