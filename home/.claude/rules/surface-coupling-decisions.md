# Surface Coupling Decisions, Don't Make Them Unilaterally

When investigation surfaces a **major new discovery** — a fact not known
when the plan was set, that changes the shape of the work — and resolving it
requires a decision that **affects coupling or separation of concerns**
(dependency direction, layering, inversion of control, a new shared
dependency, where a responsibility lives, a public surface) — **STOP**. Do
not pick a resolution and continue. Surface the discovery and the options;
the user is the architect and owns the decision.

## Trigger

A "major new discovery" is a circular dependency, a hidden coupling, a
load-bearing constraint, an entanglement with another system or another
agent's work, a mechanism you didn't know existed — anything that means the
next step is no longer the obvious mechanical one.

## Mechanical vs. coupling decision

- **Mechanical** — one obvious correct way, no structural implication (the
  exact edit site, a rename, a type annotation). Proceed; mention it.
- **Coupling / separation-of-concerns** — picks a dependency direction, a new
  shared lib, an inversion of control, who-depends-on-what, who-owns-what, a
  public surface. STOP and surface it.

## The tell

Right after a discovery, if you write "so I'll [inject it / move it / add the
dependency / restructure X]… proceeding" — the clause after "so I'll" is a
coupling decision you are about to make for the user. Stop at that sentence.

## "Just execute" does not authorize this

Velocity instructions ("just execute", "skip the spec", "go") apply to the
**agreed plan**. A discovery that forces a structural fork was not in the
agreed plan — it is new. Resolving it unilaterally under the banner of
velocity is exactly the failure this rule prevents.

## What to do instead

1. Name the discovery and why it forces a decision.
2. Give 2-3 resolution options, each with its coupling / separation-of-concerns
   trade-off.
3. Recommend one, with reasoning — but let the user choose.
4. Resume only once they have decided.
