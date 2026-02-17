## naming-conventions

Model names: PascalCase, singular. Field names: camelCase. Enum names: PascalCase. Enum values: camelCase. Underscores permitted for category groupings (e.g., `userSkip_noCustomerMatch`). Exception: enums mirroring external API contracts (e.g., `StripeErrorCode`) retain the external format. Relation fields: match related model name.

### Correct

```prisma
model User {
  id        String   @id @default(cuid())
  firstName String
  status    UserStatus
  team      Team     @relation(fields: [teamId], references: [id])
  teamId    String
}

enum UserStatus {
  active
  inactive
  suspended
}
```

### Incorrect

```prisma
model Users {
  id         String @id @default(cuid())
  first_name String
  status     user_status
  myTeam     Team   @relation(fields: [teamId], references: [id])
  teamId     String
}

enum user_status {
  ACTIVE
  INACTIVE
}
```

## term-consistency

Same concept = same name everywhere. Don't mix synonyms for the same entity across models, fields, and relations.

### Correct

```prisma
model Post {
  author   User   @relation(fields: [authorId], references: [id])
  authorId String
}

model Comment {
  author   User   @relation(fields: [authorId], references: [id])
  authorId String
}
```

### Incorrect

```prisma
model Post {
  author   User   @relation(fields: [authorId], references: [id])
  authorId String
}

model Comment {
  creator   User   @relation(fields: [creatorId], references: [id])
  creatorId String
  // Same concept as Post.author but different name
}
```

## field-ordering

Boilerplate frontloaded, then domain data. Order: id, foreign keys/relation scalars, domain fields, timestamps.

### Correct

```prisma
model Order {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  amount    Decimal
  note      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Incorrect

```prisma
model Order {
  amount    Decimal
  createdAt DateTime @default(now())
  id        String   @id @default(cuid())
  note      String?
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])
  userId    String
}
```

## prefer-enums

Use enums over magic strings for finite, known sets. Check if an existing enum fits before creating a new one.

### Correct

```prisma
enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
}

model Order {
  status OrderStatus @default(PENDING)
}
```

### Incorrect

```prisma
model Order {
  status String @default("pending") // magic string
}
```

## default-required

Fields are required by default. Use nullable (`?`) only when the field is genuinely optional in the domain. Excessive nullables = complex data, complex code.

### Correct

```prisma
model User {
  id    String  @id @default(cuid())
  email String  // required — every user has an email
  bio   String? // genuinely optional
}
```

### Incorrect

```prisma
model User {
  id    String  @id @default(cuid())
  email String? // why optional? Every user needs an email
  name  String? // defaulting to nullable "just in case"
}
```

## relation-cascade-safety

Prefer `Restrict` or `SetNull` over `Cascade` unless deletion should genuinely propagate. Use explicit relation names when a model has multiple relations to the same target.

### Correct

```prisma
model Comment {
  post   Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId String
  // Cascade correct: deleting a post should delete its comments
}

model Order {
  user   User   @relation(fields: [userId], references: [id], onDelete: Restrict)
  userId String
  // Restrict correct: don't delete users with existing orders
}
```

### Incorrect

```prisma
model Order {
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String
  // Cascade dangerous: deleting a user silently destroys order history
}
```

## data-type-precision

`Decimal` for money (not `Float`). `BigInt` for IDs that may exceed Int range. `@db.VarChar(n)` for strings with known max length. Consider structured relations over `Json` fields.

### Correct

```prisma
model Invoice {
  amount   Decimal  @db.Decimal(10, 2)
  currency String   @db.VarChar(3) // ISO 4217
}
```

### Incorrect

```prisma
model Invoice {
  amount   Float   // floating point rounding errors on money
  currency String  // unbounded when max is 3 chars
}
```

## standard-timestamps

Every model gets `createdAt` with `@default(now())` and `updatedAt` with `@updatedAt`. Pattern must be consistent across all models.

### Correct

```prisma
model User {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Incorrect

```prisma
model User {
  id        String   @id @default(cuid())
  created   DateTime @default(now())  // non-standard name
  // missing updatedAt entirely
}
```

## migration-safety

Adding a required field without `@default` breaks existing rows. Renaming fields may cause Prisma to drop+create instead of rename. Review generated migration SQL, not just schema diff.

### Correct

```prisma
// Adding field to existing model — safe with default
model User {
  role String @default("member") // existing rows get "member"
}
```

### Incorrect

```prisma
// Adding required field without default — breaks existing rows
model User {
  role String // INSERT fails for existing rows with no value
}
```

## doc-comments-non-obvious

Use `///` doc comments on fields where the purpose or business rule isn't obvious from the name alone.

### Correct

```prisma
model Subscription {
  /// Stripe subscription ID, prefixed with "sub_"
  externalId String @unique

  /// Null until first successful charge; distinguishes trial from paid
  activatedAt DateTime?
}
```

### Incorrect

```prisma
model Subscription {
  externalId  String    @unique
  activatedAt DateTime?
  // Reader must guess what these mean and why activatedAt is nullable
}
```

## frontload-queries

Fetch all needed data upfront in parallel or a single query. Validate business rules in JS after. Don't interleave queries with validation.

### Correct

```typescript
const [user, team, subscription] = await prisma.$transaction([
  prisma.user.findUnique({ where: { id: userId } }),
  prisma.team.findUnique({ where: { id: teamId } }),
  prisma.subscription.findFirst({ where: { teamId } }),
]);
// Validate all at once
if (!user) throw new NotFoundError("user");
if (!team) throw new NotFoundError("team");
if (!subscription?.active) throw new ForbiddenError("inactive subscription");
```

### Incorrect

```typescript
const user = await prisma.user.findUnique({ where: { id: userId } });
if (!user) throw new NotFoundError("user");

const team = await prisma.team.findUnique({ where: { id: teamId } });
if (!team) throw new NotFoundError("team");
// Sequential: 2 round-trips when 1 would suffice
```

## transactions-over-promise-all

Use `prisma.$transaction([...])` for related writes — atomic success/failure, no partial state. Use interactive transactions when operations depend on prior results.

### Correct

```typescript
await prisma.$transaction([
  prisma.order.create({ data: orderData }),
  prisma.inventory.update({
    where: { sku },
    data: { quantity: { decrement: 1 } },
  }),
]);
```

### Incorrect

```typescript
await Promise.all([
  prisma.order.create({ data: orderData }),
  prisma.inventory.update({
    where: { sku },
    data: { quantity: { decrement: 1 } },
  }),
]);
// If inventory update fails, orphaned order exists
```

## bulk-operations

Use `createMany` / `updateMany` / `deleteMany` over loops. Single query beats N queries.

### Correct

```typescript
await prisma.notification.createMany({
  data: userIds.map((userId) => ({ userId, message, type: "INFO" })),
});
```

### Incorrect

```typescript
for (const userId of userIds) {
  await prisma.notification.create({
    data: { userId, message, type: "INFO" },
  });
}
```

## select-needed-fields

Use `select` for specific fields instead of fetching entire records, especially for records with large text/json fields.

### Correct

```typescript
const emails = await prisma.user.findMany({
  where: { active: true },
  select: { id: true, email: true },
});
```

### Incorrect

```typescript
// Fetches all columns including large profile JSON, avatar blob, etc.
const users = await prisma.user.findMany({ where: { active: true } });
const emails = users.map((u) => u.email);
```

## no-n-plus-one

A Prisma query inside a `.map()` or loop is an N+1. Fix with `include` or `where: { id: { in: ids } }`.

### Correct

```typescript
const users = await prisma.user.findMany({
  where: { id: { in: userIds } },
  include: { posts: true },
});
```

### Incorrect

```typescript
const users = await prisma.user.findMany({ where: { id: { in: userIds } } });
const usersWithPosts = await Promise.all(
  users.map(async (u) => ({
    ...u,
    posts: await prisma.post.findMany({ where: { authorId: u.id } }),
  })),
);
```

## aggregate-in-db

Use Prisma aggregations (`_count`, `_sum`, `_avg`) instead of fetching all records and reducing in JS.

### Correct

```typescript
const stats = await prisma.order.aggregate({
  where: { userId },
  _count: true,
  _sum: { amount: true },
});
```

### Incorrect

```typescript
const orders = await prisma.order.findMany({ where: { userId } });
const total = orders.reduce((sum, o) => sum + o.amount, 0);
const count = orders.length;
```

## findUnique-over-findFirst

Use `findUnique` over `findFirst` when querying by a unique field. `findUnique` is cacheable and semantically communicates the constraint.

### Correct

```typescript
const user = await prisma.user.findUnique({ where: { email } });
```

### Incorrect

```typescript
const user = await prisma.user.findFirst({ where: { email } });
// email is @unique — findFirst hides that guarantee
```

## upsert-over-find-then-create

`findFirst` then `create` on a unique field is a TOCTOU race condition under concurrency. Use `upsert` with `update: {}` for atomic find-or-create.

### Correct

```typescript
const record = await prisma.setting.upsert({
  where: { key },
  create: { key, value: defaultValue },
  update: {}, // no-op — just return existing
});
```

### Incorrect

```typescript
let record = await prisma.setting.findFirst({ where: { key } });
if (!record) {
  record = await prisma.setting.create({ data: { key, value: defaultValue } });
  // Race: another request may create between find and create
}
```

## no-mass-assignment

Never spread request body directly into `data`. Attacker can inject `role: 'admin'` or other fields. Always explicitly specify fields.

### Correct

```typescript
await prisma.user.update({
  where: { id },
  data: { name: req.body.name, email: req.body.email },
});
```

### Incorrect

```typescript
await prisma.user.update({
  where: { id },
  data: req.body, // attacker sends { role: 'admin', name: 'hacker' }
});
```
