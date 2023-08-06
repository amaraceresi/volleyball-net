import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="page-footer indigo darken-4">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li><a className="grey-text text-lighten-3" href="/">Home</a></li>
              <li><a className="grey-text text-lighten-3" href="/contact">Contact</a></li>
              <li><a className="grey-text text-lighten-3" href="/location">Location</a></li>
              <li><a className="grey-text text-lighten-3" href="/about">About</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container2">
          © 2014 Copyright Text
          <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
