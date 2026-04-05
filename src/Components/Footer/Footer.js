import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import logo from '../../images/logo2.jpg'

function Footer() {
  return (
    <footer className="footer-premium pt-5">
      <div className="container">
        <div className="row g-5 pb-5">
          {/* Section 1: Brand Info */}
          <div className="col-lg-3 col-md-6 text-center text-md-start">
            <div className="footer-brand mb-4 d-flex align-items-center justify-content-center justify-content-md-start">
              <img src={logo} alt="TastyNest Logo" className="logo rounded-circle me-3" style={{ width: '45px' }} />
              <h2 className="text-gold mb-0">TastyNest</h2>
            </div>
            <p className="footer-tagline text-muted">
              Crafting extraordinary culinary moments where every flavor tells a story of passion and excellence.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="col-lg-3 col-md-6 text-center text-md-start">
            <h4 className="text-gold mb-4 footer-heading">Explore</h4>
            <ul className="footer-nav-links list-unstyled p-0">
              <li className="mb-3">
                <NavLink to="/" className="footer-link">Home</NavLink>
              </li>
              <li className="mb-3">
                <NavLink to="/products" className="footer-link">Our Menu</NavLink>
              </li>
              <li className="mb-3">
                <NavLink to="/gallery" className="footer-link">Gallery</NavLink>
              </li>
              <li className="mb-3">
                <NavLink to="/contactus" className="footer-link">Contact Us</NavLink>
              </li>
            </ul>
          </div>

          {/* Section 3: Contact Info */}
          <div className="col-lg-3 col-md-6 text-center text-md-start text-muted">
            <h4 className="text-gold mb-4 footer-heading">Get in Touch</h4>
            <div className="contact-item d-flex align-items-center justify-content-center justify-content-md-start mb-3">
              <FaPhoneAlt className="text-gold me-3" />
              <span>+91 12345 67890</span>
            </div>
            <div className="contact-item d-flex align-items-center justify-content-center justify-content-md-start mb-3">
              <FaEnvelope className="text-gold me-3" />
              <span>hello@tastynest.in</span>
            </div>
            <div className="contact-item d-flex align-items-center justify-content-center justify-content-md-start mb-3 text-start">
              <FaMapMarkerAlt className="text-gold me-3 flex-shrink-0" />
              <span>123, Golden Avenue, Food Street, Hyderabad - 500001</span>
            </div>
          </div>

          {/* Section 4: Social Media */}
          <div className="col-lg-3 col-md-6 text-center text-md-start">
            <h4 className="text-gold mb-4 footer-heading">Follow Us</h4>
            <p className="text-muted mb-4">Stay updated with our latest gourment creations.</p>
            <div className="social-links d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="social-link-btn" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="social-link-btn" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="social-link-btn" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className="social-link-btn" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar py-4 text-center border-top border-secondary">
          <p className="mb-0 text-muted small letter-spacing-1">
            &copy; 2026 <span className="text-gold fw-bold">TastyNest</span>. All Rights Reserved. Crafted with Excellence.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
