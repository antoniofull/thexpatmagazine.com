import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const GuestAuthorRoute = ({ data }) => {
  const { author, posts } = data;

  return (
    <Layout>
      <section className='blog-author'>
        <Helmet title={`title`} />
        <p>{author.frontmatter.title}</p>
        <p>{author.frontmatter.description}</p>
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

export default GuestAuthorRoute;

export const GuestAuthorQuery = graphql`
  query GuestAuthorData($id: String!, $title: String) {
    author: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
    posts: allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          author: { eq: $title }
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
