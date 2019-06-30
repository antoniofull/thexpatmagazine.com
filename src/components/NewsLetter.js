import React from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { Link } from 'gatsby';

import '../styles/newsletter.css';

const url =
  'https://expatmagazine.us14.list-manage.com/subscribe/post?u=c34682e786a3e125e739029e5&amp;id=ce9bebc2af';

const CustomForm = ({ status, message, onValidated }) => {
  let email, name;
  const submit = e => {
    e.preventDefault();
    email &&
      name &&
      email.value.indexOf('@') > -1 &&
      onValidated({
        EMAIL: email.value,
        NAME: name.value
      });
  };
  return (
    <>
      <div className='form-newsletter__msg'>
        {status === 'sending' && (
          <div style={{ color: 'blue' }}>sending...</div>
        )}
        {status === 'error' && (
          <div
            style={{ color: 'red' }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === 'success' && (
          <div
            style={{ color: 'green' }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      </div>
      <form className='form-newsletter'>
        <div className='form-newsletter__container'>
          <label htmlFor='name'>Name</label>
          <input
            ref={node => (name = node)}
            type='text'
            id='name'
            name='name'
            placeholder='Your name'
            aria-label='name'
          />
          <label htmlFor='email'>Email</label>
          <input
            ref={node => (email = node)}
            type='email'
            id='email'
            name='email'
            aria-label='email'
            placeholder='Your email'
          />
        </div>
        <div className='form-newsletter__container'>
          <span className='form-newsletter__privacy wf-os'>
            Only one email per month. No spam. Read our{' '}
            <Link to={`/privacy-and-cookies-policy/`}>privacy policy</Link>
          </span>
          <button className='btn btn--primary btn--rounded' onClick={submit}>
            Get Free Travel Tips
          </button>
        </div>
      </form>
    </>
  );
};

const NewsLetter = () => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <section className='newsletter'>
        <h2 className='newsletter__header wf-os has-text-white has-text-center'>
          Stay Inspired
        </h2>
        <CustomForm
          status={status}
          message={message}
          onValidated={formData => subscribe(formData)}
        />
      </section>
    )}
  />
);

export default NewsLetter;
