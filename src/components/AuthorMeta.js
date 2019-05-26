import React from 'react';
import _ from 'lodash';
import { Link, graphql, StaticQuery } from 'gatsby';

import PreviewCompatibleImage from './PreviewCompatibleImage';

import '../styles/meta.css';

const AuthorMeta = props => {
  const { data, author } = props;
  const authorData = _.find(
    data.edges,
    o => o.node.frontmatter.title === author
  );

  if (!authorData) {
    console.log(data);
  }
  if (authorData) {
    return (
      <div className='post-meta--author'>
        <Link
          to={authorData.node.fields.slug}
          className='post-meta--author__link'
        >
          <PreviewCompatibleImage
            className='post-meta--author__image'
            imageInfo={{
              image: authorData.node.frontmatter.photo,
              alt: `${authorData.node.frontmatter.title}`
            }}
          />
          <h4 className='post-meta--author__name wf-os'>
            {authorData.node.frontmatter.title}
          </h4>
        </Link>
      </div>
    );
  }

  return <div>NO result for this post</div>;
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
