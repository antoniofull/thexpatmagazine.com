import React, { useState } from 'react'
import PropTypes from 'prop-types'
import kebabCase from 'lodash/kebabCase'

import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'
import AdSense from 'react-adsense'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share'
import Helmet from 'react-helmet'
import AuthorPost from '../components/AuthorPosts'
import Layout from '../components/Layout'
import AuthorMeta from '../components/AuthorMeta'
import Content, { HTMLContent } from '../components/Content'
import RelatedArticles from '../components/RelatedArticles'
import { ArticleJsonLd, GatsbySeo } from 'gatsby-plugin-next-seo';

import '../styles/post.css'

const Separator = () => (
  <div className='dots'>
    <span className='dot'></span>
    <span className='dot'></span>
    <span className='dot'></span>
  </div>
)

const Figcaption = ({ figcaption }) => (
  <figure>
    <figcaption className='featured-image__caption'>
      <ReactMarkdown source={figcaption} />
    </figcaption>
  </figure>
)

export const BlogPostTemplate = ({
  fields,
  content,
  contentComponent,
  tags,
  title,
  author,
  seotitle,
  description,
  date,
  image,
  figcaption,
  category,
  url,
  relatedArticles,
  mtime,
}) => {
  const PostContent = contentComponent || Content

  const [comments, setComments] = useState(null)

  const handleComments = async (url, title) => {
    const module = await import('../components/Comments')
    setComments(React.createElement(module.default, { url, title }))
  }
  console.log(seotitle, title)
  const baseUrl = 'https://www.thexpatmagazine.com/'
  return (
    <section className='section post'>
      <ArticleJsonLd
        url={`${baseUrl}${url}`}
        headline={title}
        images={[
          `${image && baseUrl + image.publicURL}`,
        ]}
        datePublished={date}
        dateModified={date}
        authorName={author}
        publisherName={'Editorial Team'}
        publisherLogo='https://www.thexpatmagazine.com/img/logo.svg'
        description={description}
        overrides={{
          '@type': 'BlogPosting', // set's this as a blog post.
        }}
      />
      <Helmet>
        <link
          rel='amphtml'
          href={`https://www.thexpatmagazine.com/amp${url}`}
        ></link>
      </Helmet>
      <div className='container'>
        <div className='post__container'>
          <p className='wf-os font-small post__top-meta'>
            <span className='post__date'>{date}</span> /{' '}
            {category && category.length && (
              <span>
                {' '}
                <Link to={`/${kebabCase(category[0])}/`}>{category[0]}</Link>
              </span>
            )}
          </p>

          <h1 className='post__title'>{title}</h1>
          <AuthorMeta className='post__author' author={author} />
        </div>
        {image && (
          <React.Fragment>
            <Img
              Tag='figure'
              title={title}
              alt={description}
              fluid={image.childImageSharp && image.childImageSharp.fluid}
              className='post__image'
            />
            <Figcaption figcaption={figcaption} />
          </React.Fragment>
        )}
        <div className='post__ads'>
          <AdSense.Google
            client='ca-pub-5100800746597188'
            slot='9580336420'
            style={{ display: 'block', textAlign: 'center' }}
            layout='in-article'
            format='fluid'
          />
        </div>
        <Separator />
        <div className='post__content'>
          <PostContent content={content} className='post__article' />

          {tags && tags.length ? (
            <ul className='taglist'>
              {tags.map((tag) => (
                <li className='font-small wf-os post__tag' key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          ) : null}
          <AuthorPost author={author} />
          <div className='share-container'>
            <div className='share'>
              <FacebookShareButton
                url={`${baseUrl}${url}`}
                quote={title}
                className='share-btn'
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TelegramShareButton
                url={`${baseUrl}${url}`}
                title={title}
                className='share-btn'
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
              <WhatsappShareButton
                url={`${baseUrl}${url}`}
                title={title}
                separator=':: '
                className='share-btn'
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TwitterShareButton
                url={`${baseUrl}${url}`}
                via='@thexpatmagazine'
                title={title}
                className='share-btn'
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
          </div>

          <RelatedArticles articles={relatedArticles} />
          <section className='comments'>
            {comments ? (
              comments
            ) : (
              <button
                onClick={() => {
                  handleComments(url, title)
                }}
                className='open-comments'
              >
                Join the conversation
              </button>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}
const BlogPost = (props) => {
  const { markdownRemark: post } = props.data
  const { relatedArticles } = props.pageContext
  return (
    <Layout>
      <GatsbySeo
        language='en'
        title={post.frontmatter.seotitle}
        description={post.frontmatter.description}
        openGraph={{
        url: `https://www.thexpatmagazine.com/${post.fields.slug}`,
        title: post.frontmatter.seotitle,
        description: post.frontmatter.description,
        images: [
          {
            url: post.frontmatter.featuredimage.publicURL,
            width: 800,
            height: 600,
            alt: 'The Expat Magazine',
          },
          {
            url: post.frontmatter.featuredimage.publicURL,
            width: 900,
            height: 800,
            alt: 'The Expat Magazine',
          }
        ],
        site_name: 'The Expat Magazine',
      }}
      twitter={{
        handle: '@thexpatmagazine',
        site: '@thexpatmagazine',
        cardType: 'summary_large_image',
      }}
      />
      <BlogPostTemplate
        seotitle={post.frontmatter.seotitle}
        fields={post.fields}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        author={post.frontmatter.author}
        figcaption={post.frontmatter.imagealt}
        image={post.frontmatter.featuredimage && post.frontmatter.featuredimage}
        altimage={post.frontmatter.altimage}
        tags={post.frontmatter.tags}
        date={post.frontmatter.date}
        title={post.frontmatter.title}
        category={post.frontmatter.category}
        timeToRead={post.timeToRead}
        name={post.frontmatter.title}
        relatedArticles={relatedArticles}
        id={post.id}
        url={post.fields.slug}
        mtime={post.parent.mtime}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      timeToRead
      excerpt(pruneLength: 250)
      fields {
        slug
      }
      parent {
        ... on File {
          mtime
        }
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        seotitle
        description
        tags
        category
        author
        imagealt
        featuredimage {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
