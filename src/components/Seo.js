import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO({
  description,
  lang,
  image,
  meta,
  keywords,
  title,
  pathname,
  type,
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const metaImage = image
          ? `${data.site.siteMetadata.siteURL}${image.publicURL}`
          : null
        const metaUrl = `${data.site.siteMetadata.siteURL}${pathname}`
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:type`,
                content: type || 'website',
              },
              {
                property: `og:url`,
                content: metaUrl,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                name: `twitter:creator`,
                content: `@${data.site.siteMetadata.links.twitter}`,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: 'google-site-verification',
                content: '',
              },
            ]
              .concat(
                metaImage
                  ? [
                      {
                        property: `og:image`,
                        content: metaImage,
                      },
                      {
                        property: 'og:image:secure_url',
                        content:
                          metaImage ||
                          'https://www.thexpatmagazine.com/static/img/logo-share.jpg',
                      },
                      {
                        property: `og:image:alt`,
                        content: title,
                      },
                      {
                        property: 'og:image:width',
                        content: image.width,
                      },
                      {
                        property: 'og:image:height',
                        content: image.height,
                      },
                      {
                        name: `twitter:card`,
                        content: `summary_large_image`,
                      },
                    ]
                  : [
                      {
                        name: `twitter:card`,
                        content: `summary`,
                      },
                    ]
              )
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  pathname: ``,
  author: '',
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  image: PropTypes.object,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  pathname: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        lang
        title
        siteURL
        description
        links {
          twitter
          facebook
          pinterest
          instagram
        }
      }
    }
  }
`
