import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';

const AuthorMeta = ({ data }) => {
  return <span>This is the author meta page</span>;
};

export default () => (
  <StaticQuery
    query={graphql`
      query Authors {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "blog-author" } } }
        ) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
              }
            }
          }
        }
      }
    `}
    render={data => <AuthorMeta data={data.allMarkdownRemark} />}
  />
);
