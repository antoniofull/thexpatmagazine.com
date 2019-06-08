import React from 'react';

import Masonry from 'react-masonry-component';
import { Link } from 'gatsby';
import ProgressiveImage from 'react-progressive-bg-image';
import styled from 'styled-components';
import AuthorMeta from '../components/AuthorMeta';
import '../styles/grid.css';

const StyledProgressiveImage = styled(ProgressiveImage)`
  width: auto;
  height: 300px;
  background-color: aliceblue;
  background-size: cover;
  overflow: hidden;
`;
const masonryOptions = {
  transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' };

const Article = ({ post }) => (
  <article
    className='story story--home container--story container story-masonry masonry__item'
    key={post.node.id}
  >
    <div className='masonry__container has-shadow'>
      {post.node.frontmatter.featuredimage && (
        <Link to={post.node.fields.slug}>
          {post.node.frontmatter.featuredimage && (
            <>
              <StyledProgressiveImage
                src={post.node.frontmatter.featuredimage.publicURL}
                placeholder={post.node.frontmatter.featuredimage.publicURL}
              />
            </>
          )}
        </Link>
      )}

      <div className='masonry__content'>
        <h2 className='article-home__header'>
          <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
        </h2>
        <div className='meta meta--home-row meta--align-left'>
          <span className='meta__date'>{post.node.frontmatter.date}</span>
          <span className='divider--meta' />
          <AuthorMeta author={post.node.frontmatter.author} />
        </div>
        <div className='excerpt'>{post.node.excerpt}</div>
        <Link
          to={post.node.fields.slug}
          className='read-more read-more--masonry'
        >
          Read More <span className='arrow-action'>→</span>
        </Link>
      </div>
    </div>
  </article>
);

const Grid = ({ posts }) => {
  return (
    <Masonry
      className={'stories masonry grid stories--home'} // default ''
      elementType={'section'} // default 'div'
      options={masonryOptions} // default {}
      disableImagesLoaded={false} // default false
      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      imagesLoadedOptions={imagesLoadedOptions} // default {}
    >
      {posts.map(post => (
        <Article key={post.node.id} post={post} />
      ))}
    </Masonry>
  );
};

export default Grid;
