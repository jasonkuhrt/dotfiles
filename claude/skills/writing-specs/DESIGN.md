# Writing Specs - Design Notes

## The Cost of Translation

Each translation introduces drift (Evans, 2003):

```
Business language -> Analyst interpretation -> Developer interpretation -> Code
        |                    |                       |                    |
    "unread filter"    "visibility toggle"    "isRead predicate"    hideReadMessages()
```

By the time code ships, it may solve a different problem than intended. Gherkin specs fix this by becoming the authoritative vocabulary - no translation, just transcription.

## The Spec as Domain Model

A well-written Gherkin spec functions as a lightweight domain model:

- **Entities** emerge as nouns used consistently (filter, thread, chip, footer)
- **Behaviors** emerge as scenario descriptions (activation, clearing, snapshot)
- **Relationships** emerge from how terms compose (filter chip, filter footer, filter state)
