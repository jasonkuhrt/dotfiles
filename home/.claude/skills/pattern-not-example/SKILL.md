---
name: pattern-not-example
description: Use when the user invokes pattern-not-example, or says their example was an example and not the scope ("not the scope", "it's an example", "the pattern/principle is what I want"), and whenever a request or concern of theirs carries an example ("for example", "e.g.", "like X"). The example points at a principle; act on the principle everywhere it applies.
---

# Pattern, not example

An example the user gives points at a principle. The principle is the scope.
The example is one instance of it.

1. State the principle in one line, in the user's terms, before acting.
2. Find every instance of it in the area the user named, not only the one
   they cited. Search for it; don't stop at the example's file or feature.
3. Act on all of them, the example included. Report what you found as a
   list of instances, not as the example fixed.

When the principle is unclear, name the two readings in one line and pick
one. Never shrink back to the example to stay safe.

- Bad: told "prove shouldn't know the remote cache exists; for example it
  could trigger a cache sync, then run", the agent stopped one worker from
  wiring the remote cache into prove, and left the rest as it was.
- Good: the agent states "each vpp module owns one concern and knows its
  neighbours only through their interfaces", maps vpp's module edges, and
  fixes every module that knows another's internals or a concern it
  doesn't own.
