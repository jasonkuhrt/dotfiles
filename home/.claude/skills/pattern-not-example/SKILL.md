---
name: pattern-not-example
description: Use when the user invokes pattern-not-example, offers a tentative form for a result (a name, a placement, a design, a wording, often with "e.g.", "like", "something like"), or gives an instance to illustrate a wider concern ("for example"); and when they say their example was an example ("not the scope", "don't take it verbatim", "the pattern is what I want"). For a tentative form, weigh credible alternatives against the outcome it serves; the user's form stays only if it wins. For an instance, apply its principle across the request's scope.
---

# Pattern, not example

The user writes fast and hands over raw intent. An example or a first
suggestion of theirs points at what they want. It is never the answer, and
never the edge of the request. They are counting on the agent to think the
idea through to its best form.

## The example is a candidate

When the example is a form the result could take (a name, a place to put
something, a design, a wording, a structure):

1. State what the example is for, in one line: the job the name, place or
   design has to do.
2. Produce the other candidates a careful person would weigh, judged by
   that job and by what already exists around it (the names beside it, the
   conventions it joins, the readers it has).
3. Pick the best, and say in a line why it beats the user's example. Their
   example stays only when it wins that comparison, and the reply then says
   what it beat.

Do this as part of the work. A choice between forms that give the user the
same thing is the agent's to make. When what is left changes what the user
gets, it goes to them as their rules on questions say, with each option
shown.

- Bad: the first name the user floats for a reply-review mode is used as
  given, with nothing compared against it.
- Good: `meta-reply-review` is chosen because it names the action in the
  words the user's rules use and follows the neighbouring `meta-` names for
  session modes, and the reply says what it beat.

## The example is one instance

When the example is a case of a wider problem:

1. State the principle in one line, in the user's terms, before acting.
2. Find every instance of it in the area the user named, not only the one
   they cited. Search for it; don't stop at the example's file or feature.
3. Act on all of them, the example included. Report what you found as a
   list of instances, not as the example fixed.

- Bad: told "prove shouldn't know the remote cache exists; for example it
  could trigger a cache sync, then run", the agent stopped one worker from
  wiring the remote cache into prove, and left the rest as it was.
- Good: the agent states "each vpp module owns one concern and knows its
  neighbours only through their interfaces", maps vpp's module edges, and
  fixes every module that knows another's internals or a concern it
  doesn't own.

## When it is unclear

When the point behind the example is unclear, name the readings in one line
and work from the one that serves the request best. When the readings differ
in what the user gets, that is a question for them, as above. Never shrink
back to the example to stay safe.

A form binds as written only when the user says that form is what they
want.
