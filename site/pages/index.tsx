import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';
import toast from 'react-stacked-toast';
import Logo from '../assets/logo.svg';

import Checkmark from '../assets/checkmark.svg';
import GitHub from '../assets/github.svg';
import { Footer } from '../components/sections/footer';
import { ToastExample } from '../components/sections/toast-example';
import { ToasterExample } from '../components/sections/toaster-example';

const Feature: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="flex gap-1 items-center">
    <Checkmark />
    <span className="font-bold">{children}</span>
  </div>
);

const Step: React.FC<{
  count: number;
  title: string;
  subTitle?: string;
  code: React.JSX.Element;
}> = (props) => (
  <div className="flex flex-col gap-1 items-center">
    <div className="h-6 w-6 mb-2 text-sm rounded-full bg-toast-900 text-toast-50 flex items-center justify-center">
      {props.count}
    </div>
    <div className="font-bold">{props.title}</div>
    <div className="text-red-700 text-sm">{props.subTitle}</div>
    <code className="mt-2 border border-toast-200 py-2 px-4 rounded font-bold bg-white w-full text-center">
      {props.code}
    </code>
  </div>
);

const Steps = () => (
  <div className="grid  grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8 my-12">
    <Step
      count={1}
      title="Install package"
      code={
        <code>
          <span className="text-toast-600">yarn add</span>{' '}
          <span className="text-toast-800">react-stacked-toast</span>
        </code>
      }
    />
    <Step
      count={2}
      title="Add <Toaster /> to your app"
      code={
        <>
          <span className="text-toast-600">{'<div>'}</span>
          <span className="text-toast-800">{'<Toaster/>'}</span>
          <span className="text-toast-600">{'</div>'}</span>
        </>
      }
    />
    <Step
      count={3}
      title="Ready to serve!"
      code={
        <>
          <span className="text-toast-600">toast</span>
          <span className="text-toast-800">{`({title: "Wanna a toast?"})`}</span>
        </>
      }
    />
  </div>
);

const Features = () => (
  <div className="my-12 grid gap-x-8 gap-y-5 grid-cols-2 md:grid-cols-3">
    <Feature>Easy to use</Feature>
    <Feature>Customizable</Feature>
    <Feature>Tiny</Feature>
  </div>
);

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <NextSeo
        title="react-stacked-toast - Stacked toast for React applications"
        description="When one toast isn't enough, stack them up!"
      />

      <header className="">
        <div className="container  flex flex-col items-center relative">
          <Logo />
          <div className="text-center my-12 relative duration-200">
            <h1 className="text-5xl md:text-6xl animate-enter font-bold text-toast-900">
              react-stacked-toast
            </h1>
            <h1 className="">When one toast is not enough, stack them up!</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-4 rounded-2xl p-4 w-full max-w-lg">
            <button
              type="button"
              className={clsx(
                'rounded-lg font-bold gap-4 flex bg-white shadow-button text-center',
                'py-4 px-6',
                'active:translate-y-0.5 active:shadow-button-active active:bg-gray-100 transform',
                'focus:outline-none focus:ring-4'
              )}
              style={{
                transitionProperty: 'box-shadow, transform',
              }}
              onClick={() => {
                toast.success({
                  title: "Here's your toast",
                });
              }}
            >
              <div>🛎 </div>
              <span className="flex-1 mr-2">I&apos;m hungry</span>
            </button>
            <a
              className={clsx(
                'rounded-lg flex font-bold bg-white py-4 px-6 shadow-button  text-toast-800',
                'active:translate-y-0.5 active:shadow-button-active transform'
              )}
              style={{
                transitionProperty: 'box-shadow, transform',
              }}
              onClick={() => {}}
              href="/docs"
            >
              <span>📖</span>
              <span className="flex-1 text-toast-800 text-center">
                Documents
              </span>
            </a>
          </div>
          <div className="text-toast-600 my-2 cursor-pointer shadow-sm">
            <Link href="https://github.com/nhanluongoe/react-stacked-toast">
              <GitHub />
            </Link>
          </div>

          <Features />
          <Steps />
          <div className="w-full max-w-4xl">
            <div className="my-14">
              <ToastExample />
            </div>
            <div className="my-14">
              <ToasterExample />
            </div>
          </div>
        </div>
      </header>
      <Footer />
    </div>
  );
}
