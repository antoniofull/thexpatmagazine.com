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

  const allposts = await wrapper(
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
                country
                author
                category
                templateKey
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
    createPage({
      path: edge.node.fields.slug,
      tags: edge.node.frontmatter.tags,
      categories: edge.node.frontmatter.category,
      countries: edge.node.frontmatter.country,
      component: path.resolve(
        `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
      ),
      // additional data can be passed via context
      context: {
        id
      }
    });
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
    const value = createFilePath({ node, getNode });
    console.log(value);
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
