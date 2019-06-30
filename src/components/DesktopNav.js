import React from 'react';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash-es';

const DesktopNav = ({ items }) => {
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
                <Link to={`/${kebabCase(item)}/`}>{item}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default DesktopNav;
