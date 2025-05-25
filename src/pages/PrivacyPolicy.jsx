// src/pages/PrivacyPolicy.jsx
import React from 'react';
import InfoPageWrapper from '../components/InfoPageWrapper';

const PrivacyPolicy = () => (
  <InfoPageWrapper title="Політика конфіденційності">
    <p className="mb-4">
      Ця Політика конфіденційності описує, як To-Do List збирає, використовує та розкриває Вашу особисту інформацію, коли Ви використовуєте наш застосунок To-Do List.
    </p>
    <h2 className="text-xl font-semibold mb-2">Збір інформації</h2>
    <p className="mb-4">
      Ми збираємо інформацію, яку Ви надаєте нам безпосередньо, наприклад, коли Ви створюєте обліковий запис...
    </p>
    {/* Додайте інші секції політики за потреби */}
  </InfoPageWrapper>
);

export default PrivacyPolicy;
