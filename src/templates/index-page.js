import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { CookieBanner } from '@palmabit/react-cookie-law'
import AdSense from 'react-adsense'
import { GatsbySeo, BlogJsonLd } from 'gatsby-plugin-next-seo';

import Layout from '../components/Layout'
import FeaturedPosts from '../components/FeaturedPosts'
import HomePostList from '../components/HomePostList'
import '../styles/variables.css'
import '../styles/reset.css'
import '../styles/typography.css'
import '../styles/home-page.css'

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const authors = this.props.data.authors.edges

    // remove duplicates
    const allposts = this.props.data.posts.edges
    const featured = this.props.data.featured.edges
    const latestPosts = allposts.slice(0, 12)
    const categoriesPosts = allposts.slice(12)
    const ids = new Set()
    let [stories, destinations, tips] = [[], [], []]
    categoriesPosts.forEach((post, i) => {
      const cat = post.node.frontmatter.category
      const id = post.node.id
      if (cat.includes('destinations') && !ids.has(id) && i < 30) {
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
      this.setState({
        ...this.state,
        latestPosts,
        authors,
        featured,
        tips,
        destinations,
        stories,
      })
    }
  }

  render() {
    const {
      authors,
      featured,
      stories,
      destinations,
      tips,
      latestPosts,
    } = this.state
    return (
      <Layout>
        <Helmet
          bodyAttributes={{
            class: 'body-home',
          }}
        />
        <BlogJsonLd
          url='https://www.thexpatmagazine.com/'
          headline='The Expat Magazine is an online community made of expats and travellers who write and share tips, news and experiences to help you travel and live abroad.'
          images={featured[0].node.frontmatter.featuredimage.publicURL}
          posts={[
            { 
              headline: featured[0].node.frontmatter.title, 
              image: featured[0].node.frontmatter.featuredimage.publicURL 
            }, { 
              headline: featured[1].node.frontmatter.title,
              image: featured[1].node.frontmatter.featuredimage.publicURL 
            },{ 
              headline: featured[2].node.frontmatter.title,
              image: featured[2].node.frontmatter.featuredimage.publicURL 
            },
          ]}
          datePublished={featured[2].node.frontmatter.date}
          dateModified={featured[2].node.frontmatter.date}
          authorName='The Expat Magazine Editorial Team'
          description='The Expat Magazine is an online community made of expats and travellers who write and share tips, news and experiences to help you travel and live abroad.'
        />
        <GatsbySeo
          language='en'
          title='The Expat Magazine Home Page'
           description='The Expat Magazine is an online community made of expats and travellers who write and share tips, news and experiences to help you travel and live abroad.'
           openGraph={{
            url: 'https://www.thexpatmagazine.com',
            title: 'Open Graph Title',
            description: 'The Expat Magazine is an online community made of expats and travellers who write and share tips, news and experiences to help you travel and live abroad.',
            images: [
              {
                url: featured[0].node.frontmatter.featuredimage.publicURL,
                width: 800,
                height: 600,
                alt: 'The Expat Magazine',
              },
              {
                url: featured[1].node.frontmatter.featuredimage.publicURL,
                width: 900,
                height: 800,
                alt: 'The Expat Magazine',
              },
              { url:  featured[0].node.frontmatter.featuredimage.publicURL },
              { url:  featured[1].node.frontmatter.featuredimage.publicURL },
            ],
            site_name: 'The Expat Magazine',
          }}
          twitter={{
            handle: '@thexpatmagazine',
            site: '@thexpatmagazine',
            cardType: 'summary_large_image',
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
          <div className='ad--index'>
            <AdSense.Google
              client='ca-pub-5100800746597188'
              slot='9580336420'
              style={{ display: 'block', textAlign: 'center' }}
              layout='in-article'
              format='fluid'
            />
          </div>
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
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage
