import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Motion, spring } from 'react-motion'
import Div100vh from 'react-div-100vh'
import kebabCase from 'lodash/kebabCase'

import '../../styles/nav.css'

const MobileNavigation = ({ items, active, toggleState }) => {
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
                <nav
                  className='main-nav '
                  role='navigation'
                  aria-label='main-navigation'
                >
                  <ul className='main-nav__list'>
                    {items.map(item => (
                      <li className='main-nav__item' key={item}>
                        {item === 'guests' ? (
                          <Link to={`/pages/write-for-us`}>Guest Posts</Link>
                        ) : (
                          <Link to={`/${kebabCase(item)}`}>{item}</Link>
                        )}
                      </li>
                    ))}
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
    )
  }

  return null
}

MobileNavigation.propTypes = {
  active: PropTypes.bool.isRequired
}
export default MobileNavigation
