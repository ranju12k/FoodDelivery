import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const styles = {
    footer: {
      background: 'linear-gradient(90deg, #30cfd0 0%, #330867 100%)',
      padding: '20px 0',
    },
    h5: {
      fontSize: '18px',
      color: '#fff',
      marginBottom: '10px',
    },
    p: {
      color: '#fff',
      marginBottom: '10px',
    },
    a: {
      color: '#fff',
      textDecoration: 'none',
      transition: 'color 0.3s ease-in-out',
    },
    'a:hover': {
      color: '#007bff',
    },
  };

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 style={styles.h5}>About Foody</h5>
            <p style={styles.p}>
              Foody is a platform that helps you find and discover new restaurants, cafes, and bars.
            </p>
          </div>
          <div className="col-md-4">
            <h5 style={styles.h5}>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" style={styles.a}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" style={styles.a}>
                  MyCart
                </Link>
              </li>
              <li>
                <Link to="/signup" style={styles.a}>
                  signUp
                </Link>
              </li>
              <li>
                <Link to="/bars" style={styles.a}>
                  Bars
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 style={styles.h5}>Contact Us</h5>
            <p style={styles.p}>Email: info@foody.com</p>
            <p style={styles.p}>Phone: +91 (123) 456-7890</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p style={styles.p}>2024 Foody, Inc</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;