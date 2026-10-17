# Doc Set Protocol

Rules for a package whose docs outgrow one README. Use alongside `~/.claude/skills/readme/core.md` (shared quality rules) and `~/.claude/skills/readme/core-readme.md` (the README itself).

## When a package needs a doc set

A doc set is the answer when one of these holds:

- The complete user docs would pass about 600 lines in one README. Count what a complete README needs (every G1 and G5 section and every construct), not what the current README holds. Count only lines a reader reads: leave out generated regions, count the glossary as placement rule 7 leaves it, and count G6's full inline reference only where doc comments do not already carry the contract. Count with `wc -l` over the user files, minus generated regions. Within about 10% of the line, keep the shape the docs already have.
- The package has extension packages (plugins, adapters) that are their own packages.

Maintainer material alone never makes a doc set: it goes to CONTRIBUTING.md. A package below the line keeps one README, however many constructs it has. Never split a README that a reader can hold in one pass. The baseline for size is the complete-README count above, not the old README. A doc set that grows well past that count needs a reason for each added part: a fact the count lacked, never scaffolding.

## Layout

```text
<package>/
  README.md                 orientation and index: what it is, why, quickstart, the mental model, the indexes
  docs/
    references/<construct>.md   vertical: one construct, end to end
    concepts/<concept>.md       horizontal: one idea that crosses constructs
    research/<date>-<topic>/    raw research records, kept as written, never rewritten
  CONTRIBUTING.md           maintainers: how the package is built and why
  contrib/<topic>.md        maintainers, when CONTRIBUTING.md cannot hold it all (see below)
```

Extension packages keep their own README. The core README lists them in an extensions table.

## The two axes

**A reference is vertical.** It covers one construct, a thing a user writes or calls by name: a model kind, a field kind, a relation, a projection, the client, a test double, the generator config. It runs end to end. It shows what the user writes, what each option does, what the client or runtime then gives, the errors, and the limits. A reader who knows the construct's name finds everything about it in one file.

**A concept is horizontal.** It explains one idea that no single construct owns and that several references rely on. Examples are storage columns versus fields, nullability, fields a plugin writes, and how a library normalizes errors. A concept file states the idea once and shows it in each construct it touches, each with a link to that reference. A reference that relies on the idea links to the concept and never explains the idea again.

Name a file for its construct or idea, in the package's own words. A file name is never a layer name such as `client.md` or `runtime.md` that collects unrelated constructs.

## Where a fact lives

1. **One home per fact.** Every other mention is a link to that home. A fact stated in two files will drift. The review counts every duplicate as a defect.
2. **An overlap lives with the construct that changes the other.** When construct A changes how construct B behaves, the fact lives in A's reference, and B's reference keeps one link line. For example, a tagged union changes how layouts, relations and projections behave inside it, so those facts live in the union reference.
3. **An extension package owns every fact about itself.** That includes how it behaves with the core's constructs. The core states only the generic rule that applies to any extension, and links each package from its extensions table.
4. **Maintainer facts leave the user docs.** Internals, generator pipelines, wire protocols, design decisions and rejected alternatives go to CONTRIBUTING.md. When it would pass about 800 lines, or holds several independent protocols, it becomes an index of `contrib/<topic>.md` files. A user doc links into `contrib/` only when a user needs the reason behind a limit.
5. **An export's contract lives in its doc comment.** Its parameters, its return, its errors and its options are stated there, and nowhere else. A reference owns what crosses exports: how the construct's parts work together, and its rules. A reference's Types block shows each signature with a one-line purpose and links the doc comment; it never restates the contract. A reference never contradicts a doc comment. When a reference is written ahead of the code, the doc comment is updated when the code lands.
6. **Research stays raw.** A research record is evidence and is never rewritten. A reference or a contrib file links to the record it relies on. When a record recommended something other than what shipped, the link says so. The links inside a record are not maintained: a record is dated evidence, and a link in it that a later move breaks stays broken.
7. **A ubiquitous-language file is the vocabulary's home.** When the package has one (`UBIQUITOUS_LANGUAGE.md`), the README glossary links the file once and holds entries only for the terms the file lacks. Its rows have no anchors, so nothing links a row. A term is never copied from it by hand, and a "keep the two in step" instruction is a defect. Before the README defers to the file, hold its rows to G7.1–G7.6 and to § Sentences, against the docs' own words, and report each failure. When a tool reads the file (a lint rule that copies rows into doc comments), a row the tool finds by a code name keeps that name, and a domain-term row sits beside it; editing such a row changes source, so check the doc comment it produces. A term the file defines only inside another row's meaning counts as one it lacks. A UL entry that breaks G7.2 is a defect to report. Check what tooling reads the file (a lint rule may copy its rows into source) before you edit it.

## File shapes

### README.md in a doc set

Keep the G1 sections from `core-readme.md`, with two changes:

- **Concepts** becomes a short narrative of the mental model. It gives each idea a few sentences and links its concept file.
- **API Reference** becomes the index: a table of references (construct and file), a table of concepts, the extensions table, and a link to CONTRIBUTING.md.
- **A G5 section** (Architecture, Observability, Error Reference) becomes an index too: one row per item, linking the reference that owns it. It sits in API Reference beside the other indexes, never between Concepts and Usage. An error with no name (a compiler refusal with no rule text) is named in the index by its trigger ("a child of the wrong node type").
- **A generated region** (an export list between generator markers, such as `api-toc`) is never edited by hand. Its markers sit in the API Reference section; the generator fills them wherever they are. Check the generator's behaviour before you move markers.

### A reference

```markdown
# <Construct>

<Two or three sentences that say only what the code below cannot show.>

<One code block: what the user writes, and what they get, annotated inline.>

## <One section per facet, in the order a user meets them>

## Types
<one annotated code block of valid declarations, e.g. `type Grammar = Circuit.Grammar<typeof laundry> // what it adds`: each export this construct owns, with what its signature and doc comment don't say>

## Rules
- <One rule per bullet.> Held by [<source or test>](<link>).

## Questions
### Does the library already <do the thing a user is about to build>?
<code answer first, then one line naming the owner>

## Known gaps
<one annotated code block, one line per gap, each with its issue key>

## Long form
- <links to specs, concepts and research>
```

Every section is optional: omit a section with nothing true to say, and add no heading only to fill the template.

- **State each rule once.** State it as a comment on the facet's code, or as a Rules bullet, never both. Rules holds only the rules no facet shows.
- **Link a rule's holder; don't quote it.** Link the test or the source file. A quoted test title is maintainer evidence. A rule held only by a comment, a type or an unexported function is a gap to report, not a bullet. A link inside a code comment does not render, so a file whose rules sit in code comments ends with one line that links the tests holding them ("Tests: …").
- **Examples build on the Quickstart.** A reference may assume the README Quickstart's declarations. The opening ends with one line that names the ones the file uses, and any it takes from elsewhere (Usage); that line does not count toward the opening's three sentences. Never declare them again.
- **A Question earns its place.** Add one only for a capability that no facet of the file shows, and that a user would likely build again by hand.
- **Long form lists only links the body does not already make:** specs, concepts and research.
- **Types covers what the export list doesn't.** A Types line states what the signature and the doc comment do not. When a generated export list exists, an export with nothing to add needs no line.

### A concept

```markdown
# <Concept>

<Two or three sentences: the idea, and why a user needs it.>

## <The idea in each construct it touches>
<one example per construct, with a link to that construct's reference>

## Rules
```

### Extension package README

This is the package's own README (G1). It adds a section on how it behaves with the core's constructs, which states the extension's facts and links the core's generic rule.

## Words

Grounding uses the reader's words. Concepts maps each reader's word to its domain term once ("a step is a **node**"), and the domain term is used from then on. That mapping is the one place two words name one thing.

## Writing ahead of the code

A decided design may be documented before it is built. Write it as true. Keep the list of written-ahead statements outside the docs, in the work item or the pull request, so it can be tracked to the code. A doc never says "will", "planned" or "not yet built", and never tells history.

## Links in a private monorepo

The Cardinal Rule in `core-readme.md` bans relative links to sibling packages, because an OSS package ships alone. A link that resolves inside the package's own directory (`../../src/…` from `docs/references/`) is always allowed. A private workspace package ships with its siblings, so its relative links to workspace packages are allowed too. Check the package's `private` flag, or the repo's publishing setup, before you apply either rule. The Cardinal grep in `review-readme.md` flags only links that leave the package, and, for an OSS package, those are violations.
