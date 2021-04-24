import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import Layout from '../components/Layout'
import '../styles/page.css'
import { BASE_URL } from '../utils/utils'
import kebabCase from 'lodash/kebabCase'

const PageRoute = ({ data }) => {
  const [img, setImg] = useState('as')
  const {
    title,
    description,
    seotitle,
    seodescription
  } = data.markdownRemark.frontmatter
  const PageContent = HTMLContent || Content
  useEffect(() => {
    if (
      typeof window !== undefined &&
      window.document &&
      window.document.querySelector('img')
    ) {
      setImg(window.document.querySelector('img').getAttribute('src'))
    }
  }, [data])

  return (
    <Layout>
      <GatsbySeo
        language='en'
        title={seotitle}
        description={seodescription}
        openGraph={{
          url: `${BASE_URL}${kebabCase(title)}`,
          title: seotitle,
          description: seodescription,
          images: [
            {
              url: img,
              width: 800,
              height: 600,
              alt: title
            }
          ]
        }}
      />
      <section className='container page'>
        <Helmet title={seotitle} />
        <h1 alt={seotitle} className='post__title'>
          {title}
        </h1>
        <PageContent
          content={data.markdownRemark.html}
          className='post__content'
        />
      </section>
    </Layout>
  )
}

export default PageRoute

export const PageQuery = graphql`
  query PageData($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
  }
`
