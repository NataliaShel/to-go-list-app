import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = getAuth();

  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Функція входу — важливо саме signInWithEmailAndPassword
  const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const doSignOut = () => {
    return signOut(auth);
  };

  const fetchUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data().role || 'user';
      }
      return 'user';
    } catch (err) {
      console.error('Помилка при отриманні ролі користувача:', err);
      return 'user';
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const role = await fetchUserRole(user.uid);
        setUserRole(role);
        setIsAdmin(role === 'admin');
      } else {
        setCurrentUser(null);
        setUserRole(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const value = {
    currentUser,
    userRole,
    isAdmin,
    userLoggedIn: !!currentUser,
    loading,
    doSignInWithEmailAndPassword, // Обов’язково так називати, щоб Login.jsx не міняти
    doSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
