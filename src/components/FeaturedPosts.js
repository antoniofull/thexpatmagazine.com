import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import AuthorMeta from './AuthorMeta';

import '../styles/featured.css';

const FeaturedPosts = ({ data, count }) => {
  return (
    <section className='featured container'>
      <div className='featured-image'>
        <PreviewCompatibleImage
          imageInfo={{
            image: data.markdownRemark.frontmatter.featuredimage,
            alt: `featured image thumbnail for post ${
              data.markdownRemark.frontmatter.title
            }`
          }}
        />
      </div>
      <article className='featured-post'>
        <header>
          <h2 className='wf-large featured-title'>
            {data.markdownRemark.frontmatter.title}
          </h2>
        </header>
        <div className='meta'>
          <span>{data.markdownRemark.frontmatter.date}</span>
          <AuthorMeta author={data.markdownRemark.frontmatter.author} />
        </div>
        <p className='featured-post__excerpt'>{data.markdownRemark.excerpt}</p>
        <button className='read-more--featured btn'>Read More ...</button>
      </article>
    </section>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query Featured {
        markdownRemark(frontmatter: { featuredpost: { eq: true } }) {
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
    `}
    render={(data, count) => <FeaturedPosts data={data} count={count} />}
  />
);
