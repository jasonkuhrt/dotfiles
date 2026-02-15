# Doctor

Diagnose just issues in the current project.

## Steps

1. **Check installation**
   ```bash
   just --version
   ```

2. **Find justfile**
   ```bash
   just --summary 2>&1
   ```
   If no justfile found, report and suggest `just init` or scaffold operation.

3. **Validate syntax**
   ```bash
   just --fmt --check 2>&1
   ```
   If formatting issues found, offer to run `just --fmt --unstable`.

4. **Check for common issues:**
   - Tabs vs spaces (just requires tabs for recipe bodies, like make)
   - Missing shebangs on multi-line recipes
   - Circular dependencies (`just` catches these -- report the error clearly)

5. **Report status table:**

| Check | Status |
|-------|--------|
| just installed | vX.X.X / missing |
| Justfile found | path / not found |
| Syntax valid | OK / errors |
| Formatting | OK / needs fmt |
