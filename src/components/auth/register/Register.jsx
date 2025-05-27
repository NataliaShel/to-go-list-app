import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom'; 
import { useAuth } from '../../../contexts/authContexts'; 
import { db } from '../../../firebase/firebase'; 
import { doc, setDoc } from 'firebase/firestore'; 

export const Register = () => {
    const { userLoggedIn, doCreateUserWithEmailAndPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    if (userLoggedIn) {
        return <Navigate to={'/home'} replace={true} />; 
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 
        if (password !== confirmPassword) {
            setErrorMessage('Паролі не співпадають!');
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                const userCredential = await doCreateUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                await setDoc(doc(db, 'user', user.uid), {
                    email: user.email,
                    role: 'user', 
                    createdAt: new Date()
                });

               
            } catch (error) {
                setIsRegistering(false); 
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