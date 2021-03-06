import React from 'react';

import '../../styles/header.css';

const Header = ({ children }) => (
  <header className='main-header is-color-white' role='banner'>
    <div className='main-header__container container'>{children}</div>
  </header>
);

export default Header;
