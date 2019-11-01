import React from 'react';
import { Link } from 'gatsby';

import AuthorMeta from './AuthorMeta';
import Img from 'gatsby-image';
import '../styles/tips.css';

const Tips = ({ posts }) => {
  let mql = window.matchMedia('(max-width: 1280px)');
  let limit = 12;
  if (mql.matches) {
    limit = 6;
  }
  const stories = posts.map(
    (story, i) =>
      i < limit && (
        <article
          className='tip article--home has-border article--full-image'
          key={story.node.id}
        >
          <div className='article-home__header'>
            {story.node.frontmatter.featuredimage &&
              story.node.frontmatter.featuredimage.childImageSharp && (
                <Link to={story.node.fields.slug}>
                  <Img
                    alt={story.node.frontmatter.title}
                    fluid={
                      story.node.frontmatter.featuredimage.childImageSharp.fluid
                    }
                  />
                </Link>
              )}
            <div className='article--home__content'>
              <h2 className=''>
                <Link to={story.node.fields.slug}>
                  {story.node.frontmatter.title}
                </Link>
              </h2>
              <div className='meta meta--home-row meta--align-left '>
                <span className='meta__date'>
                  {story.node.frontmatter.date}
                </span>
                <span className='divider--meta' />
                <AuthorMeta author={story.node.frontmatter.author} />
              </div>
              <div className='excerpt'>{story.node.excerpt}</div>
              <Link
                to={story.node.fields.slug}
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
    <section className='home-row home-row--white'>
      <div className='container container--home container-row'>
        <Link to='/destinations/'>
          <h3
            alt='Tips for Expats and Travellers'
            className='home-row__header container padding-xl'
          >
            Travel and Expat Guides
          </h3>
        </Link>
        <div className='container-home--articles'>{stories}</div>
        <div className='view-all-home'>
          <Link to='/travel-tips/' className=' view-all'>
            View all Tips
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Tips;
