const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const createPaginatedPages = require('gatsby-paginate');

/**
 *
 * @param {Object} currentArticle
 * @param {Array} articles
 * @return {Array} a list of related articles
 */

const getRelatedArticles = (currentArticle, articles) => {
  const CATEGORIES_IN_COMMON = 1;
  const verifyCategories = ({ node }) => {
    if (currentArticle.node.id === node.id) {
      return false;
    }
    const categoriesInCommon = _.intersectionBy(
      currentArticle.node.frontmatter.category,
      node.frontmatter.category,
      category => category
    );
    return categoriesInCommon.length >= CATEGORIES_IN_COMMON;
  };
  const related = articles.filter(verifyCategories);
  if (related.length > 3) {
    return related.slice(0, 4);
  }
  return null;
};

const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      throw result.errors;
    }
    return result;
  });

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const categoriesPosts = await wrapper(
    graphql(`
      {
        allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
          group(field: frontmatter___category) {
            fieldValue
            totalCount
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      }
    `)
  );

  const categories = categoriesPosts.data.allMarkdownRemark.group;

  categories.forEach(g => {
    const catPath = _.kebabCase(g.fieldValue);
    createPaginatedPages({
      edges: g.edges,
      createPage: createPage,
      pageTemplate: 'src/templates/categories.js',
      pageLength: 15,
      pathPrefix: catPath,
      buildPath: (index, pathPrefix) =>
        index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}` // This is optional and this is the default
    });
  });

  // All countries posts

  const countriesPosts = await wrapper(
    graphql(`
      {
        allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
          group(field: frontmatter___country) {
            fieldValue
            totalCount
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      }
    `)
  );

  const countries = countriesPosts.data.allMarkdownRemark.group;

  countries.forEach(g => {
    const countryPath = `${_.kebabCase(g.fieldValue)}`;
    createPaginatedPages({
      edges: g.edges,
      createPage: createPage,
      pageTemplate: 'src/templates/blog-country.js',
      pageLength: 15,
      pathPrefix: countryPath,
      buildPath: (index, pathPrefix) =>
        index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}` // This is optional and this is the default
    });
  });

  const authorsList = await wrapper(
    graphql(`
      {
        allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
          group(field: frontmatter___author) {
            fieldValue
            totalCount
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      }
    `)
  );

  const authors = authorsList.data.allMarkdownRemark.group;

  authors.forEach(g => {
    const authorPath = `author/${_.kebabCase(g.fieldValue)}`;
    createPaginatedPages({
      edges: g.edges,
      createPage: createPage,
      pageTemplate: 'src/templates/blog-author.js',
      pageLength: 15,
      pathPrefix: authorPath,
      buildPath: (index, pathPrefix) =>
        index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}` // This is optional and this is the default
    });
  });

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
                tags
                country
                author
                category
                templateKey
                title
                description
                featuredimage {
                  publicURL
                }
              }
            }
          }
        }
      }
    `)
  );
  // Create Posts
  const posts = allposts.data.allMarkdownRemark.edges;

  posts.forEach(edge => {
    const id = edge.node.id;
    const { author, title } = edge.node.frontmatter;
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
      });
    }
  });

  // Tag pages:
  let tags = [];
  posts.forEach(edge => {
    if (_.get(edge, `node.frontmatter.tags`)) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });
  // Eliminate duplicate tags
  tags = _.uniq(tags);

  // Make tag pages
  tags.forEach(tag => {
    const tagPath = `/tags/${_.kebabCase(tag)}/`;
    createPage({
      path: tagPath,
      component: path.resolve(`src/templates/tags.js`),
      context: {
        tag
      }
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({
      node,
      getNode
    });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
