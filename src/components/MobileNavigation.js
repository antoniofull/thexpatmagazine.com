import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Motion, spring } from 'react-motion';
import Div100vh from 'react-div-100vh';

import '../styles/nav.css';

import SearchForm from './SearchForm';

const MobileNavigation = ({ active, toggleState }) => {
  if (active) {
    return (
      <Motion
        defaultStyle={{ opacity: 0, y: -1600 }}
        style={{ opacity: spring(1), y: spring(0) }}
      >
        {style => (
          <Div100vh>
            <div
              className='nav--mobile'
              style={{
                opacity: style.opacity,
                transform: `translateY(${style.y}px)`
              }}
            >
              <div className='nav--mobile__bg'>
                <SearchForm />
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
                    {/* <li className='main-nav__item'>
                    <Link to='/'>Countries</Link>
                  </li> */}
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
              </div>
              <button
                className='btn btn--circle btn--secondary btn--close'
                onClick={toggleState}
              />
            </div>
          </Div100vh>
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
