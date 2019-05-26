import React from 'react';
import Masonry from 'react-masonry-component';
import { StaticQuery, graphql, Link } from 'gatsby';
import ReactResizeDetector from 'react-resize-detector';

import AuthorMeta from './AuthorMeta';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const masonryOptions = {
  transitionDuration: 0
};

const Stories = ({ data }) => {
  // console.log(size, size.get());

  const stories = data.allMarkdownRemark.edges.map(story => (
    <article
      className='story story--home container--story container story-masonry masonry__item'
      key={story.node.id}
    >
      <div className='masonry__container has-shadow'>
        {story.node.frontmatter.featuredimage && (
          <Link to={story.node.fields.slug}>
            <PreviewCompatibleImage
              imageInfo={{
                image: story.node.frontmatter.featuredimage,
                alt: `${story.node.frontmatter.title} - ${story.node.excerpt}`
              }}
            />
          </Link>
        )}

        <div className='masonry__content'>
          <h2 className='story__title'>{story.node.frontmatter.title}</h2>
          <div className='meta meta--align-left wf-source-sans'>
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
  ));

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
              <Link
                to='/categories/stories/'
                className='wf-source-sans view-all'
              >
                View All Stories
              </Link>
            </div>
          </div>
        </section>
      )}
    </ReactResizeDetector>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query Stories {
        allMarkdownRemark(
          filter: {
            frontmatter: {
              templateKey: { eq: "blog-post" }
              category: { in: "Stories" }
            }
          }
          sort: { order: DESC, fields: frontmatter___date }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 100)
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                author
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 700, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Stories data={data} {...props} />}
  />
);
