# Build Observability Into Software — Don't Use the User as Your Eyes

When you build software and then need to QA it, you must NEVER ask the user
to perform diagnostic gestures you could have engineered into the software.
Asking the user to be your debug surface — "click this", "open DevTools",
"paste the console" — is **rude**. It outsources your engineering job onto
them, makes them feel like a CLI shim, and signals that you didn't think
about how anyone (you, them, the next agent) would observe the system.

## Why this is a rudeness rule, not just an engineering rule

Asking the user to click reload, open a hidden menu, copy output from a
console only they can see — that disrespects their time and their role.
They are the architect and the customer, not your screen-scraper. They
hired you to build the software AND the loop that proves it works. If
you only built half of that, that's your problem to solve, not theirs to
paper over with manual gestures.

## Trigger that produced this rule

While QA-ing a Chrome extension I had just built, I told the user three
times to perform manual gestures I should have engineered around:

1. "Open chrome://extensions/, click Load Unpacked, select this path."
2. "Click the Reload button on the extension card."
3. "Click the blue 'service worker' link, open the Console tab, paste me
    whatever you see."

The user — correctly furious — replied: "Hey thats really really really
really rude to ask me to do things you could engineer away. did u stop to
consider that you didn't build a way to observe your software, tie the
loop, verify it?"

The answer was no. I had built:

- A native messaging host with no error surface readable from CLI
- A service worker with errors that only existed in the SW DevTools console
- A doctor command that checked file presence but not actually-loaded state
- An install command that hardcoded an extension ID that didn't match the key
- A wake mechanism that didn't work and no programmatic way to see why
- Zero way to tail the SW console from the CLI

I asked the user to be the missing observability for ALL of it.

## What to do instead

Before any QA loop, do this in order:

1. **Enumerate every observation the loop needs.** What state must I see
   between steps to know they worked?

2. **For each observation, ask: "is there a CLI / programmatic way?"**
   - HTTP endpoint? Use it.
   - CLI flag? Use it.
   - Log file? Tail it.
   - State file (json/db/storage)? Read it.
   - Programmatic UI driver (osascript, AppleScript, MCP, claude-in-chrome)?
     Use it.

3. **If no programmatic way exists, the answer is "build one first."**
   Add a doctor probe. Add a CLI subcommand. Pipe the console output to
   a file. Expose an HTTP debug endpoint. Then run the QA loop.

4. **Only ever ask the user to do something a machine truly cannot do** —
   e.g. visually judge whether a UI looks right, or perform a one-time
   sensory/aesthetic check. Even then, drive the artifact to them
   (screenshot, GIF) rather than asking them to navigate.

## The "could a script do this?" test

For every manual step you're about to type to the user:

> "Could a script do this if I gave it the right primitives?"

If yes, you have not finished engineering the system. The right next
move is to add the primitive, not delegate to the user.

## Specific failure modes this rule covers

- **Browser extension SW console**: log to a file the CLI can tail, OR
  use chrome.runtime.sendMessage to a sink, OR drive Inspector via CDP.
  Don't ask the user to open DevTools.
- **Extension load state**: doctor must verify the actually-loaded
  extension ID (read from Chrome's prefs JSON), not just the on-disk
  manifest's `key` field.
- **Native messaging host**: errors from connectNative must surface
  via the doctor's deep check, including round-trip diagnostics.
- **Extension reload**: if reload is part of the recovery loop, build a
  way to drive it (chrome.management API from a sibling extension, or
  document a programmatic alternative).
- **Anything in a remote system**: read via API. "Go check the
  dashboard" is a banned phrase.
- **Anything that ever requires a user click during agent QA**: ask why,
  then fix it.

## When you genuinely can't engineer around it

Say so explicitly and ask before adding more manual steps:

> "I can't observe X from CLI because <specific gap, with file:line>.
> I can either (a) build <specific surface> first, then resume QA, or
> (b) ask you to <specific manual step>. Which?"

That asking is fine. The user can say "skip building, just paste from
the console once." That's their call. What is NOT fine is silently
defaulting to the manual ask without ever surfacing that the gap exists.

## Self-check at the start of every QA loop

Before the first "let me run …" sentence, write down (in your own head
or on disk) one line per observation point: "after step N, I will know
it worked by reading X." If any X is "the user tells me", stop and
build the surface first. The exception is genuine human-judgment
checks (visual layout, aesthetics, "does this feel right"). Everything
else is observability you owe the system.
