import React from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import Layout from '../components/Layout'
import Grid from '../components/Grid'
import Pagination from '../components/Pagination'
import { BASE_URL } from '../utils/utils'

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
  return (
    <Layout>
      <GatsbySeo
        language='en'
        title={`All Expat Articles for ${cat}`}
        description={`Everything you need to know about ${cat} before travelling or moving abroad`}
        openGraph={{
          url: `${BASE_URL}${pathPrefix}`,
          title: `All Articles in ${cat}`,
          description: `Everything you need to know about ${cat} before travelling or moving abroad`,
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
