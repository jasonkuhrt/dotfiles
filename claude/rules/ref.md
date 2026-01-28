# Using ref MCP for Documentation

__When working with libraries, check the docs with Ref.__ Don't guess APIs - verify with actual documentation.

When you need to look up documentation for APIs, libraries, or services:

1. __Search first__ - Use `ref_search_documentation` with a full sentence query
2. __Read selectively__ - Only `ref_read_url` on the most promising results
3. __Iterate__ - Refine your query based on what you learn, don't bulk-load
4. __Minimize tokens__ - Ref returns ~5k tokens max per read; trust its relevance filtering

Example flow:

```
SEARCH 'Effect Schema decode unknown data validation'
READ <most relevant URL from results>
# If needed, refine and search again
```

Avoid: Fetching entire documentation pages upfront. Ref handles excerpt selection.
