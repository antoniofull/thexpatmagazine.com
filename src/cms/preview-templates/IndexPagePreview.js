import React from 'react';
import PropTypes from 'prop-types';

export const IndexPage = ({
  image,
  title,
  heading,
  subheading,
  description
}) => (
  <article>
    <h1>{title}</h1>
    <h2>{heading}</h2>
    <div>{subheading}</div>
    <img alt='imag' src={image} />
    <p>{description}</p>
  </article>
);

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return (
      <IndexPage
        image={data.image}
        title={data.title}
        heading={data.heading}
        subheading={data.subheading}
        description={data.description}
        intro={data.intro || { blurbs: [] }}
        mainpitch={data.mainpitch || {}}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default IndexPagePreview;
