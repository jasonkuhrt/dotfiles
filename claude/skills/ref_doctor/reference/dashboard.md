# Ref Dashboard Operations

No API yet -- these are manual steps via web UI.

## Adding a GitHub Repo

1. Go to [ref.tools/resources?tab=github](https://ref.tools/resources?tab=github)
2. Click **Add GitHub Repos**
3. Authenticate with GitHub if prompted (uses personal access token)
4. Select repos to index
5. Wait for initial sync (large repos may take a few minutes)

**What gets indexed:**
- Repos <2k files: everything (code + docs)
- Repos >2k files: docs only

**Sync:** Every 5 minutes, incremental. If you rewrite git history, remove and re-add the repo.

## Uploading PDF/Markdown

1. Go to [ref.tools/resources?tab=pdf](https://ref.tools/resources?tab=pdf)
2. Click **Add Files**
3. Upload `.pdf` or `.md` files (max 100MB each)
4. Files are chunked and indexed automatically

**Use case:** Man pages, internal docs, version-specific library docs not in public index.

## Viewing Usage

1. Go to [ref.tools/activity](https://ref.tools/activity)
2. See daily credit spend by endpoint (search, read, chat, web)
3. Filter by date range
4. Export to CSV for audits

## Managing API Keys

1. Go to [ref.tools/keys](https://ref.tools/keys)
2. Create new keys, revoke old ones
3. Each key shows last used timestamp

## Team Management

1. Go to [ref.tools/team](https://ref.tools/team)
2. Select team in workspace picker (top-left)
3. Invite members, assign roles

**Roles:**

| Role | Can Search | Can Add Content | Can Invite | Can Manage Billing |
|------|------------|-----------------|------------|-------------------|
| Admin | Yes | Yes | Yes | Yes |
| Writer | Yes | Yes | No | No |
| Reader | Yes | No | No | No |

**Tip:** For public-docs-only teams, have one Admin and invite everyone else as Readers.

## Requesting Docs Be Added to Public Index

When Ref doesn't have docs for a library/tool you need:

**Form details:**
- Form ID: `nrvBY2`
- URL: https://tally.so/r/nrvBY2

**Fields:**

| Field | Content |
|-------|---------|
| What docs would you like indexed? | 1-5 sentences with context (see template below) |
| Email | User's email |

**Request template:**

```
<Tool/library name> - <what it is, 1 sentence>

<Why it's useful to index / what's currently missing, 1-2 sentences>

URL: <documentation URL>

Note: <any special notes about docs structure, size, format>
```

**Common doc URLs:**
- tmux: `https://man.openbsd.org/tmux`
- git: `https://git-scm.com/docs`

**Submission:** REQUIRED SUB-SKILL: tally
```
formId: nrvBY2
fields:
  - name: "What docs would you like indexed?"
    value: <drafted request>
  - name: "Email"
    value: <user email>
```

**After submitting:** Ref team reviews and adds to public index. Check back in a few days.
