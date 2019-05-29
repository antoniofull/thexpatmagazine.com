import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const CountryRoute = ({ data }) => {
  const { country, posts } = data;
  return (
    <Layout>
      <section className='blog-author'>
        <Helmet title={`title`} />
        <p>{country.frontmatter.title}</p>
        <p>Description: {country.frontmatter.description}</p>
        {posts.edges.map(post => (
          <Link to={post.node.fields.slug} key={post.node.id}>
            {post.node.frontmatter.title} - {post.node.frontmatter.author}{' '}
            <br />
          </Link>
        ))}
      </section>
    </Layout>
  );
};

export default CountryRoute;

export const CountryQuery = graphql`
  query CountryData($id: String!, $title: String) {
    country: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
    posts: allMarkdownRemark(
      limit: 200
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          country: { eq: $title }
          templateKey: { eq: "blog-post" }
        }
      }
    ) {
      totalCount
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            author
          }
        }
      }
    }
  }
`;
