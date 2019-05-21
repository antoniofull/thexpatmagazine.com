import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Motion, spring } from 'react-motion';

import bg from '../img/nav-bg.svg';
import closeBtn from '../img/close-nav.svg';
import '../styles/mobile-nav.css';

import SearchForm from './SearchForm';

const MobileNavigation = ({ active, toggleState }) => {
  if (active) {
    return (
      <Motion
        defaultStyle={{ opacity: 0, y: -1600 }}
        style={{ opacity: spring(1), y: spring(0) }}
      >
        {style => (
          <div
            className='nav--mobile'
            style={{
              backgroundImage: `url(${bg})`,
              opacity: style.opacity,
              transform: `translateY(${style.y}px)`
            }}
          >
            <SearchForm />
            <nav
              className='main-nav'
              role='navigation'
              aria-label='main-navigation'
            >
              <ul>
                <li>
                  <Link to='/'>Stories</Link>
                </li>
                <li>
                  <Link to='/'>Destinations</Link>
                </li>
                <li>
                  <Link to='/'>Countries</Link>
                </li>
                <li>
                  <Link to='/'>Expat Tips</Link>
                </li>
                <li>
                  <Link to='/'>Travel Tips</Link>
                </li>
                <li>
                  <Link to='/'>Guest Posts</Link>
                </li>
              </ul>
            </nav>
            <button
              className='btn btn--circle btn--secondary btn--close'
              style={{ backgroundImage: `url(${closeBtn})` }}
              onClick={toggleState}
            />
          </div>
        )}
      </Motion>
    );
  }

  return null;
};

MobileNavigation.propTypes = {
  active: PropTypes.bool.isRequired
};
export default MobileNavigation;
