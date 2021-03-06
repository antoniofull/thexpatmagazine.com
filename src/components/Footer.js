import React from 'react'
import { Link } from 'gatsby'

import '../styles/footer.css'

import NewsLetter from './NewsLetter'
import Logo from '../img/logo.svg'
import FacebookIcon from '../img/social/facebook.svg'
import InstagramIcon from '../img/social/instagram.svg'
import PinterestIcon from '../img/social/pinterest.svg'
import TwitterIcon from '../img/social/twitter.svg'
import YoutubeIcon from '../img/social/youtube.svg'

const Footer = ({ site }) => {
  return (
    <footer className='main-footer is-color-black'>
      <NewsLetter />
      <section className='main-footer__about wf-os'>
        <div className='main-footer__container'>
          <Logo className='footer-logo' />
          <p>{site && site.description}</p>
          <ul className='footer-social'>
            <li>
              <a
                href={site.links.instagram}
                className='footer-social__instagram'
                aria-label='Visit our instagram page'
              >
                <InstagramIcon className='social-icon' />
              </a>
            </li>
            <li>
              <a
                href={site.links.youtube}
                className='footer-social__youtube'
                aria-label='Visit our youtube page'
              >
                <YoutubeIcon className='social-icon' />
              </a>
            </li>
            <li>
              <a
                aria-label='Visit our facebook page'
                href={site.links.facebook}
                className='footer-social__facebook'
              >
                <FacebookIcon className='social-icon' />
              </a>
            </li>
            <li>
              <a
                href={site.links.pinterest}
                className='footer-social__pinterest'
                aria-label='Visit our pinterest page'
              >
                <PinterestIcon className='social-icon' />
              </a>
            </li>
            <li>
              <a
                aria-label='Visit our twitter page'
                href={site.links.twitter}
                className='footer-social__twitter'
              >
                <TwitterIcon className='social-icon' />
              </a>
            </li>
          </ul>
          <ul className='page-info font-small wf-os'>
            <li>
              <Link to={'/pages/about-us'}>About Us</Link>
            </li>
            <li>
              <Link to={'/pages/write-for-us'}>Write for Us</Link>
            </li>
            <li>
              <Link to={'/pages/collaborations'}>Collaborations</Link>
            </li>
            <li>
              <Link to={'/pages/book-o-clock'}>Book O' Clock</Link>
            </li>
            <li>
              <Link to={'/pages/advertising-on-the-expat-magazine'}>
                Advertising
              </Link>
            </li>
            <li>
              <Link to={'/pages/privacy-and-cookies-policy'}>Privacy</Link>
            </li>
          </ul>
        </div>
      </section>
      <section className='footer-copypright wf-os font-small'>
        &copy; copyright 2019 - thexpatmagazine.com
      </section>
    </footer>
  )
}

export default Footer
