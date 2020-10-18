import React from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Pagination from '../components/Pagination';

const CountryRoute = ({ pageContext }) => {
  const posts = pageContext.group;
  const { cat } = pageContext
  const BASE_URL = 'https://www.thexpatmagazine.com/'
  return (
    <Layout>
      <GatsbySeo
        title={`Expats Living in ${cat}`}
        description={`All the info's for expat and people living and travelling to ${cat}`}
        canonical={`${BASE_URL}${cat}`}
        openGraph={{
          url: `${BASE_URL}${cat}`,
          title: `Expats living in ${cat}`,
          description: `All the info's for expat and people living and travelling to ${cat}`,
          images: [
            {
              url: `${BASE_URL}${posts[0].node.frontmatter.featuredimage.publicURL}`,
              width: 800,
              height: 600,
              alt: posts[0].node.frontmatter.seotitle,
            },
            {
              url: `${BASE_URL}${posts[1].node.frontmatter.featuredimage.publicURL}`,
              width: 900,
              height: 800,
              alt: posts[1].node.frontmatter.seotitle,
            },
          ],
        }}
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
