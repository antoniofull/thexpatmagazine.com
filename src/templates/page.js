import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const PageRoute = ({ data }) => {
  const { id, html, title, photo } = data;

  return (
    <Layout>
      <section className='blog-author'>
        <Helmet title={`title`} />
        <h1>{title}</h1>
      </section>
    </Layout>
  );
};

export default PageRoute;

export const PageQuery = graphql`
  query PageData($id: String!, $title: String) {
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
