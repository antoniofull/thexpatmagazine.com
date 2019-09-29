import React from 'react';
import Helmet from 'react-helmet';

import NavbarAmp from '../components/NavBarAmp';
import useSiteMetadata from './SiteMetadata';

const TemplateWrapper = ({ children }) => {
  const site = useSiteMetadata();

  return (
    <React.Fragment>
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
        <link rel='dns-prefetch' href='https://fonts.googleapis.com'></link>
        <link rel='preconnect' href='https://e.dlx.addthis.com'></link>
        <link rel='dns-prefetch' href='https://e.dlx.addthis.com'></link>
        <link
          href='https://fonts.googleapis.com'
          rel='preconnect'
          crossorigin
        ></link>
        <link
          href='https://fonts.gstatic.com'
          rel='preconnect'
          crossorigin
        ></link>
        <link
          href='https://pagead2.googlesyndication.com'
          rel='preconnect'
          crossorigin
        ></link>
        <link
          href='https://googleads.g.doubleclick.net'
          rel='preconnect'
          crossorigin
        ></link>
        <link
          href='https://adservice.google.it'
          rel='preconnect'
          crossorigin
        ></link>
        <link
          href='https://adservice.google.com'
          rel='preconnect'
          crossorigin
        ></link>

        <link
          href='https://www.google-analytics.com'
          rel='preconnect'
          crossorigin
        ></link>
        <link
          href='https://stats.g.doubleclick.net'
          rel='preconnect'
          crossorigin
        ></link>
        <link href='https://www.google.com' rel='preconnect' crossorigin></link>
        <link
          href='https://apis.google.com'
          rel='preconnect'
          crossorigin
        ></link>
      </Helmet>
      <NavbarAmp />
      {children}
    </React.Fragment>
  );
};

export default TemplateWrapper;
