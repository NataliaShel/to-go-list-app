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

import { db } from './firebase'; // Має бути правильно налаштований export { db } у firebase.js

// 🔹 Отримати всіх користувачів
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

// 🔹 Отримати конкретного користувача за UID
export const getUserDataById = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.warn(`❗ Користувача з ID ${uid} не знайдено`);
      return null;
    }
  } catch (error) {
    console.error('❌ Помилка при отриманні даних користувача:', error);
    throw error;
  }
};

// 🔹 Оновити дані користувача
export const updateUserData = async (uid, data) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, data);
};

// 🔸 Отримати плани користувача
export const getPlannersByUserId = async (userId) => {
  const plannersRef = collection(db, 'planners');
  const q = query(plannersRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// 🔸 Додати новий план
export const addPlanner = async (planner) => {
  const plannersRef = collection(db, 'planners');
  const docRef = await addDoc(plannersRef, planner);
  return docRef.id;
};

// 🔸 Оновити план
export const updatePlanner = async (id, updatedData) => {
  const plannerRef = doc(db, 'planners', id);
  await updateDoc(plannerRef, updatedData);
};

// 🔸 Видалити план
export const deletePlanner = async (id) => {
  const plannerRef = doc(db, 'planners', id);
  await deleteDoc(plannerRef);
};
