const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const categoryTemplate = require.resolve('./src/templates/categories.js');
  const authorTemplate = require.resolve('./src/templates/blog-author.js');

  graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "blog-author" } } }
      ) {
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
  `).then(authorsResult => {
    if (authorsResult.errors) {
      authorsResult.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(authorsResult.errors);
    }

    const authors = authorsResult.data.allMarkdownRemark.edges;
    _.each(authors, edge => {
      const { title } = edge.node.frontmatter;
      const id = edge.node.id;
      console.log(id, edge);
      createPage({
        path: edge.node.fields.slug,
        component: authorTemplate,
        context: {
          id,
          title
        }
      });
    });
  });

  graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { siteSettings: { eq: "blog-nav" } } }
      ) {
        totalCount
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      re.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(res.errors);
    }
    // Create Categories
    const navItems = res.data.allMarkdownRemark.edges;

    _.each(navItems, edge => {
      const title = edge.node.frontmatter.title;
      const id = edge.node.id;
      createPage({
        // path: catPath,
        path: edge.node.fields.slug,
        component: categoryTemplate,
        context: {
          title,
          id
        }
      });
    });
  });

  return graphql(`
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
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    // Create Posts
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(edge => {
      const id = edge.node.id;
      if (edge.node.frontmatter.templateKey) {
        createPage({
          path: edge.node.fields.slug,
          tags: edge.node.frontmatter.tags,
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
    // Iterate through each post, putting all found tags into `tags`
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
