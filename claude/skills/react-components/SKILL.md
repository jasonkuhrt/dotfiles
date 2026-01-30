---
name: components
description: Use when creating React components, refactoring component structure, or applying React export and typing conventions.
---

# React Components

Keywords: React.FC, functional component, props interface, named export, component file structure

## Structure

* One component per module
* Component name matches module name
* Props interface named `Props`
* Use design tokens when available

## Definition Pattern

```typescript
import React from 'react'

interface Props {
  value: string
  onChange?: (value: string) => void
}

export const MyComponent: React.FC<Props> = ({ value, onChange }) => {
  return <div>{value}</div>
}
```
