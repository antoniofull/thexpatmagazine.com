import React, { useEffect } from 'react'

import Layout from '../components/Layout'
import Helmet from 'react-helmet'

const Shop = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('DOMCOntentLoaded', () => {
        window.spread_shop_config = {
          shopName: 'thexpatmagazine',
          locale: 'en_GB',
          prefix: 'https://shop.spreadshirt.co.uk',
          baseId: 'myShop',
          startToken: 'the+expat+magazine?idea=5e91b7675fd3e441f18c728f',
        }
      })
    }
  }, [])
  return (
    <Layout>
      <Helmet>
        <script
          type='text/javascript'
          src='https://shop.spreadshirt.co.uk/shopfiles/shopclient/shopclient.nocache.js'
        ></script>
      </Helmet>
      <div id='myShop'></div>
    </Layout>
  )
}

export default Shop
