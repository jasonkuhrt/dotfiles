---
description: Fix library structure convention violations
---

# Fix Library Conventions

## Goal

- Review the current project's library structure against the documented conventions
- Fix any violations found in library organization and patterns

## Usage

- `/fix-conventions` - Analyze and fix library convention violations

## Examples

- `/fix-conventions` - Check main library (if has exports) and local libraries
- Fixes missing $.ts and $$.ts files
- Corrects namespace export patterns
- Updates import/export structures

## Arguments

No arguments required - analyzes entire project structure

## Instructions

1. **Determine project type**:
   - Check if package.json has `exports` field
   - If `exports` exists: This is a library package (the package itself is a library)
     - Main library code at `/src/*`
     - May also have local libraries at `/src/lib/*`
   - If no `exports`: This is not a library package (likely an application)
     - Only has local libraries at `/src/lib/*`

2. **Read the appropriate convention document** (from jasonkuhrt marketplace plugins):
   - If has `exports`: Review library-standards plugin `docs/library-package.md` for main library
   - For any local libraries at `/src/lib/*`: Review library-standards plugin `docs/library-local.md`
   - For ADT patterns: Review library-adt plugin `docs/library-adt.md`

3. **Analyze the current project structure**:
   - If has `exports`: Check `/src/*` structure for main library
   - Check `/src/lib/*` for any local libraries (in both library packages and applications)
   - Identify library pattern (Namespace only vs Namespace + Barrel)
   - Check for proper file structure ($.ts, $$.ts files)
   - Verify import/export patterns

4. **Check configuration**:
   - If has `exports`: Verify `exports` field points to correct build output
   - For any local libraries: Verify `imports` field with `#lib/*` mappings and tsconfig.json paths

5. **Identify violations**:
   - Missing required files ($.ts, $$.ts)
   - Incorrect namespace exports
   - Wrong import patterns (e.g., importing from own $.ts)
   - Missing or incorrect package.json import mappings
   - Generic module names at library root (types.ts, utils.ts, helpers.ts)
   - Incorrect ADT structure if applicable

6. **Fix violations**:
   - Create missing $.ts and $$.ts files with correct export patterns
   - Fix namespace export statements
   - Update package.json import mappings
   - Rename generic modules to domain-specific names
   - Reorganize files if structure is fundamentally wrong
   - Fix import statements that violate conventions

7. **Report what was done**:
   - List all violations found
   - Describe each fix applied
   - Note any issues that require manual intervention
   - Suggest any architectural improvements
