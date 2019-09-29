import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import Image from 'gatsby-image';
import find from 'lodash/find';
import kebabCase from 'lodash/kebabCase';

const AuthorPostAmp = props => {
  const authors = props.data.allMarkdownRemark.edges;
  const author = find(authors, a => {
    return a.node.frontmatter.title === props.author;
  });
  if (author) {
    return (
      <React.Fragment>
        <h3 className='post-author__title'>{`Written by: ${author.node.frontmatter.title}`}</h3>
        <Link
          to={`/authors/${kebabCase(author.node.frontmatter.title)}`}
          className='post-author__link primary'
        >
          <div className='post-author'>
            {author.node.frontmatter.photo &&
              author.node.frontmatter.photo.childImageSharp && (
                <img
                  className='post-author__image'
                  style={{ maxWidth: '200px' }}
                  width={200}
                  height={200}
                  src={author.node.frontmatter.photo.publicURL}
                />
              )}
            <p className='post-author__bio'>{author.node.frontmatter.bio}</p>
          </div>
        </Link>
      </React.Fragment>
    );
  }
  return null;
};

export default props => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { in: "blog-author" } } }
        ) {
          edges {
            node {
              id
              html
              fields {
                slug
              }
              frontmatter {
                bio
                title
                photo {
                  publicURL
                  childImageSharp {
                    sizes(maxWidth: 60) {
                      ...GatsbyImageSharpSizes
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <AuthorPostAmp data={data} {...props} />}
  />
);
