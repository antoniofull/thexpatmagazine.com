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
          <h3 className='post__category has-horizontal-dividers has-horizontal-dividers--on-white wf-os has-horizontal-dividers text-color--dark-light'>
            {category[0]}
          </h3>
          <h1 className='post__title'>{title}</h1>
          <AuthorMeta author={author} />
          <p className='wf-os font-small'>
            Reading time: {timeToRead} / {date}
          </p>
        </div>
        {image && <Img sizes={image.sizes} className='post__image' />}

        <p className='post__summary'>Summary: {description}</p>
        <PostContent content={content} />
        {tags && tags.length ? (
          <div style={{ marginTop: `4rem` }}>
            <h4>Tags</h4>
            <ul className='taglist'>
              {tags.map(tag => (
                <li key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
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
