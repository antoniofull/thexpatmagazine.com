import React from 'react';
import _ from 'lodash';
import { Link, graphql, StaticQuery } from 'gatsby';

import PreviewCompatibleImage from './PreviewCompatibleImage';

const AuthorMeta = props => {
  const { data, author } = props;

  const authorData = _.find(
    data.edges,
    o => o.node.frontmatter.title === author
  );

  return (
    <div className='post-meta--author'>
      <Link to={authorData.node.fields.slug}>
        <PreviewCompatibleImage
          imageInfo={{
            image: authorData.node.frontmatter.photo,
            alt: `${authorData.node.frontmatter.title}`
          }}
        />
        <h4>{authorData.node.frontmatter.title}</h4>
      </Link>
    </div>
  );
};

export default props => (
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
              fields {
                slug
              }
              frontmatter {
                title
                bio
                photo {
                  childImageSharp {
                    fluid(maxWidth: 240, maxHeight: 200, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <AuthorMeta data={data.allMarkdownRemark} {...props} />}
  />
);
