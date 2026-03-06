# GitHub Actions: No Explicit Permissions on Private Repos

**Never add `permissions:` blocks to workflow files in private repositories.**

Private repos grant the default GITHUB_TOKEN broad permissions. Adding an explicit `permissions:` block restricts the token to only what you listed — everything else drops to `none`. This breaks `git fetch`, `actions/checkout`, and any step that needs `contents: read` unless you remember to list every single permission.

Just don't. Let the repo default handle it.
