---
name: ts:buildinfo
description: Manage TypeScript incremental build cache (tsbuildinfo files). Use when enabling/disabling incremental builds, clearing cache, or warming worktree cache.
---

# TS Buildinfo

Manage TypeScript incremental build cache (tsbuildinfo files).

## Use Cases

- "disable tsbuildinfo"
- "turn off incremental builds"
- "enable incremental builds"
- "clear tsbuildinfo cache"
- "warm worktree cache"
- "tsbuildinfo is causing issues"

## Operations

### Enable

1. Edit root `tsconfig.base.json` (or equivalent):

```json
{
  "compilerOptions": {
    "incremental": true
  }
}
```

2. Add CI caching to the type-check workflow (after checkout, before install):

```yaml
- name: Get tsgo version
  id: tsgo-version
  run: |
    TSGO_VERSION=$(node -e "console.log(require('./package-lock.json').packages['node_modules/@typescript/native-preview']?.version || 'unknown')")
    echo "version=$TSGO_VERSION" >> $GITHUB_OUTPUT

- name: Cache tsbuildinfo
  uses: actions/cache@v4
  with:
    path: | # adjust glob to match project structure
      apps/*/tsconfig.tsbuildinfo
      packages/*/tsconfig.tsbuildinfo
    key: tsbuildinfo-${{ runner.os }}-tsgo${{ steps.tsgo-version.outputs.version }}-${{ hashFiles('tsconfig.base.json', '**/tsconfig*.json') }}
    restore-keys: |
      tsbuildinfo-${{ runner.os }}-tsgo${{ steps.tsgo-version.outputs.version }}-
```

3. Run type check to generate initial cache.

### Disable

1. Edit root tsconfig - remove `incremental: true`
2. Remove CI caching steps (version detection + cache action)
3. Clean up existing cache files:

```bash
find . -name "*.tsbuildinfo" -delete
```

4. Inform user: type checking will be ~10x slower but eliminates any cache-related issues.

### Clear Cache

Clear tsbuildinfo files without disabling incremental builds:

```bash
find . -name "*.tsbuildinfo" -delete
```

Next type check rebuilds cache from scratch.

### Worktree Warm Cache

Copy tsbuildinfo files from one directory to another (useful for git worktree setup):

```bash
rsync -a --include='*/' --include='tsconfig.tsbuildinfo' --exclude='*' --prune-empty-dirs \
  "$SOURCE/apps/" "$DEST/apps/" 2>/dev/null || true
```

- `--prune-empty-dirs`: Only creates directories that contain tsbuildinfo files
- tsgo validates by content hash, so stale cache is safe (just triggers recheck)

## Notes

- tsbuildinfo files should be gitignored
- tsgo uses content-based validation (not mtime), so cache corruption is rare
- If experiencing issues, try clearing cache first before disabling entirely
- Cold builds take ~8-9s, incremental builds take ~0.8s (10x faster)

## Reference

### Known tsgo Issues

| Issue                                                           | Description                                 |
| --------------------------------------------------------------- | ------------------------------------------- |
| [#2341](https://github.com/microsoft/typescript-go/issues/2341) | Performance regression with `--incremental` |
| [#2243](https://github.com/microsoft/typescript-go/issues/2243) | Crash in incremental                        |
| [#2238](https://github.com/microsoft/typescript-go/issues/2238) | Concurrent map read/write error             |
| [#1548](https://github.com/microsoft/typescript-go/issues/1548) | Platform-specific paths in tsbuildinfo      |

If hitting these issues, disable incremental builds until upstream fixes land.
