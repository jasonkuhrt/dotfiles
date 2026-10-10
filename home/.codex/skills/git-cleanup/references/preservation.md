# Preservation contract

## Primary checkout

Transfer staged, unstaged, deleted and nonignored untracked files to a new review worktree. Preserve bytes, symlinks, deletions and staging distinction. Verify before clearing source changes; recheck for concurrent edits. Mark the review branch with Git configuration `branch.<name>.codex-cleanup-review=true`.

Keep the primary checkout. Fetch and fast-forward its clean default branch (`develop` for Heartbeat). Preserve local-only primary history before repairing divergence, using merge in Heartbeat. A source change or failed transfer never authorizes discarding source work.

## Feature checkpoints

1. Record eligibility from the original source snapshot.
2. Compare the feature's own remote ref. If the remote is strictly ahead of the unchanged local source, fetch and fast-forward the local branch before preservation. If histories diverged, stop for repair rather than overwriting either side. Commit ordinary tracked/nonignored untracked dirt as code commit **P**, and push P to that feature branch's own remote ref. Keep the source on its feature branch. Normalize any previously tracked `.session` out of P without removing working files; use local Git excludes when needed so session data remains ignored without editing repository files.
3. Seed a temporary Git index from P and force-add `.session`, including nested dotfiles, zero-byte files, symlinks and deletions from any previously tracked session tree.
4. Create **C** with `git commit-tree`: sole parent P; changes only under `.session`. Keep the ordinary remote feature at P. Push C to a unique `codex/archive/<source-branch>/<checkpoint-id>` remote branch and retain a local recovery ref through removal verification.
5. Verify remote IDs and source/session contents against the recorded snapshot immediately before removing the local checkout/ref. Source changes require recomputation or repair.

For a branch without a checkout, preserve its session tree from that branch's Git commit, never from the primary checkout's `.session` directory.

Neither squash ancestry nor an open PR protects a branch older than five days. Closed-PR eligibility includes later local edits, which still require preservation. Do not delete remote feature branches, archive refs or PRs during local cleanup.

Git stores symlinks, not external target bytes. Classify links and ignored material; report demonstrated unpreserved data for repair. A `.session` link into a path matched by the explicit regenerable-cache classifier is preserved as a link and annotated `regenerable_cache_target_not_copied`; the checkpoint message names the target that must be regenerated. For a target inside the removed source worktree, the restore body first verifies the saved link text, then replaces it with the equivalent relative link into the newly created checkout. This annotation never claims that target bytes were saved. Session nonemptiness itself is never a failure.

## Useful ignored material

Before deletion, copy every useful or unknown ignored path outside `.session` into a private local archive under `~/.codex/worktree-cleanup/ignored-archives/<run-id>/`. Each target archive has a `payload/` tree and `manifest.json` recording its branch, source worktree, roots, entries, file sizes and hashes, link targets, modes, empty directories, total bytes, counts, and content digest. The journal records the archive path, digest, and a shell-quoted `cp -a` restore command. Verify the payload against the manifest after the atomic archive move and again immediately before deletion or resumed removal.

The local archive preserves file bytes, zero-byte files, modes, symlinks as links, and empty directories without following link targets. It must live outside the worktree and is private local recovery state; never upload these files to GitHub commits, refs, artifacts, comments, or Secrets.

Discard only ignored paths matched by the narrow, explicit dependency/generated-cache classifier. It recognizes named cache/build roots and known generated-source forms such as `__generated_*`, `*.generated.source*`, and `*.tsbuildinfo`; it does not infer disposability from a generic-looking directory name. Unknown ignored paths remain useful material and are archived.

## Commit message and restore

C's message contains an explanation, a fully rendered fenced `sh` restore script, and trailers identifying format `v1`, source branch, full P SHA and full archive ref. Empty directory paths become generated `mkdir -p` commands, avoiding synthetic session files. Quote spaces, apostrophes and newlines correctly.

A commit cannot embed its own SHA. Fetch the unique archive into a dedicated local ref and derive C there, rather than relying on shared `FETCH_HEAD`. Verify its marker, sole parent P, and session-only changes before creating the feature branch.

Use `wt switch --create --base <C> --no-hooks --no-cd --execute sh` to run the restore body inside the new worktree. Check HEAD=C, then `git reset --mixed <P>` removes C from the feature branch/index while keeping working files. Recreate empty directories and connect ordinary upstream tracking when it exists. A deleted ordinary remote does not prevent local restoration from the archive.

Do not overwrite an existing local branch or revert the checkpoint, which would remove session files. Keep partial restoration inspectable on failure. The archive stays C and normal feature remains P, so restoration needs no remote unwind or force-push. The message's script requires only Git, `wt` and a shell, with no external helper/document.

If a verified checkpoint predates the portable cache-link restore body, repair its instructions with `refreshRestoreCheckpoint(repo, record, { sourceRemoved: true })`. The helper verifies the old preservation and removed source, creates **C2** with the exact same tree and sole parent P, writes the corrected fully rendered restore message, and uses new unique local and remote archive refs. It pushes only the new archive ref, verifies C2, and retains the original archive unchanged as recovery evidence.

## Journal resume

Resume a failed cleanup from its existing journal. Do not build a new plan for already selected targets: preservation commits and remote-ahead fast-forwards can make their live activity appear recent even though the original run legitimately selected them. The original eligibility and recorded source identity therefore remain authoritative for that run.

Resume is still fail-closed. Recheck the target's current branch/worktree ownership, expected source head, code/session/ignored snapshots, local recovery ref, ordinary remote feature ref, remote checkpoint ref, and local ignored archive before removing anything. Reuse already verified preservation instead of creating another checkpoint. Treat an already verified removed path/ref as completed idempotently, while a changed or missing recovery artifact remains a repair.

Run `cleanup.mjs resume --journal <journal.json>`. Current journals embed their selected targets; a legacy journal also needs `--plan <original-plan.json>`. Resume only the recorded `preserving`, `checkpoint_created`, `preserved`, and `repair_required` entries, leaving completed and policy-retained records intact.

## Learned script behavior

Preserve empty NUL-separated Git-ref fields; filtering them shifts local-only upstream columns. Resolve PRs by repository and head branch, preferring the newest relevant PR. A failed lookup or inspection is not proof of absence or emptiness.
