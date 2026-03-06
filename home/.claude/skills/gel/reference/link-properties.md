# Gel Link Properties (Edge Data)

Store metadata on the relationship itself, not the objects.

**When to use:** Best for many-to-many relationships where the link is a distinct concept with its own data.

**Constraints:** Link properties can only be primitive data (scalars, enums, arrays, tuples) -- not links to other objects.

```sdl
type Person {
  required name: str;

  multi friends: Person {
    strength: int16;                    # how strong the friendship
    since: datetime;                    # when friendship started
    notes: str;
  };

  multi follows: Person {
    followed_at: datetime {
      default := datetime_of_statement();
    };
  };
}
```

## Querying Link Properties

Use `@` prefix to access link properties:

```edgeql
select Person {
  name,
  friends: {
    name,
    @strength,        # link property
    @since
  }
}
filter .name = 'Alice';
```

## Inserting with Link Properties

```edgeql
insert Person {
  name := 'Alice',
  friends := (
    select Person { @strength := 10, @since := <datetime>'2020-01-01' }
    filter .name = 'Bob'
  )
};
```
