import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB2vSF3pV9wycG7J-A3xn6y_gXS_Ney_gA", 
  authDomain: "to-go-fec0c.firebaseapp.com", 
  projectId: "to-go-fec0c",
  storageBucket: "to-go-fec0c.firebasestorage.app",
  messagingSenderId: "444288469231", 
  appId: "1:444288469231:web:1f609c7226d35eb094331a", 
  measurementId: "G-HJ7T1DH5NT" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };