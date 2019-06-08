import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import Grid from '../components/Grid';

const CatRoute = ({ pageContext }) => {
  const posts = pageContext.group;
  return (
    <Layout>
      <Grid posts={posts} />
    </Layout>
  );
};

export default CatRoute;
