import React from 'react';

import '../styles/loader.css';

const Loader = () => (
  <div className='loader-container'>
    <div className='spinner'>
      <div className='rect1' />
      <div className='rect2' />
      <div className='rect3' />
      <div className='rect4' />
      <div className='rect5' />
    </div>
    Loading articles
  </div>
);

export default Loader;
