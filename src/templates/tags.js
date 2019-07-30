import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Pagination from '../components/Pagination';

const TagRoute = ({ pageContext }) => {
  const posts = pageContext.group;
  return (
    <Layout>
      {pageContext.tag && (
        <h2 className='tag-title'>{`Tag : ${pageContext.tag}`}</h2>
      )}
      <Grid posts={posts} title={pageContext.additionalContext.cat} />
      <Pagination
        count={pageContext.pageCount}
        title={pageContext.additionalContext.cat}
      />
    </Layout>
  );
};

export default TagRoute;
