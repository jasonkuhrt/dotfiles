## one-component-per-module

Each module exports exactly one React component. The component name must match the module filename.

### Correct

```typescript
// MyComponent.tsx
export const MyComponent: React.FC<Props> = ({ value }) => {
  return <div>{value}</div>
}
```

### Incorrect

```typescript
// components.tsx
export const Button = () => { ... }
export const Input = () => { ... }
export const Label = () => { ... }
```

## props-interface-named-props

Props interfaces are named `Props`, not `MyComponentProps` or `IMyComponentProps`. The module already provides namespace — the interface name adds nothing.

### Correct

```typescript
interface Props {
  value: string
  onChange?: (value: string) => void
}

export const MyComponent: React.FC<Props> = ({ value, onChange }) => {
  return <div>{value}</div>
}
```

### Incorrect

```typescript
interface MyComponentProps {
  value: string
  onChange?: (value: string) => void
}

export const MyComponent: React.FC<MyComponentProps> = ({ value, onChange }) => {
  return <div>{value}</div>
}
```

## named-exports-not-default

React components use named exports. Default exports weaken refactoring — rename at import site doesn't propagate, and the symbol has no canonical name.

### Correct

```typescript
export const MyComponent: React.FC<Props> = ({ value }) => {
  return <div>{value}</div>
}
```

### Incorrect

```typescript
export default function MyComponent({ value }: Props) {
  return <div>{value}</div>
}
```

## react-fc-typing

Components are typed with `React.FC<Props>` on a const expression, not as a function declaration with inline return type.

### Correct

```typescript
export const MyComponent: React.FC<Props> = ({ value, onChange }) => {
  return <div>{value}</div>
}
```

### Incorrect

```typescript
export function MyComponent({ value, onChange }: Props): JSX.Element {
  return <div>{value}</div>
}
```
