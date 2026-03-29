# Backlog

- Investigate how to run reliable Ralph-style loops with Codex without relying on a live desktop thread:
  - verify the best current pattern for Codex (`exec` loop, Responses API loop, Ralph/Ralphy adapters, or Codex app server)
  - determine whether any supported mechanism can drive an already-open Codex macOS session from cron
  - determine whether `codex resume` / `codex exec resume` can ever control one live app thread, or only append to shared session history
  - document the difference between session history, live app state, and model context
  - produce one recommended automation pattern for unattended continuation with explicit tradeoffs
