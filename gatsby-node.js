const intersectionBy = require('lodash/intersectionBy')
const kebabCase = require('lodash/kebabCase')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const createPaginatedPages = require('gatsby-paginate')
/**
 *
 * @param {Object} currentArticle
 * @param {Array} articles
 * @return {Array} a list of related articles
 */

const getRelatedArticles = (currentArticle, articles) => {
  const CATEGORIES_IN_COMMON = 1
  const verifyCategories = ({ node }) => {
    if (currentArticle.node.id === node.id) {
      return false
    }
    const categoriesInCommon = intersectionBy(
      currentArticle.node.frontmatter.category,
      node.frontmatter.category,
      category => category
    )
    return categoriesInCommon.length >= CATEGORIES_IN_COMMON
  }
  const related = articles.filter(verifyCategories)
  if (related.length > 3) {
    return related.slice(0, 4)
  }
  return null
}

const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const categoriesPosts = await wrapper(
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: frontmatter___date, order: DESC }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          group(field: frontmatter___category) {
            fieldValue
            totalCount
            edges {
              node {
                id
                html
                excerpt(pruneLength: 250)
                fields {
                  slug
                }
                frontmatter {
                  title
                  seotitle
                  author
                  description
                  date(formatString: "MMMM DD, YYYY")
                  tags
                  country
                  featuredimage {
                    childImageSharp {
                      fluid(maxWidth: 700, quality: 100) {
                        src
                        srcSet
                        aspectRatio
                        sizes
                        base64
                      }
                    }
                    publicURL
                  }
                }
              }
            }
          }
        }
      }
    `)
  )

  const categories = categoriesPosts.data.allMarkdownRemark.group

  categories.forEach(g => {
    const catPath = kebabCase(g.fieldValue)
    createPaginatedPages({
      edges: g.edges,
      createPage: createPage,
      pageTemplate: 'src/templates/categories.js',
      pageLength: 15,
      pathPrefix: catPath,
      context: {
        cat: g.fieldValue
      },
      buildPath: (index, pathPrefix) =>
        index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}` // This is optional and this is the default
    })
  })

  // All countries posts

  const countriesPosts = await wrapper(
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: frontmatter___date, order: DESC }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          group(field: frontmatter___country) {
            fieldValue
            totalCount
            edges {
              node {
                id
                html
                excerpt(pruneLength: 250)
                fields {
                  slug
                }
                frontmatter {
                  title
                  seotitle
                  author
                  description
                  date(formatString: "MMMM DD, YYYY")
                  tags
                  featuredimage {
                    childImageSharp {
                      fluid(maxWidth: 700, quality: 100) {
                        src
                        srcSet
                        aspectRatio
                        sizes
                        base64
                      }
                    }
                    publicURL
                  }
                }
              }
            }
          }
        }
      }
    `)
  )

  const countries = countriesPosts.data.allMarkdownRemark.group

  countries.forEach(g => {
    const countryPath = `${kebabCase(g.fieldValue)}`
    createPaginatedPages({
      edges: g.edges,
      createPage: createPage,
      pageTemplate: 'src/templates/blog-country.js',
      pageLength: 15,
      pathPrefix: countryPath,
      context: {
        cat: g.fieldValue
      },
      buildPath: (index, pathPrefix) =>
        index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}` // This is optional and this is the default
    })
  })

  const authorsList = await wrapper(
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: frontmatter___date, order: DESC }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          group(field: frontmatter___author) {
            fieldValue
            totalCount
            edges {
              node {
                id
                html
                excerpt(pruneLength: 250)
                fields {
                  slug
                }
                frontmatter {
                  title
                  seotitle
                  author
                  description
                  date(formatString: "MMMM DD, YYYY")
                  tags
                  featuredimage {
                    childImageSharp {
                      fluid(maxWidth: 700, quality: 100) {
                        src
                        srcSet
                        aspectRatio
                        sizes
                        base64
                      }
                    }
                    publicURL
                  }
                }
              }
            }
          }
        }
      }
    `)
  )

  const authors = authorsList.data.allMarkdownRemark.group

  authors.forEach(g => {
    const authorPath = `authors/${kebabCase(g.fieldValue)}`

    createPaginatedPages({
      edges: g.edges,
      createPage: createPage,
      pageTemplate: path.resolve(`src/templates/blog-author.js`),
      pageLength: 15,
      pathPrefix: authorPath,
      context: {
        author: g.fieldValue
      },
      buildPath: (index, pathPrefix) =>
        index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}` // This is optional and this is the default
    })
  })

  // All Blog Posts
  const allposts = await wrapper(
    graphql(`
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                templateKey
                author
                title
                seotitle
                category
                description
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 400, quality: 100) {
                      src
                      srcSet
                      aspectRatio
                      sizes
                      base64
                    }
                  }
                  publicURL
                }
              }
            }
          }
        }
      }
    `)
  )
  // Create Posts
  const posts = allposts.data.allMarkdownRemark.edges

  posts.forEach(edge => {
    const id = edge.node.id
    const { author, title } = edge.node.frontmatter
    if (
      edge.node.frontmatter.templateKey !== 'categories' &&
      edge.node.frontmatter.templateKey !== 'blog-country' &&
      edge.node.frontmatter.templateKey !== 'blog-author'
    ) {
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          author,
          title,
          relatedArticles: getRelatedArticles(edge, posts)
        }
      })

      // if (edge.node.frontmatter.templateKey === 'blog-post') {
      //   createPage({
      //     path: `amp${edge.node.fields.slug}`,
      //     component: path.resolve('src/templates/blog-post.amp.js'),
      //     context: {
      //       id,
      //       author,
      //       title,
      //       slug: edge.node.fields.slug,
      //       relatedArticles: getRelatedArticles(edge, posts)
      //     }
      //   });
      // }
    }
  })
  // Index Page
  createPage({
    path: '/',
    component: path.resolve(`src/templates/index-page.js`)
  })

  // Tags
  const tagsList = await wrapper(
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: frontmatter___date, order: DESC }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
            edges {
              node {
                id
                html
                excerpt(pruneLength: 250)
                fields {
                  slug
                }
                frontmatter {
                  title
                  seotitle
                  author
                  description
                  date(formatString: "MMMM DD, YYYY")
                  tags
                  featuredimage {
                    childImageSharp {
                      fluid(maxWidth: 700, quality: 100) {
                        src
                        srcSet
                        aspectRatio
                        sizes
                        base64
                      }
                    }
                    publicURL
                  }
                }
              }
            }
          }
        }
      }
    `)
  )

  const tags = tagsList.data.allMarkdownRemark.group

  tags.forEach(g => {
    const tagPath = `tags/${kebabCase(g.fieldValue)}`

    createPaginatedPages({
      edges: g.edges,
      createPage: createPage,
      pageTemplate: path.resolve(`src/templates/tags.js`),
      pageLength: 15,
      pathPrefix: tagPath,
      context: {
        tag: g.fieldValue
      },
      buildPath: (index, pathPrefix) =>
        index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}` // This is optional and this is the default
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({
      node,
      getNode,
      trailingSlash: false
    })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}
