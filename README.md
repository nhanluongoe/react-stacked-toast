# 🍞 react-stacked-toast

<!-- [![npm version](https://img.shields.io/npm/v/react-stacked-toast.svg?style=flat-square)](https://www.npmjs.com/package/react-stacked-toast)
[![npm downloads](https://img.shields.io/npm/dm/react-stacked-toast.svg?style=flat-square)](https://www.npmjs.com/package/react-stacked-toast)
[![npm license](https://img.shields.io/npm/l/react-stacked-toast.svg?style=flat-square)](https://www.npmjs.com/package/react-stacked-toast) -->

<p align="center">
<video width="480" height="360" controls>
  <source src="./site/assets/demo.mp4" type="video/mp4">
</video>
</p>

<p align="center" style="font-size: 28px">
  When one toast is not enough, stack them up!
</p>

## 🔥 Features

- 📦 **Tiny**: ~6kB gzipped

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
  return (
    <button
      onClick={() => {
        toast({
          title: 'React Stacked Toast',
          description: 'Here is your toast!',
        });
      }}
    >
      Show toast
    </button>
  );
};
```

## 🔧 API

Full documentation can be found here on [react-stacked-toast](https://react-stacked-toast.vercel.app/).

## Acknowledgements

This project is inspired by [react-hot-toast](https://github.com/timolins/react-hot-toast)

## LICENSE

License under [MIT](./LICENSE)
