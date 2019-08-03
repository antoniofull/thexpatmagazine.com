import React from 'react';

import SEO from '../components/Seo';
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Pagination from '../components/Pagination';

const CountryRoute = ({ pageContext }) => {
  const posts = pageContext.group;
  return (
    <Layout>
      <SEO
        keywords={[
          'expats',
          'travel',
          'life abroad',
          'expatriates',
          'expat life',
          pageContext.additionalContext.ca
        ]}
        title={pageContext.additionalContext.cat}
        description={`All expat and travel articles for : ${pageContext.additionalContext.cat}`}
      />
      <Grid posts={posts} title={pageContext.additionalContext.cat} />
      <Pagination
        count={pageContext.pageCount}
        title={pageContext.additionalContext.cat}
      />
    </Layout>
  );
};

export default CountryRoute;
