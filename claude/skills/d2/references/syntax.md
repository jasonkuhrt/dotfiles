# D2 Syntax Reference

## Shapes

```d2
# Default is rectangle
my_box

# Explicit shapes
my_oval.shape: oval
my_diamond.shape: diamond
my_cylinder.shape: cylinder
my_queue.shape: queue
my_hexagon.shape: hexagon
my_person.shape: person
my_cloud.shape: cloud
my_page.shape: page
my_package.shape: package
my_step.shape: step
my_callout.shape: callout
my_stored_data.shape: stored_data
my_parallelogram.shape: parallelogram
my_document.shape: document
my_square.shape: square
my_circle.shape: circle
```

Keys are case-insensitive (`postgresql` and `postgreSQL` reference the same shape).

## Connections

```d2
a -> b                    # directed
a <- b                    # reverse directed
a <-> b                   # bidirectional
a -- b                    # undirected
a -> b: request           # labeled edge
a -> b -> c               # chained
```

Repeated connections add new edges (don't replace).

### Arrowheads

```d2
a -> b: {
  source-arrowhead: diamond
  target-arrowhead: cf-many
}
```

Types: `triangle` (default), `arrow`, `diamond`, `circle`, `box`, `cf-one`, `cf-many`, `cf-one-required`, `cf-many-required`, `cross`

## Containers

```d2
frontend: {
  react
  redux
}

backend: {
  api
  database
}

frontend.redux -> backend.api
```

### Parent Reference

`_` refers to the parent container:

```d2
outer: {
  inner: {
    node
  }
  inner.node -> _.sibling
  sibling
}
```

## Labels

```d2
# Implicit (ID is the label)
my_node

# Explicit label
my_node: Display Name

# Markdown labels (requires shape declaration)
my_node: |md
  # Title
  - item 1
  - item 2
| {shape: rectangle}
```

## Styling

```d2
node.style.fill: "#f0f0f0"
node.style.stroke: red
node.style.stroke-width: 2
node.style.stroke-dash: 3
node.style.opacity: 0.5
node.style.border-radius: 8
node.style.shadow: true
node.style.3d: true
node.style.multiple: true
node.style.double-border: true
node.style.font-size: 20
node.style.font-color: blue
node.style.bold: true
node.style.italic: true
node.style.underline: true
node.style.animated: true
```

## Classes (Reusable Styles)

```d2
classes: {
  error: {
    style.fill: red
    style.font-color: white
  }
}

my_node.class: error
```

Multiple classes: `my_node.class: [error, highlight]`

Object attributes override class attributes. Multiple classes apply left-to-right.

Classes also write to the SVG `class` attribute, enabling CSS/JS post-processing.

## Icons

```d2
# URL icons
my_node.icon: https://icons.terrastruct.com/essentials/time.svg

# Local icons (CLI only)
my_node.icon: ./my_icon.png

# Standalone icon shape
my_icon: {
  shape: image
  icon: https://icons.terrastruct.com/aws/S3.svg
}
```

Built-in icons: https://icons.terrastruct.com

## Variables

```d2
vars: {
  primary: "#4a90d9"
  app_name: My App
}

title: ${app_name}
header.style.fill: ${primary}
```

Nested access: `${parent.child}`. Single quotes bypass substitution.

Spread: `...${variable}` expands maps/arrays into containing context.

## Config Vars

```d2
vars: {
  d2-config: {
    layout-engine: elk
    theme-id: 1
  }
}
```

CLI flags and env vars override in-file config.

## Grid Layouts

```d2
my_grid: {
  grid-rows: 2
  grid-columns: 3
  grid-gap: 10
  vertical-gap: 5
  horizontal-gap: 10

  cell_1
  cell_2
  cell_3
  cell_4
  cell_5
  cell_6
}
```

Setting one dimension distributes the other automatically. First dimension declared is the dominant fill direction.

## SQL Tables

```d2
users: {
  shape: sql_table
  id: int {constraint: primary_key}
  name: varchar
  email: varchar {constraint: unique}
  org_id: int {constraint: foreign_key}
}

orgs: {
  shape: sql_table
  id: int {constraint: primary_key}
  name: varchar
}

users.org_id -> orgs.id
```

Constraints: `primary_key` (PK), `foreign_key` (FK), `unique` (UNQ). Multiple: `{constraint: [primary_key, unique]}`.

## Composition

### Layers (Independent Boards)

```d2
# Root diagram content
a -> b

layers: {
  network: {
    server -> database
  }
  auth: {
    client -> auth_service
  }
}
```

Layers do not inherit from the root. Each is a standalone board.

### Scenarios (Inherit from Root)

```d2
a -> b

scenarios: {
  error_case: {
    a -> b: {style.stroke: red}
    b -> error_handler
  }
}
```

Scenarios inherit all root content, then apply modifications.

### Steps (Sequential Inheritance)

```d2
step_1: {
  a -> b
}

steps: {
  step_2: {
    b -> c
  }
  step_3: {
    c -> d
  }
}
```

Each step inherits from the previous step.

### Imports

```d2
# Import entire file as a value
my_component: @shared_component

# Spread import (insert contents into current map)
container: {
  ...@base_styles
}

# Partial import (specific object from file)
managers: @people.managers
```

Omit `.d2` extension. Paths resolve relative to importing file.

## Globs

```d2
# Single glob — matches current scope
*.style.fill: lightblue

# Double glob — matches all nesting levels
**.style.stroke: black

# Triple glob — matches globally including layers/imports
***.style.opacity: 0.9
```

### Filters

```d2
# Only apply to shapes with specific property
* {
  &shape: rectangle
  style.fill: blue
}

# Inverse filter — apply to everything except
* {
  !&shape: diamond
  style.fill: gray
}
```

Globs are case-insensitive. Multiple filter lines = AND.

## Themes

CLI: `d2 --theme 1 diagram.d2 output.svg`

Or in-file:

```d2
vars: {
  d2-config: {
    theme-id: 1
  }
}
```

Dark mode: use `dark-theme-overrides` flag for automatic switching.

Special: Terminal theme applies monospace font, caps, dots pattern, double-border.

## Comments

```d2
# This is a comment
my_node -> other_node
```

No multi-line comment syntax — use multiple `#` lines.
