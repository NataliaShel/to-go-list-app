import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from '../../../firebase/firestore';
import { db } from '../../../firebase/firebase';

const FetchUserPlansButton = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {

      const plansRef = collection(db, 'plans');
      const q = query(plansRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const fetchedPlans = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setPlans(fetchedPlans);
    } catch (error) {
      console.error("Помилка при отриманні планів:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchPlans} disabled={loading}>
        {loading ? 'Завантаження...' : 'Отримати мої плани'}
      </button>
      <ul>
        {plans.map(plan => (
          <li key={plan.id}>{plan.name}</li> // Припускаємо, що у plan є поле name
        ))}
      </ul>
    </div>
  );
};

export default FetchUserPlansButton;