import React from 'react';
// import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import _ from 'lodash';
import Layout from '../components/Layout';
import Grid from '../components/Grid';

const Pagination = ({ count, title }) => {
  const pages = [];
  for (let i = 1; i <= count; i++) {
    pages.push(i);
  }
  const baseUrl = _.kebabCase(title);
  return (
    <div className='pagination'>
      <div className='pagination__container wf-os'>
        {pages.map(page => (
          <Link
            key={page}
            to={`${page === 1 ? `/${baseUrl}/` : `/${baseUrl}/${page}`}`}
          >
            {page}
          </Link>
        ))}
      </div>
    </div>
  );
};

const TagRoute = ({ pageContext }) => {
  const posts = pageContext.group;
  return (
    <Layout>
      {pageContext.tag && <h2>{`All Posts Tagged in : ${pageContext.tag}`}</h2>}
      <Grid posts={posts} title={pageContext.additionalContext.cat} />
      <Pagination
        count={pageContext.pageCount}
        title={pageContext.additionalContext.cat}
      />
    </Layout>
  );
};

export default TagRoute;
