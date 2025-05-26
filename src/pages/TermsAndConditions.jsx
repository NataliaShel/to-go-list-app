import React from 'react';
import InfoPageWrapper from '../components/InfoPageWrapper';

const TermsAndConditions = () => {
  console.log('TermsAndConditions rendered!');
  return (
    <InfoPageWrapper title="Умови використання">
      <h2 className="text-xl font-semibold mb-2">1. Загальні положення</h2>
      <p className="mb-4">
        Ласкаво просимо до To-Do List App! Ці Умови використання регулюють ваш доступ та використання нашого веб-додатку...
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Обліковий запис користувача</h2>
      <p className="mb-4">
        Для доступу до певних функцій Додатка вам може знадобитися створити обліковий запис...
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Використання Додатка</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Додаток призначений для особистого, некомерційного використання.</li>
        <li>Ви погоджуєтеся не використовувати Додаток для незаконних цілей.</li>
        <li>Заборонено перевантаження або порушення роботи Додатка.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">4. Відмова від відповідальності</h2>
      <p className="mb-4">Додаток надається "як є" та "як доступно".</p>

      <h2 className="text-xl font-semibold mb-2">5. Зміни до Умов</h2>
      <p className="mb-4">
        Ми залишаємо за собою право вносити зміни до цих умов у будь-який час...
      </p>

      <p className="text-sm text-center text-gray-500 mt-8">
        Останнє оновлення: 25 травня 2025 року
      </p>
    </InfoPageWrapper>
  );
};

export default TermsAndConditions;
