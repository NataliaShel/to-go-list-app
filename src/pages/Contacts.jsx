import React from 'react';
import InfoPageWrapper from '../components/InfoPageWrapper';

const Contacts = () => (
  <InfoPageWrapper title="Contacts">
    <p className="mb-4">
      If you have any questions or suggestions, please contact us:
    </p>
    <ul className="list-disc pl-5">
      <li className="mb-2">Email: support@yourtodolistapp.com</li>
      <li className="mb-2">Phone: +380 XX XXX XX XX</li>
      <li className="mb-2">Address: address, city, Ukraine</li>
    </ul>
  </InfoPageWrapper>
);

export default Contacts;