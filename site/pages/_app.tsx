import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import Link from 'next/link';
import '../styles/main.css';
import '../styles/tailwind-utils.css';

import { MDXProvider } from '@mdx-js/react';
import { Code } from '../components/code';

const components = {
  a: (props) => (
    <Link href={props.href}>
      <span {...props} />
    </Link>
  ),
  code: (props) =>
    props.className ? (
      <Code className={props.className} snippet={props.children} />
    ) : (
      <code
        className="bg-white py-1 my-0.5 px-1 rounded bg-opacity-40"
        {...props}
      />
    ),
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <MDXProvider components={components}>
        <Component {...pageProps} />
        <Analytics />
      </MDXProvider>
    </>
  );
}

export default MyApp;
