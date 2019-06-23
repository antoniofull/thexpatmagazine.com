import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

const Comments = ({ url, title }) => {
  const disqusConfig = {
    shortname: 'thexpatmagazine',
    config: { id: url, title }
  };
  return <DiscussionEmbed {...disqusConfig} />;
};

export default Comments;
