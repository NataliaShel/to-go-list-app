// src/firebase/auth.js
// Цей файл містить функції для взаємодії з Firebase Authentication.

// Імпортуємо об'єкт 'auth' з нашого основного файлу конфігурації Firebase.
// Шлях './firebase' вказує на файл 'firebase.js' у тій же директорії.
import { auth } from './firebase'; 

// Імпортуємо необхідні функції з Firebase Authentication SDK.
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail, // <-- ПЕРЕКОНАЙТЕСЬ, ЩО ЦЕЙ ІМПОРТ Є І НЕ ЗАКОМЕНТОВАНИЙ
  updatePassword, // Розкоментуйте, якщо плануєте використовувати функцію оновлення пароля
  sendEmailVerification // Розкоментуйте, якщо плануєте використовувати функцію підтвердження email
} from "firebase/auth";

/**
 * Створює нового користувача за допомогою email та пароля.
 * @param {string} email - Електронна пошта користувача.
 * @param {string} password - Пароль користувача.
 * @returns {Promise<UserCredential>} - Об'єкт UserCredential від Firebase.
 */

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Входить в систему за допомогою email та пароля.
 * @param {string} email - Електронна пошта користувача.
 * @param {string} password - Пароль користувача.
 * @returns {Promise<UserCredential>} - Об'єкт UserCredential від Firebase.
 */
export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Входить в систему за допомогою облікового запису Google.
 * @returns {Promise<UserCredential>} - Об'єкт UserCredential від Firebase.
 */
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};

/**
 * Виходить з системи поточного користувача.
 * @returns {Promise<void>}
 */
export const doSignOut = () => {
    return signOut(auth);
};

/**
 * Надсилає лист для скидання пароля на вказану електронну пошту.
 * @param {string} email - Електронна пошта для скидання пароля.
 * @returns {Promise<void>}
 */
export const doPasswordReset = async (email) => {
    return sendPasswordResetEmail(auth, email);
};

// Ви можете розкоментувати та реалізувати ці функції, якщо вони потрібні для вашого додатку:

/**
 * Оновлює пароль поточного користувача.
 * @param {string} newPassword - Новий пароль.
 * @returns {Promise<void>}
 */
// export const doUpdatePassword = (newPassword) => {
//    // auth.currentUser - це поточний увійшовший користувач
//    return updatePassword(auth.currentUser, newPassword);
// }

/**
 * Надсилає лист для підтвердження електронної пошти поточного користувача.
 * @returns {Promise<void>}
 */
// export const doSendEmailVerification = () => {
//    // auth.currentUser - це поточний увійшовший користувач
//    return sendEmailVerification(auth.currentUser, {
//        url: `${window.location.origin}/home`, // URL, на який користувач буде перенаправлений після підтвердження
//    });
// };
