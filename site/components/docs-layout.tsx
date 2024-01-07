import { NextSeo } from 'next-seo';
import Link from 'next/link';
import * as React from 'react';
import { Footer } from './sections/footer';

const TableItem: React.FC<{
  href: string;
  children?: React.ReactNode;
}> = ({ children, href }) => (
  <Link href={href}>
    <button
      type="button"
      className="rounded px-3 py-1.5 transition-colors duration-200 relative block hover:text-toast-500 text-toast-700"
    >
      {children}
    </button>
  </Link>
);

const TableHeader: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => (
  <span className="px-3 mt-3 mb-1 text-sm font-semibold tracking-wide text-toast-900 uppercase">
    {children}
  </span>
);

export default function DocsLayout({ meta, children }) {
  return (
    <div className="bg-white bg-opacity-50 min-h-screen flex flex-col">
      <NextSeo titleTemplate="%s - react-stacked-toast" title={meta.title} />

      <div className="flex-1 mx-auto px-2 max-w-4xl w-full">
        <header className=" col-start-1 col-end-6 mt-12 mb-16 px-2 flex justify-between items-center">
          <a href="/" className="font-bold text-2xl">
            react-stacked-toast
          </a>
          <a
            className="flex text-toast-600 underline"
            href="https://github.com/nhanluongoe/react-stacked-toast"
          >
            GitHub
          </a>
        </header>

        <div className="md:flex md:space-x-4">
          <nav className="font-medium rounded-lg ">
            <div className="flex flex-col mb-8 sticky top-0">
              <TableHeader>Overview</TableHeader>
              <TableItem href="/docs">Get Started</TableItem>
              <TableHeader>API</TableHeader>
              <TableItem href="/docs/toaster">Toaster</TableItem>
              <TableItem href="/docs/toast">toast()</TableItem>
            </div>
          </nav>

          <main className="col-span-4 w-full prose prose-toast text-toast-900 flex-1 pl-12 border-l border-toast-500">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
