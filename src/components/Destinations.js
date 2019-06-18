import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import AuthorMeta from './AuthorMeta';
import '../styles/tips.css';
import '../styles/destinations.css';

const Destinations = ({ posts }) => {
  if (posts) {
    const stories = posts.map(
      (story, i) =>
        i < 12 && (
          <article
            className='destination article--home has-border article--full-image'
            key={story.node.id}
          >
            <div className='destination__content'>
              {story.node.frontmatter.featuredimage &&
                story.node.frontmatter.featuredimage.childImageSharp && (
                  <Link to={story.node.fields.slug}>
                    <Img
                      alt={story.node.frontmatter.title}
                      fluid={
                        story.node.frontmatter.featuredimage.childImageSharp
                          .fluid
                      }
                    />
                  </Link>
                )}
              <div className='article--home__content is-color-white'>
                <h2 className='article-home__header'>
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
      <section className='home-row home-row--blue'>
        <div className='container container--home container-row'>
          <h3
            alt='Destinations. Chose your next travel destination'
            className='home-row__header container padding-xl'
          >
            Destinations
          </h3>
          <div className='container-home--articles'>{stories}</div>
          <div className='view-all-home view-all-home--accent'>
            <Link to='/destinations/' className=' view-all'>
              View All Destinations
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default Destinations;
