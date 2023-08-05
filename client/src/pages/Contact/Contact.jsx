import React from 'react';
import './Contact.css';

const ContactPage = () => {
  return (
    <div className="contact-container">
      <div className="container">
        <div className="title">Contact Us</div>
        <div id="getform" className="card-content flow-text">
          <form
            action="https://getform.io/f/20f85b2e-8597-4ead-9061-9d89eda3c956"
            method="POST"
          >
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="text" name="message" placeholder="Message" />
              <button type="submit" className="submitBtn">
                Submit
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;

