# Setup

Install just and verify environment. Idempotent -- skip what's present.

## Steps

1. **just CLI**
   ```bash
   command -v just && just --version || brew install just
   ```

2. **Fish completions**
   ```bash
   ls /opt/homebrew/share/fish/vendor_completions.d/just.fish 2>/dev/null && echo "fish completions: OK" || echo "fish completions: MISSING (reinstall just via brew)"
   ```

3. **Verify**
   ```bash
   echo -e 'test:\n\t@echo "just works"' | just --justfile /dev/stdin test 2>/dev/null && echo "just execution: OK" || echo "just execution: FAILED"
   ```

4. **Report status table:**

| Component | Status |
|-----------|--------|
| just CLI | vX.X.X / missing |
| Fish completions | OK / missing |
| Execution | OK / failed |
