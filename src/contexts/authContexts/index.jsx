import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
// import { GoogleAuthProvider } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customJwt, setCustomJwt] = useState(null); // <--- Додайте цей стан для вашого Custom JWT

  // Функція для обміну Firebase ID Token на Custom JWT з вашого бекенду
  const exchangeFirebaseTokenForCustomJwt = async (firebaseIdToken) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/custom-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firebaseIdToken }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Отримано Custom JWT з бекенду:", data.customToken);
      // Зберігаємо Custom JWT. Можна в localStorage для персистентності або в стані.
      localStorage.setItem('customJwt', data.customToken); // <--- Зберігаємо в localStorage
      setCustomJwt(data.customToken); // <--- Оновлюємо стан
      return data.customToken;
    } catch (error) {
      console.error("Помилка обміну токенів:", error);
      // Очищаємо токен, якщо була помилка
      localStorage.removeItem('customJwt');
      setCustomJwt(null);
      throw error; // Перекидаємо помилку далі
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setUserLoggedIn(true);
        setIsEmailUser(user.providerData.some(provider => provider.providerId === 'password'));
        setIsGoogleUser(user.providerData.some(provider => provider.providerId === 'google.com'));

        // Отримуємо Firebase ID Token після автентифікації
        try {
          const firebaseIdToken = await user.getIdToken();
          await exchangeFirebaseTokenForCustomJwt(firebaseIdToken); // Обмінюємо його на наш Custom JWT
        } catch (error) {
          console.error("Помилка отримання або обміну Firebase ID Token:", error);
          // Можливо, тут потрібно вийти з системи або показати помилку користувачеві
        }
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setCustomJwt(null); // Очищаємо Custom JWT, якщо користувач вийшов
        localStorage.removeItem('customJwt'); // Очищаємо з localStorage
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    loading,
    customJwt, // <--- Додайте customJwt до контексту
    doSignInWithEmail: async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Firebase ID Token буде отримано в onAuthStateChanged useEffect
        return userCredential;
      } catch (error) {
        console.error("Помилка входу:", error);
        throw error;
      }
    },
    doCreateUserWithEmail: async (email, password) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Firebase ID Token буде отримано в onAuthStateChanged useEffect
        return userCredential;
      } catch (error) {
        console.error("Помилка реєстрації:", error);
        throw error;
      }
    },
    doSignOut: async () => {
      await auth.signOut();
      // onAuthStateChanged useEffect обробить очищення customJwt
    },
    doPasswordReset: sendPasswordResetEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
