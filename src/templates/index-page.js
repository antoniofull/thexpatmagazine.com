import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { CookieBanner } from '@palmabit/react-cookie-law'
// import AdSense from 'react-adsense'
import { GatsbySeo, BlogJsonLd } from 'gatsby-plugin-next-seo'

import Layout from '../components/Layout'
import FeaturedPosts from '../components/FeaturedPosts'
import HomePostList from '../components/HomePostList'
import '../styles/variables.css'
import '../styles/reset.css'
import '../styles/typography.css'
import '../styles/home-page.css'

const IndexPage = ({ data }) => {
  const [state, setState] = useState({
    stories: [],
    destinations: [],
    tips: [],
    posts: data.posts.edges,
    latestPosts: data.posts.edges.slice(0, 12),
    categoriesPosts: data.featured.edges.slice(0, 12),
    featured: data.featured.edges,
    authors: data.authors.edges
  })
  const ids = new Set()
  useEffect(() => {
    const destinations = []
    const tips = []
    const stories = []
    // remove duplicates
    state.posts.forEach((post, i) => {
      const cat = post.node.frontmatter.category
      const id = post.node.id
      if (cat.includes('destinations') && !ids.has(id) && i < 30) {
        console.log(post)
        destinations.push(post)
        ids.add(id)
      }
      if (
        (cat.includes('travel tips') || cat.includes('expat tips')) &&
        !ids.has(id)
      ) {
        tips.push(post)
        ids.add(id)
      }
      if (cat.includes('stories') && !ids.has(id)) {
        stories.push(post)
        ids.add(id)
      }
    })

    if (destinations.length > 0) {
      setState({
        ...state,
        authors,
        featured,
        tips,
        destinations,
        stories
      })
      console.log('state here', state)
    }
  }, [data])

  const {
    authors = [],
    featured = [],
    stories = [],
    destinations = [],
    tips,
    latestPosts
  } = state

  const posts = []
  const images = []
  if (
    featured[0] &&
    featured[0].node.frontmatter &&
    featured[0].node.frontmatter.featuredimage
  ) {
    posts.push({
      headline: featured[0].node.frontmatter.title,
      image: featured[0].node.frontmatter.featuredimage.publicURL
    })
    images.push({
      url: featured[0].node.frontmatter.featuredimage.publicURL,
      width: 800,
      height: 600,
      alt: featured[2] && featured[2].node.frontmatter.title
    })
  }
  if (
    featured[1] &&
    featured[1].node.frontmatter &&
    featured[1].node.frontmatter.featuredimage
  ) {
    posts.push({
      headline: featured[1].node.frontmatter.title,
      image: featured[1].node.frontmatter.featuredimage.publicURL
    })
    images.push({
      url: featured[1].node.frontmatter.featuredimage.publicURL,
      width: 800,
      height: 600,
      alt: featured[2] && featured[2].node.frontmatter.title
    })
  }
  if (
    featured[2] &&
    featured[2].node.frontmatter &&
    featured[2].node.frontmatter.featuredimage
  ) {
    posts.push({
      headline: featured[2] && featured[2].node.frontmatter.title,
      image: featured[2].node.frontmatter.featuredimage.publicURL
    })
    images.push({
      url: featured[2].node.frontmatter.featuredimage.publicURL,
      width: 800,
      height: 600,
      alt: featured[2] && featured[2].node.frontmatter.title
    })
  }

  return (
    <Layout>
      <Helmet
        bodyAttributes={{
          class: 'body-home'
        }}
      />
      <BlogJsonLd
        url='https://www.thexpatmagazine.com/'
        headline='Thexpatmagazine is an online community made of expats and travellers who share tips, experiences and news to help you live and travel abroad.'
        images={
          (featured[0] &&
            featured[0].node.frontmatter &&
            featured[0].node.frontmatter.featuredimage &&
            featured[0].node.frontmatter.featuredimage.publicURL) ||
          undefined
        }
        posts={posts}
        datePublished={
          (featured[0] && featured[0].node.frontmatter.date) || new Date()
        }
        dateModified={
          (featured[0] && featured[0].node.frontmatter.date) || new Date()
        }
        authorName='The Expat Magazine Editorial Team'
        description='Thexpatmagazine is an online community made of expats and travellers who share tips, experiences and news to help you live and travel abroad.'
      />
      <GatsbySeo
        language='en'
        title='The Expat Magazine: The Worldwide Expat Community'
        description='Thexpatmagazine is an online community made of expats and travellers who share tips, experiences and news to help you live and travel abroad.'
        openGraph={{
          url: 'https://www.thexpatmagazine.com',
          title: 'Open Graph Title',
          description:
            'Thexpatmagazine is an online community made of expats and travellers who share tips, experiences and news to help you live and travel abroad.',
          images
        }}
        twitter={{
          handle: '@thexpatmagazine',
          site: '@thexpatmagazine',
          cardType: 'summary_large_image'
        }}
      />
      <main className='home'>
        <FeaturedPosts
          authors={authors}
          posts={featured}
          count={featured.length}
        />
        <HomePostList title='latests' posts={latestPosts} />
        <HomePostList title='stories' posts={stories} />
        {/* <div className='ad--index'>
          <AdSense.Google
            client='ca-pub-5100800746597188'
            slot='9580336420'
            style={{ display: 'block', textAlign: 'center' }}
            layout='in-article'
            format='fluid'
          />
        </div> */}
        <HomePostList
          authors={authors}
          posts={destinations}
          count={destinations.length}
          title='destinations'
        />
        <HomePostList
          title='tips'
          authors={authors}
          posts={tips}
          count={tips.length}
        />
      </main>
      <CookieBanner
        message='This website uses cookie, read more about it on our privacy page'
        onAccept={() => {}}
        onAcceptPreferences={() => {}}
        onAcceptStatistics={() => {}}
        onAcceptMarketing={() => {}}
        policyLink={'/pages/privacy-and-cookies-policy/'}
        dismissOnScroll={true}
        showPreferencesOption={false}
        necessaryOptionText='Allow Cookies'
      />
    </Layout>
  )
}

export const indexQuery = graphql`
  {
    featured: allMarkdownRemark(
      limit: 100
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          featuredpost: { eq: true }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            seotitle
            category
            author
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      limit: 60
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          featuredpost: { ne: true }
          category: { ne: null }
        }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            slug
          }
          frontmatter {
            title
            seotitle
            category
            author
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    authors: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-author" } } }
    ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            seotitle
            description
            role
            instagram
            pinterest
            facebook
            photo {
              childImageSharp {
                fluid(maxWidth: 120) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
}

export default IndexPage
