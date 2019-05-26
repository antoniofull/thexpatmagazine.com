import React from 'react';
import Masonry from 'react-masonry-component';
import { StaticQuery, graphql, Link } from 'gatsby';

import AuthorMeta from './AuthorMeta';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const masonryOptions = {
  transitionDuration: 0
};

const Stories = ({ data }) => {
  const stories = data.allMarkdownRemark.edges.map(story => (
    <article
      className='story story--home story-masonry masonry__item'
      key={story.node.id}
    >
      <div className='masonry__container has-shadow'>
        <PreviewCompatibleImage
          imageInfo={{
            image: story.node.frontmatter.featuredimage,
            alt: `${story.node.frontmatter.title} - ${
              story.node.frontmatter.description
            }`
          }}
        />
        <div className='masonry__content'>
          <h2 className='story__title'>{story.node.frontmatter.title}</h2>
          <div className='meta meta--align-left  wf-source-sans'>
            <span>{story.node.frontmatter.date}</span>
            <span className='divider--meta' />
            <AuthorMeta author={story.node.frontmatter.author} />
          </div>
          <div>{story.node.excerpt}</div>
        </div>
      </div>
    </article>
  ));

  const imagesLoadedOptions = { background: '.my-bg-image-el' };
  return (
    <React.Fragment>
      <h3 alt='Latest Stories' className='home-row-header container padding-xl'>
        Latest Stories
      </h3>
      <Masonry
        className={'stories masonry stories--home container'} // default ''
        elementType={'section'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        imagesLoadedOptions={imagesLoadedOptions} // default {}
      >
        {stories}
      </Masonry>
    </React.Fragment>
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
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 200)
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
