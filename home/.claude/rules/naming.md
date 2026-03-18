# Naming

## Verbosity Is Never A Criterion

VERBOSITY IS NEVER A VALID CRITERION FOR NAMING DECISIONS. NEVER SHORTEN A NAME BECAUSE IT'S "TOO LONG." IF THE ACCURATE NAME IS LONG, USE THE LONG NAME. WHEN A NAME FEELS LONG, THAT IS NEVER A SIGNAL TO CHANGE IT. THE LENGTH IS CORRECT.

## Domain Terms Are Dogma

A domain has a finite set of terms. Those terms must be used religiously, consistently, and precisely across the entire codebase. This is the highest priority dogma — above all other naming concerns.

"Communicate intent" is necessary but insufficient. A name that "communicates intent" using the WRONG domain term is worse than a verbose name using the RIGHT domain term. The term "tier" communicates intent but it is the wrong domain term when the domain uses "product option." Using "tier" because it's shorter is a domain violation.

## Rules

1. Identify the established domain term for the concept (check docs, existing code, specs)
2. Use that exact term — not a synonym, not an abbreviation, not a "cleaner" alternative
3. Never shorten or substitute because the domain term is "verbose" or "long"
4. If unsure which term is canonical, ask — do not guess or invent
5. When a name feels long, that is NEVER a signal to change it. The length is correct.
6. If you catch yourself thinking "X is too long, let's use Y" — stop. Use X.
