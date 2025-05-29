import {
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  where,
  getDoc,
} from 'firebase/firestore';
import { db } from './firebase';

export const getAllUsersData = async () => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  const users = [];
  snapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
};

export const getUserDataById = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.warn(`User with ID ${uid} not found.`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateUserData = async (uid, data) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, data);
};

export const getPlannersByUserId = async (userId) => {
  const plannersRef = collection(db, 'planners');
  const q = query(plannersRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addPlanner = async (userId, plannerData) => {
  const plannersRef = collection(db, 'planners');
  const docRef = await addDoc(plannersRef, {
    ...plannerData,
    userId: userId,
    createdAt: new Date(),
  });
  return docRef.id;
};

export const updatePlanner = async (id, updatedData) => {
  const plannerRef = doc(db, 'planners', id);
  await updateDoc(plannerRef, updatedData);
};

export const deletePlanner = async (id) => {
  const plannerRef = doc(db, 'planners', id);
  await deleteDoc(plannerRef);
};