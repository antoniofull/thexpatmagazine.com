import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import InstagramIcons from '../img/social/instagram.svg';

const InstagramFeed = ({ data }) => (
  <section className='instagram container'>
    <p className='icon-insta--rounded'>
      <InstagramIcons className='icon-insta' />
    </p>
    <div className='instagram__container has-content-box'>
      {data.map(edge => (
        <a
          key={edge.node.id}
          href='https://instagram.com/the_expatmagazine'
          className='instagram__link'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Img
            alt='The Expat Magazine on Instagram'
            fluid={edge.node.localFile.childImageSharp.fluid}
          />
        </a>
      ))}
    </div>
  </section>
);

export default () => (
  <StaticQuery
    query={graphql`
      query InstagramFeed {
        allInstaNode {
          edges {
            node {
              id
              likes
              comments
              mediaType
              preview
              original
              timestamp
              caption
              localFile {
                childImageSharp {
                  fluid(maxWidth: 400, maxHeight: 400) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <InstagramFeed data={data.allInstaNode.edges} />}
  />
);
