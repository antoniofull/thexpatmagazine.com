import React from 'react';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';

const CategoriesPage = ({ data }, props) => {
  if (data) {
    const { title } = data.categoryData.edges[0].node.frontmatter;
    const { description } = data.categoryData.edges[0].node.frontmatter;
    return (
      <Layout>
        <section className='section'>
          <div className='container content'>
            <div className='columns'>
              <div
                className='column is-10 is-offset-1'
                style={{ marginBottom: '6rem' }}
              >
                <h1 className='title is-size-2 is-bold-light'>{title}</h1>
                <h1 className='title is-size-2 is-bold-light'>{description}</h1>
                {/* <ul className='taglist'>
                  {data.categoryData.edges.map(tag => (
                    <React.Fragment>
                      <Helmet
                        title={`Category | ${tag.node.frontmatter.title}`}
                      />
                      <li key={tag.node.id}>
                        <Link to={tag.fields.slug}>
                          {tag.node.frontmatter.title}
                        </Link>
                      </li>
                    </React.Fragment>
                  ))}
                </ul> */}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  } else {
    return <div>No Results</div>;
  }
};

export default CategoriesPage;

export const tagPageQuery = graphql`
  query CategoryPage($title: String!) {
    categoryData: allMarkdownRemark(
      filter: { frontmatter: { title: { eq: $title } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
          }
          fields {
            slug
          }
        }
      }
    }
    # postData: allMarkdownRemark(
    #   filter: { frontmatter: { category: { eq: $title } } }
    # ) {
    #   edges {
    #     node {
    #       id
    #       frontmatter {
    #         title
    #         description
    #       }
    #       fields {
    #         slug
    #       }
    #     }
    #   }
    # }
  }
`;
