import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../../components/Layout';

const GuestAuthorPage = ({ data }) => (
  <Layout>
    <section className='section'>
      <Helmet title={`Tags`} />
      <div className='container content'>
        <div className='columns'>
          <div
            className='column is-10 is-offset-1'
            style={{ marginBottom: '6rem' }}
          >
            {data.allMarkdownRemark.edges.map(edge => (
              <Link to={edge.node.fields.slug}>
                {edge.node.frontmatter.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default GuestAuthorPage;

export const GuestAuthorsQuery = graphql`
  query GuestAuthorsQuery {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { templateKey: { eq: "blog-guest-author" } } }
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
