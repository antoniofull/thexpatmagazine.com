import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const AuthorRoute = ({ data }) => (
  <Layout>
    <section className='blog-author'>
      <Helmet title={`title`} />
      <p>{data.markdownRemark.frontmatter.title}</p>
    </section>
  </Layout>
);

export default AuthorRoute;

export const CategoryQuery = graphql`
  query BlogAuthor($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
