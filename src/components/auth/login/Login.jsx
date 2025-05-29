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
      navigate('/home'); 
    } catch (error) {
      console.error('Login error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setErrorMessage('Invalid email or password.');
          break;
        case 'auth/invalid-email':
          setErrorMessage('Invalid email format.');
          break;
        default:
          setErrorMessage('Login error. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" disabled={isSigningIn} className="auth-btn">
            {isSigningIn ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;