import { auth } from './firebase'; 

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

/**
 * @param {string} email
 * @param {string} password 
 * @returns {Promise<UserCredential>} 
 */
export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * @param {string} email 
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

/**
 * @returns {Promise<UserCredential>} 
 */
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};

/**
 * @returns {Promise<void>}
 */
export const doSignOut = () => {
    return signOut(auth);
};

/**
 * @param {string} email 
 * @returns {Promise<void>}
 */
export const doPasswordReset = async (email) => {
    return sendPasswordResetEmail(auth, email);
};
