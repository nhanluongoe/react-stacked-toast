import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="container relative justify-center my-8 flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        <a
          className="underline"
          href="https://github.com/nhanluongoe/react-stacked-toast"
        >
          GitHub
        </a>
        <Link href="/docs">
          <button type="button" className="underline">
            Docs
          </button>
        </Link>
      </div>
      <div className="text-toast-600">
        <span>© {new Date().getFullYear()} react-stacked-toast</span>
        {' · '}
        <span>
          <span>Built by </span>
          <a className="underline" href="https://nhanluongoe.me">
            Nhan Luong
          </a>
        </span>
      </div>
    </footer>
  );
}
