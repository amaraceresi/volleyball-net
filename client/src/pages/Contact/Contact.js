import React from 'react';

const ContactPage = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s10 offset-s1 m8 offset-m2 l6 offset-l3'>
          <div className='card light-grey darken-1'>
            <div className='card-content'>
              <span className='card-title center-align'>Contact Us</span>
              <div id='getform' className='card-content flow-text'>
                <form
                  action='https://getform.io/f/20f85b2e-8597-4ead-9061-9d89eda3c956'
                  method='POST'
                >
                  <input type='text' name='name' placeholder='Name' />
                  <input type='email' name='email' placeholder='Email' />
                  <input type='text' name='message' placeholder='Message' />
                  <div className='createBtnDiv'>
                    <button className='btn blue createBtn' type='submit'>Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
