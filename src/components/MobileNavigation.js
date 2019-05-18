import React from 'react';
import PropTypes from 'prop-types';

const MobileNavigation = ({ visible }) =>
  visible && (
    <nav className='' role='navigation' aria-label='main-navigation' />
  );

MobileNavigation.propTypes = {
  visible: PropTypes.bool.isRequired
};
export default MobileNavigation;
