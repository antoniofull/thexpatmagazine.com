import React, { useState } from 'react';
import { Link } from 'gatsby';

import SearchForm from './SearchForm';
import SearchIcon from '../img/icon-search.svg';

const DesktopNav = ({ active, items }) => {
  const [isSearchOpen, setSearchState] = useState(false);
  return (
    <React.Fragment>
      <nav
        className='main-nav wf-source-sans'
        role='navigation'
        aria-label='main-navigation'
      >
        <ul className='main-nav__list'>
          {items.map(item => (
            <li className='main-nav__item' key={item.node.id}>
              <Link key={item.node.id} to={item.node.fields.slug}>
                {item.node.frontmatter.title}
              </Link>
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
