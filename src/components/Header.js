import React from 'react';

import '../styles/header.css';

const Header = ({ children }) => (
  <header className='main-header' role='banner'>
    {children}
  </header>
);

export default Header;
