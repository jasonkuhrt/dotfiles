## selector-priority

Use semantic selectors in priority order: getByRole > getByLabel > getByPlaceholder > getByText > getByTestId > locator(CSS/XPath). Choose the highest-priority selector that unambiguously identifies the element.

### Correct

```typescript
await page.getByRole('button', { name: 'Submit' }).click()
await page.getByLabel('Email').fill('user@example.com')
await page.getByRole('heading', { level: 1 }).toHaveText('Dashboard')
```

### Incorrect

```typescript
await page.locator('.submit-btn').click()
await page.locator('#email-input').fill('user@example.com')
await page.locator('h1').toHaveText('Dashboard')
```

## no-hardcoded-dynamic-data

Assertions on dynamic content must reference fixture constants, never inline strings. Hardcoded values break when seed data changes.

### Correct

```typescript
import { SEED } from '../fixtures/seed-data'
await expect(page.getByRole('heading', { level: 1 })).toHaveText(SEED.communityName)
await expect(page.getByText(SEED.userName)).toBeVisible()
```

### Incorrect

```typescript
await expect(page.getByText('Test Community')).toBeVisible()
await expect(page.getByText('John Doe')).toBeVisible()
```

## testid-naming-convention

data-testid attributes use hierarchical dot-separated names: `<domain>.<component>.<element>`. Centralize constants — define in app code, import in both components and specs.

### Correct

```html
<div data-testid="wizard.step-upload" />
<div data-testid="wizard.step-review" />
<div data-testid="offer-group.premium" />
```

### Incorrect

```html
<div data-testid="upload" />
<div data-testid="step2" />
<div data-testid="premiumOfferGroup" />
```

## setup-project-not-global

Use a setup project (not `globalSetup`) for seeding. Setup runs as a test file with full Playwright features (traces, fixtures, HTML report visibility).

### Correct

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

### Incorrect

```typescript
// playwright.config.ts
export default defineConfig({
  globalSetup: './global-setup.ts',
  // ...
})
```
