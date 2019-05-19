import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import BlogRoll from '../components/BlogRoll';

// Import css files
import '../styles/reset.css';
import '../styles/layout.css';

const IndexPage = () => {
  return (
    <Layout>
      <section className='section'>
        <div className='container'>
          <div className='content'>
            <BlogRoll />
          </div>
        </div>
      </section>
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
