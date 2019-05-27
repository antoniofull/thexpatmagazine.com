import React from 'react';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../../components/Layout';

const CountryPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title }
    }
  }
}) => (
  <Layout>
    <section className='section'>
      <Helmet title={`Categories | ${title}`} />
      <div className='container content'>
        <div className='columns'>
          <div
            className='column is-10 is-offset-1'
            style={{ marginBottom: '6rem' }}
          >
            <h1 className='title is-size-2 is-bold-light'>Categories</h1>
            <ul className='taglist'>
              {group.map(cat => (
                <li key={cat.fieldValue}>
                  <Link to={`/authors/${kebabCase(cat.fieldValue)}/`}>
                    {cat.fieldValue} ({cat.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default CountryPage;

export const DestinationsQuery = graphql`
  query DestinationsQuery {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { templateKey: { eq: "blog-country" } } }
    ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            photo {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight: 560, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
