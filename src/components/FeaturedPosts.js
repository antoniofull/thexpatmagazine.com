import React from 'react';
import _ from 'lodash';

import { Link } from 'gatsby';
// import Img from 'gatsby-image';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Carousel from 'nuka-carousel';
import TextTruncate from 'react-text-truncate';

import AuthorMeta from './AuthorMeta';
import '../styles/featured.css';

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
            transitionMode='fade'
            heightMode='max'
            cellSpacing={0}
            cellAlign='center'
            swiping={true}
            speed={200}
            easing='easeCubic'
            dragging={true}
            initialSlideHeight={500}
            enableKeyboardControls={true}
            // pauseOnHover={true}
            // autoplay={true}
            width='100%'
          >
            {posts.map(post => (
              <React.Fragment key={post.node.id}>
                <div
                  className='featured-image'
                  style={{
                    backgroundImage: `url(${
                      post.node.frontmatter.featuredimage.childImageSharp.fluid
                        .src
                    })`
                  }}
                >
                  {/* <Img
                    sizes={
                      post.node.frontmatter.featuredimage.childImageSharp
                        .sizes
                    }
                  /> */}
                </div>
                <div className='featured-post__container has-shadow'>
                  <article className='featured-post'>
                    <header className='featured-post__header'>
                      <h2 className='featured-title'>
                        {post.node.frontmatter.title}
                      </h2>
                    </header>
                    <div className='meta  meta--featured'>
                      <h3 className='meta--featured__title '>Written by</h3>
                      <AuthorMeta author={author} />
                      <span className='divider--meta' />
                      <span className='meta__date is-text-centered'>
                        On: {post.node.frontmatter.date}
                      </span>
                    </div>
                    <TextTruncate
                      textElement='p'
                      className='excerpt'
                      line={4}
                      truncateText='…'
                      text={post.node.excerpt}
                    />

                    <Link
                      to={post.node.fields.slug}
                      className='read-more--featured btn btn--primary'
                    >
                      Read Full Article
                    </Link>
                  </article>
                </div>
              </React.Fragment>
            ))}
          </Carousel>
        </div>
      </section>
    );
  }
  return null;
};

export default FeaturedPosts;
