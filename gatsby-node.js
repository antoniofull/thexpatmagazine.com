const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

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

  const categoryTemplate = require.resolve('./src/templates/categories.js');
  const authorTemplate = require.resolve('./src/templates/blog-author.js');

  const result = await wrapper(
    graphql(`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                tags
                category
                author
                country
                templateKey
              }
            }
          }
        }
      }
    `)
  );

  // Create Posts
  const posts = result.data.edges;

  posts.forEach(edge => {
    const id = edge.node.id;
    if (edge.node.frontmatter.templateKey) {
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        categories: edge.node.frontmatter.catgory,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id
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

  // Categories pages:
  let categories = [];
  categories.forEach(edge => {
    if (_.get(edge, `node.frontmatter.category`)) {
      categories = categories.concat(edge.node.frontmatter.category);
    }
  });
  // Eliminate duplicate tags
  categories = _.uniq(categories);

  // Make tag pages
  categories.forEach(category => {
    const catPath = `/tags/${_.kebabCase(category)}/`;

    createPage({
      path: catPath,
      component: path.resolve(`src/templates/categories.js`),
      context: {
        category
      }
    });
  });

  // Authors pages:
  let authors = [];
  authors.forEach(edge => {
    if (_.get(edge, `node.frontmatter.author`)) {
      authors = authors.concat(edge.node.frontmatter.category);
    }
  });
  // Eliminate duplicate tags
  authors = _.uniq(authors);

  // Make tag pages
  authors.forEach(author => {
    const authPath = `/tags/${_.kebabCase(author)}/`;

    createPage({
      path: authPath,
      component: path.resolve(`src/templates/author.js`),
      context: {
        author
      }
    });
  });

  // Authors pages:
  let countries = [];
  countries.forEach(edge => {
    if (_.get(edge, `node.frontmatter.country`)) {
      countries = countries.concat(edge.node.frontmatter.country);
    }
  });
  // Eliminate duplicate country
  countries = _.uniq(countries);

  // Make country pages
  countries.forEach(country => {
    const authPath = `/tags/${_.kebabCase(country)}/`;

    createPage({
      path: authPath,
      component: path.resolve(`src/templates/country.js`),
      context: {
        country
      }
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
