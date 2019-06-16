import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import Image from 'gatsby-image';
import { find, kebabCase } from 'lodash-es';

const AuthorPost = props => {
  const authors = props.data.allMarkdownRemark.edges;
  const author = find(authors, a => {
    return a.node.frontmatter.name === props.author;
  });
  if (author) {
    return (
      <Link
        to={`/authors/${kebabCase(author.node.frontmatter.name)}`}
        className='post-author__link'
      >
        <h3 className='post-author__title'>{`Written by: ${author.node.frontmatter.name}`}</h3>
        <div className='post-author'>
          <Image
            className='post-author__image'
            sizes={author.node.frontmatter.photo.childImageSharp.sizes}
          />
          <p className='post-author__bio'>{author.node.frontmatter.bio}</p>
        </div>
      </Link>
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
                title
                bio
                name
                photo {
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
    render={data => <AuthorPost data={data} {...props} />}
  />
);
