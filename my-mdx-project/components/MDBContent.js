import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import Layout from './Layout';

const MDXContent = ({ source }) => {
  const [headings, setHeadings] = React.useState([]);

  React.useEffect(() => {
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingList = Array.from(elements).map((element) => ({
      id: element.id,
      text: element.innerText,
    }));
    setHeadings(headingList);
  }, []);

  return (
    <Layout headings={headings}>
      <MDXRemote {...source} />
    </Layout>
  );
};

export async function getStaticProps() {
  const mdxSource = `
# Heading 1
## Heading 2
### Heading 3
  `;

  const mdx = await serialize(mdxSource, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
  });

  return { props: { source: mdx } };
}

export default MDXContent;

