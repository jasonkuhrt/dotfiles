---
paths: ".github/**, **/.git/**, **/CONTRIBUTING.md"
---

# Git & GitHub

* Never push to main branch
* Feature branches: `feat/description`
* Bug branches: `fix/description`
* Reusable workflows: prefix with `_`
* GH issues: write to tmp file first to avoid shell issues
* When debugging CI issues, use the `gh` CLI to investigate logs, workflows, and deployments directly
* Check workflow runs, deployment statuses, and logs yourself before asking for debug information
* __Default PR merge strategy: `--squash`__ - Use squash merge by default when merging PRs with `gh pr merge`
