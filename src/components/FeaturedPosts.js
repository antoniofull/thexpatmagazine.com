import React from 'react';
import _ from 'lodash';

import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { CarouselProvider, Slider, Slide, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import TextTruncate from 'react-text-truncate';

import AuthorMeta from './AuthorMeta';
import '../styles/featured.css';

const FeaturedPosts = ({ posts, authors, count }) => {
  if (posts.length > 0) {
    // const post = posts[0].node;
    const author = _.find(authors, a => {
      return a.node.frontmatter.title === posts[0].node.frontmatter.author;
    });

    return (
      <section className='featured is-color-white'>
        <div className='featured__container'>
          <CarouselProvider
            interval={6000}
            isPlaying={false}
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={count}
          >
            <Slider>
              {posts.map(post => {
                return (
                  <Slide key={post.node.id} index={0} className='slide'>
                    <div className='featured-image'>
                      <Img
                        fluid={
                          post.node.frontmatter.featuredimage.childImageSharp
                            .fluid
                        }
                      />
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
                  </Slide>
                );
              })}
            </Slider>
            <DotGroup />
          </CarouselProvider>
        </div>
      </section>
    );
  }
  return null;
};

export default FeaturedPosts;
