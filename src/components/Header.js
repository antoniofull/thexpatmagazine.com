import React from 'react';

import '../styles/header.css';

const Header = ({ children }) => (
  <header className='main-header' role='banner'>
    <div className='main-header__container'>{children}</div>
  </header>
);

export default Header;
