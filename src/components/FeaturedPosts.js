import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const FeaturedPosts = ({ data, count }) => (
  <section className='featured-posts'>
    {data.markdownRemark.frontmatter.title}
    <PreviewCompatibleImage
      imageInfo={{
        image: data.markdownRemark.frontmatter.featuredimage,
        alt: `featured image thumbnail for post ${
          data.markdownRemark.frontmatter.title
        }`
      }}
    />
  </section>
);

export default () => (
  <StaticQuery
    query={graphql`
      query Featured {
        markdownRemark(frontmatter: { featuredpost: { eq: true } }) {
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
                fluid(maxWidth: 1200, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      # query FeaturedPosts {
      #   allMarkdownRemark(
      #     sort: { order: DESC, fields: [frontmatter___date] }
      #     filter: { frontmatter: { featuredpost: { eq: true } } }
      #   ) {
      #     edges {
      #       node {
      #         excerpt(pruneLength: 400)
      #         id
      #         fields {
      #           slug
      #         }
      #         frontmatter {
      #           title
      #           templateKey
      #           date(formatString: "MMMM DD, YYYY")
      #           featuredpost
      #           featuredimage {
      #             childImageSharp {
      #               fluid(maxWidth: 1200, quality: 100) {
      #                 ...GatsbyImageSharpFluid
      #               }
      #             }
      #           }
      #         }
      #       }
      #     }
      #   }
      # }
    `}
    render={(data, count) => <FeaturedPosts data={data} count={count} />}
  />
);
