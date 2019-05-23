import React, { useState } from 'react';
import { Link } from 'gatsby';

import SearchForm from './SearchForm';
import SearchIcon from '../img/icon-search.svg';

const DesktopNav = ({ active }) => {
  const [isSearchOpen, setSearchState] = useState(false);
  return (
    <React.Fragment>
      <nav
        className='main-nav wf-montserrat'
        role='navigation'
        aria-label='main-navigation'
      >
        <ul className='main-nav__list'>
          <li className='main-nav__item'>
            <Link to='/'>Stories</Link>
          </li>
          <li className='main-nav__item'>
            <Link to='/'>Destinations</Link>
          </li>
          <li className='main-nav__item'>
            <Link to='/'>Expat Tips</Link>
          </li>
          <li className='main-nav__item'>
            <Link to='/'>Travel Tips</Link>
          </li>
          <li className='main-nav__item'>
            <Link to='/'>Guest Posts</Link>
          </li>
          <li className='main-nav__item'>
            <Link to='/'>All Tags</Link>
          </li>
        </ul>
      </nav>
      <button
        type='button'
        className='search-toggle-desktop'
        onClick={() => setSearchState(!isSearchOpen)}
      >
        <SearchIcon className='search-icon' />
      </button>
      {isSearchOpen && <SearchForm />}
    </React.Fragment>
  );
};

export default DesktopNav;
