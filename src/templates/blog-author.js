import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const AuthorRoute = ({ data }) => {
  const { author, posts } = data;

  return (
    <Layout>
      <section className='blog-author'>
        <Helmet title={`title`} />
        <p>{author.frontmatter.title}</p>
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

export default AuthorRoute;

export const AuthorQuery = graphql`
  query AuthorData($id: String!, $title: String) {
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
