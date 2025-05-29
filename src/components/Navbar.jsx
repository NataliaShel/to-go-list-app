import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContexts/authContexts';

const Navbar = () => {
  const { userLoggedIn, currentUser, doSignOut, loading } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">TO DO LIST</Link>

        <div className="navbar-links">
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {!loading && userLoggedIn ? (
            <>
              <span className="navbar-user">Hello, {currentUser?.email}</span>
              <button onClick={handleLogout} className="logout-button">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-btn">LogIn</Link>
              <Link to="/register" className="auth-btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;