import React from 'react';

import Masonry from 'react-masonry-component';
import { Link } from 'gatsby';
import ReactResizeDetector from 'react-resize-detector';
import Img from 'gatsby-image';

import AuthorMeta from './AuthorMeta';

const masonryOptions = {
  transitionDuration: 0
};

const Stories = ({ posts }) => {
  const stories = posts.map(story => {
    return (
      <article
        className='story story--home container--story container story-masonry masonry__item'
        key={story.node.id}
      >
        <div className='masonry__container has-shadow'>
          {story.node.frontmatter.featuredimage && (
            <Link to={story.node.fields.slug}>
              <Img
                fluid={
                  story.node.frontmatter.featuredimage.childImageSharp.fluid
                }
              />
            </Link>
          )}

          <div className='masonry__content'>
            <h2 className='article-home__header'>
              {story.node.frontmatter.title}
            </h2>
            <div className='meta meta--home-row meta--align-left'>
              <span className='meta__date'>{story.node.frontmatter.date}</span>
              <span className='divider--meta' />
              <AuthorMeta author={story.node.frontmatter.author} />
            </div>
            <div className='excerpt'>{story.node.excerpt}</div>
            <Link
              to={story.node.fields.slug}
              className='read-more read-more--masonry'
            >
              Read More <span className='arrow-action'>→</span>
            </Link>
          </div>
        </div>
      </article>
    );
  });

  const imagesLoadedOptions = { background: '.my-bg-image-el' };

  return (
    <ReactResizeDetector handleWidth handleHeight>
      {({ width, height }) => (
        <section className='home-row'>
          <div className='container container--home is-color-white container-row'>
            <h3
              alt='Latest Stories'
              className='home-row__header container padding-xl'
            >
              Latest Stories
            </h3>
            <Masonry
              className={'stories masonry stories--home'} // default ''
              elementType={'div'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
              {stories}
            </Masonry>
            <div className='view-all-home'>
              <Link to='/categories/stories/' className=' view-all'>
                View All Stories
              </Link>
            </div>
          </div>
        </section>
      )}
    </ReactResizeDetector>
  );
};

export default Stories;
