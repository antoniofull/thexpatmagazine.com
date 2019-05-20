import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Motion, spring } from 'react-motion';
import bg from '../img/nav-bg.svg';
import '../styles/mobile-nav.css';

const MobileNavigation = ({ active }) => {
  const config = { stiffness: 1340, damping: 25 };
  const toCSS = scale => ({
    transform: `scale3d(${scale}, ${scale}, ${scale})`,
    backgroundImage: `url(${bg})`
  });
  if (active) {
    return (
      <Motion
        defaultStyle={{ opacity: 0, scale: 0 }}
        style={{ opacity: spring(1), scale: spring(1, config) }}
      >
        {style => (
          <nav
            className='nav--mobile'
            role='navigation'
            aria-label='main-navigation'
            style={toCSS(style.scale)}
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
          </nav>
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
