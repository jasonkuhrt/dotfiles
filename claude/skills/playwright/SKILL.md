---
name: playwright
description: Playwright E2E testing patterns — selector strategy, fixture design, CI sharding, debugging. Use when writing tests, reviewing E2E code, or setting up CI pipelines.
---

# Playwright Reference

Universal Playwright patterns. Project-specific conventions belong in project docs.

## Selector Strategy

### Priority Hierarchy

Ordered from most to least preferred. Choose the highest-priority selector that unambiguously identifies the element.

| Priority | API                     | Couples To     | Use For                                         |
| -------- | ----------------------- | -------------- | ----------------------------------------------- |
| 1        | `getByRole`             | Accessibility  | Buttons, links, headings, dialogs, form fields  |
| 2        | `getByLabel`            | UX copy        | Form inputs with visible labels                 |
| 3        | `getByPlaceholder`      | UX copy        | Inputs without visible labels (fallback)        |
| 4        | `getByText`             | Static UI copy | Assertions on fixed copy ("Sign In", "404")     |
| 5        | `getByTestId`           | Test contract  | Composite widgets, disambiguation, no semantics |
| 6        | `locator()` (CSS/XPath) | DOM structure  | Last resort only                                |

### Decision Framework

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

### data-testid Conventions

**When to add:**

1. No semantic role exists (custom composite widget)
2. Multiple identical roles need disambiguation
3. Third-party components block role access
4. Element is a structural container, not an interactive widget

**Naming convention:** Hierarchical dot-separated names: `<domain>.<component>.<element>`

```html
<div data-testid="wizard.step-upload" />
<div data-testid="wizard.step-review" />
<div data-testid="offer-group.premium" />
```

**Centralize constants** — define in app code, import in both components and specs to prevent string drift.

### Never Hardcode Dynamic Data

Assertions on dynamic content must reference fixture constants, never inline strings:

```typescript
// WRONG
await expect(page.getByText("Test Community")).toBeVisible();

// RIGHT
import { SEED } from "../fixtures/seed-data";
await expect(page.getByRole("heading", { level: 1 })).toHaveText(
  SEED.communityName,
);
```

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

### Setup Project Pattern

Use a **setup project** (not `globalSetup`) for seeding. Setup runs as a test file with full PW features (traces, fixtures, HTML report visibility).

```typescript
// playwright.config.ts
projects: [
  { name: 'setup', testMatch: /.*\.setup\.ts/ },
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
    dependencies: ['setup'],
  },
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

**Note:** `GITHUB_OUTPUT` has a 1MB limit per output. Seed data is typically tiny.

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

### Affected-Only Detection

Three tiers, evaluated in order:

1. **Spec fast path** — if spec files changed, use `--only-changed=origin/main`
2. **Path mapping** — match changed source files against config → filter flows
3. **Fallback** — run everything

```bash
# PW built-in (v1.46+) — runs only changed spec files
npx playwright test --only-changed=origin/main
```

### Config Tuning for CI

```typescript
// playwright.config.ts
export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  expect: { timeout: 10_000 },
  use: {
    actionTimeout: 15_000,
    navigationTimeout: 30_000, // Cold starts
    trace: "on-first-retry",
    video: "on-first-retry",
    screenshot: "only-on-failure",
  },
  reporter: process.env.CI ? "blob" : "html",
});
```

---

## Debug Patterns

### Re-run Failed Tests

```bash
npx playwright test --last-failed
```

### Auto-Dismiss Overlays (PW 1.42+)

```typescript
// In fixture setup
await page.addLocatorHandler(
  page.getByRole("dialog", { name: "Cookie consent" }),
  async () => {
    await page.getByRole("button", { name: "Dismiss" }).click();
  },
);
```

### Capture Failure Context

```typescript
// In fixture teardown
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await testInfo.attach("console-logs", {
      body: page
        .consoleMessages()
        .map((m) => m.text())
        .join("\n"),
      contentType: "text/plain",
    });
  }
});
```

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

Adopt `eslint-plugin-playwright` first — catches CSS selectors where `getByRole` works.
