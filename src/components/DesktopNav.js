import React from 'react';
import { Link } from 'gatsby';

const DesktopNav = ({ active }) => (
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
);

export default DesktopNav;
