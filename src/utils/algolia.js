const pageQuery = `{
    pages: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/pages/" },
        frontmatter: {templateKey: {eq: "page"}}
      }
    ) {
      edges {
        node {
          objectID: id
          fields {
            slug
          }
          frontmatter {
            title
            
          }
          excerpt(pruneLength: 5000)
        }
      }
    }
  }`

const postQuery = `{
    posts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/blog/"}}) {
      edges {
        node {
          objectID: id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM D, YYYY")
            tags
            author
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }`

const flatten = (arr) =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: `Pages`,
    settings,
  },
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings,
  },
]

module.exports = queries
