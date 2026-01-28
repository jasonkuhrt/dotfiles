# No Git State Changes for Type Investigation

**FORBIDDEN**: Never use git state changes (stash, checkout, switch branches) to investigate type errors.

## Why

- Generated artifacts (Prisma, types) differ between branches
- Build/gen steps required to make types valid won't be obvious
- Comparing type state across branches adds confusion, not clarity
- Types on trunk may appear broken without running prisma-gen, enrich-types, etc.

## What to Do Instead

When asked to "investigate type errors":

1. **Check CI first** - If the last push passed type checks on CI, any local type errors are something we introduced and own
2. Look at the error messages directly
3. Read the relevant source files
4. Check if the errors are in files you modified

## Examples

```bash
# ❌ FORBIDDEN
git stash && git checkout develop && npm run check:types
git diff develop -- file.tsx

# ✅ ALLOWED - Check CI status
gh pr checks
gh run list --branch $(git branch --show-current)

# ✅ ALLOWED - Then investigate locally
npm run check:types:heartbeat
# Read the files mentioned in errors
```
