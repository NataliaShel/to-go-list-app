// UserPlans.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContexts';
import { getPlannersByUserId} from '../firebase/firestore'

function UserPlans() {
  const { currentUser, userLoggedIn } = useAuth();
  const [planners, setPlanners] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [errorLoadingPlans, setErrorLoadingPlans] = useState(null);

  useEffect(() => {
    const fetchPlanners = async () => {
      if (userLoggedIn && currentUser && currentUser.uid) {
        console.log("User is logged in and UID is available:", currentUser.uid); // *** ДОДАНО ***
        setLoadingPlans(true);
        setErrorLoadingPlans(null);
        try {
          console.log("Calling getPlannersByUserId with UID:", currentUser.uid); // *** ДОДАНО ***
          const userPlanners = await getPlannersByUserId(currentUser.uid);
          console.log("Отримано плани з Firestore:", userPlanners); // *** ДОДАНО ***
          setPlanners(userPlanners);
        } catch (error) {
          console.error("Помилка завантаження планів з Firestore:", error); // *** ДОДАНО ***
          setErrorLoadingPlans("Не вдалося завантажити плани. Спробуйте пізніше.");
        } finally {
          setLoadingPlans(false);
        }
      } else {
        console.log("User not logged in or UID not available yet.");
        setPlanners([]);
        setLoadingPlans(false);
      }
    };

    fetchPlanners();
  }, [userLoggedIn, currentUser]); // Залежності, щоб ефект спрацьовував при зміні стану

  // ... решта вашого компонента, що відображає плани
  if (loadingPlans) return <div>Завантаження планів...</div>;
  if (errorLoadingPlans) return <div>Помилка: {errorLoadingPlans}</div>;
  if (planners.length === 0) return <div>Планів поки що немає.</div>;

  return (
    <div>
      <h2>Ваші Плани</h2>
      <ul>
        {planners.map(planner => (
          <li key={planner.id}>{planner.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserPlans;