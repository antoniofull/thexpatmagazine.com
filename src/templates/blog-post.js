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
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className='section post'>
      {helmet || ''}
      <div className='container'>
        <div className='post__container'>
          {category && category.length && (
            <div className='has-overflow-hidden post__meta-container'>
              <h3 className='post__category has-horizontal-dividers has-horizontal-dividers--on-white wf-os has-horizontal-dividers text-color--dark-light'>
                {category[0]}
              </h3>
            </div>
          )}

          <span className='wf-os font-small post__date'>{date}</span>
          <h1 className='post__title'>{title}</h1>
          <AuthorMeta
            readingTime={timeToRead}
            className='post__author'
            author={author}
          />
        </div>
        {image && <Img sizes={image.sizes} className='post__image' />}
        <div className='post__content'>
          <p className='post__summary'>Summary: {description}</p>
          <PostContent content={content} />
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

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
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
