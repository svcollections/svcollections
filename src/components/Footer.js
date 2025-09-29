import React, { useState } from 'react';
import { site } from '../data/site';
import './Footer.css';

const Footer = () => {
  const [showShipping, setShowShipping] = useState(false);

  const openShipping = (e) => {
    e.preventDefault();
    setShowShipping(true);
  };

  const closeShipping = () => setShowShipping(false);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>SV Collections</h3>
          <p>Your one-stop destination for modern, stylish clothing.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li>
              <button className="linklike" type="button" onClick={openShipping}>Shipping Info</button>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a target="_blank" href={site.socials.instagram}>Instagram</a>
            <a target="_blank" href={site.socials.whatsapp}>Whatsapp</a>
            <a target="_blank" href={site.socials.maps}>Google Maps</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SV Collections. All rights reserved.</p>
      </div>

      {showShipping && (
        <div className="modal-overlay" onClick={closeShipping}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <p>{site.addressLine1}</p>
              <p>{site.addressLine2}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeShipping}>Close</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
