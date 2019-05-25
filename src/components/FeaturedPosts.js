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
    <section className='featured container'>
      <div className='featured-image'>
        <PreviewCompatibleImage
          imageInfo={{
            image: post.frontmatter.featuredimage,
            alt: `featured image thumbnail for post ${post.frontmatter.title}`
          }}
        />
      </div>
      <div className='featured__container'>
        <article className='featured-post'>
          <header>
            <h2 className='wf-large featured-title'>
              {post.frontmatter.title}
            </h2>
          </header>
          <div className='meta wf-source-sans meta--featured'>
            <h3 className='meta--featured__title wf-source-sans'>Written by</h3>
            <span>{post.frontmatter.date}</span>
            <span className='divider--meta' />
            <AuthorMeta author={post.frontmatter.author} />
          </div>
          <MediaQuery query='(max-width: 768px)'>
            <TextTruncate
              className='featured-post__excerpt'
              line={3}
              truncateText='…'
              text={post.excerpt}
            />
          </MediaQuery>
          <MediaQuery query='(min-width: 769px) and (max-width: 1023px)'>
            <TextTruncate
              className='featured-post__excerpt'
              line={3}
              truncateText='…'
              text={post.excerpt}
            />
          </MediaQuery>
          <MediaQuery query='(min-width: 1024px)'>
            <TextTruncate
              className='featured-post__excerpt'
              line={5}
              truncateText='…'
              text={post.excerpt}
            />
          </MediaQuery>

          <Link
            to={post.fields.slug}
            className='read-more--featured btn btn--primary'
          >
            Read More ...
          </Link>
        </article>
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
