import React from 'react';
import image1 from "../../images/what_type_of_sand_is_used_for_beach_volleyball.jpg";
import image2 from "../../images/image_from_ios_720.jpg"; 
import image3 from "../../images//beach-volleyball_instagram_1.jpg";
import image4 from "../../images//31057875396_589d4dfdef_z.jpg";
const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2023 VolleyNet</p>
      <img src={image1} style={{ width: '2000px', height: '500px' }} alt="Image 1" />
      <img src={image2} style={{ width: '1000x', height: '500px' }} alt="Image 2" />
      <img src={image3} style={{ width: '1000x', height: '500px' }} alt="Image 2" />
      <img src={image4} style={{width: '1050x', height: '440px' }} alt="Image 4" />
    </footer>
  );
};

export default Footer;

