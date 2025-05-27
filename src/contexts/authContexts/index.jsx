import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const doCreateUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const doSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const doSignOut = () => {
    return signOut(auth);
  };

  const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const doUpdatePassword = (newPassword) => {
    if (!auth.currentUser) {
      return Promise.reject(new Error("User not logged in"));
    }
    return updatePassword(auth.currentUser, newPassword);
  };

  const doSendEmailVerification = () => {
    if (!auth.currentUser) {
      return Promise.reject(new Error("User not logged in"));
    }
    return sendEmailVerification(auth.currentUser);
  };

  const value = {
    currentUser,
    loading,
    userLoggedIn: !!currentUser,
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
    doSignOut,
    doPasswordReset,
    doUpdatePassword,
    doSendEmailVerification,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
