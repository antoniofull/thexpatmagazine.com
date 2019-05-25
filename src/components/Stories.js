import React from 'react';
import Masonry from 'react-masonry-component';

import { StaticQuery, graphql, Link } from 'gatsby';

const masonryOptions = {
  transitionDuration: 0
};

const Stories = ({ data }) => {
  const stories = data.allMarkdownRemark.edges.map(story => (
    <section key={story.node.id} className='stories stories--home container'>
      <h3>{story.node.title}</h3>
    </section>
  ));
  return (
    <Masonry
      className={'my-gallery-class'} // default ''
      elementType={'div'} // default 'div'
      options={masonryOptions} // default {}
      disableImagesLoaded={false} // default false
      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      // imagesLoadedOptions={} // default {}
    >
      {stories}
    </Masonry>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query Stories {
        allMarkdownRemark(
          filter: { frontmatter: { category: { eq: "Stories" } } }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
              }
            }
          }
        }
      }
    `}
    render={data => <Stories data={data} {...props} />}
  />
);
