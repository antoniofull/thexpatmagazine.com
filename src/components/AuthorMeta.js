import React from 'react';
import _ from 'lodash';
import { Link, graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import '../styles/meta.css';

const AuthorMeta = props => {
  const authors = props.data.allMarkdownRemark.edges;
  const author = _.find(authors, a => {
    return a.node.frontmatter.title === props.author;
  });
  if (author) {
    return (
      <div className='meta wf-os text-color--dark-light post-meta--author'>
        <Link
          to={`/authors/${_.kebabCase(author.node.frontmatter.title)}/`}
          className='post-meta--author__link'
        >
          <span className='post-meta--author__image'>
            <Img sizes={author.node.frontmatter.photo.childImageSharp.sizes} />
          </span>
          <h4 className='post-meta--author__name wf-os'>
            {author.node.frontmatter.title}
          </h4>
        </Link>
      </div>
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
              frontmatter {
                title
                description
                photo {
                  childImageSharp {
                    sizes(maxWidth: 120) {
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
    render={data => <AuthorMeta data={data} {...props} />}
  />
);
