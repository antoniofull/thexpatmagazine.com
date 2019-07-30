import React from 'react';
// import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Pagination from '../components/Pagination';

const CatRoute = ({ pageContext }) => {
  const posts = pageContext.group;

  return (
    <Layout>
      <Grid posts={posts} title={pageContext.additionalContext.cat} />
      <Pagination
        count={pageContext.pageCount}
        title={pageContext.additionalContext.cat}
      />
    </Layout>
  );
};

export default CatRoute;
