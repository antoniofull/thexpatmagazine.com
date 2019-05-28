import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useSiteMetadata from './SiteMetadata';

// Import css files
import '../styles/reset.css';
import '../styles/layout.css';
import '../styles/buttons.css';

const TemplateWrapper = ({ children }) => {
  const site = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang='en' />
        <title>{site.title}</title>
        <meta name='description' content={site.description} />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/img/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          href='/img/favicon-32x32.png'
          sizes='32x32'
        />
        <link
          rel='icon'
          type='image/png'
          href='/img/favicon-16x16.png'
          sizes='16x16'
        />

        <link
          rel='mask-icon'
          href='/img/safari-pinned-tab.svg'
          color='#ff4400'
        />
        <meta name='theme-color' content='#fff' />

        <meta property='og:type' content='business.business' />
        <meta property='og:title' content={site.title} />
        <meta property='og:url' content='/' />
        <meta property='og:image' content='/img/og-image.jpg' />
        <link
          href='https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i|Playfair+Display:700|Source+Sans+Pro:200&display=swap'
          rel='stylesheet'
        />
      </Helmet>
      <Navbar />
      <div>{children}</div>
      <Footer site={site} />
    </div>
  );
};

export const querySite = graphql`
  {
    site {
      siteMetadata {
        title
        description
        links {
          website
          instagram
          facebook
          pinterest
          twitter
        }
      }
    }
  }
`;

export default TemplateWrapper;
