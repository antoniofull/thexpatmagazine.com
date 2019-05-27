import React from 'react';
import _ from 'lodash';

import { Link } from 'gatsby';
import Img from 'gatsby-image';

import TextTruncate from 'react-text-truncate';

import AuthorMeta from './AuthorMeta';

import '../styles/featured.css';

const FeaturedPosts = ({ posts, authors }) => {
  if (posts) {
    const post = posts[0].node;
    const author = _.find(authors, a => {
      return a.node.frontmatter.title === posts[0].node.frontmatter.author;
    });
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
                <AuthorMeta author={author} />
                <span className='divider--meta' />
                <span className='meta__date is-text-centered'>
                  On: {post.frontmatter.date}
                </span>
              </div>
              <TextTruncate
                textElement='p'
                className='excerpt'
                line={4}
                truncateText='…'
                text={post.excerpt}
              />

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
  return null;
};

export default FeaturedPosts;
