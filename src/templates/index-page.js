import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import _ from 'lodash';

import Layout from '../components/Layout';
import Footer from '../components/Footer';
import FeaturedPosts from '../components/FeaturedPosts';
import Stories from '../components/Stories';
import Tips from '../components/Tips';
import Destinations from '../components/Destinations';

import '../styles/variables.css';
import '../styles/reset.css';
import '../styles/typography.css';
import '../styles/home-page.css';

function featured(post) {
  return post.node.frontmatter.featuredpost;
}

function story(post) {
  console.log(_.find(post.node.frontmatter.category));
  console.log(_.includes(post.node.frontmatter.category, 'Stories'));
  // return post.node.frontmatter.category.toLowerCase() === 'stories';
}

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  // featured posts
  const featureds = _.filter(posts, featured);
  const stories = _.filter(posts, story);

  //featuredpost
  return (
    <Layout>
      <main className='home'>
        <FeaturedPosts posts={featureds} />
        <Stories posts={stories} />
        <Destinations />
        <Tips />
      </main>
      <Footer />
    </Layout>
  );
};

export const indexQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            category
            author
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;
