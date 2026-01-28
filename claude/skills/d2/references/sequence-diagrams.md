# D2 Sequence Diagrams

Sequence diagrams have different rules from regular D2 diagrams.

## Basic Structure

```d2
shape: sequence_diagram

client -> api: POST /data
api -> api: validate
api -> db: INSERT
db -> api: rows
api -> client: 201 Created
```

## Key Differences from Regular D2

- **Order matters** — connections render top-to-bottom in declaration order
- **Shared scope** — all actor references with the same name are the same entity
- **Self-messages** — connect an actor to itself: `api -> api: validate`

## Actors

Actors appear automatically when first referenced. Declare explicitly to control order:

```d2
shape: sequence_diagram

# Explicit ordering
client
api
db

client -> api: request
api -> db: query
```

## Spans (Activation Boxes)

Nest an object on an actor to create an activation span:

```d2
shape: sequence_diagram

client -> api: request
api.validate: {
  api -> db: check
  db -> api: ok
}
api -> client: response
```

## Groups (Fragments)

Containers within the sequence diagram that aren't connected:

```d2
shape: sequence_diagram

client
api

auth_flow: {
  client -> api: login
  api -> client: token
}

data_flow: {
  client -> api: GET /data
  api -> client: response
}
```

## Notes

Nested objects on an actor with no connections:

```d2
shape: sequence_diagram

client -> api: request
api.note: Processing request
api -> client: response
```
