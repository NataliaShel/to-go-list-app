// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Ваша конфігурація веб-додатку Firebase
// (Ці дані ви отримуєте з консолі Firebase -> Project settings -> Your apps -> Firebase SDK snippet)
const firebaseConfig = {
  apiKey: "AIzaSyB2vSF3pV9wycG7J-A3xn6y_gXS_Ney_gA", // Ваші дані
  authDomain: "to-go-fec0c.firebaseapp.com", // Ваші дані
  projectId: "to-go-fec0c", // Ваші дані
  storageBucket: "to-go-fec0c.firebasestorage.app", // Ваші дані
  messagingSenderId: "444288469231", // Ваші дані
  appId: "1:444288469231:web:1f609c7226d35eb094331a", // Ваші дані
  measurementId: "G-HJ7T1DH5NT" // Ваші дані
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };