import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../../components/Layout';

const CategoriesPage = ({ data }) => {
  if (data) {
    return (
      <Layout>
        <Helmet title={`Categories Expat Blog`} />
        <section className='section'>
          <div className='container content'>
            <div className='columns'>
              <div
                className='column is-10 is-offset-1'
                style={{ marginBottom: '6rem' }}
              >
                <h1 className='title is-size-2 is-bold-light'>Tags</h1>
                <ul className='taglist'>
                  {data.allMarkdownRemark.nodes.map(cat => (
                    <li key={cat.id}>
                      <Link to={cat.fields.slug}>{cat.frontmatter.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  } else {
    return <div>No </div>;
  }
};

export default CategoriesPage;

export const categoryPageQuery = graphql`
  query AuthorQuery {
    allMarkdownRemark(
      filter: { frontmatter: { siteSettings: { eq: "blog-author" } } }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          bio
        }
      }
    }
  }
`;
