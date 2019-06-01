import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import AuthorMeta from '../components/AuthorMeta';
import Content, { HTMLContent } from '../components/Content';

import '../styles/post.css';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  author,
  date,
  image,
  category,
  timeToRead,
  name,
  helmet,
  relatedArticles
}) => {
  const PostContent = contentComponent || Content;
  return (
    <section className='section post'>
      {helmet || ''}
      <div className='container'>
        <div className='post__container'>
          <p className='wf-os font-small post__top-meta'>
            <span className='post__date'>{date}</span> /{' '}
            {category && category.length && (
              <span>
                {' '}
                <Link to={`/categories/${kebabCase(category[0])}/`}>
                  {category[0]}
                </Link>
              </span>
            )}
          </p>

          <h1 className='post__title'>{title}</h1>
          <AuthorMeta
            // readingTime={timeToRead}
            className='post__author'
            author={author}
          />
        </div>
        {image && <Img sizes={image.sizes} className='post__image' />}
        <div className='post__content'>
          <PostContent content={content} className='post__article' />
          {tags && tags.length ? (
            <div className='post__tags'>
              <h4 className='has-horizontal-dividers wf-os font-small has-horizontal-dividers--on-white'>
                Tags
              </h4>
              <ul className='taglist'>
                {tags.map(tag => (
                  <li className='font-small wf-os post__tag' key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BlogPost = props => {
  const { markdownRemark: post } = props.data;
  const { relatedArticles } = props.pageContext;
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        author={post.frontmatter.author}
        image={
          post.frontmatter.featuredimage &&
          post.frontmatter.featuredimage.childImageSharp
        }
        helmet={
          <Helmet titleTemplate='%s | Blog'>
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name='description'
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        date={post.frontmatter.date}
        title={post.frontmatter.title}
        category={post.frontmatter.category}
        timeToRead={post.timeToRead}
        name={post.frontmatter.name}
        relatedArticles={relatedArticles}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        category
        author
        name
        featuredimage {
          childImageSharp {
            sizes(maxWidth: 1200) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
