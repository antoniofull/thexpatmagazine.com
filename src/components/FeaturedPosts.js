import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';

const FeaturedPosts = ({ data, count }) => (
  <section className='featured-posts'>
    {data.allMarkdownRemark.edges[0].node.frontmatter.title}
  </section>
);

export default () => (
  <StaticQuery
    query={graphql`
      query FeaturedPosts {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { featuredpost: { eq: true } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
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
    render={(data, count) => <FeaturedPosts data={data} count={count} />}
  />
);
