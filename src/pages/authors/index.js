import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../../components/Layout';

const AuthorsPage = ({ data }) => {
  const { authors, guests } = data;
  return (
    <Layout>
      <section className='section'>
        <Helmet title={`Tags `} />
        {authors.edges.map(author => (
          <Link to={author.node.fields.slug} key={author.node.id}>
            {author.node.frontmatter.title}
          </Link>
        ))}
        {guests.edges.map(author => (
          <Link to={author.node.fields.slug} key={author.node.id}>
            {author.node.frontmatter.title}
          </Link>
        ))}
      </section>
    </Layout>
  );
};

export default AuthorsPage;

export const AuthorsQuery = graphql`
  query AuthorsQuery {
    authors: allMarkdownRemark(
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
    guests: allMarkdownRemark(
      limit: 100
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
            facebook
            website
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
