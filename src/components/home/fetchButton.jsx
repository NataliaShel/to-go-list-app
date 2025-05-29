import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from '../../../firebase/firestore';
import { db } from '../../../firebase/firebase';

const FetchUserPlansButton = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const userId = "YOUR_CURRENT_USER_ID"; 

      if (!userId) {
        console.error("User not authenticated. Cannot fetch plans.");
        setLoading(false);
        return;
      }

      const plansRef = collection(db, 'plans');
      const q = query(plansRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const fetchedPlans = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setPlans(fetchedPlans);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchPlans} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch My Plans'}
      </button>
      <ul>
        {plans.map(plan => (
          <li key={plan.id}>{plan.name}</li> 
        ))}
      </ul>
    </div>
  );
};

export default FetchUserPlansButton;