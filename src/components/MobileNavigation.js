import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';

import bg from '../img/nav-bg.svg';
import '../styles/mobile-nav.css';

const MobileNavigation = ({ active }) => {
  const props = useSpring({
    backgroundImage: `url(${bg})`,
    top: active ? '0%' : '-100%'
  });
  if (active) {
    return (
      <animated.nav
        className='nav--mobile'
        role='navigation'
        aria-label='main-navigation'
        style={props}
      >
        <ul>
          <li>
            <Link to=''>Stories</Link>
          </li>
          <li>
            <Link to=''>Destinations</Link>
          </li>
          <li>
            <Link to=''>Countries</Link>
          </li>
          <li>
            <Link to=''>Expat Tips</Link>
          </li>
          <li>
            <Link to=''>Travel Tips</Link>
          </li>
          <li>
            <Link to=''>Guest Posts</Link>
          </li>
        </ul>
      </animated.nav>
    );
  }

  return null;
};

MobileNavigation.propTypes = {
  active: PropTypes.bool.isRequired
};
export default MobileNavigation;
