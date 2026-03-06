# Gel SDL Syntax (v3.0+)

Schema files use `.esdl` extension, typically in `dbschema/default.esdl`.

**Note:** SDL syntax changed significantly in v3.0 -- use current syntax.

## Key Syntax Changes (v3.0)

- No `property` or `link` keywords needed for non-computed fields
- Colons instead of arrows: `name: str` not `name -> str`
- Computed links still require `link` keyword (prior to v4)
- Old arrow syntax still supported but not recommended

## Basic Object Type

```sdl
type Person {
  required name: str;           # required property
  email: str;                   # optional property
  age: int16;

  required employer: Company;   # required link (single)
  multi friends: Person;        # multi link (many)
}
```

## Constraints

```sdl
type User {
  required email: str {
    constraint exclusive;       # unique
  };
  required username: str {
    constraint exclusive;
    constraint min_len_value(3);
  };
}
```

## Enums

```sdl
scalar type Status extending enum<
  pending, active, completed, cancelled
>;

type Task {
  required status: Status {
    default := Status.pending;
  };
}
```

## Computed Properties and Backlinks

```sdl
type Movie {
  required title: str;
  multi actors: Person;
}

type Person {
  required name: str;

  # Computed backlink - all movies where this person is an actor
  multi link acted_in := .<actors[is Movie];

  # Computed property
  property movie_count := count(.acted_in);
}
```

Backlink syntax: `.<link_name[is Type]` returns all objects with a link named `link_name` pointing to current object.

## Common Patterns

### Timestamps Mixin

```sdl
abstract type HasTimestamps {
  created_at: datetime {
    default := datetime_current();
    readonly := true;
  };
  updated_at: datetime {
    rewrite insert, update using (datetime_current())
  };
}
```

### Soft Delete

```sdl
abstract type SoftDeletable {
  deleted_at: datetime;
  property is_deleted := exists .deleted_at;
}

type Item extending SoftDeletable {
  required name: str;
}
```

### Self-Referential with Link Properties

```sdl
type Category {
  required name: str;

  parent: Category;
  multi link children := .<parent[is Category];

  property depth := (
    with recursive cat := .parent
    select count(cat)
  );
}
```
