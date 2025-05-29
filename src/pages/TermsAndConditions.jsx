import React from 'react';
import InfoPageWrapper from '../components/InfoPageWrapper';

const TermsAndConditions = () => {
  console.log('TermsAndConditions rendered!');
  return (
    <InfoPageWrapper title="Terms of Use">
      <h2 className="text-xl font-semibold mb-2">1. General Provisions</h2>
      <p className="mb-4">
        Welcome to To-Do List App! These Terms of Use govern your access and use of our web application...
      </p>

      <h2 className="text-xl font-semibold mb-2">2. User Account</h2>
      <p className="mb-4">
        To access certain features of the Application, you may need to create an account...
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Use of the Application</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>The Application is intended for personal, non-commercial use.</li>
        <li>You agree not to use the Application for illegal purposes.</li>
        <li>Overloading or disrupting the operation of the Application is prohibited.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">4. Disclaimer</h2>
      <p className="mb-4">The Application is provided "as is" and "as available."</p>

      <h2 className="text-xl font-semibold mb-2">5. Changes to the Terms</h2>
      <p className="mb-4">
        We reserve the right to make changes to these terms at any time...
      </p>

      <p className="text-sm text-center text-gray-500 mt-8">
        Last updated: May 25, 2025
      </p>
    </InfoPageWrapper>
  );
};

export default TermsAndConditions;