import React from 'react';
import PropTypes from 'prop-types';
import PageRoute from '../../templates/page';

const AboutPagePreview = ({ entry, widgetFor }) => (
  <PageRoute
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
);

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default AboutPagePreview;
