import React from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useSiteMetadata from './SiteMetadata';

// Import css files
import '../styles/reset.css';
import '../styles/layout.css';

// import '~/gutenberg-web-type/gutenberg.scss';

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang='en' />
        <title>{title}</title>
        <meta name='description' content={description} />

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
        <meta property='og:title' content={title} />
        <meta property='og:url' content='/' />
        <meta property='og:image' content='/img/og-image.jpg' />
        <link
          href='https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i|Montserrat:400,600&display=swap'
          rel='stylesheet'
        />
      </Helmet>
      <Navbar />
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default TemplateWrapper;
