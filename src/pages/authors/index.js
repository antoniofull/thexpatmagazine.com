import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../../components/Layout';

const AuthorsPage = ({
  data: {
    allMarkdownRemark: { edges: group }
  }
}) => {
  return (
    <Layout>
      <section className='section'>
        <Helmet title={`Tags `} />
        <div className=''>
          <div className='' data-id={group}>
            <div className=''>
              <h1 className=''>Authors List</h1>
            </div>
            {group.map(edge => (
              <Link
                style={{ display: 'block' }}
                key={edge.node.id}
                to={edge.node.fields.slug}
              >
                {edge.node.frontmatter.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AuthorsPage;

export const AuthorsQuery = graphql`
  query AuthorsQuery {
    allMarkdownRemark(
      limit: 100
      filter: { frontmatter: { templateKey: { eq: "blog-author" } } }
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
