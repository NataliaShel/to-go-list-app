// src/firebase/firebase.js
// Цей файл ініціалізує Firebase і експортує його сервіси (Auth, Firestore).

// Імпортуємо необхідні функції з Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

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

// Експортуємо ініціалізовані сервіси Firebase
// Це дозволяє іншим файлам імпортувати 'auth' та 'db'
export const auth = getAuth(app);
export const db = getFirestore(app);// <-- ДОДАЙТЕ ЦЕЙ РЯДОК!
