import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import AuthorMeta from './AuthorMeta';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import '../styles/tips.css';
import '../styles/destinations.css';

const Destinations = ({ data }) => {
  const stories = data.allMarkdownRemark.edges.map(story => (
    <article
      className='destination article--home has-border article--full-image'
      key={story.node.id}
    >
      <div className='destination__content'>
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
        <div className='article--home__content is-color-white'>
          <h2 className='article-home__header'>
            {story.node.frontmatter.title}
          </h2>
          <div className='meta meta--home-row meta--align-left '>
            <span className='meta__date'>{story.node.frontmatter.date}</span>
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
  ));

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
          <Link to='/categories/destinations/' className=' view-all'>
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query Destinations {
        allMarkdownRemark(
          limit: 8
          filter: {
            frontmatter: {
              templateKey: { eq: "blog-post" }
              category: { in: "Destinations" }
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
                category
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 700, maxHeight: 600, quality: 100) {
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
    render={data => <Destinations data={data} {...props} />}
  />
);
