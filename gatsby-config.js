var proxy = require('http-proxy-middleware')
const queries = require('./src/utils/algolia')

require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'Thexpatmagazine.com - A Magazine for Expats',
    description: `The Expat Magazine is an online community made of expats and travellers who write and share tips, news and experiences to help you travel and live abroad.`,
    siteURL: 'https://www.thexpatmagazine.com',
    siteUrl: 'https://www.thexpatmagazine.com',
    lang: 'en',
    links: {
      website: 'https://www.thexpatmagazine.com',
      facebook: 'https://www.facebook.com/thexpatmagazine/',
      twitter: 'https://twitter.com/ThexpatMagazine',
      instagram: 'https://www.instagram.com/the_expatmagazine/',
      pinterest: 'https://www.pinterest.com/08zwmxzliph7fpzk2p5heehhd5yb4y/',
      youtube: 'https://www.youtube.com/channel/UCklnL4k6pw-LDU4Cvp6mNBQ'
    }
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    // {
    //   resolve: `gatsby-plugin-advanced-sitemap`,
    //   options: {
    //     // 1 query for each data type
    //     query: `
    //       {
    //         allPosts: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "blog-post"}}}, sort: {fields: frontmatter___date}) {
    //         edges {
    //           node {
    //             id
    //             fields {
    //               slug
    //             }
    //             frontmatter {
    //               templateKey
    //               author
    //               title
    //               seotitle
    //               category
    //               description
    //               featuredimage {
    //                 publicURL
    //               }
    //             }
    //           }
    //         }
    //       }
    //       allPages: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "page"}}}, sort: {fields: frontmatter___date}) {
    //         edges {
    //           node {
    //             id
    //             fields {
    //               slug
    //             }
    //             frontmatter {
    //               templateKey
    //               author
    //               title
    //               seotitle
    //               category
    //               description
    //               featuredimage {
    //                 publicURL
    //               }
    //             }
    //           }
    //         }
    //       }
    //       allCategories: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "categories"}}}, sort: {fields: frontmatter___date}) {
    //         edges {
    //           node {
    //             id
    //             fields {
    //               slug
    //             }
    //             frontmatter {
    //               templateKey
    //               author
    //               title
    //               seotitle
    //               category
    //               description
    //               featuredimage {
    //                 publicURL
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //     `,
    //     mapping: {
    //       // Each data type can be mapped to a predefined sitemap
    //       // Routes can be grouped in one of: posts, tags, authors, pages, or a custom name
    //       // The default sitemap - if none is passed - will be pages
    //       allPosts: {
    //         sitemap: `posts`
    //       },
    //       allPages: {
    //         sitemap: `pages`
    //       },
    //       allCategories: {
    //         sitemap: `categories`
    //       }
    //     },
    //     exclude: [
    //       `/404`,
    //       `/404.html`,
    //       `/offline-plugin-app-shell-fallback`,
    //       /(\/)?hash-\S*/ // you can also pass valid RegExp to exclude internal tags for example
    //     ],
    //     createLinkInHead: true, // optional: create a link in the `<head>` of your site
    //     addUncaughtPages: true, // optional: will fill up pages that are not caught by queries and mapping and list them under `sitemap-pages.xml`
    //     additionalSitemaps: []
    //   }
    // },
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        openGraph: {
          type: 'website',
          locale: 'en_EN',
          url: 'https://www.thexpatmagazine.com',
          site_name: 'The Expat Magazine'
        },
        twitter: {
          handle: '@Thexpatmagazine',
          site: '@Thexpatmagazine',
          cardType: 'summary_large_image'
        }
      }
    },
    {
      resolve: `gatsby-plugin-amp`,
      options: {
        analytics: {
          type: 'gtag',
          dataCredentials: 'include',
          config: {
            vars: {
              gtag_id: 'UA-67184030-1',
              config: {
                'UA-67184030-1': {
                  page_location: '{{pathname}}',
                  vars: {
                    account: 'UA-67184030-1'
                  }
                }
              }
            }
          }
        },
        canonicalBaseUrl: 'https://www.thexpatmagazine.com/',
        components: ['amp-form'],
        excludedPaths: ['/404*', '/'],
        pathIdentifier: '/amp/',
        relAmpHtmlPattern: '{{canonicalBaseUrl}}{{pathIdentifier}}{{pathname}}',
        useAmpClientIdApi: true
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.thexpatmagazine.com',
        sitemap: 'https://www.thexpatmagazine.com/sitemap.xml',
        policy: [
          { userAgent: '*', allow: '/' },
          { userAgent: '*', disallow: '/admin/' }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000 // default: 1000
      }
    },
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-lodash`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Lora|Playfair+Display:900|Open+Sans&display=swap']
        }
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        // graphQL query to get siteMetadata
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteURL
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteURL + edge.node.fields.slug,
                  guid: site.siteMetadata.siteURL + edge.node.fields.slug,
                  author: edge.node.frontmatter.author,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        description
                        author
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'The Expat Magazine - RSS Feed',
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/'
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `G-G394Y86YE6`,
        // Puts tracking script in the head instead of the body
        head: true,
        // enable ip anonymization
        anonymize: true
      }
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads'
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /img/
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        analyzerPort: 3000,
        production: false
        // analyzerMode: 'static'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads'
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 700,
              linkImagesToOriginal: false
            }
          },
          `gatsby-remark-lazy-load`,
          `gatsby-remark-images-medium-zoom`,
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static'
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Expat Magazine`,
        short_name: `Expat Magazine`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true // Activates purging in npm run develop
      }
    }, // must be after other CSS plugins
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ],
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': ''
        }
      })
    )
  }
}
