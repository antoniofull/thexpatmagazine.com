import React from 'react';

import { StaticQuery, graphql, Link } from 'gatsby';

const Stories = ({ data }) => (
  <section className='stories stories--home container'>
    <h3>Latest Stories</h3>
  </section>
);

export default props => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                title
              }
            }
          }
        }
      }
    `}
    render={data => <Stories data={data} {...props} />}
  />
);
