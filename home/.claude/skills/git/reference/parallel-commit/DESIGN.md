# Parallel Commit Design

## The Problem

Git's staging area (`.git/index`) is shared. Concurrent `git add` + `git commit` from parallel agents can cross-contaminate commits or hit `index.lock` errors.

## The Solution

Use `git commit -- <paths>` which defaults to `--only` mode. This commits only the specified paths from the working tree, ignoring whatever else is staged. The entire stage-commit-update sequence runs under `index.lock`, making it atomic.
