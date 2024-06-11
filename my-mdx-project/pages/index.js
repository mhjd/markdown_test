import MDXContent, { getStaticProps } from '../components/MDXContent';

const HomePage = (props) => {
  return <MDXContent {...props} />;
};

export { getStaticProps };
export default HomePage;

