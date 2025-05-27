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
        {/* Логотип зліва */}
        <Link to="/" className="navbar-brand">
          TO GO LIST
        </Link>

        {/* Посилання та кнопки праворуч */}
        <div
          className="navbar-links"
          style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          {!loading && userLoggedIn ? (
            <>
              {/* Привітання з email користувача */}
              <span className="navbar-user">Привіт, {currentUser?.email}</span>

              {/* Кнопка Вийти */}
              <button onClick={handleLogout} className="logout-button">
                Вийти
              </button>
            </>
          ) : (
            <>
              {/* Якщо не залогінений — показуємо кнопки Логін і Реєстрація */}
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
