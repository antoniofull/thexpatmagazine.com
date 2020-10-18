import React from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Pagination from '../components/Pagination';
import { BASE_URL } from '../utils/utils'

const TagRoute = ({ pageContext }) => {
  const posts = pageContext.group;
  const { tag, group } = pageContext
  return (
    <Layout>
       <GatsbySeo
          language='en'
          title={`All Expat Articles for ${tag}`}
           description={`Everything you need to know about ${tag} before travelling or moving abroad`}
           openGraph={{
            url: `${BASE_URL}`,
            title: `All Articles in ${tag}`,
            description: `Everything you need to know about ${tag} before travelling or moving abroad`,
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
