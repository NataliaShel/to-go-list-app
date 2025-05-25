// src/components/auth/register/Register.jsx
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom'; // Import Navigate
import { useAuth } from '../../../contexts/authContexts'; // Adjust path as needed
import { db } from '../../../firebase/firebase'; // Assuming you need db for adding user roles
import { doc, setDoc } from 'firebase/firestore'; // Import setDoc for adding user document

export const Register = () => {
    const { userLoggedIn, doCreateUserWithEmailAndPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // If the user is already logged in, redirect them immediately.
    // This prevents the "Cannot update a component while rendering a different component" error.
    if (userLoggedIn) {
        return <Navigate to={'/dashboard'} replace={true} />; // Redirect to your dashboard or home page
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors

        if (password !== confirmPassword) {
            setErrorMessage('Паролі не співпадають!');
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                const userCredential = await doCreateUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Add user document to Firestore with default role 'user'
                await setDoc(doc(db, 'user', user.uid), {
                    email: user.email,
                    role: 'user', // Default role for new registrations
                    createdAt: new Date()
                });

                // navigate('/dashboard'); // You might not need this line if <Navigate> in if (userLoggedIn) handles it
            } catch (error) {
                setIsRegistering(false); // Allow re-submission
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setErrorMessage('Цей email вже використовується.');
                        break;
                    case 'auth/invalid-email':
                        setErrorMessage('Неправильний формат email.');
                        break;
                    case 'auth/weak-password':
                        setErrorMessage('Пароль повинен бути не менше 6 символів.');
                        break;
                    default:
                        setErrorMessage(`Помилка реєстрації: ${error.message}`);
                        break;
                }
                console.error("Помилка реєстрації:", error);
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Реєстрація</h2>
                <form onSubmit={onSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Електронна пошта</label>
                        <input
                            type="email"
                            placeholder="Ваша пошта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Пароль</label>
                        <input
                            type="password"
                            placeholder="Мінімум 6 символів"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Підтвердіть Пароль</label>
                        <input
                            type="password"
                            placeholder="Підтвердіть пароль"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button
                        type="submit"
                        disabled={isRegistering}
                        className="auth-btn"
                    >
                        {isRegistering ? 'Реєстрація...' : 'Зареєструватися'}
                    </button>
                </form>

                <p className="auth-link">
                    Вже маєте обліковий запис? <Link to="/login">Увійти</Link>
                </p>
            </div>
        </div>
    );
};