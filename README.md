# react-stacked-toast

A simple stacked toast notification component for React.

<img alt="Snackbars example design" src="./public/demo.gif" width="903" height="564" />

## 🏃 Getting started

Using npm:

```console
npm i react-stacked-toast
```

Using yarn:

```console
yarn add react-stacked-toast
```

## 📚 Usage

### 1. Add the `Toaster` component to the root of your application

```tsx
import { Toaster } from 'react-stacked-toast';

const App = () => {
  return (
    // Other components
    <Toaster />
  );
};
```

### 2. Use the `useToast` hook to create a toast anywhere in your application

```tsx
import { useToast } from 'react-stacked-toast';

const Component = () => {
  const toast = useToast();

  const handleClick = () => {
    toast({
      title: 'Hello world!',
      description: 'This is a toast notification.',
    });
  };

  return <button onClick={handleClick}>Show toast</button>;
};
```

## 🔧 API

### 1. `Toaster` component

The `Toaster` component is used to render the toast notifications. It should be placed at the root of your application.

#### Available props

```tsx
<Toaster duration={5000} />
```

##### `duration` Prop

The duration of the toast in milliseconds. Defaults to `5000`.

### 2. the `toast()` API

The `toast()` API is used to create a toast notification

#### Available options

```tsx
toast({
  title: 'Hello world!',
  description: 'This is a toast notification.',
  duration: 5000,
});
```

##### `title` Option

The title of the toast notification.

##### `description` Option

The description of the toast notification.

##### `duration` Option

This is the duration of the toast instance in milliseconds. This will overwrite the duration prop of the `Toaster` component.

## LICENSE

[MIT](./LICENSE)
