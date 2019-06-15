import React from 'react';
import _ from 'lodash';
import { Link } from 'gatsby';
import Palette from 'react-palette';
import Carousel from 'nuka-carousel';

import AuthorMeta from './AuthorMeta';
import '../styles/featured.css';

const Featured = ({ post }) => {
  const img =
    post.node.frontmatter.featuredimage &&
    post.node.frontmatter.featuredimage.childImageSharp.fluid.src;
  if (img) {
    return (
      <React.Fragment key={post.node.id}>
        <div
          className='featured-image'
          style={{
            backgroundImage: `url(${img})`
          }}
        >
          <Palette image={img}>
            {palette => (
              <div
                style={{ backgroundColor: palette.vibrantLight }}
                className='backdrop'
              />
            )}
          </Palette>
        </div>
        <div className='featured-post__container has-shadow'>
          <article className='featured-post'>
            <header className='featured-post__header'>
              <Link to={post.node.fields.slug}>
                <h2 className='featured-title'>
                  {post.node.frontmatter.title}
                </h2>
              </Link>
            </header>
            <div className='meta  meta--featured'>
              <h3 className='meta--featured__written-by text-color--white wf-os has-horizontal-dividers'>
                Written by
              </h3>

              <div className='meta--featured__data'>
                <AuthorMeta author={post.node.frontmatter.author} />
                <span className='divider--meta' />
                <span className='meta__date is-text-centered'>
                  {post.node.frontmatter.date}
                </span>
              </div>
            </div>

            <Link
              to={post.node.fields.slug}
              className='read-more--featured btn btn--primary'
            >
              Read Full Article
            </Link>
          </article>
        </div>
      </React.Fragment>
    );
  }

  return null;
};

const FeaturedPosts = ({ posts, authors, count }) => {
  if (posts && posts.length > 0) {
    // const post = posts[0].node;
    const author = _.find(authors, a => {
      return a.node.frontmatter.title === posts[0].node.frontmatter.author;
    });
    return (
      <section className='featured is-color-white'>
        <div className='featured__container'>
          <Carousel
            transitionMode='scroll3d'
            heightMode='max'
            cellSpacing={0}
            cellAlign='center'
            swiping={true}
            speed={200}
            autoplayInterval={4500}
            easing='easeCubic'
            dragging={true}
            initialSlideHeight={500}
            enableKeyboardControls={true}
            autoplay={true}
            width='100%'
          >
            {posts.map(post => (
              <Featured key={post.node.id} post={post} author={author} />
            ))}
          </Carousel>
        </div>
      </section>
    );
  }
  return null;
};

export default FeaturedPosts;
