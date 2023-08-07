import React from 'react';
import { Link } from 'react-router-dom';
import Page from "../../components/Page";
import './About.css';

const headContent = (
  <>
    <title>About</title>
    <meta name="description" content="Learn more about Volleyball Net" />
  </>
);

const About = () => {
  return (
    <Page isProtected={false} headContent={headContent}>
      <div className="about-container">
        <h1>About Us</h1>
        <p>Welcome to High Point Grove's Youth volleyball! After living in this community for over 15 years, and with the growth of our family and our interests, we decided to move forward with maximizing the use of our property.</p>
        <p>We offer a secluded venue just off the main road with a regulation size beach volleyball court that is also lit for those tournaments and practices that carryover after the sun goes down.</p>
        <p>There is plenty of perimeter court seating as long as you bring your own lawn chair or don’t mind to sit in the grass. We have a court side rinse station and plenty of parking in the barn lot just north of the court. This is the first driveway entrance to the property when entering from 101. We also offer portable restroom facilities.</p>
        <p>Join us today and be part of our growing community! Have questions? Feel free to <Link to="/contact">contact us</Link>.</p>
      </div>
    </Page>
  );
};

export default About;
