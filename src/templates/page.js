import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Content, { HTMLContent } from '../components/Content';

import Layout from '../components/Layout';
import '../styles/page.css';

const PageRoute = ({ data }) => {
  const { title } = data.markdownRemark.frontmatter;
  const PageContent = HTMLContent || Content;
  return (
    <Layout>
      <section className='container page'>
        <Helmet title={title} />
        <h1 className='post__title'>{title}</h1>
        <PageContent
          content={data.markdownRemark.html}
          className='post__content'
        />
      </section>
    </Layout>
  );
};

export default PageRoute;

export const PageQuery = graphql`
  query PageData($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
