# Setup

Install D2 toolchain and editor integration. Idempotent — checks each dependency, skips what's present.

## Steps

1. **D2 CLI**
   ```bash
   command -v d2 && d2 version || brew install d2
   ```

2. **TALA layout engine** (proprietary, optional — superior layouts for architecture diagrams)
   ```bash
   command -v tala && echo "tala installed" || brew install terrastruct/tap/tala
   ```
   TALA requires a license for non-evaluation use. Free engines (dagre, elk) work for most diagrams.

3. **Zed extension**
   ```bash
   # Check if D2 extension is installed
   ls ~/Library/Application\ Support/Zed/extensions/installed/d2 2>/dev/null && echo "D2 extension installed" || echo "Install manually: Cmd+Shift+P → 'zed: extensions' → search 'd2'"
   ```

4. **Verify**
   ```bash
   echo 'hello -> world' | d2 - /dev/stdout 2>/dev/null && echo "d2 rendering works"
   ```

## Post-Setup

Report status table:

| Component | Status |
|-----------|--------|
| d2 CLI | vX.X.X / missing |
| TALA | installed / skipped |
| Zed ext | installed / manual install needed |
