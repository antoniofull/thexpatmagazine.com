import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import Layout from '../components/Layout';
import AuthorMeta from '../components/AuthorMeta';
import '../styles/author.css';
import '../styles/home-page.css';

const Post = ({ post }) => (
  <article className='author__post'>
    {post.node.frontmatter.featuredimage && (
      <Link to={post.node.fields.slug}>
        <Image
          fluid={post.node.frontmatter.featuredimage.childImageSharp.fluid}
        />
      </Link>
    )}
    <div className='article--home__content is-color-white'>
      <h2 className='article-home__header'>
        <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
      </h2>
      <div className='meta meta--home-row meta--align-left '>
        <span className='meta__date'>{post.node.frontmatter.date}</span>
        <span className='divider--meta' />
        <AuthorMeta author={post.node.frontmatter.post} />
      </div>
      <div className='excerpt'>{post.node.excerpt}</div>
      <Link
        to={post.node.fields.slug}
        className='read-more read-more--full-image'
      >
        Read More <span className='arrow-action'>→</span>
      </Link>
    </div>
  </article>
);

const AuthorRoute = props => {
  const posts = props.pageContext.group;
  const author = props.data.markdownRemark;
  return (
    <Layout>
      <Helmet
        title={`${author.frontmatter.name} - ${author.frontmatter.bio}`}
      />
      <section className='blog-author'>
        <div className='author'>
          <Image
            className='author__image'
            sizes={author.frontmatter.photo.childImageSharp.sizes}
          />
          <div className='author__info'>
            <h2>{author.frontmatter.name}</h2>
            <p>{author.frontmatter.bio}</p>
          </div>
          <div className='author__social'>
            <a href={author.frontmatter.facebook}>Facebook</a>
            <a href={author.frontmatter.instagram}>Instagram</a>
            <a href={author.frontmatter.pinterest}>Pinterest</a>
            <a href={author.frontmatter.twitter}>Twitter</a>
            <a href={author.frontmatter.website}>Website</a>
          </div>
        </div>

        <h2 className='author__all'>{`All Articles from ${
          author.frontmatter.title
        }`}</h2>
        <div className='container-home--articles'>
          {posts.map(post => (
            <Post post={post} key={post.node.id} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default AuthorRoute;

export const AuthorQuery = graphql`
  query Author($author: String!) {
    markdownRemark(frontmatter: { name: { eq: $author } }) {
      id
      html
      frontmatter {
        title
        name
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
