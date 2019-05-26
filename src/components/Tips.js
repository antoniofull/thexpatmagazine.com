import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import AuthorMeta from './AuthorMeta';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import '../styles/tips.css';

const Tips = ({ data }) => {
  const stories = data.allMarkdownRemark.edges.map(story => (
    <article
      className='tip article--home has-border article--full-image'
      key={story.node.id}
    >
      <div className=''>
        {story.node.frontmatter.featuredimage && (
          <Link to={story.node.fields.slug}>
            <PreviewCompatibleImage
              imageInfo={{
                image: story.node.frontmatter.featuredimage,
                alt: `${story.node.frontmatter.title} - ${
                  story.node.frontmatter.description
                }`
              }}
            />
          </Link>
        )}
        <div className='article--home__content'>
          <h2 className=''>{story.node.frontmatter.title}</h2>
          <div className='meta meta--align-left wf-source-sans'>
            <span className='meta__date'>{story.node.frontmatter.date}</span>
            <span className='divider--meta' />
            <AuthorMeta author={story.node.frontmatter.author} />
          </div>
          <div>{story.node.excerpt}</div>
          <Link
            to={story.node.fields.slug}
            className='read-more read-more--full-image'
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  ));

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
          <Link to='/categories/stories/' className='wf-source-sans view-all'>
            View All Travels Suggestions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query Tips {
        allMarkdownRemark(
          limit: 8
          filter: {
            frontmatter: {
              templateKey: { eq: "blog-post" }
              category: { in: ["Expat Tips", "Travel Tips"] }
            }
          }
          sort: { order: DESC, fields: frontmatter___date }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 150)
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                author
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 700, maxHeight: 400, quality: 100) {
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
    render={data => <Tips data={data} {...props} />}
  />
);
