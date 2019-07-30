import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import kebabCase from 'lodash/kebabCase';

import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import AuthorMeta from '../components/AuthorMeta';
import FacebookIcon from '../img/social/facebook.svg';
import InstagramIcon from '../img/social/instagram.svg';
import PinterestIcon from '../img/social/pinterest.svg';
import TwitterIcon from '../img/social/twitter.svg';
import '../styles/author.css';
import '../styles/home-page.css';

const Post = ({ post }) => (
  <article className='author__post'>
    {post.node.frontmatter.featuredimage &&
      (post.node.frontmatter.featuredimage &&
        post.node.frontmatter.featuredimage.childImageSharp && (
          <Link to={post.node.fields.slug}>
            <Image
              fluid={post.node.frontmatter.featuredimage.childImageSharp.fluid}
            />
          </Link>
        ))}
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
  if (author) {
    return (
      <Layout>
        <Helmet
          title={`${author.frontmatter.title} - ${author.frontmatter.bio}`}
        />
        <section className='blog-author'>
          <div className='author'>
            <h2 className='author__title'>{author.frontmatter.title}</h2>
            <div className='author__info'>
              <Image
                className='author__image'
                sizes={author.frontmatter.photo.childImageSharp.sizes}
              />
              <p>{author.frontmatter.bio}</p>
            </div>
            <ul className='author__social'>
              {author.frontmatter.instagram && (
                <li>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href={author.frontmatter.instagram}
                  >
                    <InstagramIcon />
                  </a>
                </li>
              )}
              {author.frontmatter.facebook && (
                <li>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href={author.frontmatter.facebook}
                  >
                    <FacebookIcon />
                  </a>
                </li>
              )}
              {author.frontmatter.pinterest && (
                <li>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href={author.frontmatter.pinterest}
                  >
                    <PinterestIcon />
                  </a>
                </li>
              )}
              {author.frontmatter.twitter && (
                <li>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href={author.frontmatter.twitter}
                  >
                    <TwitterIcon />
                  </a>
                </li>
              )}
            </ul>
          </div>

          <h2 className='author__all'>{`All Articles from ${author.frontmatter.title}`}</h2>
          <div className='container-home--articles'>
            {posts.map(post => (
              <Post post={post} key={post.node.id} />
            ))}
          </div>
          <Pagination
            count={props.pageContext.pageCount}
            author={props.pageContext.author}
          />
        </section>
      </Layout>
    );
  }
  return <div>test</div>;
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
          id
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
