import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div id="footer" className="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab molestiae accusamus aut reiciendis fugiat explicabo voluptate delectus laboriosam veniam sit laudantium similique, possimus totam ea hic quidem! Eveniet, aliquid quasi?</p>
            <div className="footer-social-icon">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>

        </div>

        <div className="footer-content-center">

        <h2>COMPANY</h2>

        <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>

        </div>

        <div className="footer-content-left">

        <h2>GET IN TOUCH</h2>
        <ul>
            <li>+91 1234567891</li>
            <li>contact@tomato.con</li>
        </ul>

        </div>
      </div>

      <hr />
      <p className="footer-copyrigh">
        Copyright 2025 © Tomato.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
