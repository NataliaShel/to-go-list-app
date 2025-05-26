// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'; // Outlet вже імпортовано
import { AuthProvider, useAuth } from './contexts/authContexts/authContexts';


// Імпорти компонентів автентифікації
import Login from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';

// Імпорти компонентів ToDo функціоналу
import { TogoWrapper } from './components/TogoWrapper';

// Імпорти компонентів сторінок
import Home from './pages/Home';
import TermsAndConditions from './pages/TermsAndConditions';
import AdminPanel from './pages/AdminPanel';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contacts from './pages/Contacts';
import UserPlans from './pages/UserPlans'; // Переконайтеся, що шлях правильний

// ІМПОРТУЙТЕ NAVBAR СЮДИ
import Navbar from './components/Navbar'; // Переконайтеся, що шлях правильний до Navbar.jsx

// Імпорти спільних компонентів
import Footer from './components/Footer';
import './App.css';

// Компонент-обгортка для захищених (приватних) маршрутів
function PrivateRoutes() {
  const { userLoggedIn, loading } = useAuth();

  if (loading) {
    return <div className="loading-spinner">Завантаження...</div>;
  }

  return userLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}


function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Додаємо Navbar, щоб він відображався на всіх сторінках */}
        <Navbar />

        <Routes>
          {/* Публічні маршрути */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contacts" element={<Contacts />} />

          {/* Захищені (приватні) маршрути */}
          <Route element={<PrivateRoutes />}>
            <Route path="/my-plans" element={<UserPlans />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/home" element={<TogoWrapper />} />
            <Route path="/dashboard" element={<UserPlans />} />
          </Route>

          {/* Маршрут для неіснуючих сторінок (404) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;