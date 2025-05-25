// src/pages/Contacts.jsx
import React from 'react';
import InfoPageWrapper from '../components/InfoPageWrapper';

const Contacts = () => (
  <InfoPageWrapper title="Контакти">
    <p className="mb-4">
      Якщо у вас є запитання або пропозиції, будь ласка, зв'яжіться з нами:
    </p>
    <ul className="list-disc pl-5">
      <li className="mb-2">Електронна пошта: support@yourtodolistapp.com</li>
      <li className="mb-2">Телефон: +380 XX XXX XX XX</li>
      <li className="mb-2">Адреса: адреса,  місто, Україна</li>
    </ul>
  </InfoPageWrapper>
);

export default Contacts;
