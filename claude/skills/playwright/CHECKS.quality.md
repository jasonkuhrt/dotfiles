## selector-priority

Use semantic selectors in priority order: getByRole > getByLabel > getByPlaceholder > getByText > getByTestId > locator.

### Correct

```typescript
await page.getByRole('button', { name: 'Submit' }).click();
```

### Incorrect

```typescript
await page.locator('.submit-btn').click();
```

## no-hardcoded-waits

Never use `page.waitForTimeout()` with hardcoded durations. Use explicit waits instead.

### Correct

```typescript
await expect(page.getByRole('alert')).toBeVisible();
```

### Incorrect

```typescript
await page.waitForTimeout(2000);
await page.getByRole('alert').click();
```
