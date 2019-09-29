import React from 'react';
import Header from './Header';
import { Link, StaticQuery, graphql } from 'gatsby';
import MediaQuery from 'react-responsive';

import Logo from '../img/logo.svg';
import MobileNavToggler from '../img/mobile-nav-toggle.svg';
import MobileNavigation from './MobileNavigation';
import DesktopNav from './DesktopNav';

const NavbarAmp = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: '',
      items: ['stories', 'destinations', 'travel tips', 'expat tips', 'guests']
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
    const { items } = this.state;
    return (
      <Header>
        <Link className='logo' to='/' aria-label='Home Page The Expat magazine'>
          <Logo className='logo--svg' />
        </Link>
        <MediaQuery query='(max-width: 1024px)'>
          <div className='mobile-toggle' onClick={this.toggleHamburger}>
            <span className='mobile-nav__text'>MENU</span>
            <button
              aria-label='Open Naigation'
              type='button'
              className='hamburger btn-link'
            >
              <MobileNavToggler />
            </button>
          </div>
          <MobileNavigation
            items={items}
            active={this.state.active}
            toggleState={this.toggleHamburger}
          />
        </MediaQuery>
        <MediaQuery query='(min-width: 1025px)'>
          <DesktopNav items={items} />
        </MediaQuery>
      </Header>
    );
  }
};

export default () => (
  <StaticQuery
    query={graphql`
      query NavItemsAmp {
        allMarkdownRemark(
          filter: { frontmatter: { siteSettings: { eq: "blog-nav" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <NavbarAmp data={data} count={count} />}
  />
);
