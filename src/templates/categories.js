import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const CatRoute = ({ data }) => {
  return (
    <Layout>
      <section className='section'>
        <Helmet title={`title`} />
        <p>{data.markdownRemark.frontmatter.title}</p>
      </section>
    </Layout>
  );
};

export default CatRoute;

export const CategoryQuery = graphql`
  query Category($id: String) {
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
