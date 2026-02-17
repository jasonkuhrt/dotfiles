---
name: prisma
description: Prisma schema review and best practices. Use when reviewing schema changes, adding models, or auditing existing schema.
---

# Prisma

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
