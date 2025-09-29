import React from 'react';
import { site } from '../data/site';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out via phone, email, or visit us.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>Call Us</h3>
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="contact-link">{site.phone}</a>
          </div>

          <div className="contact-card">
            <h3>Email Us</h3>
            <a href={`mailto:${site.email}`} className="contact-link">{site.email}</a>
          </div>

          <div className="contact-card">
            <h3>Visit Us</h3>
            <p>{site.addressLine1}</p>
            <p>{site.addressLine2}</p>
            <a href={site.socials.maps} target="_blank" rel="noreferrer" className="contact-link">Open in Google Maps</a>
          </div>

          <div className="contact-card">
            <h3>Business Hours</h3>
            <ul className="hours-list">
              {site.hours.map((h) => (
                <li key={h.day}>
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="contact-actions">
          <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="btn btn-primary">Instagram</a>
          <a href={site.socials.whatsapp} target="_blank" rel="noreferrer" className="btn btn-secondary">WhatsApp</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;


