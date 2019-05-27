import React from 'react';
import Header from './Header';
import { Link, StaticQuery, graphql } from 'gatsby';
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
    const { edges } = this.props.data.allMarkdownRemark;
    return (
      <Header>
        <Link className='logo' to='/'>
          <Logo alt={'The Expat Magazine'} />
        </Link>
        <MediaQuery query='(max-width: 1024px)'>
          <div className='mobile-toggle' onClick={this.toggleHamburger}>
            <span className='mobile-nav__text'>MENU</span>
            <button type='button' className=' btn-link'>
              <MobileNavToggler />
            </button>
          </div>
          <MobileNavigation
            items={edges}
            active={this.state.active}
            toggleState={this.toggleHamburger}
          />
        </MediaQuery>
        <MediaQuery query='(min-width: 1025px)'>
          <DesktopNav items={edges} />
        </MediaQuery>
      </Header>
    );
  }
};

export default () => (
  <StaticQuery
    query={graphql`
      query NavItems {
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
                siteSettings
                title
                description
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Navbar data={data} count={count} />}
  />
);
