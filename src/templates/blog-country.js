import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

class CountryRoute extends React.Component {
  render() {
    return (
      <Layout>
        <section className='section'>
          <Helmet title={`title`} />
        </section>
      </Layout>
    );
  }
}

export default CountryRoute;

export const CountryQuery = graphql`
  query Country($id: String) {
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
