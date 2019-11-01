import React from 'react';
import { Link } from 'gatsby';

import AuthorMeta from './AuthorMeta';
import LatestPosts from './LatestPosts';
import Img from 'gatsby-image';
import Stories from './Stories';

const HomePostList = ({ posts, title }) => {
  let mql = window.matchMedia('(max-width: 1280px)');
  let limit = 12;
  if (mql.matches) {
    limit = 6;
  }
  if (title === 'stories') {
    return <Stories posts={posts} />;
  }
  if (title === 'latests') {
    return <LatestPosts posts={posts} />;
  }
  const isDestinations = title === 'destinations';
  const viewTitle = isDestinations
    ? 'Destinations'
    : 'Travel And Expat Tips' || 'Latest Posts';
  const catLink = isDestinations ? 'destinations' : 'travel-tips';
  const postList = posts.map(
    (post, i) =>
      i < limit && (
        <article
          className='tip article--home has-border article--full-image'
          key={post.node.id}
        >
          <div className='article-home__header'>
            {post.node.frontmatter.featuredimage &&
              post.node.frontmatter.featuredimage.childImageSharp && (
                <Link to={post.node.fields.slug}>
                  <Img
                    alt={post.node.frontmatter.title}
                    fluid={
                      post.node.frontmatter.featuredimage.childImageSharp.fluid
                    }
                  />
                </Link>
              )}
            <div
              className={`article--home__content ${isDestinations &&
                'is-color-white'}`}
            >
              <h2 className=''>
                <Link to={post.node.fields.slug}>
                  {post.node.frontmatter.title}
                </Link>
              </h2>
              <div className='meta meta--home-row meta--align-left '>
                <span className='meta__date'>{post.node.frontmatter.date}</span>
                <span className='divider--meta' />
                <AuthorMeta author={post.node.frontmatter.author} />
              </div>
              <div className='excerpt'>{post.node.excerpt}</div>
              <Link
                to={post.node.fields.slug}
                className='read-more read-more--full-image'
              >
                Read More <span className='arrow-action'>→</span>
              </Link>
            </div>
          </div>
        </article>
      )
  );

  return (
    <section
      className={`home-row ${
        title === 'destinations' ? 'home-row--blue' : 'home-row--white'
      }`}
    >
      <div className='container container--home container-row'>
        <Link to='/destinations/'>
          <h3
            alt={`Expat ${title}`}
            className='home-row__header container padding-xl'
          >
            {title}
          </h3>
        </Link>
        <div className='container-home--articles'>{postList}</div>
        <div
          className={`view-all-home ${title === 'destinations' &&
            'view-all-home--accent'}`}
        >
          <Link to={`/${catLink}/`} className=' view-all'>
            View all {viewTitle}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePostList;
