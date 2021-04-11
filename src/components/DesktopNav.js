import React from 'react'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'

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
                <Link to={`/pages/write-for-us`}>Guest Posts</Link>
              ) : (
                <Link to={`/${kebabCase(item)}`}>{item}</Link>
              )}
            </li>
          ))}
          <li className='main-nav__item'>
            <a
              href='https://bit.ly/expat-newsletter'
              target='_blank'
              rel='noopener noreferrer'
              title='expat newsletter'
            >
              Newsletter
            </a>
          </li>
          <li className='main-nav__item'>
            <Link to={'/shop'} title='Expat Shop'>
              Shop
            </Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  )
}

export default DesktopNav
