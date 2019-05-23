import React from 'react';
import Header from './Header';
import { Link } from 'gatsby';
import MediaQuery from 'react-responsive';

import Logo from '../img/logo.svg';
import MobileNavToggler from '../img/mobile-nav-toggle.svg';
import MobileNavigation from './MobileNavigation';
import DesktopNav from './DesktopNav';

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ''
    };
    this.toggleHamburger = this.toggleHamburger.bind(this);
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
        <Link className='logo' to='/'>
          <Logo alt={'The Expat Magazine'} />
        </Link>
        <MediaQuery query='(max-device-width: 1024px)'>
          <div className='mobile-toggle' onClick={this.toggleHamburger}>
            <span>MENU</span>
            <button type='button' className='wf-montserrat btn-link'>
              <MobileNavToggler />
            </button>
          </div>
          <MobileNavigation
            active={this.state.active}
            toggleState={this.toggleHamburger}
          />
        </MediaQuery>
        <MediaQuery query='(min-device-width: 1025px)'>
          <DesktopNav />
        </MediaQuery>
      </Header>
    );
  }
};

export default Navbar;
