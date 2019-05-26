import React from 'react';
// import { Link } from 'gatsby';

// import logo from '../img/logo.svg';
// import facebook from '../img/social/facebook.svg';
// import instagram from '../img/social/instagram.svg';
// import twitter from '../img/social/twitter.svg';
// import vimeo from '../img/social/vimeo.svg';

import '../styles/footer.css';

import InstagramFeed from './InstagramFeed';
import NewsLetter from './NewsLetter';

const Footer = class extends React.Component {
  render() {
    return (
      <footer className='main-footer is-color-black has-text-white'>
        <InstagramFeed />
        <NewsLetter />
      </footer>
    );
  }
};

export default Footer;
