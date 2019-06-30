import React from 'react';
import Layout from '../components/Layout';
import { searchIndices } from '../components/search/indices';
import Search from '../components/search';
import TravellerIcon from '../img/travellers.svg';
import '../styles/404.css';

const NotFoundPage = () => (
  <Layout>
    <div className='container page-404'>
      <h1>Ooops ... Looks like you are lost.</h1>
      <h3>Try our search</h3>
      <Search
        className='page-404-search'
        collapse={false}
        indices={searchIndices}
      />
      <TravellerIcon className='travel-404' />
    </div>
  </Layout>
);

export default NotFoundPage;
