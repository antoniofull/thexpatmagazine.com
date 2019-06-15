import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../../components/Layout';
import { kebabCase } from 'lodash';

const Country = ({ country }) => (
  <article className='country'>
    <h2 className='country__header'>
      <Link alt={`all articles in ${country}`} to={`/${kebabCase(country)}`}>
        {country}
      </Link>
    </h2>
  </article>
);

const CountryPage = ({ data }) => (
  <Layout>
    <section className='section'>
      <div className='container content'>
        <div className='columns'>
          <div className='countries-list' style={{ marginBottom: '6rem' }}>
            {data.allMarkdownRemark.edges.map(edge => (
              <Country
                key={edge.node.id}
                country={edge.node.frontmatter.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default CountryPage;

export const CountryQuery = graphql`
  query CountryQuery {
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
            bio
            pinterest
            facebook
            twitter
            instagram
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
