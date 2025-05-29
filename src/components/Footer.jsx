import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      style={{
        padding: '16px 0',
        marginTop: '2rem',
        textAlign: 'center',
        color: '#fff', 
      }}
    >
      <nav style={{ marginBottom: '16px' }}>
        <Link
          to="/terms-and-conditions"
          style={{ display: 'block', color: '#fff', margin: '8px 0', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Terms of Use
        </Link>
        <Link
          to="/privacy-policy"
          style={{ display: 'block', color: '#fff', margin: '8px 0', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Privacy Policy
        </Link>
        <Link
          to="/contacts"
          style={{ display: 'block', color: '#fff', margin: '8px 0', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Contacts
        </Link>
      </nav>
      <p style={{ fontSize: '0.875rem', color: '#fff' }}>© 2025 My App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;