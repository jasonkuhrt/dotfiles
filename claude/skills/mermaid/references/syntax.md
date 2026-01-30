# Mermaid Syntax Reference

## Flowcharts

### Basic Structure

```mermaid
flowchart LR
    login --> validate_credentials
    validate_credentials --> is_valid{is_valid}
    is_valid -->|yes| grant_access
    is_valid -->|no| show_error
```

### Directions

* `LR` - Left to Right
* `TD` or `TB` - Top Down / Top to Bottom
* `RL` - Right to Left
* `BT` - Bottom to Top

### Node Shapes

| Syntax     | Shape             | Use For            |
| ---------- | ----------------- | ------------------ |
| `[Text]`   | Rectangle         | Processes, steps   |
| `(Text)`   | Rounded rectangle | Start/end          |
| `{Text}`   | Diamond           | Decisions          |
| `[(Text)]` | Cylinder          | Databases          |
| `([Text])` | Stadium           | Events             |
| `[[Text]]` | Subroutine        | External processes |
| `((Text))` | Circle            | Connectors         |

### Subgraphs

```mermaid
flowchart TB
    subgraph frontend[frontend]
        react_app --> state_store
    end
    subgraph backend[backend]
        api_server --> database
    end
    state_store --> api_server
```

## Sequence Diagrams

### Basic Structure

```mermaid
sequenceDiagram
    participant browser as Browser
    participant api as API
    participant db as Database

    browser->>api: POST /users
    api->>api: validate_payload
    api->>db: INSERT user
    db-->>api: user_record
    api-->>browser: 201 Created
```

### Arrow Types

| Syntax | Meaning                       |
| ------ | ----------------------------- |
| `->`   | Solid line without arrow      |
| `-->`  | Dotted line without arrow     |
| `->>`  | Solid line with arrow         |
| `-->>` | Dotted line with arrow        |
| `-x`   | Solid line with cross (async) |
| `--x`  | Dotted line with cross        |

### Notes and Activations

```mermaid
sequenceDiagram
    participant client as Client
    participant server as Server

    client->>+server: send_request
    Note right of server: validate_and_process
    server-->>-client: send_response
```

### Loops and Alternatives

```mermaid
sequenceDiagram
    participant monitor as Monitor
    participant service as Service

    loop every_minute
        monitor->>service: health_check
    end

    alt healthy
        service-->>monitor: status_ok
    else degraded
        service-->>monitor: status_error
    end
```

## State Diagrams

### Basic Structure

```mermaid
stateDiagram-v2
    [*] --> draft
    draft --> review: submit
    review --> approved: approve
    review --> draft: reject
    approved --> published: publish
    published --> [*]
```

### Composite States

```mermaid
stateDiagram-v2
    [*] --> active
    state active {
        [*] --> idle
        idle --> processing: start_job
        processing --> idle: job_complete
    }
    active --> [*]: shutdown
```

## Class Diagrams

### Basic Structure

```mermaid
classDiagram
    class HttpClient {
        +String base_url
        +int timeout_ms
        +send_request()
    }
    class JsonClient {
        +String content_type
        +parse_response()
    }
    HttpClient <|-- JsonClient
```

### Relationships

| Syntax  | Meaning     |
| ------- | ----------- |
| `<\|--` | Inheritance |
| `*--`   | Composition |
| `o--`   | Aggregation |
| `-->`   | Association |
| `..>`   | Dependency  |
| `..\|>` | Realization |

## Gantt Charts

```mermaid
gantt
    title Release Pipeline
    dateFormat YYYY-MM-DD

    section planning
    user_research     :a1, 2025-01-01, 14d
    schema_design     :a2, after a1, 10d

    section delivery
    implementation    :b1, after a2, 30d
    integration_tests :b2, after b1, 14d
```

## Entity Relationship

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    PRODUCT ||--o{ LINE_ITEM : "ordered in"
```

### Relationship Syntax

| Syntax | Meaning      |
| ------ | ------------ |
| `\|\|` | Exactly one  |
| `o\|`  | Zero or one  |
| `}o`   | Zero or more |
| `}\|`  | One or more  |

## Styling

### Node Colors

```mermaid
flowchart LR
    fetch_data
    transform_data:::highlight

    classDef highlight fill:#f96,stroke:#333
```

### Link Styles

```mermaid
flowchart LR
    parse_input --> validate
    validate -.-> log_warning
    log_warning ==> halt_pipeline
```

* `-->` Solid arrow
* `-.->` Dotted arrow
* `==>` Thick arrow
