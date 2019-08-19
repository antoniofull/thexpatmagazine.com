import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../../components/Layout';

import '../../styles/home-page.css';

const AuthorsPage = ({ data }) => {
  const { authors, guests } = data;
  return (
    <Layout>
      <section className='container authors'>
        <h2>All Authors at The Expat Magazine</h2>
        <Helmet title={`Authors The Expat Magazine`} />
        <div className='container-home--articles'>
          {authors.edges.map(author => (
            <article
              className='destination article--home has-border article--full-image'
              key={author.node.id}
            >
              <div className='destination__content'>
                {author.node.frontmatter.photo &&
                  author.node.frontmatter.photo.childImageSharp && (
                    <Link to={author.node.fields.slug}>
                      <Img
                        alt={author.node.frontmatter.title}
                        fluid={
                          author.node.frontmatter.photo.childImageSharp.fluid
                        }
                      />
                    </Link>
                  )}
                <div className='article--home__content is-color-white'>
                  <h2 className='article-home__header'>
                    <Link to={author.node.fields.slug}>
                      {author.node.frontmatter.title}
                    </Link>
                  </h2>

                  <div className='excerpt'>{author.node.frontmatter.bio}</div>
                  <Link
                    to={author.node.fields.slug}
                    className='read-more read-more--full-image'
                  >
                    Articles by {author.node.frontmatter.title}{' '}
                    <span className='arrow-action'>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
          {guests.edges.map(author => (
            <article
              className='destination article--home has-border article--full-image'
              key={author.node.id}
            >
              <div className='destination__content'>
                {author.node.frontmatter.photo &&
                  author.node.frontmatter.photo.childImageSharp && (
                    <Link to={author.node.fields.slug}>
                      <Img
                        alt={author.node.frontmatter.title}
                        fluid={
                          author.node.frontmatter.photo.childImageSharp.fluid
                        }
                      />
                    </Link>
                  )}
                <div className='article--home__content is-color-white'>
                  <h2 className='article-home__header'>
                    <Link to={author.node.fields.slug}>
                      {author.node.frontmatter.title}
                    </Link>
                  </h2>

                  <div className='excerpt'>{author.node.frontmatter.bio}</div>
                  <Link
                    to={author.node.fields.slug}
                    className='read-more read-more--full-image'
                  >
                    All articles from {author.node.frontmatter.title}{' '}
                    <span className='arrow-action'>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default AuthorsPage;

export const AuthorsQuery = graphql`
  query AuthorsQuery {
    authors: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-author" }
          role: { eq: "author" }
        }
      }
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
            website
            photo {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight: 560) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }

    guests: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-author" }
          role: { eq: "guest-author" }
        }
      }
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
            instagram
            website
            photo {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight: 560) {
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
