import React from 'react'
import MediaQuery from 'react-responsive'
import { Helmet } from 'react-helmet'

import Search from './search/'
import '../styles/header.css'
const searchIndices = [
  { name: `Pages`, title: `Pages`, hitComp: `PageHit` },
  { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` },
]
const Header = ({ children }) => (
  <header className='main-header is-color-white' role='banner'>
    <Helmet>
      <meta name='monetization' content='$ilp.gatehub.net/429406455' />
    </Helmet>
    <div className='main-header__container container'>
      {children}
      <MediaQuery query='(min-width: 1024px)'>
        <Search collapse indices={searchIndices} />
      </MediaQuery>
    </div>
  </header>
)

export default Header
