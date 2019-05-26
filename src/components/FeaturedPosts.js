import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import TextTruncate from 'react-text-truncate';
import MediaQuery from 'react-responsive';

import PreviewCompatibleImage from './PreviewCompatibleImage';
import AuthorMeta from './AuthorMeta';

import '../styles/featured.css';

const FeaturedPosts = ({ data, count }) => {
  const post = data.allMarkdownRemark.edges[0].node;
  return (
    <section className='featured is-color-white'>
      <div className='featured__container'>
        <div className='featured-image'>
          <PreviewCompatibleImage
            imageInfo={{
              image: post.frontmatter.featuredimage,
              alt: `featured image thumbnail for post ${post.frontmatter.title}`
            }}
          />
        </div>
        <div className='featured-post__container has-shadow'>
          <article className='featured-post'>
            <header className='featured-post__header'>
              <h2 className='featured-title'>{post.frontmatter.title}</h2>
            </header>
            <div className='meta  meta--featured'>
              <h3 className='meta--featured__title '>Written by</h3>
              <AuthorMeta author={post.frontmatter.author} />
              <span className='divider--meta' />
              <span className='meta__date is-text-centered'>
                On: {post.frontmatter.date}
              </span>
            </div>
            <MediaQuery query='(max-width: 768px)'>
              <TextTruncate
                textElement='p'
                className='excerpt'
                line={3}
                truncateText='…'
                text={post.excerpt}
              />
            </MediaQuery>
            <MediaQuery query='(min-width: 768px)'>
              <TextTruncate
                textElement='p'
                className='excerpt'
                line={4}
                truncateText='…'
                text={post.excerpt}
              />
            </MediaQuery>

            <Link
              to={post.fields.slug}
              className='read-more--featured btn btn--primary'
            >
              Read Full Article
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query Featured {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: {
              templateKey: { eq: "blog-post" }
              featuredpost: { eq: true }
            }
          }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                author
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 1280, maxHeight: 560, quality: 100) {
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
    render={(data, count) => <FeaturedPosts data={data} count={count} />}
  />
);
