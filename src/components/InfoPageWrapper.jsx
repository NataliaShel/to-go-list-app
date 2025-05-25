// src/components/InfoPageWrapper.jsx
import React from 'react';
import '../App.css'; // на всякий випадок, якщо ще не підключено

const InfoPageWrapper = ({ title, children }) => (
  <div className="auth-container">
    <div className="auth-card animate-fadeInUp">
      <h1>{title}</h1>
      <div className="text-left text-gray-700 leading-relaxed">{children}</div>
    </div>
  </div>
);

export default InfoPageWrapper;
