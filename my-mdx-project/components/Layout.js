import React from 'react';
import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';

const Layout = ({ children, headings }) => {
  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ width: '200px', padding: '1rem', borderRight: '1px solid #ddd' }}>
        <ul>
          {headings.map((heading) => (
            <li key={heading.id}>
              <Link href={`#${heading.id}`}>
                <a>{heading.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main style={{ marginLeft: '220px', padding: '1rem' }}>
        <MDXProvider>{children}</MDXProvider>
      </main>
    </div>
  );
};

export default Layout;

