---
name: prisma
description: Prisma schema review and best practices. Use when reviewing schema changes, adding models, or auditing existing schema.
---

# Prisma

## Operations

### review

Review Prisma schema changes for quality and consistency.

**Checklist:**

- **Formatting:** Is schema formatted? Run `npx prisma format` if not.

- **Naming:**
  - Model names: PascalCase, singular (`User` not `Users`)
  - Field names: camelCase
  - Enum names: PascalCase
  - Enum values: SCREAMING_SNAKE_CASE or consistent with existing
  - Relation fields: match related model name (`user` for `User`)

- **Term consistency:** Same concept = same name everywhere. No `author`/`creator`/`user` for the same thing.

- **Field ordering:** Boilerplate frontloaded, then domain data:
  1. `id`
  2. Foreign keys / relation scalars
  3. Domain fields
  4. Timestamps (`createdAt`, `updatedAt`, `deletedAt`)

- **Enums:** Prefer enums over magic strings for finite sets. Check if existing enum fits before creating new.

- **Constraints:**
  - `@unique` where business logic requires uniqueness
  - `@@unique` for composite uniqueness
  - `@@id` for composite primary keys if needed

- **Indexes:**
  - Fields used in WHERE clauses frequently
  - Foreign keys (Prisma adds automatically for relations, but verify)
  - `@@index` for composite queries
  - Don't over-index (write penalty)

- **Nullability:** Default to required. Nullable (`?`) only when:
  - Field is genuinely optional in domain
  - Backwards compatibility requires it
  - Excessive nullables = complex data, complex code

- **Relations:**
  - Explicit relation names when ambiguous
  - `onDelete`/`onUpdate` - is cascade behavior intentional and safe?
  - Prefer `Restrict` or `SetNull` over `Cascade` unless deletion should propagate

- **Data types:**
  - `Decimal` for money (not `Float`)
  - `BigInt` for IDs that may exceed Int range
  - `@db.VarChar(n)` for strings with known max length
  - `Json` fields - could they be structured relations instead?

- **Timestamps:**
  - `createdAt DateTime @default(now())`
  - `updatedAt DateTime @updatedAt`
  - Pattern consistent across all models

- **Documentation:**
  - `///` doc comments on non-obvious fields
  - Explain business rules encoded in schema

- **Migration safety:**
  - Adding required field without `@default`? Breaks existing rows.
  - Removing field? Data loss.
  - Renaming? Prisma may drop+create instead of rename.
  - Is change backwards compatible with running code?

- **Legacy/Cruft:**
  - `@map`/`@@map` - still needed or removable?
  - Unused models/fields?

### review-queries

Review Prisma query patterns in backend code for efficiency.

**Philosophy:** Minimize database round-trips. Assume the happy path (validation passes) is the vast majority of cases—frontload data fetching, validate after. Rare overfetch beats constant underfetch.

**Checklist:**

- **Frontload queries:**
  - Fetch all needed data upfront in parallel or single query
  - Validate/check business rules in JS after
  - Don't query → validate → query → validate → query

- **Transactions over Promise.all:**
  - `prisma.$transaction([...])` for related writes
  - Atomic success/failure, no partial state
  - Interactive transactions when operations depend on prior results

- **Bulk operations:**
  - `createMany` / `updateMany` / `deleteMany` over loops
  - `createManyAndReturn` when you need created records back
  - Single query beats N queries

- **Select only what's needed:**
  - Use `select: { field1: true, field2: true }` for specific fields
  - Avoid fetching entire records when you need 2 fields
  - Especially important for records with large text/json fields

- **Include vs separate queries:**
  - `include` relations you'll definitely use
  - Separate query if relation used conditionally (avoid eager load)
  - Watch for deep includes (fetch explosion)

- **N+1 detection:**
  - Prisma query inside a `.map()` or loop = N+1
  - Fix: fetch all with `include` or `where: { id: { in: ids } }`

- **Aggregations in DB:**
  - `_count`, `_sum`, `_avg`, `_min`, `_max` in query
  - Not: fetch all records → JS reduce

- **Query method choice:**
  - `findUnique` over `findFirst` when you have unique field (cacheable)
  - `distinct` in query over fetch + JS dedupe

- **Pagination:**
  - Cursor-based for large datasets (`cursor`, `skip: 1`)
  - Offset (`skip`) scans all skipped rows—expensive at depth

- **Transaction structure:**
  - Reads first, writes after (consistent snapshot)
  - Group related writes in single transaction
  - Keep transactions short (lock duration)

- **TOCTOU / find-then-create races:**
  - `findFirst` → `create` on a unique field = race condition under concurrency
  - Safe in sequential flows (user signup), explodes under fan-out (batch jobs, Inngest, queues)
  - Fix: `upsert` with `update: {}` no-op — atomic find-or-create in one DB operation
  - Detect `created`: generate ID upfront, compare returned ID to know if record was created or found

- **Relation load strategy:**
  - `relationLoadStrategy: "join"` - single query with DB JOIN instead of multiple queries
  - Useful when you know you'll use the relation

- **Mass assignment (security):**
  - Never `create({ data: req.body })` or `update({ data: req.body })`
  - Attacker can inject `role: 'admin'` or other fields
  - Always explicitly specify fields

- **Large result sets:**
  - 1000+ rows with relations can spike memory
  - Use `select` over `include` for large queries
  - Consider pagination or streaming for very large datasets

## Patterns

Design patterns that can aid schema modeling. Not strictly required, but useful when the situation fits.

### Union Encoding

Encode discriminated unions using field name prefixes when a record can be one of several variants.

**Pattern:** `{discriminant}_{variant}_{field}`

```prisma
// Discriminant (must be enum, no Type suffix)
errorType                       SubscriptionMigrationRecordAttemptErrorType?

// Variant-specific fields (prefix matches discriminant exactly)
errorType_stripe_code           StripeErrorCode?
errorType_stripe_codeUnknown    String?
```

**Rules:**

- Discriminant field must be an enum
- Discriminant field name has NO `Type` suffix (use `errorType` not `errorTypeType`)
- Variant fields prefixed with `{discriminant}_{variantName}_`
- Prefix must match discriminant field name exactly
- Variant fields only populated when discriminant matches that variant
- Null otherwise

**When to use:** Record has mutually exclusive states with different associated data.

### Branded Types

Create type-safe model discrimination using a single-member enum as a brand field.

**Pattern:**

```prisma
enum UserBrand {
  User
}

model User {
  id    String    @id @default(cuid())
  brand UserBrand @default(User)
  // ...
}
```

**Rules:**

- Enum has exactly one member matching the model name
- Field has `@default` set to that member (never written manually)
- Creates a string literal type at the TypeScript level

**When to use:** Preventing ID mixups between models. A `User.id` and `Post.id` are both strings, but with brands, TypeScript can distinguish them.

### Enum Escape Hatch

Capture unmapped values when an enum doesn't cover all possible source values (e.g., external API codes).

**Pattern:** `{enumField}Unknown` with `unknown` variant

```prisma
errorType_stripe_code           StripeErrorCode?    // mapped enum value
errorType_stripe_codeUnknown    String?             // raw value when code = unknown
```

**Rules:**

- Escape hatch enum variant is always `unknown` (never `other`)
- `Unknown` suffix on field indicates the original unmapped value
- Only populated when enum field equals `unknown`
- Enum must include an `unknown` variant as the catch-all

**When to use:** Integrating with external systems that may add new codes you haven't mapped yet (Stripe error codes, webhook event types, etc.).

### Views

Read-only models backed by database views using the `view` keyword.

```prisma
view UserStats {
  userId       String
  postCount    Int
  lastPostDate DateTime?

  user User @relation(fields: [userId], references: [id])

  @@unique([userId]) // enables findUnique, not enforced
}
```

**Characteristics:**

- No mutations generated (create/update/delete unavailable)
- No `@id` or `@@index` (virtual tables)
- `@unique`/`@@unique` enable `findUnique` and relations but are NOT enforced by DB
- Must create view SQL manually in migration (`migrate dev --create-only`)

**When to use:** Complex aggregations, denormalized read models, cross-table computed data.

### Extensions

Client extensions replace deprecated middleware. Define once, apply to extended client instances.

**Computed fields** (`result` component):

```typescript
const xprisma = prisma.$extends({
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return `${user.firstName} ${user.lastName}`;
        },
      },
    },
  },
});
// xprisma.user.findMany() returns records with fullName
```

**Query hooks** (`query` component):

```typescript
const xprisma = prisma.$extends({
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }) {
        const start = performance.now();
        const result = await query(args);
        console.log(`${model}.${operation}: ${performance.now() - start}ms`);
        return result;
      },
    },
  },
});
```

**Limitations:**

- `result` component cannot depend on relations (only scalar fields in same model)
- `result` computes on access (lazy), `query` computes after query execution

**When to use:** Computed fields, query logging/timing, soft delete filters, model-specific business logic.

### TypedSQL

Type-safe raw SQL for complex queries (Prisma 5.19+). Preferred over manual `$queryRaw` typing.

```sql
-- prisma/sql/getUserStats.sql
SELECT u.id, u.name, COUNT(p.id) as post_count
FROM "User" u
LEFT JOIN "Post" p ON p."authorId" = u.id
GROUP BY u.id
```

```typescript
import { getUserStats } from "@prisma/client/sql";
const stats = await prisma.$queryRawTyped(getUserStats());
// stats is typed: { id: string; name: string; post_count: bigint }[]
```

**When to use:** CTEs, window functions, complex aggregations, anything Prisma's query builder can't express.

**Gotcha:** Template literal vs function call matters for SQL injection safety:

```typescript
// SAFE - template literal (prepared statement)
prisma.$queryRaw`SELECT * FROM User WHERE id = ${id}`;

// UNSAFE - function call with template (string interpolation)
prisma.$queryRaw(`SELECT * FROM User WHERE id = ${id}`);
```

## Reference

### Multi-file Schema

Organize large schemas by domain (GA in v6.7.0):

```
prisma/
  schema.prisma      # main: generator, datasource
  user.prisma        # User, Profile, Session
  post.prisma        # Post, Comment, Tag
  billing.prisma     # Subscription, Invoice
```

**Conventions:**

- One obvious "main" file for generator/datasource blocks
- Domain-based naming (not `myModels.prisma`)
- Related models grouped in same file

## Notes

- Run `npx prisma validate` to catch syntax errors
- Run `npx prisma format` before committing
- Review generated migration SQL, not just schema diff
- Enable query logging in dev to spot N+1 and slow queries
