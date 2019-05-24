import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

const PreviewCompatibleImage = React.forwardRef(({ imageInfo }, ref) => {
  const { alt = '', childImageSharp, image } = imageInfo;
  if (!!image && !!image.childImageSharp) {
    return <Img ref={ref} fluid={image.childImageSharp.fluid} alt={alt} />;
  }

  if (!!childImageSharp) {
    return <Img ref={ref} fluid={childImageSharp.fluid} alt={alt} />;
  }

  if (!!image && typeof image === 'string')
    return <img ref={ref} src={image} alt={alt} />;

  return null;
});

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object
  }).isRequired
};

export default PreviewCompatibleImage;
