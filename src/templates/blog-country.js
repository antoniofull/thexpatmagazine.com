import React from 'react';
import { graphql } from 'gatsby';

const BlogCountry = ({ data }) => {
  const { title, description } = data.markdownRemark.frontmatter;
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default BlogCountry;

export const authorQuery = graphql`
  query Country($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        description
      }
    }
  }
`;
