import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import TextTruncate from 'react-text-truncate';
import MediaQuery from 'react-responsive';

// import PreviewCompatibleImage from './PreviewCompatibleImage';
import AuthorMeta from './AuthorMeta';

import '../styles/featured.css';

const FeaturedPosts = ({ posts, count }) => {
  const post = posts[0].node;
  if (post) {
    return (
      <section className='featured is-color-white'>
        <div className='featured__container'>
          <div className='featured-image'>
            <Img
              fluid={post.frontmatter.featuredimage.childImageSharp.featured}
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
  }
};

export default FeaturedPosts;
