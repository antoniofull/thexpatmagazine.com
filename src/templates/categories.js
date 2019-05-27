import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          <h2 className=''>{post.node.frontmatter.title}</h2>
        </Link>
      </li>
    ));
    const category = this.props.pageContext.category;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} All posts in ${
      totalCount === 1 ? '' : 's'
    }  “${category}”`;

    return (
      <Layout>
        <section className='section'>
          <Helmet title={`${category} | ${title}`} />
          <div className=''>
            <div className=''>
              <div className=''>
                <h3 className=''>{tagHeader}</h3>
                <ul className=''>{postLinks}</ul>
                <p>
                  <Link to='/'>Go back to home Page</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
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
`;
