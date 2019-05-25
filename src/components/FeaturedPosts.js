import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
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
      <article className='featured-post'>
        <header>
          <h2 className='wf-large featured-title'>{post.frontmatter.title}</h2>
        </header>
        <div className='meta wf-source-sans'>
          <span>{post.frontmatter.date}</span>
          <span className='divider--meta' />
          <AuthorMeta author={post.frontmatter.author} />
        </div>
        <p className='featured-post__excerpt'>{post.excerpt}</p>
        <Link
          to={post.fields.slug}
          className='read-more--featured btn btn--primary'
        >
          Read More ...
        </Link>
      </article>
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
              excerpt(pruneLength: 350)
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
