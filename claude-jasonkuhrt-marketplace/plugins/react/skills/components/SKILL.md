---
name: components
description: React component structure and export conventions for personal projects. Triggers on component creation, refactoring, or when asking about React patterns.
---

# React Components

## Structure

- One component per module
- Component name matches module name
- Props interface named `Props`
- Use design tokens when available

## Definition Pattern

```typescript
import React from 'react';

interface Props {
  value: string;
  onChange?: (value: string) => void;
}

export const MyComponent: React.FC<Props> = ({ value, onChange }) => {
  return <div>{value}</div>;
};
```

## Key Points

- **Named export** with `export const`
- **`React.FC<Props>`** for type annotation
- **Arrow function** expression
- **Destructure props** in parameter
