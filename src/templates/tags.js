import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const TagRoute = ({ data }) => {
  return (
    <Layout>
      <section className='section'>
        <p>
          <Link to='/tags/'>Browse all tags</Link>
        </p>
      </section>
    </Layout>
  );
};

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
