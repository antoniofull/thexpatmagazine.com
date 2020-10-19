import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'

const Shop = () => (
  <Layout>
    <Helmet
      script={[
        {
          type: 'text/javascript',
          innerHTML: `window.spread_shop_config = { shopName: 'thexpatmagazine', locale: 'en_GB', prefix: 'https://shop.spreadshirt.co.uk', baseId: 'myShop', startToken: 'the+expat+magazine?idea=5e91b7675fd3e441f18c728f', updateMetadata: false }`
        }
      ]}
    />
    <Helmet
      script={[
        {
          src:
            'https://shop.spreadshirt.co.uk/shopfiles/shopclient/shopclient.nocache.js'
        }
      ]}
    />
    <div id='myShop'></div>
  </Layout>
)

export default Shop
