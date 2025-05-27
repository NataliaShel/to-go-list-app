import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      style={{
        padding: '16px 0',
        marginTop: '2rem',
        textAlign: 'center',
        color: '#000000', 
      }}
    >
      <nav style={{ marginBottom: '16px' }}>
        <Link
          to="/terms-and-conditions"
          style={{ display: 'block', color: '#000000', margin: '8px 0', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Умови використання
        </Link>
        <Link
          to="/privacy-policy"
          style={{ display: 'block', color: '#000000', margin: '8px 0', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Політика конфіденційності
        </Link>
        <Link
          to="/contacts"
          style={{ display: 'block', color: '#000000', margin: '8px 0', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Контакти
        </Link>
      </nav>
      <p style={{ fontSize: '0.875rem', color: '#000000' }}>© 2025 My App. Всі права захищені.</p>
    </footer>
  );
};

export default Footer;
