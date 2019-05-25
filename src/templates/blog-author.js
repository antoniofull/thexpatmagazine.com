import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

const BlogAuthor = ({ data }) => {
  const { title, bio, photo } = data.markdownRemark.frontmatter;
  return (
    <div>
      <h2>{title}</h2>
      <p>{bio}</p>
      <Img fluid={photo.childImageSharp.fluid} alt={`${title} - ${bio}`} />
    </div>
  );
};

export default BlogAuthor;

export const authorQuery = graphql`
  query Author($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        bio
        photo {
          childImageSharp {
            fluid(maxWidth: 560, maxHeight: 500, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
