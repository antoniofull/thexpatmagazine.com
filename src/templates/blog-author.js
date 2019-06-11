import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const AuthorRoute = props => {
  const posts = props.pageContext.group;
  console.log(props);
  return (
    <Layout>
      <section className='blog-author'>
        <Helmet title={`title`} />
        <p>{props.pageContext.name}</p>
        {posts.map(post => (
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
  query Author($author: String!) {
    markdownRemark(frontmatter: { title: { eq: $author } }) {
      id
      html
      frontmatter {
        title
        bio
        role
        website
        facebook
        instagram
        pinterest
        photo {
          childImageSharp {
            sizes(maxWidth: 700) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
