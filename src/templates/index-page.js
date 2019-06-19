import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import CookieBanner from 'react-cookie-banner';

import Layout from '../components/Layout';
import FeaturedPosts from '../components/FeaturedPosts';
import Stories from '../components/Stories';
import Tips from '../components/Tips';
import Destinations from '../components/Destinations';
import Loader from '../components/Loader';
import SEO from '../components/Seo';

import '../styles/variables.css';
import '../styles/reset.css';
import '../styles/typography.css';
import '../styles/home-page.css';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const authors = this.props.data.authors.edges;

    // remove duplicates
    const allposts = this.props.data.posts.edges;
    const featured = this.props.data.featured.edges;

    // Remove duplicates
    const ids = new Set();
    let [stories, destinations, tips] = [[], [], []];

    allposts.forEach((post, i) => {
      const cat = post.node.frontmatter.category;
      const id = post.node.id;
      if (cat.includes('destinations') && !ids.has(id) && i < 30) {
        destinations.push(post);
        ids.add(id);
      }
      if (
        (cat.includes('travel tips') || cat.includes('expat tips')) &&
        !ids.has(id)
      ) {
        tips.push(post);
        ids.add(id);
      }
      if (cat.includes('stories') && !ids.has(id)) {
        stories.push(post);
        ids.add(id);
      }
    });

    if (destinations.length > 0) {
      this.setState({
        ...this.state,
        authors,
        featured,
        tips,
        destinations,
        stories
      });
    }
  }

  render() {
    const { authors, featured, stories, destinations, tips } = this.state;
    if (featured && featured.length) {
      return (
        <Layout>
          <Helmet
            bodyAttributes={{
              class: 'body-home'
            }}
          />
          <SEO title='The Expat Magazine Home Page' />
          <main className='home'>
            <FeaturedPosts
              authors={authors}
              posts={featured}
              count={featured.length}
            />
            <Stories authors={authors} posts={stories} count={stories.length} />
            <Destinations
              authors={authors}
              posts={destinations}
              count={destinations.length}
            />
            <Tips authors={authors} posts={tips} count={tips.length} />
          </main>
          <CookieBanner
            message='This website uses cookie, read more about it on our privacy page!'
            onAccept={() => {}}
            cookie='user-has-accepted-cookies'
          />
        </Layout>
      );
    }
    return (
      <Layout>
        <main className='home'>
          <Loader />
        </main>
      </Layout>
    );
  }
}

export const indexQuery = graphql`
  {
    featured: allMarkdownRemark(
      limit: 100
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          featuredpost: { eq: true }
        }
      }
    ) {
      edges {
        node {
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
                fluid(maxWidth: 1600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      limit: 60
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          featuredpost: { ne: true }
          category: { ne: null }
        }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
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
                fluid(maxWidth: 600) {
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
