# GH Issue Read

## Use Cases

- Reading GitHub issues when WebFetch fails with "Unable to verify if domain github.com is safe"
- Fetching issue/PR details, comments, status
- Any GitHub URL that looks like `github.com/<owner>/<repo>/issues/<number>` or `/pull/<number>`

## Operations

### Read issue or PR

```bash
# Issue
gh issue view <number> --repo <owner>/<repo>

# PR
gh pr view <number> --repo <owner>/<repo>

# Include comments
gh issue view <number> --repo <owner>/<repo> --comments
```

### Parse URL to command

Given `https://github.com/oven-sh/bun/issues/8439`:

- owner: `oven-sh`
- repo: `bun`
- number: `8439`
- command: `gh issue view 8439 --repo oven-sh/bun`

Given `https://github.com/microsoft/TypeScript/pull/12345`:

- command: `gh pr view 12345 --repo microsoft/TypeScript`

## Notes

- `gh` CLI must be authenticated (`gh auth status` to check)
- Works for public repos without special permissions
- For private repos, needs appropriate access token
