var proxy = require('http-proxy-middleware');
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(50);
module.exports = {
  siteMetadata: {
    title: 'Thexpatmagazine.com - A Magazine for Expats',
    description: `The Expat Magazine is an online community made of expats and travellers who write and share tips, news and experiences to help you travel and live abroad.`,
    siteURL: 'https://thexpatmagazine.com',
    lang: 'en',
    links: {
      website: 'https://thexpatmagazine.com',
      facebook: 'https://www.facebook.com/thexpatmagazine/',
      twitter: 'ThexpatMagazine',
      instagram: 'https://www.instagram.com/the_expatmagazine/',
      pinterest: 'https://www.pinterest.com/08zwmxzliph7fpzk2p5heehhd5yb4y/'
    }
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    `gatsby-plugin-transition-link`,
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
          // an array of feeds, I just have one below
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              const {
                siteMetadata: { siteURL }
              } = site;
              return allMarkdownRemark.edges.map(edge => {
                const {
                  node: {
                    frontmatter: {
                      title,
                      date,
                      path,
                      author: { name, email },
                      featured: { publicURL },
                      featuredAlt
                    },
                    excerpt,
                    html
                  }
                } = edge;
                return Object.assign({}, edge.node.frontmatter, {
                  language: `en-us`,
                  title,
                  description: excerpt,
                  date,
                  url: siteURL + path,
                  guid: siteURL + path,
                  author: `${email} ( ${name} )`,
                  image: {
                    url: siteURL + publicURL,
                    title: featuredAlt,
                    link: siteURL + path
                  },
                  custom_elements: [{ 'content:encoded': html }]
                });
              });
            },
            // query to get blog post data
            query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    frontmatter {
                      date
                      title
                      featuredimage {
                        publicURL
                      }
                      author
                    }
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: `My Awesome Site | RSS Feed`
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: ``
      }
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `the_expatmagazine`
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
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
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
              maxWidth: 2048
            }
          },
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
    );
  }
};
