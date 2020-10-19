import React from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import Layout from '../components/Layout'
import Grid from '../components/Grid'
import Pagination from '../components/Pagination'

const BASE_URL = 'https://www.thexpatmagazine.com/'

const CountryRoute = ({ pageContext }) => {
  const posts = pageContext.group
  const { cat, group } = pageContext
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
  return (
    <Layout>
      <GatsbySeo
        title={`Expats Living in ${cat}`}
        description={`All the info's for expat and people living and travelling to ${cat}`}
        canonical={`${BASE_URL}${cat}`}
        openGraph={{
          url: `${BASE_URL}${cat}`,
          title: `Expats living in ${cat}`,
          description: `All the info's for expat and people living and travelling to ${cat}`,
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

export default CountryRoute
