import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import '../styles/meta.css';

const AuthorMeta = ({ author }) => {
  console.log('meta', author);
  if (author) {
    return (
      <div className='post-meta--author'>
        <Link to={author.node.fields.slug} className='post-meta--author__link'>
          {/* <Img
            className='post-meta--author__image'
            fixed={author.node.photo}
          /> */}
          <h4 className='post-meta--author__name wf-os'>
            {author.node.frontmatter.title}
          </h4>
        </Link>
      </div>
    );
  }
  return null;
};

export default AuthorMeta;
