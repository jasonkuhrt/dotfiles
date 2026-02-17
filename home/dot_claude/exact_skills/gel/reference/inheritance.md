# Gel Abstract Types and Inheritance

Create polymorphic, tagged-union style data models.

## Abstract Types (Mixins)

Can't create instances directly -- used to share structure.

```sdl
abstract type HasTimestamps {
  created_at: datetime {
    default := datetime_current();
  };
  updated_at: datetime;
}

abstract type HasName {
  required first_name: str;
  required last_name: str;

  property full_name := .first_name ++ ' ' ++ .last_name;
}

type Person extending HasTimestamps, HasName {
  email: str;
}
```

## Polymorphic Subtypes (Tagged Union Pattern)

```sdl
abstract type Fact {
  required message: Message;
  label: str;
  extracted_at: datetime {
    default := datetime_current();
  };
}

type TrackingFact extending Fact {
  required tracking_number: str;
  carrier: str;
}

type DateFact extending Fact {
  required date_value: datetime;
  date_type: str;
}

type AmountFact extending Fact {
  required amount: decimal;
  currency: str {
    default := 'CAD';
  };
}
```

## Polymorphic Queries

```edgeql
# Query all facts, accessing subtype-specific properties
select Fact {
  label,
  extracted_at,

  # Type-specific fields using [is SubType]
  [is TrackingFact].tracking_number,
  [is TrackingFact].carrier,
  [is DateFact].date_value,
  [is AmountFact].amount
};

# Filter by subtype
select TrackingFact {
  tracking_number,
  carrier
}
filter .carrier = 'UPS';
```

## Polymorphic Links

Links can target abstract types:

```sdl
type Message {
  required content: str;
  multi facts: Fact;    # can link to any Fact subtype
}
```
