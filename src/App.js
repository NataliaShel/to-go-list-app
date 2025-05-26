import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/authContexts/authContexts';

// Компоненти сторінок
import Login from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';
import Home from './pages/Home';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contacts from './pages/Contacts';
import AdminPanel from './pages/AdminPanel';
import UserPlans from './pages/UserPlans';
import { TogoWrapper } from './components/TogoWrapper';

// Спільні компоненти
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css';

// Компонент для приватних маршрутів
function PrivateRoutes({ adminOnly = false }) {
  const { userLoggedIn, loading, isAdmin } = useAuth();

  if (loading) {
    return <div className="loading-spinner">Завантаження...</div>;
  }

  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* Публічні сторінки */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contacts" element={<Contacts />} />

          {/* Приватні маршрути для будь-якого залогіненого користувача */}
          <Route element={<PrivateRoutes />}>
            <Route path="/my-plans" element={<UserPlans />} />
            <Route path="/dashboard" element={<UserPlans />} />
            <Route path="/home" element={<TogoWrapper />} />
          </Route>

          {/* Приватний маршрут лише для адміністраторів */}
          <Route element={<PrivateRoutes adminOnly={true} />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>

          {/* Якщо маршрут не знайдено, редірект на головну */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
