import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
// import BlogRoll from '../components/BlogRoll';
import FeaturedPosts from '../components/FeaturedPosts';
import Stories from '../components/Stories';

import '../styles/variables.css';
import '../styles/reset.css';
import '../styles/typography.css';
import '../styles/home-page.css';

const IndexPage = () => {
  return (
    <Layout>
      <main className='home'>
        <div className='container'>
          <div className='content'>
            <FeaturedPosts />
          </div>
        </div>
        <Stories />
      </main>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;
