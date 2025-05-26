import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContexts/authContexts';

const Login = () => {
  const navigate = useNavigate();
  const { userLoggedIn, doSignInWithEmailAndPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (userLoggedIn) {
    return <Navigate to="/home" replace={true} />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSigningIn(true);

    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate('/home'); // Після успішного входу перекидаємо
    } catch (error) {
      console.error('Помилка входу:', error);
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setErrorMessage('Невірний email або пароль.');
          break;
        case 'auth/invalid-email':
          setErrorMessage('Неправильний формат email.');
          break;
        default:
          setErrorMessage('Помилка входу. Спробуйте ще раз.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Вхід</h2>
        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label>Електронна пошта</label>
            <input
              type="email"
              placeholder="Ваша пошта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" disabled={isSigningIn} className="auth-btn">
            {isSigningIn ? 'Вхід...' : 'Увійти'}
          </button>
        </form>

        <p className="auth-link">
          Не маєте облікового запису? <Link to="/register">Зареєструватися</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
