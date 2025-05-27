import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/authContexts/authContexts';
import Login from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';
import Home from './pages/Home';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contacts from './pages/Contacts';
import { TogoWrapper } from './components/TogoWrapper';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function PrivateRoutes() {
  const { userLoggedIn, loading } = useAuth();

  if (loading) {
    return <div className="loading-spinner">Завантаження...</div>;
  }

  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        
        {/* Ось тут додаємо відступ, щоб Navbar не перекривав контент */}
        <div style={{ paddingTop: '72px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<TogoWrapper />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </AuthProvider>
    </Router>
  );
}


export default App;
