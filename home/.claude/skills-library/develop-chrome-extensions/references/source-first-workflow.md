# Source-First Workflow

Use this workflow before changing any Chrome-extension behavior.

## Loop

1. Read local source and tests around the failing path.
2. Read generated artifacts that the source produces.
3. Read official Chrome docs or Chromium source for the exact platform behavior.
4. Write a falsifiable root-cause sentence:

   `Because <contract>, <source/artifact> is wrong; therefore <symptom>.`

5. Change the smallest source unit that violates the contract.
6. Add or update the lowest deterministic test that pins the contract.
7. Run one live Chrome check only after local tests and artifact inspection pass.

## Stop Conditions

Stop and re-read source/docs when:

- A live check fails twice.
- A command is being retried with different flags without a new source-backed hypothesis.
- The diagnosis says "socket missing", "Chrome did not wake", or "profile mismatch" without naming the exact Chrome contract and artifact.
- The browser-control tool blocks extension-page inspection.

## Source Priority

1. Repo source and tests.
2. Generated bundle, manifest, launcher, and config files.
3. Official Chrome docs.
4. Chromium source/docs.
5. Read-only local Chrome profile metadata.

Avoid blogs and forum answers except as search hints.
