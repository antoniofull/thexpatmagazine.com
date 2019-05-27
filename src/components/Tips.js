import React from 'react';
import _ from 'lodash';

import { Link } from 'gatsby';

import AuthorMeta from './AuthorMeta';
import Img from 'gatsby-image';
import '../styles/tips.css';

const Tips = ({ posts, authors }) => {
  if (posts) {
    const stories = posts.map(story => {
      const author = _.find(authors, a => {
        return a.node.frontmatter.title === story.node.frontmatter.author;
      });
      return (
        <article
          className='tip article--home has-border article--full-image'
          key={story.node.id}
        >
          <div className='article-home__header'>
            {story.node.frontmatter.featuredimage && (
              <Link to={story.node.fields.slug}>
                <Img
                  fluid={
                    story.node.frontmatter.featuredimage.childImageSharp.grid
                  }
                />
              </Link>
            )}
            <div className='article--home__content'>
              <h2 className=''>{story.node.frontmatter.title}</h2>
              <div className='meta meta--home-row meta--align-left '>
                <span className='meta__date'>
                  {story.node.frontmatter.date}
                </span>
                <span className='divider--meta' />
                <AuthorMeta author={author} />
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
      );
    });

    return (
      <section className='home-row home-row--white'>
        <div className='container container--home container-row'>
          <h3
            alt='Tips for Expats and Travellers'
            className='home-row__header container padding-xl'
          >
            Travel and Expat Guides
          </h3>
          <div className='container-home--articles'>{stories}</div>
          <div className='view-all-home'>
            <Link to='/categories/stories/' className=' view-all'>
              View All Travels Suggestions
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default Tips;
