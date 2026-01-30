# Tally API Research

Research conducted 2026-01-25 on Tally's API capabilities.

## Summary

Tally's API is for **form owners**, not form submitters. You cannot programmatically submit to someone else's Tally form.

## What the API Can Do

| Capability | Endpoint | Who Can Use |
|------------|----------|-------------|
| Create forms | POST /forms | Form owner |
| Update forms | PATCH /forms/:id | Form owner |
| Delete forms | DELETE /forms/:id | Form owner |
| Fetch submissions | GET /forms/:id/submissions | Form owner |
| Delete submissions | DELETE /submissions/:id | Form owner |

## What the API Cannot Do

- **Submit to external forms** — No endpoint exists
- **Submit to your own forms via API** — Submissions come from the web form only
- **Bypass form validation** — All submissions go through Tally's frontend

## Authentication

- OAuth 2.0 for API access
- Bearer token in Authorization header
- Only works for forms you own

## Webhooks (Outgoing Only)

Tally supports webhooks for **receiving** submission data:
- Triggered when someone submits your form
- Sends JSON payload to your endpoint
- Real-time, no polling needed

This is one-way: Tally → You. Not You → Tally.

## URL Parameter Prefill

Tally forms can be prefilled via URL params, but **only if configured by form owner**:

1. Form owner adds hidden field blocks (`/hidden` in editor)
2. Form owner links hidden fields to visible fields via "default answer"
3. URL params match hidden field names (case-sensitive)

Example: `https://tally.so/r/nPA50m?name=Marie&ref=email`

**If not configured:** URL params are silently ignored.

## Integration Platforms

Tally integrates with:
- Zapier
- Make (Integromat)
- n8n
- Pipedream

These handle **outgoing** data (form submissions → other services), not incoming submissions.

## Sources

- https://developers.tally.so/api-reference/introduction
- https://tally.so/help/webhooks
- https://tally.so/help/hidden-fields
- https://tally.so/help/pre-populate-form-fields
- https://tally.so/help/developer-resources
