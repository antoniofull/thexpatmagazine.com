import React from 'react';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Seo from '../components/Seo';
import Pagination from '../components/Pagination';

const TagRoute = ({ pageContext }) => {
  const posts = pageContext.group;

  return (
    <Layout>
      <Helmet></Helmet>
      <Seo
        lang='en'
        keywords={[pageContext.tag] || []}
        pathname={`/${pageContext.pathPrefix}`}
        title={`Articles for: ${pageContext.tag}`}
        description={`${pageContext.pageCount}  articles at the expat magazine tagged with ${pageContext.tag}`}
      />
      {pageContext.tag && (
        <h2 className='tag-title'>{`Articles tagged in: ${pageContext.tag}`}</h2>
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
