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
        console.log("User is logged in and UID is available:", currentUser.uid); 
        setLoadingPlans(true);
        setErrorLoadingPlans(null);
        try {
          console.log("Calling getPlannersByUserId with UID:", currentUser.uid); 
          const userPlanners = await getPlannersByUserId(currentUser.uid);
          console.log("Plans received from Firestore:", userPlanners); 
          setPlanners(userPlanners);
        } catch (error) {
          console.error("Error loading plans from Firestore:", error); 
          setErrorLoadingPlans("Failed to load plans. Please try again later.");
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
  }, [userLoggedIn, currentUser]); 
  if (loadingPlans) return <div>Loading plans...</div>;
  if (errorLoadingPlans) return <div>Error: {errorLoadingPlans}</div>;
  if (planners.length === 0) return <div>No plans yet.</div>;

  return (
    <div>
      <h2>Your Plans</h2>
      <ul>
        {planners.map(planner => (
          <li key={planner.id}>{planner.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserPlans;