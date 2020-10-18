import React from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Pagination from '../components/Pagination';
import {BASE_URL} from '../utils/utils'

const CatRoute = ({ pageContext }) => {
  const posts = pageContext.group;
  const { cat, pathPrefix, group } = pageContext
  console.log(group[0].node.frontmatter)
  return (
    <Layout>
     <GatsbySeo
          language='en'
          title={`All Expat Articles for ${cat}`}
           description={`Everything you need to know about ${cat} before travelling or moving abroad`}
           openGraph={{
            url: `${BASE_URL}${pathPrefix}`,
            title: `All Articles in ${cat}`,
            description: `Everything you need to know about ${cat} before travelling or moving abroad`,
            images: [
              {
                url: group[0].node.frontmatter.featuredimage.publicURL,
                width: 800,
                height: 600,
                alt: group[0].node.frontmatter.title,
              },
              {
                url: group[1].node.frontmatter.featuredimage.publicURL,
                width: 900,
                height: 800,
                alt: group[1].node.frontmatter.title,
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

export default CatRoute;
