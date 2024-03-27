# 🍞 react-stacked-toast

<!-- [![npm version](https://img.shields.io/npm/v/react-stacked-toast.svg?style=flat-square)](https://www.npmjs.com/package/react-stacked-toast)
[![npm downloads](https://img.shields.io/npm/dm/react-stacked-toast.svg?style=flat-square)](https://www.npmjs.com/package/react-stacked-toast)
[![npm license](https://img.shields.io/npm/l/react-stacked-toast.svg?style=flat-square)](https://www.npmjs.com/package/react-stacked-toast) -->

https://github.com/nhanluongoe/react-stacked-toast/assets/42910096/ad5cf539-0c47-4afb-a39b-6594a5337860

<p align="center" style="font-size: 28px">
  When one toast is not enough, stack them up!
</p>

## 🔥 Features

- 📦 **Stackable**: Toast notifications are able to stack up on top of each other

- 🎯 **Simple**: Easy to use APIs with minimal setup

- 🎨 **Customizable**: You can customize the toast notification by passing a React component

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

### 1. Add the `Toaster` component to the your application

```tsx
import { Toaster } from 'react-stacked-toast';

const App = () => {
  return (
    <Toaster />
    // Other components
  );
};
```

### 2. Use the `toast` api to create a toast anywhere in your application

```tsx
import { toast } from 'react-stacked-toast';

const Component = () => {
  const handleClick = () => {
    // Quickly make a toast
    toast('Here is your toast!');

    // Or need more customization
    toast({
      title: 'React Stacked Toast',
      description: 'Here is your toast!',
      icon: '🍞',
      ...
    });
  };

  return <button onClick={handleClick}>Show toast</button>;
};
```

## 🔧 API

Full documentation can be found here on [react-stacked-toast](https://react-stacked-toast.vercel.app/).

## Acknowledgements

This project is inspired by [react-hot-toast](https://github.com/timolins/react-hot-toast)

## LICENSE

License under [MIT](./LICENSE)
