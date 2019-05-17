import React from 'react';
import Header from './Header';
// import { Link } from 'gatsby';
import logo from '../img/logo.svg';
import mobileNavToggler from '../img/mobile-nav-toggle.svg';

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ''
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active'
            })
          : this.setState({
              navBarActiveClass: ''
            });
      }
    );
  };

  render() {
    return (
      <Header>
        <img src={logo} />
        {/* <nav className='' role='navigation' aria-label='main-navigation' /> */}
        <a href={'#'} className='wf-montserrat'>
          <span>MENU</span>
          <img src={mobileNavToggler} />
        </a>
      </Header>
    );
  }
};

export default Navbar;
