import React, { useState } from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';

import SearchForm from './SearchForm';
import SearchIcon from '../img/icon-search.svg';

const DesktopNav = ({ active, items }) => {
  const [isSearchOpen, setSearchState] = useState(false);
  return (
    <React.Fragment>
      <nav
        className='main-nav main-nav--desktop'
        role='navigation'
        aria-label='main-navigation'
      >
        <ul className='main-nav__list'>
          {items.map(item => (
            <li className='main-nav__item' key={item}>
              {item === 'guests' ? (
                <Link to={`/pages/write-for-us/`}>Guest Posts</Link>
              ) : (
                <Link to={`/${_.kebabCase(item)}/`}>{item}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <button
        type='button'
        className='search-toggle-desktop'
        onClick={() => setSearchState(!isSearchOpen)}
      >
        <SearchIcon
          className={`search-icon ${isSearchOpen && 'search-icon--open'}`}
        />
      </button>
      {isSearchOpen && <SearchForm />}
    </React.Fragment>
  );
};

export default DesktopNav;
