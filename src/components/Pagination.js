import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import { Link } from 'gatsby';

const Pagination = ({ count, title }) => {
  const pages = [];
  for (let i = 1; i <= count; i++) {
    pages.push(i);
  }
  const baseUrl = kebabCase(title);
  return (
    <div className='pagination'>
      <div className='pagination__container wf-os'>
        {pages.map(page => (
          <Link
            key={page}
            to={`${page === 1 ? `/${baseUrl}/` : `/${baseUrl}/${page}`}`}
          >
            {page}
          </Link>
        ))}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default Pagination;
