import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import { Link } from 'gatsby';

const Pagination = ({ count, title, base }) => {
  const pages = [];

  for (let i = 1; i <= count; i++) {
    pages.push(i);
  }
  let baseUrl = '';
  if (title) {
    baseUrl = kebabCase(title);
  }
  if (base) {
    baseUrl = base;
  }
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

Pagination.defaultProps = {
  title: '',
  base: ''
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string,
  base: PropTypes.string
};

export default Pagination;
