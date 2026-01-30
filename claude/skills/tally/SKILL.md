---
name: tally
description: Use when submitting to Tally forms or discovering form field structure. Handles field discovery via WebFetch and guides manual submission (no API for external form submission).
---

# Tally Forms

Form builder platform. Two operations: **discover** form fields, **submit** to forms.

> **No submission API:** Tally's API is for form *owners*. Submitting to external forms requires manual paste. See [reference/api-research.md](./reference/api-research.md).

## Operations

- **Discover Form Fields** -- Fetch a form URL, extract field names/types/IDs. See [reference/operations.md](./reference/operations.md#discover-form-fields).
- **Submit to Form** -- Display field values in copy-friendly format for manual paste. See [reference/operations.md](./reference/operations.md#submit-to-form).

## Key URLs

| URL | Purpose |
|-----|---------|
| `https://tally.so/r/{formId}` | Form submission URL |
| `https://developers.tally.so` | API docs (for form owners) |
| `https://tally.so/help/hidden-fields` | Hidden fields guide |
| `https://tally.so/help/pre-populate-form-fields` | Prefill guide |

## Reference

- [Operations](./reference/operations.md) -- Detailed steps for discover and submit
- [API Research](./reference/api-research.md) -- What Tally's API can/can't do, URL prefill details
