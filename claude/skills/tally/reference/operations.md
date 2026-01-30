# Tally Operations

## Discover Form Fields

Find the field structure for any Tally form.

**Input:** Form URL (e.g., `https://tally.so/r/nrvBY2`)

**Step 1: Fetch the form**

```
WebFetch:
  url: https://tally.so/r/<formId>
  prompt: "Extract the form structure: form ID, field names, field IDs (UUIDs),
           field types, required status, placeholders, and any hidden fields"
```

**Step 2: Parse the response**

Look for:
- `formId` and `workspaceId` in the page data
- Field blocks with UUIDs (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
- Field types: `textarea`, `email`, `text`, `number`, `dropdown`, etc.
- Required indicators
- Placeholder text (helps identify field purpose)

**Step 3: Output the structure**

Example (Ref's doc request form):

```
Form: Add docs to Ref
URL: https://tally.so/r/nrvBY2

| Field | Type | Required | Placeholder |
|-------|------|----------|-------------|
| What docs would you like indexed? | textarea | Yes | "https://react.dev, ..." |
| Email | email | No | "john.smith@acme.com" |
```

---

## Submit to Form

Guide user through manual submission to a Tally form.

**Input:**
- `formId`: From URL (e.g., `nrvBY2`)
- `fields`: Array of `{ name, value }` pairs

**Step 1: Display submission details**

Output in copy-friendly format (no side borders):

```
===============================================
TALLY FORM SUBMISSION
===============================================

Form: https://tally.so/r/<formId>

-- Field: <field1.name> --

<field1.value>

-- Field: <field2.name> --

<field2.value>

===============================================
```

**Step 2: Direct user**

1. Open the form URL
2. Copy each field value from above
3. Paste into corresponding form field
4. Submit
