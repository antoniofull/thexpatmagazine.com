import React from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import Layout from '../components/Layout'
import Grid from '../components/Grid'
import Pagination from '../components/Pagination'
import { BASE_URL } from '../utils/utils'

const seoContent = {
  stories: {
    title: 'Expat stories: experiences from all over the world',
    description:
      'Read about expat experiences from all over the world, learn from their stories and get inspired. Don’t forget to share your own story!'
  },
  destinations: {
    title: 'Discover with us all the destinations',
    description:
      'All the articles and information from specific countries. Take a look, read and get inspiration about the country you want to move or travel to.'
  },
  traveltips: {
    title: 'Travel tips from all over the world',
    description:
      'Are you looking for information to be able to choose your next holiday destination? You are in the right place! Read more, you’ll find everything on this page.'
  },
  expattips: {
    title: 'Expat tips: before and after you move',
    description:
      'In this section you will find everything you need to know before and after you move abroad. Tips that will make your life much easier. Read more!'
  }
}

const CatRoute = ({ pageContext }) => {
  const posts = pageContext.group
  const { cat, pathPrefix, group } = pageContext
  const images = []
  if (group[0].node && group[0].node.frontmatter.featuredimage) {
    images.push({
      url: group[0].node.frontmatter.featuredimage.publicURL,
      width: 800,
      height: 600,
      alt: group[0].node.frontmatter.title
    })
  }
  if (group[1] && group[1].node && group[1].node.frontmatter.featuredimage) {
    images.push({
      url: `${BASE_URL}${posts[1].node.frontmatter.featuredimage.publicURL}`,
      width: 800,
      height: 600,
      alt: posts[0].node.frontmatter.seotitle
    })
  }

  const catName = cat.replace(' ', '')
  const seo = seoContent[catName]

  return (
    <Layout>
      <GatsbySeo
        language='en'
        title={seo.title}
        description={seo.description}
        openGraph={{
          url: `${BASE_URL}${pathPrefix}`,
          title: seo.title,
          description: seo.description,
          images
        }}
      />
      <Grid posts={posts} title={pageContext.additionalContext.cat} />
      <Pagination
        count={pageContext.pageCount}
        title={pageContext.additionalContext.cat}
      />
    </Layout>
  )
}

export default CatRoute
