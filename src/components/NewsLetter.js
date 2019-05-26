import React from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import '../styles/newsletter.css';

const url =
  'https://expatmagazine.us14.list-manage.com/subscribe/post?u=c34682e786a3e125e739029e5&amp;id=ce9bebc2af';

const CustomForm = ({ status, message, onValidated }) => {
  let email, name;
  const submit = () =>
    email &&
    name &&
    email.value.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value
    });

  return (
    <form className='form-newsletter'>
      <div className='form-newsletter__container'>
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
        <input
          ref={node => (name = node)}
          type='text'
          placeholder='Your name'
        />
        <input
          ref={node => (email = node)}
          type='email'
          placeholder='Your email'
        />
      </div>
      <button className='btn btn--primary btn--rounded' onClick={submit}>
        Get Free Travel Tips
      </button>
    </form>
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
