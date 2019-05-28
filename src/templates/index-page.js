import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import _ from 'lodash';

import Layout from '../components/Layout';
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
  return _.includes(post.node.frontmatter.category, 'stories');
}

function country(post) {
  return _.includes(post.node.frontmatter.category, 'destinations');
}

function tip(post) {
  return _.some(post.node.frontmatter.category, _.method('match', /tips/i));
}

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const posts = this.props.data.posts.edges;
    const authors = this.props.data.authors.edges;
    this.setState({
      ...this.state,
      posts,
      authors
    });
  }

  render() {
    const { posts } = this.state;
    const { authors } = this.state;
    if (posts && posts.length) {
      const featureds = _.filter(posts, featured);
      const stories = _.filter(posts, story);
      const destinations = _.filter(posts, country);
      const tips = _.filter(posts, tip);
      return (
        <Layout>
          <main className='home'>
            <FeaturedPosts
              authors={authors}
              posts={featureds}
              count={featureds.length}
            />
            <Stories authors={authors} posts={stories} count={stories.length} />
            <Destinations
              authors={authors}
              posts={destinations}
              count={destinations.length}
            />
            <Tips authors={authors} posts={tips} count={tips.length} />
          </main>
        </Layout>
      );
    }
    return (
      <Layout>
        <main className='home'>
          <div className='loader'>Loading Articles ...</div>
        </main>
      </Layout>
    );
  }
}

export const indexQuery = graphql`
  {
    posts: allMarkdownRemark(
      limit: 20
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
                featured: fluid(maxWidth: 2000, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
                grid: fluid(maxWidth: 700) {
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
`;

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;
