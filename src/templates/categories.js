import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

const CatRoute = ({ pageContext }) => {
  const posts = pageContext.group;
  return (
    <Layout>
      <section className='section'>
        {/* <Helmet title={pageContext.title} /> */}
        {/* <p>{pageContext.title}</p> */}
        {posts.map(post => (
          <Link to={post.node.fields.slug} key={post.node.id}>
            {post.node.frontmatter.title} - {post.node.frontmatter.author}{' '}
            <br />
          </Link>
        ))}
      </section>
    </Layout>
  );
};

export default CatRoute;
