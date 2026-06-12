---
name: shopping
description: Use for high-investment purchase decisions where the user wants to research a category, evaluate options, and shop with confidence. Triggers on phrases like "I'm shopping for X", "help me find a Y", "research X to buy", "compare options for Z", "I want to buy a quality A", "find me a [category]". Especially when aesthetic, material spec, or vendor preferences matter (home goods, clothing, furniture, appliances, gear). Coordinates a research-dispatch + user-visual-verification loop, scaffolds a matter directory with a living vendor catalog and locked spec, and closes cleanly when purchases happen. ALWAYS use this skill the moment the user signals they're shopping for something non-trivial — even before asking clarifying questions.
dependencies: []
---

# shopping

## When to use

Trigger when the user wants to research and decide on a purchase that's any of:
- **Multi-criteria** — more than just "cheapest"; material, aesthetic, sourcing, brand all matter
- **Investment-level** — not a $5 commodity buy; user wants to get it right
- **Across an opaque market** — no clear category leader; the user expects to do real research
- **Time-bounded** — has a deadline (sublet date, party, gift, move-in)

Triggering phrases include "I'm shopping for X", "help me find a Y", "research X to buy", "compare options for Z", "I want to buy a quality A", "find me a [category]", "what's the best B for under $C".

## The core loop

This is the pattern that worked end-to-end in real purchase decisions (see Reference Material below for a full worked example). Skipping any step usually produces wrong recommendations.

### 1. Map the market structure FIRST

Don't dive into products. Spend the first 5-10 minutes understanding the category itself:
- What makes a product genuinely good vs a ripoff?
- What specs/materials actually matter (vs marketing distinctions)?
- Where does the market segment by price/quality?
- What are the failure modes (e.g., shower curtains: PEVA traps moisture; cotton waffle mildews easily in slow-drying bathrooms; hemp is mildew-resistant but absorbent)?

This gives you the framework to evaluate everything else. Without it, you're forwarding marketing copy.

### 2. Capture constraints with 3-4 high-leverage questions

Use AskUserQuestion for structured choices. Pick the questions that filter the most. Don't ask everything — pick wisely. Typical high-leverage axes:

- Geometry / dimensions (for physical-fit purchases)
- Aesthetic direction (often the highest-stakes filter; describe styles concretely, not as labels)
- Material preferences and tolerance for tradeoffs
- Budget bands (and willingness to stretch for "exceptional")
- Sourcing preferences (Canadian-designed, USA-made, fair-trade, secondhand)

### 3. Lock the spec

Translate constraints into a buyable spec table: dimensions, materials, hardware, hard budget, sourcing rules. This is your filter for research; agents and the user both reference it.

### 4. Scaffold the matter

Create `matters/<category>/`:
- `README.md` — active state, locked spec, final order list (updates as the matter progresses; reflects actual purchases when closed)
- `stores.md` — living vendor catalog with per-entry status (active / rejected / sold-out / defunct / purchased) AND reasons. Eliminated items keep their entry so future research doesn't re-investigate them.
- `inputs/photos/` — user-supplied visual references (their current setup, room photos)
- `inputs/sketches/` — diagrams for layout/measurement clarification (e.g., labeled top-down views the user can annotate and send back)

### 5. Persist physical/home facts

For purchases that depend on the buyer's space (furniture, curtains, appliances, decor), capture dimensions and layout ONCE in `/me/home.md` (or equivalent persistent file) — auto-imported via CLAUDE.md so future home-goods shopping doesn't re-measure. Same applies for body measurements (clothing), vehicle specs (parts), etc.

### 6. Dispatch research with HARD verification rules

When asking research agents to surface candidates, every candidate must clear these gates BEFORE inclusion:

- VERIFY the URL returns 200 AND the product shows in-stock TODAY
- VERIFY the specific variant/color/size is buyable (NOT brand-level "in stock" — colors and sizes have separate inventory)
- VERIFY the catalog applies to the user's region (cross-border catalogs genuinely differ — US linen line ≠ Canadian linen line, even from the same brand)
- INCLUDE a direct product image URL so the user can eyeball it
- DESCRIBE aesthetic in concrete language — no "premium," "luxurious," "elevated." Say "natural-tan unbleached hemp, utilitarian look" or "white waffle weave with subtle dimensional texture"
- INCLUDE ship-to-region cost, duties, and lead times

Per project convention (when in `/me`-style repos): dispatch agents via teams — `TeamCreate` first, then `Agent` calls with `team_name` + `name` parameters.

### 7. Run the user-visual-verification loop

THIS IS NON-NEGOTIABLE. Agents surface candidates with URLs and images. The user opens 2-3 in their browser. The user reacts ("ugly," "out of stock now," "wrong size for my space," "way more expensive at checkout"). You iterate.

**Never recommend a product without surfacing the actual product image for the user's eyeball check.** Skipping this step is the most common failure mode in shopping research — the agent's job is to verify URL existence; only the user can verify "is this what I actually want."

### 8. Surface conflicts early

If the user's constraints provably can't all be satisfied (e.g., "Canadian-designed + hemp + design-forward + currently in stock = empty intersection"), surface the impossibility immediately and ask which axis to flex. Don't keep grinding empty searches.

### 9. Watch cost reality at checkout

Listed price is often misleading. Shipping + duties + tax can double international purchases. Compare DELIVERED cost, not listed cost.

Risk-asymmetric thinking: a returnable purchase from a major retailer at lower price often beats a premium pre-order with no returns even when the premium is technically better. If something arrives wrong, the returnable option costs $0; the no-return option costs the full purchase price plus needing to find an alternative.

### 10. Close the matter

When the user purchases:
- Search msgvault (or the user's email index) for order confirmations: `subject:order`, `subject:receipt`, `subject:confirmation`, search by retailer name
- Update `README.md` to show ACTUAL purchases vs original recommendations (people often add adjacent items to leverage shipping thresholds — capture this)
- Include order numbers, prices paid, additional items batched into the order
- Mark deferred items explicitly (e.g., "Midea dehumidifier deferred 2026-05-09 per user — revisit if mildew recurs in 6 months")
- Update `stores.md` entries: rejected items keep their reason; chosen items get marked PURCHASED with date

## The single most important pattern

**Agent verifies URL existence; user verifies "is this actually what I want." These are different. The agent cannot replace the user's visual reaction.**

Common agent failures the eyeball check catches:
- **Defunct domain** — URL returns 200 because the registrar is squatting; the actual brand is dead
- **Wrong cross-border catalog** — US product page exists; the user's region has zero of it
- **Pre-order disguised as in-stock** — collection page says "in stock" but the specific variant ships in 6 weeks
- **Aesthetic miss** — spec checks every box but the actual product looks utilitarian or cheap
- **Cost reality at checkout** — listed at $45 USD; final $128 CAD with shipping + duties

When you skip the eyeball check, you forward bad recommendations the user has to reject manually. When you do it, you converge fast on the right answer.

## Common gotchas worth remembering

- **Match the user's working baseline before "improving" it.** If the user's existing setup works on dimensions A and B but failed on C, change ONLY C. Don't over-engineer the things that already worked. The existing setup is data — read it before designing from first principles.

- **Hidden vs visible items have different priority profiles.** A decorative outer panel needs aesthetic clearance; an inner liner just needs to do its functional job. Don't over-spend on the hidden role; don't under-invest on the visible one.

- **Annual consumables vs durables have different economics.** A $9.99 liner replaced annually beats a $128 liner on per-month cost unless the premium lasts 13× longer (it almost never does).

- **Marketing-copy density is a tell.** Genuine artisan listings describe materials directly ("10oz hemp canvas, brass grommets at 4" centers"). Mass-market eco-branding drowns in feel-good prose ("exquisite, eco-conscious sanctuary, 🌿🏡🌱"). Trust concrete specs over emoji bullets.

- **Cross-border shipping reality.** US brands often don't ship to Canada at all (Coyuchi, Lulu & Georgia). Brands that "ship to Canada" via Global Shopex or international carriers usually mean: duties due at delivery, no returns, 2-3 week transit. Factor into timing for time-bounded purchases.

- **EVA vs PEVA vs PVC** (or any "premium fiber" debate): often marketing distinctions, not visible ones. Make sure the differentiator actually shows up in user-experienced quality before paying the premium.

- **Look in the user's email when they say they bought something.** Order confirmations have full itemization, prices paid, what additional items were batched in. Don't ask the user to retype what's already in their inbox.

## Reference material

- **Full worked example:** `/Users/jasonkuhrt/me/matters/shower-curtain/` — end-to-end walkthrough of this skill applied to a real shower-curtain purchase. The README + stores.md show the format. The Status sections show how the matter evolves from "research dispatched" to "spec locked" to "purchased." Read this before applying the skill to a new category — concrete examples beat abstract instructions.

- **Persistent home facts pattern:** `/Users/jasonkuhrt/me/home.md` — bathroom layout/dimensions captured once, auto-imported via CLAUDE.md so future bath/decor shopping doesn't re-measure. Same pattern works for any persistent physical context.

- **Memory:** check `feedback_shopping_research_loop` for the saved verification-loop guidance, and `user_shopping_skill_desire` for the original ask.
