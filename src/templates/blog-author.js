import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

class AuthorRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          <h2 className=''>{post.node.frontmatter.title}</h2>
        </Link>
      </li>
    ));
    const author = this.props.pageContext.author;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} All posts in ${
      totalCount === 1 ? '' : 's'
    }  “${author}”`;

    return (
      <Layout>
        <section className='section'>
          <Helmet title={`${author} | ${title}`} />
          <div className=''>
            <div className=''>
              <div className=''>
                <h3 className=''>{tagHeader}</h3>
                <ul className=''>{postLinks}</ul>
                <p>
                  <Link to='/authors/'>All Authors</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default AuthorRoute;

export const AuthorQuery = graphql`
  query AuthorPage($author: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { in: [$author] } } }
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
