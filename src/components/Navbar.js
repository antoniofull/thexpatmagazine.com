import React from 'react';
import Header from './Header';
import { Link } from 'gatsby';
import logo from '../img/logo.svg';
import mobileNavToggler from '../img/mobile-nav-toggle.svg';
import MobileNavigation from './MobileNavigation';

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
        <Link to='/'>
          <img src={logo} alt={'The Expat Magazine'} />
        </Link>
        <div className='mobile-toggle'>
          <span>MENU</span>
          <button
            type='button'
            className='wf-montserrat btn-link'
            onClick={this.toggleHamburger}
          >
            <img alt='toggle mobile navigation' src={mobileNavToggler} />
          </button>
        </div>
        <MobileNavigation active={this.state.active} />
      </Header>
    );
  }
};

export default Navbar;
