---
description: Fix library structure convention violations
---

# Fix Library Conventions

## Goal

* Review the current project's library structure against the documented conventions
* Fix any violations found in library organization and patterns

## Usage

* `/fix-conventions` - Analyze and fix library convention violations

## Examples

* `/fix-conventions` - Check main library (if has exports) and local libraries
* Fixes missing $.ts and $$.ts files
* Corrects namespace export patterns
* Updates import/export structures

## Arguments

No arguments required - analyzes entire project structure

## Instructions

1. __Determine project type__:
   * Check if package.json has `exports` field
   * If `exports` exists: This is a library package (the package itself is a library)
     * Main library code at `/src/*`
     * May also have local libraries at `/src/lib/*`
   * If no `exports`: This is not a library package (likely an application)
     * Only has local libraries at `/src/lib/*`

2. __Read the appropriate convention document__ (from `~/.claude/todo/`):
   * If has `exports`: Review `todo/library-standards/docs/library-package.md` for main library
   * For any local libraries at `/src/lib/*`: Review `todo/library-standards/docs/library-local.md`
   * For ADT patterns: Review `todo/library-adt/docs/library-adt.md`

3. __Analyze the current project structure__:
   * If has `exports`: Check `/src/*` structure for main library
   * Check `/src/lib/*` for any local libraries (in both library packages and applications)
   * Identify library pattern (Namespace only vs Namespace + Barrel)
   * Check for proper file structure ($.ts, $$.ts files)
   * Verify import/export patterns

4. __Check configuration__:
   * If has `exports`: Verify `exports` field points to correct build output
   * For any local libraries: Verify `imports` field with `#lib/*` mappings and tsconfig.json paths

5. __Identify violations__:
   * Missing required files ($.ts, $$.ts)
   * Incorrect namespace exports
   * Wrong import patterns (e.g., importing from own $.ts)
   * Missing or incorrect package.json import mappings
   * Generic module names at library root (types.ts, utils.ts, helpers.ts)
   * Incorrect ADT structure if applicable

6. __Fix violations__:
   * Create missing $.ts and $$.ts files with correct export patterns
   * Fix namespace export statements
   * Update package.json import mappings
   * Rename generic modules to domain-specific names
   * Reorganize files if structure is fundamentally wrong
   * Fix import statements that violate conventions

7. __Report what was done__:
   * List all violations found
   * Describe each fix applied
   * Note any issues that require manual intervention
   * Suggest any architectural improvements
