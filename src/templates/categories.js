import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const CatRoute = ({ data }) => {
  const { cat, posts } = data;
  return (
    <Layout>
      <section className='section'>
        <Helmet title={`title`} />
        <p>{cat.frontmatter.title}</p>
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

export default CatRoute;

export const CategoryQuery = graphql`
  query Category($id: String, $title: String) {
    cat: markdownRemark(id: { eq: $id }) {
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
          category: { in: [$title] }
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
            category
          }
        }
      }
    }
  }
`;
