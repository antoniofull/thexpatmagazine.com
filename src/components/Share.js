import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  //   PinterestShareButton,
  //   PinterestIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share';

const Share = ({ hashtag, hashtags, url, title, description, handle }) => (
  <div className='share-post'>
    <FacebookShareButton
      hashtag={hashtag}
      url={`https://boring-agnesi-57c4d2.netlify.com/${url}`}
      quote={description}
    >
      <FacebookIcon round size={32} />
    </FacebookShareButton>
    {/* <PinterestShareButton>
      <PinterestIcon round />
    </PinterestShareButton> */}
    <TwitterShareButton
      title={title}
      hashtags={hashtag}
      via={'Thexpatmagazine'}
    >
      <TwitterIcon round size={32} />
    </TwitterShareButton>
    <LinkedinShareButton>
      <LinkedinIcon round size={32} />
    </LinkedinShareButton>
    <EmailShareButton>
      <EmailIcon round size={32} />
    </EmailShareButton>
  </div>
);

export default Share;
