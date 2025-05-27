import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContexts';

const Navbar = () => {
  const { userLoggedIn, currentUser, doSignOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate('/login');
    } catch (error) {
      console.error("Помилка при виході:", error);
    }
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
        }}
      >
       
        <Link to="/" className="navbar-brand">
          TO GO LIST
        </Link>

        <div
          className="navbar-links"
          style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          {!loading && userLoggedIn ? (
            <>

              <span className="navbar-user">Привіт, {currentUser?.email}</span>

            
              <button onClick={handleLogout} className="logout-button">
                Вийти
              </button>
            </>
          ) : (
            <>
       
              <Link to="/login" className="auth-btn">
                Увійти
              </Link>
              <Link to="/register" className="auth-btn">
                Зареєструватися
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
