// src/contexts/authContexts/authContexts.js
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase'; // Імпортуємо об'єкт auth
import { onAuthStateChanged } from 'firebase/auth';
import { doSignInWithEmailAndPassword } from '../../firebase/auth'; // Імпортуємо нову функцію

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setUserLoggedIn(true);
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        doSignInWithEmailAndPassword, // Надаємо функцію через контекст
        // Додайте інші функції автентифікації тут, якщо вони є
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}