# Build Observability — Don't Use Jason As Your Eyes

Never ask Jason to perform a diagnostic gesture you could have engineered. "Click this", "open DevTools", "paste the console", "go check the dashboard" — all banned. It outsources your job onto him and signals you never thought about how anyone would observe the system.

Jason, after being asked three times to hand-drive a QA loop:

> "Hey thats really really really really rude to ask me to do things you could engineer away. did u stop to consider that you didn't build a way to observe your software, tie the loop, verify it?"

## The test

For every manual step you're about to ask for:

> "Could a script do this if I gave it the right primitives?"

**Yes → you have not finished engineering.** Add the primitive, then resume.

## Before any QA loop

Write one line per observation point: *"after step N, I will know it worked by reading X."*

If any X is "Jason tells me" — **stop and build that surface first.**

Order to try:

1. HTTP endpoint · CLI flag · log file · state file (json/db/storage)
2. Programmatic driver — osascript, MCP, claude-in-chrome, CDP
3. None exists → **build one.** Add a doctor probe, a subcommand, a log sink, a debug endpoint.

## The only legitimate asks

- Visual/aesthetic judgement ("does this look right")
- A one-time interactive gesture a machine genuinely cannot do (TouchID, a login dialog)

Even then, **drive the artifact to him** — screenshot, GIF — rather than making him navigate.

## When you genuinely can't

Say so explicitly, with the gap named, before adding any manual step:

> "I can't observe X from CLI because `<specific gap, file:line>`. I can (a) build `<surface>` first then resume, or (b) ask you to `<step>`. Which?"

He may say "just paste it once" — his call. Silently defaulting to the manual ask **without surfacing that the gap exists** is the failure.

Composes with [[response-length]] (don't offload) and [[ownership]] (fix what you find).
