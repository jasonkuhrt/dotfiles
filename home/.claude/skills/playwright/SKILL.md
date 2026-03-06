---
name: playwright
description: Playwright E2E testing patterns — selector strategy, fixture design, CI sharding, debugging. Use when writing tests, reviewing E2E code, or setting up CI pipelines.
---

# Playwright Reference

Universal Playwright patterns. Project-specific conventions belong in project docs. Checkable conventions are in `CHECKS.quality.md` — run `/review @playwright` to evaluate.

## Selector Decision Framework

```
Is it a standard widget? (button, link, input, heading, dialog, checkbox, tab)
  → getByRole with { name } option

Is it a labeled form field?
  → getByLabel (visible label) or getByPlaceholder (no label)

Is it static UI copy? ("Sign In", "No results", "404")
  → getByText for assertion

Is it dynamic data? (user name, count, generated ID)
  → getByRole or getByTestId for STRUCTURE
  → .toHaveText(FIXTURE.value) for CONTENT

Is it a custom composite? (card grid, dropdown panel, wizard step)
  → data-testid

Are you asserting navigation succeeded?
  → URL assertion (toHaveURL / not.toHaveURL), not text
```

### getByRole Reference

| Role          | Elements                            | Example                                           |
| ------------- | ----------------------------------- | ------------------------------------------------- |
| `button`      | `<button>`, `<input type="submit">` | `getByRole('button', { name: 'Submit' })`         |
| `link`        | `<a href>`                          | `getByRole('link', { name: 'Settings' })`         |
| `heading`     | `<h1>`-`<h6>`                       | `getByRole('heading', { level: 1 })`              |
| `textbox`     | `<input type="text">`, `<textarea>` | `getByRole('textbox', { name: 'Email' })`         |
| `checkbox`    | `<input type="checkbox">`           | `getByRole('checkbox', { name: 'Remember me' })`  |
| `radio`       | `<input type="radio">`              | `getByRole('radio', { name: 'Monthly' })`         |
| `combobox`    | `<select>`, ARIA combobox           | `getByRole('combobox', { name: 'Country' })`      |
| `dialog`      | `<dialog>`, `role="dialog"`         | `getByRole('dialog', { name: 'Confirm delete' })` |
| `tab`         | `role="tab"`                        | `getByRole('tab', { name: 'Members' })`           |
| `tabpanel`    | `role="tabpanel"`                   | `getByRole('tabpanel', { name: 'Members' })`      |
| `navigation`  | `<nav>`                             | `getByRole('navigation', { name: 'Sidebar' })`    |
| `region`      | `<section aria-label>`              | `getByRole('region', { name: 'Wizard' })`         |
| `alert`       | `role="alert"`                      | `getByRole('alert')`                              |
| `progressbar` | `role="progressbar"`, `<progress>`  | `getByRole('progressbar')`                        |
| `row`         | `<tr>`, `role="row"`                | `getByRole('row', { name: /user@example/ })`      |
| `cell`        | `<td>`, `role="cell"`               | `getByRole('cell', { name: '$25.00' })`           |
| `img`         | `<img>`, `role="img"`               | `getByRole('img', { name: 'Avatar' })`            |

**Tips:**

- Use `{ name }` with regex for partial/flexible matching: `getByRole('heading', { name: /welcome/i })`
- Use `{ exact: false }` or regex for text that may vary across environments
- If `getByRole` can't find an element, the element likely has accessibility issues

### When to Use data-testid

1. No semantic role exists (custom composite widget)
2. Multiple identical roles need disambiguation
3. Third-party components block role access
4. Element is a structural container, not an interactive widget

---

## Fixture Patterns

### Scoping

| Scope    | Lifetime                 | Use For                             |
| -------- | ------------------------ | ----------------------------------- |
| `test`   | Each test function       | Fresh state per test (default)      |
| `worker` | All tests in a PW worker | Expensive setup shared across tests |

```typescript
// Worker-scoped — shared across tests in same worker
admin: [
  async ({ browser, dataAdmin }, use) => {
    const context = await browser.newContext({ storageState: dataAdmin.state });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
  { scope: 'worker' },
],
```

### In-Memory storageState

Generate storageState from data fixtures at runtime — no pre-generated `.json` files:

```typescript
admin: [
  async ({ browser, dataAdmin }, use) => {
    const storageState = {
      cookies: [],
      origins: [{
        origin: BASE_URL,
        localStorage: [{ name: 'auth-token', value: dataAdmin.authToken }],
      }],
    };
    const context = await browser.newContext({ storageState });
    // ...
  },
  { scope: 'worker' },
],
```

---

## CI Patterns

### Matrix Sharding with Shared Setup

When shards need shared seed data (DB, auth tokens), run setup once before the matrix:

```yaml
jobs:
  setup:
    runs-on: ubuntu-latest
    outputs:
      seed_data: ${{ steps.seed.outputs.data }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - id: seed
        run: |
          DATA=$(npx playwright test --project=setup --reporter=json | jq -c '.seed')
          echo "data=$DATA" >> $GITHUB_OUTPUT

  e2e:
    needs: setup
    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3, 4]
    env:
      E2E_SEED: ${{ needs.setup.outputs.seed_data }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright test --project=chromium --shard=${{ matrix.shard }}/4
```

**Key points:**

- Setup runs once in its own job before the matrix
- Matrix shards skip setup by specifying `--project=chromium` only
- `fail-fast: false` ensures all shards complete for full failure picture

### Data Passing Speed Comparison

| Approach                  | Speed           | When to Use                       |
| ------------------------- | --------------- | --------------------------------- |
| `GITHUB_OUTPUT`           | ~instant        | Seed data, IDs, tokens (<1MB)     |
| `actions/cache`           | ~2-5s overhead  | node_modules, build artifacts     |
| `actions/upload-artifact` | ~3-10s overhead | Test results, screenshots, traces |

### Affected-Only Detection

Three tiers, evaluated in order:

1. **Spec fast path** — if spec files changed, use `--only-changed=origin/main`
2. **Path mapping** — match changed source files against config → filter flows
3. **Fallback** — run everything

```bash
# PW built-in (v1.46+) — runs only changed spec files
npx playwright test --only-changed=origin/main
```

### Reporter Configuration

**Per-shard:** Blob reporter — each shard produces `blob-report/`

**Merge step:** Separate job after all shards, merges into consolidated HTML:

```yaml
e2e-report:
  needs: e2e
  if: always()
  steps:
    - uses: actions/download-artifact@v4
      with:
        pattern: blob-report-*
        merge-multiple: true
        path: all-blob-reports
    - run: npx playwright merge-reports --reporter=html ./all-blob-reports
    - uses: actions/upload-artifact@v4
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 14
```

### Config Tuning for CI

```typescript
// playwright.config.ts
export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  expect: { timeout: 10_000 },
  use: {
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: "on-first-retry",
    video: "on-first-retry",
    screenshot: "only-on-failure",
  },
  reporter: process.env.CI ? "blob" : "html",
});
```

---

## Debug Patterns

| Command | Purpose |
| ------- | ------- |
| `npx playwright test --last-failed` | Re-run only failures |
| `page.addLocatorHandler(...)` | Auto-dismiss overlays (PW 1.42+) |
| `testInfo.attach('console-logs', ...)` | Capture failure context |

### Common Failure Causes

| Symptom               | Likely Cause       | Fix                                       |
| --------------------- | ------------------ | ----------------------------------------- |
| Timeout on navigation | Cold start         | Increase `navigationTimeout`, add wait    |
| Element not found     | Selector changed   | Update selector, check accessibility tree |
| Auth failure          | Stale storageState | Regenerate auth, check token expiry       |
| Flaky pass/fail       | Race condition     | Add explicit wait, use `expect.poll()`    |

---

## PW Version Features

| Feature                  | Version | Usage                                              |
| ------------------------ | ------- | -------------------------------------------------- |
| `--only-changed`         | 1.46+   | Run only changed specs relative to git ref         |
| Locator handler          | 1.42+   | `page.addLocatorHandler()` — auto-dismiss overlays |
| Failure capture          | 1.56+   | `page.consoleMessages()`, `page.pageErrors()`      |
| `failOnFlakyTests`       | 1.52+   | Surface flaky tests as CI failures                 |
| `captureGitInfo`         | 1.51+   | Embed git commit/diff in results                   |
| NOT-tag filtering        | 1.52+   | `!@slow` to exclude tagged tests                   |
| Speedboard tab           | 1.57+   | Automatic in HTML reporter, shows perf trends      |
| Locator filter `visible` | 1.51+   | `locator.filter({ visible: true })`                |

---

## ESLint Enforcement

| Plugin                         | Purpose                           | Key Rule                 |
| ------------------------------ | --------------------------------- | ------------------------ |
| `eslint-plugin-playwright`     | Prefer semantic locators in specs | `prefer-native-locators` |
| `eslint-plugin-test-selectors` | Enforce testid on interactive JSX | `onClick-data-testid`    |
